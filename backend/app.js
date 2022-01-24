const express = require('express');
const app = express();
const {sequelize} = require('./models/index');

const dotenv = require('dotenv');
dotenv.config();

sequelize.sync().then(
    () => console.log('connected to database')
).catch(err => console.error('occured error in database connecting', err))

app.listen(process.env.SERVER_PORT, () => {
    console.log('Example app listening on port' + process.env.SERVER_PORT);
})
