const router = require("express").Router();

const drop = require("./dropRouter");
const auth = require("./authRouter");
const place = require('./placeRouter');

const passPlacePk = (req, res, next) => {
    req.placePk = req.params.placePk;
    next();
}
router.use("/", place);
router.use("/auth", auth);
router.use("/:placePk/drops", drop);

module.exports = router;
