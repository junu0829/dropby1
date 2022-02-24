const router = require("express").Router();


const drop = require("./dropRouter");
const auth = require("./authRouter");
const place = require('./placeRouter');

router.use("/", place);
router.use("/auth", auth);
router.use("/:placeId/drops", drop);

module.exports = router;

