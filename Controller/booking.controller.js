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
    res.status(200).json({ bookedData, paymentId });
  } catch (error) {
    console.log(error);
    errorHelper(res, 500, error, "Booking error");
  }
};
