const { statusCodes } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.badRequestError;
  }
}

module.exports = BadRequestError;
