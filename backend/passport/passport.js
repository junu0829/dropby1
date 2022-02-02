const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {ExtractJwt, Strategy:JWTStrategy} = require('passport-jwt');
const {User} = require('../models/index')
const bcrypt = require('bcrypt');
require('dotenv').config();

const loginVerify = async (email, password, done) => {
    const user = await User.findOne({where:{email:email}});

    if (!user) {
        return done(null, false, {message:'존재하지 않는 사용자입니다.'})
    }
    if (!(bcrypt.compare(password, user.password))) {
        return done(null, false, {message:'잘못된 비밀번호입니다.'})
    };
    return done(null, user);
}

const JWTVerify = async (jwtpayload, done) => {
    const user = User.findOne({id:jwtpayload.sub})
                .then(user => {
                    return done(null, user);
                })
                .catch(error => {
                    return done(error);
                })
}
module.exports = () => {
    passport.use(
        new localStrategy({
            usernameField:'email',
            passwordField:'password'
        }, loginVerify)
    )
};

module.exports = () => {
    passport.use(
        new JWTStrategy({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET_KEY
        }, JWTVerify)
    )
};