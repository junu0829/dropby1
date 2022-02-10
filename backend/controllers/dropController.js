const express = require('express');
const router = express.Router();
const dropServices = require('../services/dropServices');

exports.newDrop = async(req, res, next) => {
    try {
        const drop = await dropServices.newDrop(req);
        res.json({
            msg:'드롭 생성 완료',
            data:drop
        });

    }catch(error) {
        next(error);
    }
}

exports.getDrops = async(req, res, next) => {
    try {
        const drops = await dropServices.getDrops();
        console.log('drops sent');
        res.json({
            msg: '전체 드롭 조회 완료',
            data:drops
        })
    } catch(error) {
        next(error);
    }
}


