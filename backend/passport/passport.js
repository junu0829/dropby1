const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {ExtractJwt, Strategy:JWTStrategy} = require('passport-jwt');
const {User} = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklist = require('jwt-blacklist');
require('dotenv').config();

const loginVerify = async (email, password, done) => {
    const user = await User.findOne({where:{email:email}});

    if (!user) {
        return done(null, false, {message:'존재하지 않는 사용자입니다.'})
    }
    isAuth = await bcrypt.compare(password, user.password)
    if (!isAuth) {
        return done(null, false, {message:'잘못된 비밀번호입니다.'})
    };
    return done(null, user);
}

const JWTVerify = async (jwtpayload, done) => {
    console.log('jwtpayload', jwtpayload);
    console.log('jwtpayloadsub', jwtpayload.pk);
    const user = User.findOne({where:{pk:jwtpayload.pk}})
                .then(user => {
                    return done(null, user);
                })
                .catch(error => {
                    return done(error);
                })
}

const JWTRefreshVerify = async (jwtrefresh, done) => {
    console.log(jwtrefresh);
    if (jwtrefresh) {
        return done(null, jwtrefresh);
    } else {
        return done(null, false);
    }
    // console.log('jwtrefresh', jwtrefresh);
    // const verified = jwt.verify(jwtrefresh, process.env.JWT_SECRET_REFRESH_KEY);
    // console.log('jwtverified', verified);
    // return done(null, verified);            
}
module.exports = () => {
    //Local Strategy
    passport.use('local',
        new LocalStrategy({
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:false
        }, loginVerify)
    );

    //JWT Access Strategy
    passport.use('jwtAccess',
        new JWTStrategy({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET_ACCESS_KEY
        }, JWTVerify)
    );
    //JWT Refresh Strategy
    passport.use('jwtRefresh',
        new JWTStrategy({
            jwtFromRequest:ExtractJwt.fromBodyField('refresh'),
            secretOrKey:process.env.JWT_SECRET_REFRESH_KEY
        }, JWTRefreshVerify)
    );
};
