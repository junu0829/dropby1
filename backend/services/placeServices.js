const { Place } = require("../models");

exports.newPlace = async (body) => {
    const { name, latitude, longitude } = body;

    const place = await Place.create({
        name,
        latitude,
        longitude,
    });
    return place;
};


exports.getPlace = async (placePk) => {
    const place = await Place.findOne({
        where:{
            pk:placePk
        }
    });

    return place;
}
