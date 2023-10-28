const { errorHelper } = require("../Utils/errorHelper");

exports.getUser = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        ...req.user,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    errorHelper(res, 500, error, "Error in get user");
  }
};
