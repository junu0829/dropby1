const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {ExtractJwt, Strategy:JWTStrategy} = require('passport-jwt');
const {User} = require('../models/index')
const bcrypt = require('bcrypt');
require('dotenv').config();

const loginVerify = async (email, password, done) => {
    try {
        const user = await User.findOne({where:{email:email}});

        if (!user) {
            return done(null, false, {message:'존재하지 않는 사용자입니다.'})
        }
        const isAuth = await bcrypt.compare(password, user.password)
        if (!isAuth) {
            return done(null, false, {message:'잘못된 비밀번호입니다.'})
        } else {
            return done(null, user);
        }
    } catch(error) {
        console.log(error);
    }
}

const JWTVerify = async (jwtpayload, done) => {
    User.findOne({where:{pk:jwtpayload.pk}})
                .then(user => {
                    return done(null, user);
                })
                .catch(error => {
                    return done(error);
                })
}

const JWTRefreshVerify = async (jwtrefresh, done) => {
    if (jwtrefresh) {
        return done(null, jwtrefresh);
    } else {
        return done(null, false);
    }
}

module.exports = () => {
    //Local Strategy
    passport.use('local',
        new LocalStrategy({
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:false,
        }, loginVerify)
    );

    //JWT Access Strategy
    passport.use('jwtAccess',
        new JWTStrategy({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET_ACCESS_KEY,
            passReqToCallback:false,
        }, JWTVerify)
    );
    //JWT Refresh Strategy
    passport.use('jwtRefresh',
        new JWTStrategy({
            jwtFromRequest:ExtractJwt.fromHeader('refresh'),
            secretOrKey:process.env.JWT_SECRET_REFRESH_KEY
        }, JWTRefreshVerify)
    );
};
