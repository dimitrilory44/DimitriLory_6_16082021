const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauce');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, multer, saucesCtrl.getAllSauces);

module.exports = router;