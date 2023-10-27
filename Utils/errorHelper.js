exports.errorHelper = (response, statusCode, error, message) => {
  response.status(statusCode).json({
    message,
    errorMessage: error?.message,
    error,
  });
};
