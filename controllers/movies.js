const mongoose = require('mongoose');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const { errorMessageBadRequest, errorMessageNotFound, errorMessageForbidden } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovies = (req, res, next) => {
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
        return next(new BadRequestError(errorMessageBadRequest.movieData));
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
        throw new NotFoundError(errorMessageNotFound.movieId);
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(errorMessageForbidden.movieOwner);
      }
      return movie.deleteOne();
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(errorMessageBadRequest.movieId));
      }
      return next(err);
    });
};

module.exports = { getMovies, createMovies, deleteMovie };
