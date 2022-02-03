const express = require('express');
const passport = require('passport');
const router = express.Router();
const userServices = require('../services/userServices');

exports.signUp = async(req, res, next) => {
        const newUser = await userServices.signUp(req.body);
        if (newUser) {
            next();
        } else {
            res.status(409).json({
                msg:'이미 존재하는 이메일입니다.'
            })
        }
};

exports.logIn = async(req, res, next) => {
    try {
        const authUser = await userServices.logIn(req.body);
        res.status(200).json({
            msg:'로그인 성공',
            data:authUser
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
};
;

// try {
//     const authUser = userServices.logIn(user);
//     return res.json({
//         msg:'로그인 성공',
//         data:authUser
//     })
// } catch(error) {
//     console.log(error);
//     return error;
// }