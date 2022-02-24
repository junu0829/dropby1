const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/placeController');

const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

router.post('/', jwtpassportAuth, controller.newPlace);
router.get('/:placePk', jwtpassportAuth, controller.getPlace);

module.exports = router;