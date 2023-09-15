const URL_REGEX = /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?/;

const statusCodes = {
  badRequestError: 400,
  unauthorizedError: 401,
  forbiddenError: 403,
  notFoundError: 404,
  conflictError: 409,
  serverError: 500,
};

const errorMessageBadRequest = {
  userData: 'не верные данные при создании пользователя',
  userId: 'не верный _id пользователя',
  userUpdate: 'не верные данные при обновлении профиля',
  movieData: 'не верные данные при создании фильма',
  movieId: 'не верные некорректный _id фильма',
};

const errorMessageUnauthorized = {
  userLogin: 'Необходима авторизация',
  userCredentials: 'Неправильные почта или пароль',
};

const errorMessageForbidden = {
  movieOwner: 'Не трогай фильм чужого пользователя',
};

const errorMessageNotFound = {
  userId: 'Пользователь с указанным _id не найден',
  movieId: 'Фильм с указанным _id не найден',
  noRoute: 'Такого пути не существует',
};

const errorMessageConflict = {
  userEmail: 'Пользователь с таким email уже зарегистрирован',
};

const errorMessageServer = {
  server: 'ошибка на стороне сервера',
};

module.exports = {
  URL_REGEX,
  statusCodes,
  errorMessageConflict,
  errorMessageBadRequest,
  errorMessageNotFound,
  errorMessageForbidden,
  errorMessageUnauthorized,
  errorMessageServer,
};
