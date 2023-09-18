const { statusCodes, errorServerMessage } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = statusCodes.errorServer, message } = err;

  res
    .status(statusCode)
    .send({
      message:
        statusCode === statusCodes.errorServer
          ? errorServerMessage.server
          : message,
    });
  next();
};

module.exports = errorHandler;
