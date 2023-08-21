const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;

const {
  STATUS_SUCCESSFULLY,
  INCORRECT_DATA_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFIRMATION_MESSAGE,
  NOT_ACCESS_MESSAGE,
} = require('../utils/constants');
const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const IncorrectData = require('../errors/incorrect-data-error');
const NotAccess = require('../errors/access-error');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// создание фильма
module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => res.status(STATUS_SUCCESSFULLY).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

// удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(new NotFoundError(NOT_FOUND_MESSAGE))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new NotAccess(NOT_ACCESS_MESSAGE));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: CONFIRMATION_MESSAGE }));
    })
    .catch(next);
};
