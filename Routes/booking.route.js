const express = require("express");
const { authenticateUser } = require("../Middleware/authenticateToken");
const { createBooking } = require("../Controller/booking.controller");

const bookingRouter = express.Router();

bookingRouter.post("/", authenticateUser, createBooking);

module.exports = bookingRouter;
