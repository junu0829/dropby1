const express = require('express');
const router = express.Router();
const userServices = require('../../services/user');

exports.signUp = async(req, res, next) => {
    try {
        const drop = await dropServices.newDrop(req.body);
        res.json({
            msg:'드롭 생성 완료',
            data:drop
        });

    }catch(error) {
        next(error);
    }
}