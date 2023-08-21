const STATUS_SUCCESSFULLY = 201;
const INCORRECT_DATA_ERROR = 400;
const AUTH_ERROR = 401;
const ACCESS_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const NOT_UNIQUE_ERROR = 409;
const DEFAULT_ERROR = 500;
const MAX_LENGTH = 30;
const MIN_LENGTH = 2;
const TIME_LIMIT_WINDOW = 15 * 60 * 1000;
const ROUNDS_HASH = 10;
const MAX_AGE_COOKIE = 3600000 * 24 * 7;
const MAX_REQUESTS = 100;
const LENGTH_ID = 24;
const CODE_UNIQUE_ERROR = 11000;

const AUTH_MESSAGE = 'Необходима авторизация';
const VALIDATION_MESSAGE = 'Введеный формат вами данных некорректный';
const INCORRECT_DATA_MESSAGE = 'Были переданы некорректные данные';
const UNIQUE_MESSAGE = 'Пользователь с такой почтой уже существует';
const AUTH_ERROR_MESSAGE = 'Некорректный почта или пароль';
const CONFIRMATION_MESSAGE = 'Успешно выполнено что вы хотели';
const VALIDATION_URL_MESSAGE = 'Адрес url некорректный';
const NOT_FOUND_MESSAGE = 'Таких данных мы не нашли';
const NOT_ACCESS_MESSAGE = 'Чужие данные удалять нельзя';
const DEFAULT_MESSAGE = 'Ошибка произошла на стороне сервера';

module.exports = {
  STATUS_SUCCESSFULLY,
  INCORRECT_DATA_ERROR,
  AUTH_ERROR,
  ACCESS_ERROR,
  NOT_FOUND_ERROR,
  NOT_UNIQUE_ERROR,
  DEFAULT_ERROR,
  MAX_LENGTH,
  MIN_LENGTH,
  MAX_AGE_COOKIE,
  TIME_LIMIT_WINDOW,
  MAX_REQUESTS,
  LENGTH_ID,
  ROUNDS_HASH,
  CODE_UNIQUE_ERROR,
  VALIDATION_MESSAGE,
  UNIQUE_MESSAGE,
  CONFIRMATION_MESSAGE,
  NOT_ACCESS_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  AUTH_MESSAGE,
  AUTH_ERROR_MESSAGE,
  VALIDATION_URL_MESSAGE,
  NOT_FOUND_MESSAGE,
  DEFAULT_MESSAGE,
};
