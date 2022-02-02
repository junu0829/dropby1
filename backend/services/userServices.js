const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {User} = require('../models');
require('dotenv').config();

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

exports.logIn = async(user) => {
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
    return {user, token};

}
