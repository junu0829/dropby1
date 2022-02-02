const express = require('express');
const passport = require('passport');
const router = express.Router();
const userServices = require('../../services/userServices');

exports.signUp = async(req, res, next) => {
    try {
        const user = await userServices.signUp(req.body);
        res.json({
            msg:'회원 가입 완료',
            data:user
        });

    }catch(error) {
        next(error);
    }
};

exports.logIn = async(req, res, next) => {
    passport.authenticate('local', {session:false}, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                message:'로그인 실패',
                user:user
            })
        }
        try {
            const authUser = await userServices.logIn(user);
            return res.json({
                msg:'로그인 성공',
                data:authUser
            })
        } catch(error) {
            return next(error);
        }


    }) (req, res);
};