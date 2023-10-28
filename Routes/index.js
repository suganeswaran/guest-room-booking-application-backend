const express = require("express");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const { authenticateUser } = require("../Middleware/authenticateToken");
const localityRouter = require("./locality.route");
const hotelRouter = require("./hotel.route");
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.send("Pong...");
});

router.get("/auth-ping", authenticateUser, (req, res) => {
  return res.send("Pong...");
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/locality", localityRouter);
router.use("/hotel", hotelRouter);

module.exports = router;
