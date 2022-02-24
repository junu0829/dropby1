const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const db = {};

db.Drop = require('./drop');
db.User = require('./user');
db.Place = require('./place');

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// 한 사용자는 여러 개의 드롭을 가질(만들) 수 있음.
db.User.hasMany(db.Drop, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
    onDelete:'SET NULL'
});

db.Drop.belongsTo(db.User, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
    onDelete:'CASCADE'
});

// 한 장소에는 여러 개의 드롭이 존재할 수 있음
db.Place.hasMany(db.Drop, {
    foreignKey:{
        name:'placePk',
        allowNull:false
    },
    onDelete:'CASCADE'
});

db.Drop.belongsTo(db.Place, {
    foreignKey:{
        name:'placePk',
        allowNull:false
    },
    
})
module.exports = db;
