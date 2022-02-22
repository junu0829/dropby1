const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Place = sequelize.define("Place", {
    pk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false
}
);

module.exports = Place