const express = require("express");
const { getUser, getAllUsers } = require("../Controller/user.controller");
const {
  authenticateUser,
  checkPermissions,
} = require("../Middleware/authenticateToken");
const userRouter = express.Router();

userRouter.get("/", authenticateUser, getUser);
userRouter.get("/all", authenticateUser, checkPermissions, getAllUsers);

module.exports = userRouter;
