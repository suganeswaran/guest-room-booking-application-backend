const express = require("express");
const { authenticateUser } = require("../Middleware/authenticateToken");
const { createBooking, makePayment } = require("../Controller/booking.controller");

const bookingRouter = express.Router();

bookingRouter.post("/", authenticateUser, createBooking);
bookingRouter.post("/pay", authenticateUser, makePayment);

module.exports = bookingRouter;
