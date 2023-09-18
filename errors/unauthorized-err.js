const { statusCodes } = require('../utils/constants');

class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ErrorUnauthorized;
  }
}

module.exports = ErrorUnauthorized;
