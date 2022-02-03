const express = require('express');
const passport = require('passport');
const router = express.Router();
const userServices = require('../services/userServices');

exports.signUp = async(req, res, next) => {
    try {
        const user = await userServices.signUp(req.body);
        res.status(201).json({
            msg:'회원 가입 완료',
            data:user
        });

    }catch(error) {
        console.log(error);
        next(error);
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