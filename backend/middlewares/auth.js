const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.signAccess = (userData) => { //AccessToken 발급
    const payload = {
        pk:userData.pk,
        email:userData.email
    }

    return jwt.sign(
        payload,
        process.env.JWT_SECRET_ACCESS_KEY,
        {
            algorithm:process.env.JWT_ALGORITHM,
            expiresIn:process.env.JWT_ACCESS_EXPIRE
        }
    );
};

exports.signRefresh = (userPk) => { //RefreshToken 발급
    
    return jwt.sign(
        {
            pk:userPk
        },
        process.env.JWT_SECRET_REFRESH_KEY,
        {
            algorithm:process.env.JWT_ALGORITHM,
            expiresIn:process.env.JWT_REFRESH_EXPIRE,
        }
    );
}
exports.verifyAccess = (accessToken) => { //AccessToken 검증
    try {
        const verified = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY)
        return {
            success:true,
            message:'Token Verified',
            userData: {
                pk:verified.pk,
                email:verified.email
            }
        }
    } catch(error) {
        return {
            success:false,
            message:error.message,
            userData:null
        }
    }
}

exports.verifyRefresh = async (refreshToken) => { //RefreshToken 검증
    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
        const user = await User.findOne({where:{pk:verified.pk}});
        console.log(user);
        const userToken = user.dataValues.Refresh;
        console.log('refreshToken', refreshToken);
        console.log('userToken', userToken);

        if (userToken === refreshToken) {
            console.log('일치 조건 걸림')
            return {
                success:true,
                message:'Token exists and verified',
                userPk:verified.pk
                }
        }
        if (userToken !== refreshToken) {
            console.log('불일치 조건 걸림');
            return {
                success:false,
                message:'Token valid, but not found in DB',
                userPk:verified.pk
            }
        }
        console.log('조건 안 걸림');        
    } catch (error) {
        return {
            success:false,
            message:'Token not verified',
            userPk:null
        };
    }
};

exports.getAccess = ({authorization}) => {
    try {
        const accessToken = authorization.split('Bearer ')[1];
        
        return accessToken
    } catch(error) {
        return error.message;
    }
}
exports.getUserWithAccess = async (accessToken) => {
    try {
        console.log('getUser', accessToken);
        verified = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY)
        console.log('getuser verified', verified);
        const user = await User.findOne({where:{pk:verified.pk}})

        return user.dataValues
    } catch(error) {
        return error.message;
    }
}

exports.getUserWithRefresh = async (refreshToken) => {
    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
        const user = await User.findOne({where:{pk:verified.pk}})

        return user.dataValues;
    } catch(error) {
        return error.message;
    }
}
