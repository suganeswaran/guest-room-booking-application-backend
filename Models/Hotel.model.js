const mongoose = require("mongoose");
const { HotelTypes } = require("../Constants/DbTypes");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    localityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locality",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: HotelTypes,
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
