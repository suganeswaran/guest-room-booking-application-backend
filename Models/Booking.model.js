const mongoose = require("mongoose");
const { BookingStatusTypes } = require("../Constants/DbTypes");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: BookingStatusTypes,
      default: "Pending",
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    daysCount: {
      type: Number,
      default: 1,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
