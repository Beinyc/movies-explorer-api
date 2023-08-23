const { DEFAULT_MESSAGE, DEFAULT_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? DEFAULT_MESSAGE
        : message,
    });
  next();
};
