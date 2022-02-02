const express = require('express');
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