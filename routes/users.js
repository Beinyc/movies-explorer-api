const router = require('express').Router();
const { dataUser, updateDataUser } = require('../controllers/users');
const { updateDataUserValidator } = require('../middlewares/validation');

router.get('/me', dataUser);
router.patch('/me', updateDataUserValidator, updateDataUser);

module.exports = router;
