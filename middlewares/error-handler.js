const { statusCodes, errorMessageServer } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = statusCodes.serverError, message } = err;

  res
    .status(statusCode)
    .send({
      message:
        statusCode === statusCodes.serverError
          ? errorMessageServer.server
          : message,
    });
  next();
};

module.exports = errorHandler;
