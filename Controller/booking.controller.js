const Booking = require("../Models/Booking.model");
const Room = require("../Models/Room.model");
const { errorHelper } = require("../Utils/errorHelper");

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookingData = req.body;
    const { daysCount, roomId } = bookingData;

    const roomData = await Room.findById(roomId);
    const { pricePerDay } = roomData;

    const totalCost = daysCount * pricePerDay;
    const bookedData = await Booking.create({
      ...bookingData,
      userId,
      totalCost,
    });

    res.status(200).json(bookedData);
  } catch (error) {
    console.log(error);
    errorHelper(res, 500, error, "Booking error");
  }
};
