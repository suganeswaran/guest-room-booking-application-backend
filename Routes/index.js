const express = require("express");
const authRouter = require("./auth.route");
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.send("Pong...");
});

router.use("/auth", authRouter);

module.exports = router;
