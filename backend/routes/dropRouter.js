const router = require('express').Router();

const controller = require('./controller');

router.post('/', controller.newDrop);
router.get('/', controller.getDrops);
module.exports = router;