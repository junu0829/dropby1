const router = require("express").Router();


const drop = require("./dropRouter");
const auth = require("./authRouter");
const place = require('./placeRouter');

router.use("/drops", drop);
router.use("/auth", auth);
router.use("/places", place);
module.exports = router;

