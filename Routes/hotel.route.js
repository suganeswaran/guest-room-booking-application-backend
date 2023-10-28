const express = require("express");
const {
  authenticateUser,
  checkPermissions,
} = require("../Middleware/authenticateToken");
const {
  createHotel,
  addOwner,
  removeOwner,
  createRooms,
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
hotelRouter.post(
  "/create-rooms",
  authenticateUser,
  checkPermissions,
  createRooms
);

module.exports = hotelRouter;
