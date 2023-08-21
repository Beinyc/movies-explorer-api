const { AUTH_ERROR } = require('../utils/constants');

class NotFoundAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
    this.name = 'NotFoundAuth';
  }
}

module.exports = NotFoundAuth;
