const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

// Visa uppladdningsformulär
router.get('/upload', (req, res) => {
  res.render('gallery/upload');
});

// Ta emot bilduppladdning
router.post('/upload', upload.single('image'), async (req, res) => {
  const imageUrl = req.file.path;       // Cloudinary URL
  const publicId = req.file.filename;   // För att kunna ta bort senare

  // Spara i databas etc...
  res.redirect('/gallery');
});

module.exports = router;
