const express = require("express");
const authRouter = require("./auth.route");
const { authenticateUser } = require("../Middleware/authenticateToken");
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.send("Pong...");
});

router.get("/auth-ping", authenticateUser, (req, res) => {
  return res.send("Pong...");
});

router.use("/auth", authRouter);

module.exports = router;
