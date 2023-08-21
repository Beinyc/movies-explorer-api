const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const { loginUser, userCreate, logoutUser } = require('../controllers/users');
const { validateUserAuth, validateUserCreate } = require('../utils/validate');
const { auth } = require('../middlewares/auth');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post(
  '/signin',
  validateUserAuth,
  loginUser,
);
router.post(
  '/signup',
  validateUserCreate,
  userCreate,
);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/signout', logoutUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

module.exports = router;
