const URL_REGEX = /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?/;

const statusCodes = {
  ErrorBadRequest: 400,
  ErrorUnauthorized: 401,
  ErrorForb: 403,
  ErrorNotFound: 404,
  ErrorConflict: 409,
  errorServer: 500,
};

const ErrorRequestMessage = {
  userData: 'Переданы непраивльные данные при создании пользователя',
  userId: 'Передан непраивльный _id пользователя',
  userUpdate: 'Переданы непраивльные данные при обновлении профиля',
  movieData: 'Переданы непраивльные данные при создании фильма',
  movieId: 'Передан непраивльный _id фильма',
};

const ErrorUnauthMessage = {
  userLogin: 'Необходима авторизация',
  userCredentials: 'Неправильные почта или пароль',
};

const ErrorForbMessage = {
  movieOwner: 'Не трогай фильм чужого пользователя',
};

const ErrorNotFoundMessage = {
  userId: 'Пользователь с таким _id не найден',
  movieId: 'Фильм с таким _id не найден',
  noRoute: 'Такого роут не найден',
};

const ErrorConflictMessage = {
  userEmail: 'Пользователь с таким email уже зарегистрирован',
};

const errorServerMessage = {
  server: 'Ошибка на стороне сервера',
};

module.exports = {
  URL_REGEX,
  statusCodes,
  ErrorConflictMessage,
  ErrorRequestMessage,
  ErrorNotFoundMessage,
  ErrorForbMessage,
  ErrorUnauthMessage,
  errorServerMessage,
};
