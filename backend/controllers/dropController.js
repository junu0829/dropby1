const express = require('express');
const router = express.Router();
const dropServices = require('../services/dropServices');
const {getAccess} = require('../middlewares/auth');

exports.newDrop = async (req, res, next) => {
    try {
        const accessToken = getAccess(req.headers);
        const drop = await dropServices.newDrop(accessToken, req.body);
        res.json({
            msg:'드롭 생성 완료',
            data:drop
        });

    }catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.getDrops = async (req, res, next) => {
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

exports.updateDrop = async (req, res, next) => {
    try {
        console.log(req.user);
        const updatedDrop = await dropServices.updateDrop();
        res.json({
            msg:'드롭 내용 수정 완료',
            data:updatedDrop
        })
    } catch(error) {
        next(error);
    }
}

exports.deleteDrop = async (req, res, next) => {
    try {
        const dropDeleted = await dropServices.deleteDrop();
        res.json({
            msg:'드롭 삭제 완료',
            data:null
        })
    } catch(error) {
        next(error);
    }
}

