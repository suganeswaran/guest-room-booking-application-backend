const bcrypt = require("bcrypt");
const User = require("../Models/User.model");
const { toInteger } = require("lodash");
const { errorHelper } = require("../Utils/errorHelper");

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    const bcryptRounds = toInteger(process.env.bcryptRounds);
    const hashedPassword = await bcrypt.hash(password, bcryptRounds);
    console.log(hashedPassword);
    const createdUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    errorHelper(res, 500, error, "Signup error");
  }
};
