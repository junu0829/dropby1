const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/authController');

const LocalPassportAuth = passport.authenticate('local', {session:false}); //id, pw 검증
const RefreshJwtAuth = passport.authenticate('jwtRefresh', {session:false}) //RefreshToken 확인

router.post('/signup', controller.signUp, LocalPassportAuth, controller.logIn); //회원가입
router.post('/login', LocalPassportAuth, controller.logIn); //로그인_accessToken, refreshToken 발급
router.post('/token/refresh', RefreshJwtAuth, controller.tokenRefresh) //AccessToken이 만료되면, refreshToken보내서 AccessToken 재발급
router.post('/token/blacklist', controller.TokenBlacklist) //로그아웃
module.exports = router;

// 프런트엔드에서는 localStorage, 혹은 Cookie에 Token을 담아 저장하고, api에 요청을 보낼 때는 Headers에 담아 보낸다.
// 백엔드에서는 redis나 자체 DB에 refreshToken을 저장하고, 요청이 오면 비교하여 응답한다. (그냥 DB에다가 할까)
// 로그아웃은 clearCookie 사용?

// 구현할 것
//백엔드에서 토큰 관리하는 로직 - access는 반환, Refresh는 Redis(혹은 DB)에 저장 후 반환 - 로그아웃하면 res.clearCookie?
//프론트엔드에서 구현 및 테스트 - 응답받은 토큰을 쿠키에 저장하기 - 요청 보낼 때는 axios에서 Headers에 담아서 보내기 - 