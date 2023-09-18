const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const ErrorUnauthorized = require('../errors/unauthorized-err');
const { ErrorUnauthMessage } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized(ErrorUnauthMessage.userCredentials);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorUnauthorized(ErrorUnauthMessage.userCredentials);
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
