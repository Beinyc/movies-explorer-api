const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const { createUserValidator, loginValidator } = require('../middlewares/validation');
const { ErrorNotFoundMessage } = require('../utils/constants');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const ErrorNotFound = require('../errors/not-found-err');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

// если такого пути не существует
router.all('*', auth, (req, res, next) => {
  next(new ErrorNotFound(ErrorNotFoundMessage.noRoute));
});

module.exports = router;
