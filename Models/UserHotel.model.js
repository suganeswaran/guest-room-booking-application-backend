const mongoose = require("mongoose");

const userHotelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

const UserHotel = mongoose.model("UserHotel", userHotelSchema);

module.exports = UserHotel;
