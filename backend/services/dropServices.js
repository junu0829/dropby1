const {Drop} = require('../models');

exports.newDrop = async ({content, latitude, longitude}) => {
    const drop = await Drop.create({
        content,
        latitude,
        longitude,
        createdAt:Date()
    });
    return drop;
}

exports.getDrops = async () => {
    const drops = await Drop.findAll({});
    return drops;
}