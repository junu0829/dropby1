const express = require('express');
const placeServices = require('../services/placeServices');
const {getAccess} = require('../utils/auth');

exports.newPlace = async (req, res, next) => {
    try {
        const place = await placeServices.newPlace(req.body);
        res.status(201).json({
            msg:'장소 생성 완료',
            data:place
        });

    }catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.getPlace = async (req, res, next) => {
    try {
        const placePk = req.params.pk;
        const place = await placeServices.getPlace(placePk);

        res.status(200).json({
            msg: '장소 정보 조회 성공',
            data:place
        })
    } catch(error) {
        next(error);
    }
}

