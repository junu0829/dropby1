const router = require('express').Router();

const controller = require('../controllers/dropController');

router.post('/', controller.newDrop);
router.get('/', controller.getDrops);
module.exports = router;