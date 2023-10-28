const express = require("express");
const {
  authenticateUser,
  checkPermissions,
} = require("../Middleware/authenticateToken");
const {
  createLocality,
  getLocalities,
} = require("../Controller/locality.controller");
const localityRouter = express.Router();

localityRouter.get("/", getLocalities);
localityRouter.post(
  "/create",
  authenticateUser,
  checkPermissions,
  createLocality
);

module.exports = localityRouter;
