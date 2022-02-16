const router = require('express').Router()

const drop = require('./dropRouter');
<<<<<<< HEAD
const user = require('./userRouter'); 

router.use('/drops', drop);
router.use('/users', user);
=======
const auth = require('./authRouter'); 

router.use('/drops', drop);
router.use('/auth', auth);
>>>>>>> fad10bb7e8e9faaf0519cafe2c739080147c5310
module.exports = router;