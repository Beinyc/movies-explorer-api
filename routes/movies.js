const router = require('express').Router();
const { getMovies, createMovies, deleteMovie } = require('../controllers/movies');
const { createValideteMovies, deleteValideteMovies } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createValideteMovies, createMovies);
router.delete('/:movieId', deleteValideteMovies, deleteMovie);

module.exports = router;
