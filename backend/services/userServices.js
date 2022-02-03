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

exports.logIn = async({email, password}) => {
    const user = await User.findOne({where:{email}})
    userData = user.dataValues;
    console.log(user.dataValues);
    payload = {
        pk:userData.pk,
        email:userData.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return {user, token};
}

// const user = await userServices.login()
//     passport.authenticate('local', {session:false}, (error, user) => {
//         if (error || !user) {
//             return res.status(400).json({
//                 message:'로그인 실패',
//                 user:user
//             })
//         }
//         const authUser = userServices.logIn(user);
//         return res.json({
//             msg:'로그인 성공',
//             data:authUser