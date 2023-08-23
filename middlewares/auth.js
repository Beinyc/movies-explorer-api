const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const { AUTH_MESSAGE } = require('../utils/constants');
const NotFoundAuth = require('../errors/auth-error');

const handleAuthError = (req, res, next) => next(new NotFoundAuth(AUTH_MESSAGE));

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    if (!token) {
      return handleAuthError(req, res, next);
    }
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(req, res, next);
  }

  req.user = payload;
  return next();
};
