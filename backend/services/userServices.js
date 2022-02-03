const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {User} = require('../models');
require('dotenv').config();

exports.signUp = async ({nickname, email, password}) => {
    console.log(email);
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
    console.log(user.dataValues);
    payload = {
        pk:userData.pk,
        email:userData.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return {user, token};
}
