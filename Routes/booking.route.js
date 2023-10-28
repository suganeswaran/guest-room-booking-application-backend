const express = require("express");
const { authenticateUser } = require("../Middleware/authenticateToken");
const { createBooking, makePayment, checkout } = require("../Controller/booking.controller");

const bookingRouter = express.Router();

bookingRouter.post("/", authenticateUser, createBooking);
bookingRouter.post("/pay", authenticateUser, makePayment);
bookingRouter.post("/checkout", authenticateUser, checkout);

module.exports = bookingRouter;
