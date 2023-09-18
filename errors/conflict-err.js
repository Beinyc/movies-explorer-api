const { statusCodes } = require('../utils/constants');

class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ErrorConflict;
  }
}

module.exports = ErrorConflict;
