const Hotel = require("../Models/Hotel.model");
const UserHotel = require("../Models/UserHotel.model");
const Room = require("../Models/Room.model");
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

exports.createRooms = async (req, res) => {
  try {
    const { roomsData, hotelId } = req.body;

    // adding hotel_id to all data
    const updatedRoomsData = roomsData.map((room) => {
      return {
        ...room,
        hotelId,
      };
    });
    const createdRooms = await Room.insertMany(updatedRoomsData);
    res.status(200).json(createdRooms);
  } catch (error) {
    console.log(error);
    errorHelper(res, 500, error, "Room creation error");
  }
};

exports.addOwner = async (req, res) => {
  try {
    const userHotelData = req.body;
    const createdUserHotel = await UserHotel.create(userHotelData);
    res.status(200).json(createdUserHotel);
  } catch (error) {
    errorHelper(res, 500, error, "Owner mapping error");
  }
};

exports.removeOwner = async (req, res) => {
  try {
    const userHotelData = req.body;
    await UserHotel.deleteOne(userHotelData);
    res.status(200).json({
      message: "Owner removed",
    });
  } catch (error) {
    errorHelper(res, 500, error, "Owner removing error");
  }
};
