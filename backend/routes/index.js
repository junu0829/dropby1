const router = require("express").Router();


const drop = require("./dropRouter");
const auth = require("./authRouter");
const place = require('./placeRouter');

router.use("/:placeId/drops", drop);
router.use("/auth", auth);
router.use("/", place);
module.exports = router;

