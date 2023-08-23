const { NOT_UNIQUE_ERROR } = require('../utils/constants');

class NotUniqueData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_UNIQUE_ERROR;
    this.name = 'NotUniqueData';
  }
}

module.exports = NotUniqueData;
