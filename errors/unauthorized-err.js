const { statusCodes } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.unauthorizedError;
  }
}

module.exports = UnauthorizedError;
