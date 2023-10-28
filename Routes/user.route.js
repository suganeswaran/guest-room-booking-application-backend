const express = require("express");
const { getUser } = require("../Controller/user.controller");
const { authenticateUser } = require("../Middleware/authenticateToken");
const userRouter = express.Router();

userRouter.get("/", authenticateUser, getUser);

module.exports = userRouter;
