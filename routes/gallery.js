const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');

// Middleware: kontrollera adminstatus
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  res.redirect('/login');
}

// Visa galleriet
router.get('/', async (req, res) => {
  const images = await Image.find({ visible: true });
  res.render('gallery', { images, user: req.session.user });
});

// Adminsida
router.get('/admin', isAdmin, async (req, res) => {
  const images = await Image.find();
  res.render('gallery-admin', { images, user: req.session.user });
});

// Ladda upp bild
router.post('/upload', isAdmin, upload.single('image'), async (req, res) => {
  await Image.create({
    url: req.file.path,
    public_id: req.file.filename,
    caption: req.body.caption,
    visible: req.body.visible === 'on'
  });
  res.redirect('/gallery/admin');
});

// Ta bort bild
router.post('/delete/:id', isAdmin, async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (image) {
    await cloudinary.uploader.destroy(image.public_id);
    await Image.deleteOne({ _id: req.params.id });
  }
  res.redirect('/gallery/admin');
});

// Ändra synlighet
router.post('/toggle/:id', isAdmin, async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (image) {
    image.visible = !image.visible;
    await image.save();
  }
  res.redirect('/gallery/admin');
});

module.exports = router;
