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
      req.user = user._doc;
    } catch (err) {
      return errorHelper(res, 401, null, "Unauthorized");
    }

    next();
  } catch (error) {
    errorHelper(res, 500, error, "Authentication error");
  }
};

exports.checkPermissions = async (req, res, next) => {
  try {
    const url = req.originalUrl;
    const permissions = require("../permissions.json");
    const role = req.user.role;

    const canAccess = permissions[url].includes(role);

    if (!canAccess) {
      return errorHelper(res, 500, null, "Permission error");
    }

    next();
  } catch (error) {
    errorHelper(res, 500, error, "Permission error");
  }
};
