const router = require('express').Router();
const auth = require('../middlewares/auth');
const routUsers = require('./users');
const routMovies = require('./movies');
const { createUserValidator, valideteLogin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const { errorMessageNotFound } = require('../utils/constants');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', valideteLogin, login);
router.use('/users', auth, routUsers);
router.use('/movies', auth, routMovies);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError(errorMessageNotFound.noRoute));
});

module.exports = router;
