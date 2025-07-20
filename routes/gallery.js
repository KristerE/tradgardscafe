const express = require('express');
const router = express.Router();
const multer = require('../config/multer');
const imageController = require('../controllers/imageController');
const {isLoggedIn, isAdmin } = require('../middleware/authMiddleware');

// Galleri för alla
router.get('/', imageController.getGallery);

// Admin: ladda upp ny bild
router.get('/upload', isLoggedIn, isAdmin, imageController.getUploadPage);
router.post('/upload', multer.single('image'), imageController.uploadImage);

// Admin: ta bort bild
router.post('/delete/:id', imageController.deleteImage);

module.exports = router;
