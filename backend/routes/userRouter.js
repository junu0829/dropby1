const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/userController');

const passportAuth = passport.authenticate('local', {session:false});

router.post('/signup', controller.signUp);
router.post('/login', passportAuth, controller.logIn);
module.exports = router;