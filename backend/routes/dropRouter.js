const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/dropController');

const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

router.post('/', jwtpassportAuth, controller.newDrop);
router.get('/', jwtpassportAuth, controller.getDrops);
router.put('/:pk', jwtpassportAuth, controller.updateDrop);
router.delete('/:pk', jwtpassportAuth, controller.deleteDrop);
module.exports = router;