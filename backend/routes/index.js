const router = require('express').Router()

const drop = require('dropRouter');
const user = require('userRouter'); 

router.use('/drops', drop);
router.use('/users', user);
module.exports = router;