const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define("User", {
    pk: {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    nickname: {
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true,
        validate:{
            len:[2, 10]
        }
    },
    email: {
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    Refresh:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
}, {
    freezeTableName:true,
    timestamps:false
}
);

module.exports = User
