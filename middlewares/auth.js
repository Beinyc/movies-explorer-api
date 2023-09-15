const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { errorMessageUnauthorized } = require('../utils/constants');
const { KEY_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(errorMessageUnauthorized.userLogin));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, KEY_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(errorMessageUnauthorized.userLogin));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
