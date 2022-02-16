const {Drop} = require('../models');

<<<<<<< HEAD
exports.newDrop = async ({content, latitude, longitude}) => {
=======
const {getUser} = require('../middlewares/auth');

exports.newDrop = async (accessToken, body) => {
    const user = await getUser(accessToken)
    const {content, latitude, longitude} = body;

>>>>>>> fad10bb7e8e9faaf0519cafe2c739080147c5310
    const drop = await Drop.create({
        content,
        latitude,
        longitude,
<<<<<<< HEAD
        createdAt:Date()
=======
        createdAt:Date(),
        creatorPk:user.pk
>>>>>>> fad10bb7e8e9faaf0519cafe2c739080147c5310
    });
    return drop;
}

exports.getDrops = async () => {
    const drops = await Drop.findAll({});
    return drops;
}