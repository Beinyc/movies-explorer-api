const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;

const { JWT_SECRET, NODE_ENV } = require('../utils/config');

const {
  STATUS_SUCCESSFULLY,
  CODE_UNIQUE_ERROR,
  MAX_AGE_COOKIE,
  ROUNDS_HASH,
  INCORRECT_DATA_MESSAGE,
  UNIQUE_MESSAGE,
  CONFIRMATION_MESSAGE,
  NOT_FOUND_MESSAGE,
  VALIDATION_MESSAGE,
} = require('../utils/constants');

const User = require('../models/user');

const IncorrectData = require('../errors/incorrect-data-error');
const NotUniqueData = require('../errors/error-not-unique');
const NotFoundError = require('../errors/not-found-err');

// регистрация пользователя
module.exports.userCreate = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, ROUNDS_HASH)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(STATUS_SUCCESSFULLY).send(user.toJSON()))
    .catch((err) => {
      if (err.code === CODE_UNIQUE_ERROR) {
        next(new NotUniqueData(UNIQUE_MESSAGE));
      } else if (err instanceof ValidationError) {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

// авторизация пользователя
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: MAX_AGE_COOKIE,
        httpOnly: true,
        sameSite: 'none',
        secure: NODE_ENV === 'production',
      })
        .send({ message: CONFIRMATION_MESSAGE });
    })
    .catch(next);
};

// поиск в базе данных по айди
const findById = (req, res, next, id) => {
  User.findById(id)
    .orFail(new NotFoundError(NOT_FOUND_MESSAGE))
    .then((user) => res.send(user))
    .catch(next);
};

// запрос на активного пользователя
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  findById(req, res, next, _id);
};

// обновление данных пользователя
const updateUserData = (req, res, next, param) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, param, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === CODE_UNIQUE_ERROR) {
        next(new NotUniqueData(UNIQUE_MESSAGE));
      } else if (err instanceof ValidationError) {
        next(new ValidationError(VALIDATION_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  updateUserData(req, res, next, { name, email });
};

// выход из системы
module.exports.logoutUser = (req, res) => {
  res.clearCookie('token')
    .send({ message: CONFIRMATION_MESSAGE });
};
