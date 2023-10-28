const mongoose = require("mongoose");
const { PaymentTypes } = require("../Constants/DbTypes");

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: PaymentTypes,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
