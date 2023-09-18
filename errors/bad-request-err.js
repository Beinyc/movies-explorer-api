const { statusCodes } = require('../utils/constants');

class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ErrorBadRequest;
  }
}

module.exports = ErrorBadRequest;
