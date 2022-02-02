const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models');

exports.signUp = async ({nickname, email, password}) => {
    const hashed_pw = await bcrypt.hash(password, nickname);
    const user = await User.create({
        nickname,
        email,
        password:hashed_pw
    });
    return user;
}
