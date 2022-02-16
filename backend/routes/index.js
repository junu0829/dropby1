const router = require("express").Router();

const drop = require("./dropRouter");
const auth = require("./authRouter");

router.use("/drops", drop);
router.use("/auth", auth);
module.exports = router;
