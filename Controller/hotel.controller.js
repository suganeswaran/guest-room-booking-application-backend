const Hotel = require("../Models/Hotel.model");
const { errorHelper } = require("../Utils/errorHelper");

exports.createHotel = async (req, res) => {
  try {
    const hotelData = req.body;
    const createdHotel = await Hotel.create({
      ...hotelData,
    });
    res.status(200).json(createdHotel);
  } catch (error) {
    errorHelper(res, 500, error, "Hotel creation error");
  }
};
