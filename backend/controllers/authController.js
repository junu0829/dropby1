const authServices = require('../services/authServices');

exports.signUp = async(req, res, next) => {
    try {
        const context = await authServices.signUp(req.body);
        if (context['user']) {
            next(); //router에서 다음 -> 로그인 로직으로.
        } else {
            res.status(409).json({
                msg:context['msg']
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:context['msg']
        });
    }
};

exports.logIn = async(req, res, next) => {
    try {
        const authUser = await authServices.logIn(req.body);
        res.status(200).json({
            msg:'로그인 성공',
            data:authUser
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
};

exports.tokenRefresh = async(req, res, next) => {
    // {
    //     "Authorization":'bearer access-token',
    //     "Refresh":"refresh-token"
    // } // 아마 이런 형식 - Body 말고 Header에 담아 보내는 걸로 통일
    try {
        if (req.headers.authorization && req.headers.refresh) {
            const accessToken = req.headers.authorization.split('Bearer ')[1];
            const refreshToken = req.headers.refresh;

            const refreshResult = await authServices.tokenRefresh(accessToken, refreshToken); //success, status, token을 받아 옴.

            if (refreshResult.success) {
                res.status(200).json({
                    message:'Access Token 신규 발급 성공',
                    status:refreshResult.status,
                    tokens:refreshResult.token
                })
            } 
            if (refreshResult.success === false) {
                res.status(400).json({
                    msg:'Access Token 신규 발급 실패',
                    status:refreshResult.status,
                    tokens:refreshResult.token
                })
            }
    
    
        } else {
            res.status(400).json({
                msg:'Access Token 신규 발급 실패',
                status:'Refresh Token과 Access Token이 요청에 포함되지 않았습니다.'
            })
        }

    } catch(error) {
        console.log(error);
        next(error);
    }
}

exports.logOut = async(req, res, next) => {
    try {
        res.clearCookie();
    
        const refreshRemoved = await authServices.logOut(req.headers);
        if (refreshRemoved.success) {
            res.status(200).json({
                message:'로그아웃 성공',
                leftUser:refreshRemoved.userData,
                status:refreshRemoved.message
            })
        } else {
            res.status(400).json({
                message:'로그아웃 실패',
                leftUser:refreshRemoved.userData,
                status:refreshRemoved.message
            })
        }

    } catch(error) {
        console.log(error);
    }
}