const { statusCodes } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.forbiddenError;
  }
}

module.exports = ForbiddenError;
