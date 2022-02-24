const dropServices = require('../services/dropServices');
const {getAccess} = require('../utils/auth');

exports.newDrop = async (req, res, next) => {
    try {
        console.log(req)
        const placePk = req.params.placePk;
        const accessToken = getAccess(req.headers);
        const drop = await dropServices.newDrop(accessToken, req.body, placePk);
        res.status(201).json({
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
        console.log(req);
        console.log(req.params);
        const placePk= req.params.placePk;
        const drops = await dropServices.getDrops(placePk);
        console.log('drops sent');
        res.status(200).json({
            msg: '드롭 조회 완료',
            data:drops
        })
    } catch(error) {
        next(error);
    }
}

exports.updateDrop = async (req, res, next) => {
    try {
        const dropPk = req.params.pk;
        const updatedDrop = await dropServices.updateDrop(req.body, dropPk);
        res.status(200).json({
            msg:'드롭 내용 수정 완료',
            data:updatedDrop
        })
    } catch(error) {
        next(error);
    }
}

exports.deleteDrop = async (req, res, next) => {
    try {
        const dropPk = req.params.pk;
        const dropDeleted = await dropServices.deleteDrop(dropPk);
        res.status(204).json({
            msg:'드롭 삭제 완료',
            data:null
        })
    } catch(error) {
        next(error);
    }
}

