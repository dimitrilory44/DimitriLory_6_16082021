const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauce');

router.get('/', saucesCtrl.getAllSauces);

module.exports = router;