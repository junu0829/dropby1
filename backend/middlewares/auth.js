const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyAccess = (accessToken) => {
    try {
        verified = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY)
        return {
            success:true,
            pk:verified.pk,
            email:verified.email
        }
    } catch(error) {
        return {
            success:false,
            message:error.message
        }
    }
}

exports.verifyRefresh = (refreshToken) => {
    try {
        verified = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY)
        return true;
    } catch (error) {
        return false;
    }

};
