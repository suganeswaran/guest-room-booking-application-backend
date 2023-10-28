const Booking = require("../Models/Booking.model");
const Room = require("../Models/Room.model");
const Payment = require("../Models/Payment.model");
const { errorHelper } = require("../Utils/errorHelper");

const initializePayment = async (bookingId, paymentAmount, paymentMethod) => {
  try {
    const { _id } = await Payment.create({
      bookingId,
      paymentAmount,
      paymentMethod,
    });
    return _id;
  } catch (error) {
    console.log("Payment Init Failed: ", error);
    throw error;
  }
};

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookingData = req.body;
    const { daysCount, roomId, paymentMethod } = bookingData;

    const roomData = await Room.findById(roomId);
    const { pricePerDay } = roomData;

    // TODO: need to handle gst
    const GST = 0;
    const totalCost = daysCount * pricePerDay + GST;
    const bookedData = await Booking.create({
      ...bookingData,
      userId,
      totalCost,
    });

    const paymentId = await initializePayment(
      bookedData._id,
      totalCost,
      paymentMethod
    );
    res.status(200).json({ bookedData, payment: { paymentId, totalCost } });
  } catch (error) {
    console.log(error);
    errorHelper(res, 500, error, "Booking error");
  }
};

exports.makePayment = async (req, res) => {
  try {
    const { paymentId, totalCost, status } = req.body;
    const currentPayment = await Payment.findById(paymentId);
    const { paymentAmount, bookingId } = currentPayment.toObject();
    const currentBooking = await Booking.findById(bookingId);
    const { roomId } = currentBooking.toObject();
    if (paymentAmount === totalCost && status === "Success") {
      await Payment.updateOne({ _id: paymentId }, { status });
      await Booking.updateOne({ _id: bookingId }, { status: "Booked" });
      await Room.updateOne({ _id: roomId }, { availability: false });
      return res.status(200).json({
        message: `Successfully Booked BookingId: ${bookingId}`,
      });
    }
    errorHelper(res, 400, null, "Payment error");
  } catch (error) {
    console.log(error);
    errorHelper(res, 500, error, "Payment error");
  }
};
