const express = require("express");
const {
  authenticateUser,
  checkPermissions,
} = require("../Middleware/authenticateToken");
const {
  createHotel,
  addOwner,
  removeOwner,
} = require("../Controller/hotel.controller");
const hotelRouter = express.Router();

hotelRouter.post("/create", authenticateUser, checkPermissions, createHotel);
hotelRouter.post("/add-owner", authenticateUser, checkPermissions, addOwner);
hotelRouter.post(
  "/remove-owner",
  authenticateUser,
  checkPermissions,
  removeOwner
);

module.exports = hotelRouter;
