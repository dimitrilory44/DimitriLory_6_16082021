const express = require('express');
const router = express.Router();
const max_auth = require('../middleware/limit-auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', max_auth.limiter, userCtrl.login);

module.exports = router;