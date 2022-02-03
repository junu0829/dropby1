const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/dropController');

const jwtpassportAuth = passport.authenticate('jwt', {session:false});
router.post('/', jwtpassportAuth, controller.newDrop);
router.get('/', jwtpassportAuth, controller.getDrops);
module.exports = router;