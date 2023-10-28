const express = require("express");
const {
  authenticateUser,
  checkPermissions,
} = require("../Middleware/authenticateToken");
const { createHotel } = require("../Controller/hotel.controller");
const hotelRouter = express.Router();

hotelRouter.post("/create", authenticateUser, checkPermissions, createHotel);

module.exports = hotelRouter;
