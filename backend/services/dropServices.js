const {Drop} = require('../models');

const {getUser} = require('../middlewares/auth');

exports.newDrop = async ({headers, body}) => {
    const accessToken = headers.authorization;
    const user = await getUser(accessToken)

    const {content, latitude, longitude} = body;

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