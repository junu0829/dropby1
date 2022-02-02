const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models');

exports.signUp = async ({nickname, email, password}) => {
    const salt = await bcrypt.genSalt(10);
    const hashed_pw = await bcrypt.hash(password, salt);
    const user = await User.create({
        nickname,
        email,
        password:hashed_pw
    });
    return user;
};

exports.logIn = async({email, password}) => {

}
