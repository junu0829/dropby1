const db = require('../config/db');
db.Drop = require('./drop');
db.User = require('./user');
// const Sequelize = require('sequelize');

// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.js')[env];
// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.User = require('./user')(sequelize, Sequelize);
// db.Drop = require('./drop')(sequelize, Sequelize);
// db.Place = require('./place')(sequelize, Sequelize);

// db.User.hasMany(db.Drop, {
//   foreignKey:{name:'authorPk', allowNull:false,},
//   onDelete:"CASCADE",
// });

// db.Place.hasMany(db.Drop, {
//   foreignKey:{name:'writtenPlace', allowNull:false},
//   onDelete:"CASCADE"
// })

module.exports = db;