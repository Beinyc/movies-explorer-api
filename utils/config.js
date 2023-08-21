const rateLimit = require('express-rate-limit');

const { MAX_REQUESTS, TIME_LIMIT_WINDOW } = require('./constants');

const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = '6f241197a7c4082fb0426e484d2cc9c2d38f670e9c15a0d04d152f1fbeff13ff',
  NODE_ENV,
} = process.env;

const LIMITER = rateLimit({
  windowMs: TIME_LIMIT_WINDOW,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const ALLOWED_CORS = [
  // 'https://savemovies.valerkamade.ru',
  // 'http://savemovies.valerkamade.ru',
  // 'https://localhost:3001',
  // 'http://localhost:3001',
];

const REGEX_MOVIE = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|rutube\.ru)\/(.+)$/;
const REGEX = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;

module.exports = {
  PORT,
  JWT_SECRET,
  LIMITER,
  MONGO,
  REGEX,
  NODE_ENV,
  ALLOWED_CORS,
  REGEX_MOVIE,
  DEFAULT_ALLOWED_METHODS,
};
