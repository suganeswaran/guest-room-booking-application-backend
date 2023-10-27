const mongoose = require("mongoose");

const cancellationSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    cancellationReason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Cancellation = mongoose.model("Cancellation", cancellationSchema);

module.exports = Cancellation;
