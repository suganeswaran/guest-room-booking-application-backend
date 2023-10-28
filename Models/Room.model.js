const mongoose = require("mongoose");
const { RoomTypes } = require("../Constants/DbTypes");

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    type: {
      type: String,
      enum: RoomTypes,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    cancellationPolicy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
