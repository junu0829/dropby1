const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {ExtractJwt, Strategy:JWTStrategy} = require('passport-jwt');
const {User} = require('../models/index')
const bcrypt = require('bcrypt');
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
    const user = User.findOne({id:jwtpayload.sub})
                .then(user => {
                    return done(null, user);
                })
                .catch(error => {
                    return done(error);
                })
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

    //JWT Strategy
    passport.use('jwt',
        new JWTStrategy({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET_KEY
        }, JWTVerify)
    )
};
// const localPassportConfig = () => {
//     passport.use('local',
//         new LocalStrategy({
//             usernameField:'email',
//             passwordField:'password',
//             passReqToCallback:true
//         }, loginVerify)
//     )
// };

// const jwtPassportConfig = () => {
//     passport.use('jwt',
//         new JWTStrategy({
//             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey:process.env.JWT_SECRET_KEY
//         }, JWTVerify)
//     )
// };

// module.exports = localPassportConfig;
// module.exports = jwtPassportConfig;