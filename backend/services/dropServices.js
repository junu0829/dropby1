const { Drop } = require("../models");
const { getUserWithAccess } = require("../utils/auth");


exports.newDrop = async (accessToken, body, placePk) => {
  const user = await getUserWithAccess(accessToken);
  const content = body.content;

  const drop = await Drop.create({
    content,
    createdAt: Date(),
    creatorPk: user.pk,
    placePk
  });
  return drop;
};


exports.getDrops = async (placePk) => {
  const drops = await Drop.findAll({
    where:{
      placePk
    }
  });
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