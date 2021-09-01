const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauce');

// Mise en place du CRUD
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.updateSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
// router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/', saucesCtrl.getAllSauces);

// Modification like
router.post('/:id/like', auth, saucesCtrl.likedOrNot);

module.exports = router;