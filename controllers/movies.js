const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ErrorForb = require('../errors/forbidden-err');
const ErrorNotFound = require('../errors/not-found-err');
const ErrorBadRequest = require('../errors/bad-request-err');
const { ErrorRequestMessage, ErrorNotFoundMessage, ErrorForbMessage } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    owner: userId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ErrorBadRequest(ErrorRequestMessage.movieData));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new ErrorNotFound(ErrorNotFoundMessage.movieId);
      }
      if (movie.owner.toString() !== userId) {
        throw new ErrorForb(ErrorForbMessage.movieOwner);
      }
      return movie.deleteOne();
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ErrorBadRequest(ErrorRequestMessage.movieId));
      }
      return next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
