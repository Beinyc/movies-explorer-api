const router = require('express').Router();

const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { validateUser } = require('../utils/validate');

router.patch('/me', validateUser, updateUserProfile);
router.get('/me', getCurrentUser);

module.exports = router;
