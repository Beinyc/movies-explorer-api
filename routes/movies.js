const router = require('express').Router();

const { getMovies, deleteMovie, createMovie } = require('../controllers/movies');
const { validateMovie, validateMovieID } = require('../utils/validate');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieID, deleteMovie);

module.exports = router;
