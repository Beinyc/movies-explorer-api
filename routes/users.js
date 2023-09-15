const router = require('express').Router();
const { getDataUser, updateUserData } = require('../controllers/users');
const { updateUserValideteData } = require('../middlewares/validation');

router.get('/me', getDataUser);
router.patch('/me', updateUserValideteData, updateUserData);

module.exports = router;
