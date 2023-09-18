const { statusCodes } = require('../utils/constants');

class ErrorForb extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ErrorForb;
  }
}

module.exports = ErrorForb;
