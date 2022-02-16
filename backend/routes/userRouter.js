const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/userController');

const LocalPassportAuth = passport.authenticate('local', {session:false}); //id, pw 검증
const RefreshJwtAuth = passport.authenticate('jwtRefresh', {session:false}) //RefreshToken 확인

router.post('/signup', controller.signUp, LocalPassportAuth, controller.logIn); //회원가입
router.post('/login', LocalPassportAuth, controller.logIn); //로그인_accessToken, refreshToken 발급
router.post('/token/refresh', RefreshJwtAuth, controller.tokenRefresh) //AccessToken이 만료되면, refreshToken보내서 AccessToken 재발급
router.post('/token/blacklist', controller.TokenBlacklist) //로그아웃
module.exports = router;