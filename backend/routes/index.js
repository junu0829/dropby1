const router = require('express').Router()

const drop = require('./drop/index');
const user = require('./user/index'); 

router.use('/drops', drop);
router.use('./users', user);
module.exports = router;