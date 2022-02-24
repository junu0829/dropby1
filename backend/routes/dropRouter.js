const router = require('express').Router({mergeParams:true});
const passport = require('passport');
const controller = require('../controllers/dropController');
const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});
const getPlacePk = (req, res, next) => {
    req.params.placePk = req.placePk;
    next();
}

router.post('/', jwtpassportAuth, controller.newDrop);
router.get('/', jwtpassportAuth, controller.getDrops);
router.put('/:dropPk', jwtpassportAuth, controller.updateDrop);
router.delete('/:dropPk', jwtpassportAuth, controller.deleteDrop);

module.exports = router;
