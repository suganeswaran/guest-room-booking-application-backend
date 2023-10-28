const User = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const { errorHelper } = require("../Utils/errorHelper");

exports.authenticateUser = async (req, res, next) => {
  try {
    // extract token from cookie
    const jwtToken = req?.cookies?.jwtToken;

    // check for token
    if (!jwtToken) {
      return errorHelper(res, 401, null, "Login to continue");
    }

    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      // map users for future use
      req.user = user;
    } catch (err) {
      return errorHelper(res, 401, null, "Unauthorized");
    }

    next();
  } catch (error) {
    errorHelper(res, 500, error, "Authentication error");
  }
};
