const { statusCodes } = require('../utils/constants');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ErrorNotFound;
  }
}

module.exports = ErrorNotFound;
