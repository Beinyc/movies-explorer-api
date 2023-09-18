const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const ErrorUnauthorized = require('../errors/unauthorized-err');
const { ErrorUnauthMessage } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ErrorUnauthorized(ErrorUnauthMessage.userLogin));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new ErrorUnauthorized(ErrorUnauthMessage.userLogin));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
