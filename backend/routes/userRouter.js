const router = require('express').Router();

const controller = require('../controllers/userController');

router.post('/signup', controller.signUp);

module.exports = router;