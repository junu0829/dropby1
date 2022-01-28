const router = require('express').Router()
const drop = require('./drop/index');

router.use('/drops', drop);

module.exports = router;