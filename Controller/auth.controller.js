const bcrypt = require("bcrypt");
const User = require("../Models/User.model");
const { toInteger } = require("lodash");
const { errorHelper } = require("../Utils/errorHelper");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });

    // checking for user
    if (!currentUser) {
      return errorHelper(res, 404, null, "User not found");
    }

    // password check
    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      return errorHelper(res, 404, null, "Email or Password doesnot matches");
    }

    // creating auth token
    const jwt_secret = process.env.JWT_SECRET;
    const jwt_expiresIn = process.env.JWT_EXPIRES_In;
    const token = jwt.sign({ id: currentUser._id }, jwt_secret, {
      expiresIn: jwt_expiresIn,
    });

    // Set the token as a cookie in the response
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    res.cookie("jwtToken", token, cookieOptions);
    res.status(200).json({ token: token });
  } catch (error) {
    errorHelper(res, 500, error, "Login error");
  }
};

exports.logout = (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    res.clearCookie("jwtToken", cookieOptions);
    res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    errorHelper(req, 500, error, "Logout error");
  }
};
