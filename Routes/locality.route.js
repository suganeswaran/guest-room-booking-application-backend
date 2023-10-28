const express = require("express");
const {
  authenticateUser,
  checkPermissions,
} = require("../Middleware/authenticateToken");
const { createLocality } = require("../Controller/locality.controller");
const localityRouter = express.Router();

localityRouter.post(
  "/create",
  authenticateUser,
  checkPermissions,
  createLocality
);

module.exports = localityRouter;
