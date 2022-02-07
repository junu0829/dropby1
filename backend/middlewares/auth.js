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

exports.signRefresh = () => { //RefreshToken 발급
    
    return jwt.sign(
        {},
        process.env.JWT_SECRET_REFRESH_KEY,
        {
            algorithm:process.env.JWT_ALGORITHM,
            expiresIn:process.env.JWT_REFRESH_EXPIRE,
        }
    );
}
exports.verifyAccess = (accessToken) => { //AccessToken 검증
    try {
        verified = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY)
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

exports.verifyRefresh = async (refreshToken, userData) => { //RefreshToken 검증
    try {
        const userToken = await User.findOne({where:{pk:userData.pk}}).Refresh;
        if (refreshToken === userToken) {
            try {
                jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
                return true;
            } catch(error) {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
