const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {User} = require('../models');
const {createBlackList} = require('jwt-blacklist')
require('dotenv').config();
const {verifyAccess, verifyRefresh} = require('../middlewares/auth');

exports.signUp = async ({nickname, email, password}) => {

    const userExists = await User.findOne({where:{email}})

    if (userExists) {
        console.log('이미 사용 중인 이메일입니다!');
        return false;
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_pw = await bcrypt.hash(password, salt);
    const user = await User.create({
        nickname,
        email,
        password:hashed_pw
    });
    return user;
};

exports.logIn = async({email, password}) => {
    const user = await User.findOne({where:{email}})
    userData = user.dataValues;

    const accessToken = signAccess(userData);
    const refreshToken = signRefresh();

    const tokens = {
        'access':accessToken,
        'refresh':refreshToken,
    }
    return {userData, tokens};
}

exports.tokenRefresh = async (accessToken, refreshToken) => {
    const authResult = verifyAccess(accessToken);

    if (authResult.userData === null) { //verify된 데이터가 없음.
        return {
            'success':false,
            'status':'no verified data',
            'token':null
        };
    } else {
        const refreshResult = verifyRefresh(refreshToken)

        if (authResult.success === false && authResult.message === 'jwt expired') {
            if (refreshResult === false) { //accessToken과 refreshToken이 모두 유효하지 않음 -> 재로그인해야 함.
                return {
                    'success':false,
                    'status':'no token valid. re-login required',
                    'token':null
                }

            } else { //accessToken은 유효하지 않으나 refreshToken이 유효함. == 새 access 발급.

                const newAccess = signAccess(authResult);
                return {
                    'success':true,
                    'status':'Access Token granted',
                    'token':{
                        'access':newAccess,
                        'refresh':refreshToken
                    }
                }
            }
        } else { //accessToken이 만료되지 않음
            return {
                'success':false,
                'status':'Access Token not expired',
                'token':{
                    'access':accessToken,
                    'refresh':refreshToken
                }
            }
        }
    }
}

exports.TokenBlacklist = async(refreshToken) => {
    const blacklist = await createBlackList();
    console.log(blacklist);
    const blacklisted= await blacklist.add(refreshToken);
    if (blacklisted) {
        return {
            'success':true,
            'msg':'Token blacklisted'}
    } else {
        return {
            'success':false,
            'msg':'Token blacklist failed'
        }
    }

}