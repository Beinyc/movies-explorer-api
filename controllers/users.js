const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const ErrorConflict = require('../errors/conflict-err');
const { SECRET_KEY } = require('../utils/config');
const ErrorNotFound = require('../errors/not-found-err');
const { ErrorConflictMessage, ErrorRequestMessage, ErrorNotFoundMessage } = require('../utils/constants');
const ErrorBadRequest = require('../errors/bad-request-err');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ErrorConflict(ErrorConflictMessage.userEmail));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ErrorBadRequest(ErrorRequestMessage.userData));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const dataUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ErrorBadRequest(ErrorRequestMessage.userId));
      }
      return next(err);
    });
};

const updateDataUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound(ErrorNotFoundMessage.userId);
      }
      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ErrorConflict(ErrorConflictMessage.userEmail));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ErrorBadRequest(ErrorRequestMessage.userUpdate));
      }
      return next(err);
    });
};

module.exports = {
  dataUser,
  updateDataUser,
  createUser,
  login,
};
