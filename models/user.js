const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const NotFoundAuth = require('../errors/auth-error');

const {
  MAX_LENGTH, MIN_LENGTH, VALIDATION_MESSAGE, AUTH_ERROR_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: MIN_LENGTH,
    maxlength: MAX_LENGTH,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: VALIDATION_MESSAGE,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundAuth(AUTH_ERROR_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotFoundAuth(AUTH_ERROR_MESSAGE));
          }
          return user;
        });
    });
};

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
