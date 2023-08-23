const { celebrate, Joi, Segments } = require('celebrate');

const { REGEX_MOVIE, REGEX } = require('./config');

const { MIN_LENGTH, MAX_LENGTH, LENGTH_ID } = require('./constants');

// валидация авторизации
module.exports.validateUserAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидация создания пользователя
module.exports.validateUserCreate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
  }),
});

// валидация изменения данных профиля
module.exports.validateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
    email: Joi.string().required().email(),
  }),
});

// валидация при создании фильма
module.exports.validateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(REGEX).required(),
    trailerLink: Joi.string().pattern(REGEX_MOVIE).required(),
    thumbnail: Joi.string().pattern(REGEX).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// валидация удаления фильма по айдишнику
module.exports.validateMovieID = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(LENGTH_ID).hex().required(),
  }),
});
