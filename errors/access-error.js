const { ACCESS_ERROR } = require('../utils/constants');

class NotAccess extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ACCESS_ERROR;
    this.name = 'NotUniqueData';
  }
}

module.exports = NotAccess;
