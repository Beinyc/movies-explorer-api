const { statusCodes } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.notFoundError;
  }
}

module.exports = NotFoundError;
