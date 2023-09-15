const { statusCodes } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.conflictError;
  }
}

module.exports = ConflictError;
