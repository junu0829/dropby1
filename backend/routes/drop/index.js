const router = require('express').Router();

const controller = require('./controller');

router.post('/', controller.newDrop);

module.exports = router;