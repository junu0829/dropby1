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

//일단 사용 가능한 상태로 만들기
//백엔드에서 자체 DB에 refreshToken을 저장하고, 요청이 오면 확인하여 응답
// 프런트엔드에서는 cookie에 Token을 담아 저장하고, api에 요청을 보낼 때는 Headers에 Authorization, Refresh라는 키로 보낸다.
// 로그아웃은 따라서, clearCookie로 쿠키를 지우고, DB에서 refreshToken을 삭제하는 것으로.

//구현할 것
//1. 백엔드에서 토큰 관리하는 로직 수정
//2. 프런트엔드에서 쿠키 관리, axios로 요청 보낼 때 Headers에 토큰 담아 보내기

// 추후 할 것?
// refreshToken을 redis라는 서비스에 저장하는 경우도 있는 듯. 왜 쓰는지 알아보고 괜찮으면 추후 적용.