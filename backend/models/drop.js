const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Drop = sequelize.define("Drop", {
                pk: {
                    type:DataTypes.INTEGER,
                    allowNull:false,
                    primaryKey:true,
                    autoIncrement:true,
                },
                content: {
                    type:DataTypes.TEXT,
                    allowNull:false,
                },
                latitude: {
                    type:DataTypes.FLOAT,
                    allowNull:false,
                },
                longitude:{
                    type:DataTypes.FLOAT,
                    allowNull:false,
                },
                createdAt:{
                    type:DataTypes.DATE,
                    defaultValue: DataTypes.NOW
                }
            }, {
                freezeTableName:true,
                timestamps:false
            }
        );

module.exports = Drop;
