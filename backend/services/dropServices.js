const { Drop } = require("../models");


const { getUserWithAccess } = require("../middlewares/auth");


exports.newDrop = async (accessToken, body) => {
  const user = await getUserWithAccess(accessToken);
  const { content, latitude, longitude } = body;


  const drop = await Drop.create({
    content,
    latitude,
    longitude,
    createdAt: Date(),
    creatorPk: user.pk,
  });
  return drop;
};


exports.getDrops = async () => {
  const drops = await Drop.findAll({});
  return drops;
};

exports.updateDrop = async ({content}, dropPk) => {
  const drop = await Drop.findOne({
    where:{
      pk:dropPk
    }
  });

  drop.content = content;
  await drop.save();

  return drop;

}

exports.deleteDrop = async (dropPk) => {
  const drop = await Drop.findOne({
    where:{
      pk:dropPk
    }
  });

  await drop.destroy();

  return true;

}