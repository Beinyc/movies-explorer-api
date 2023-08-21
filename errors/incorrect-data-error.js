const { INCORRECT_DATA_ERROR } = require('../utils/constants');

class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INCORRECT_DATA_ERROR;
    this.name = 'IncorrectData';
  }
}

module.exports = IncorrectData;
