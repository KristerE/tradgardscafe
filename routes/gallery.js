const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');
const Image = require('../models/Image');

// Visa gallerisida
router.get('/', async (req, res) => {
  const images = await Image.find({ show: true }).sort({ uploadedAt: -1 });
  res.render('gallery/index', { images, isAdmin: req.session?.user?.isAdmin });
});

// Admin: uppladdningsformulär
router.get('/upload', (req, res) => {
  if (!req.session?.user?.isAdmin) return res.status(403).send('Endast admin');
  res.render('gallery/upload');
});

// Admin: ladda upp bild
router.post('/upload', upload.single('image'), async (req, res) => {
  const image = new Image({
    url: req.file.path,
    publicId: req.file.filename,
    show: req.body.show === 'on',
  });
  await image.save();
  res.redirect('/gallery');
});

// Admin: ta bort bild
router.post('/delete/:id', async (req, res) => {
  if (!req.session?.user?.isAdmin) return res.status(403).send('Endast admin');

  const image = await Image.findById(req.params.id);
  if (image) {
    await cloudinary.uploader.destroy(image.publicId);
    await image.deleteOne();
  }
  res.redirect('/gallery');
});

module.exports = router;
