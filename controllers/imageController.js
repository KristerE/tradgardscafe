const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');

// Visa galleri
exports.getGallery = async (req, res) => {
  try {
    const images = await Image.find({ show: true }).sort({ createdAt: -1 });
    res.render('gallery', { images });
  } catch (err) {
    res.status(500).send('Serverfel vid hämtning av bilder');
  }
};

// Visa uppladdningssida (admin)
exports.getUploadPage = (req, res) => {
  res.render('upload');
};

// Hantera uppladdning
exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      title: req.body.title || '',
      show: req.body.show === 'on'
    });
    await newImage.save();
    res.redirect('/gallery');
  } catch (err) {
    res.status(500).send('Uppladdning misslyckades');
  }
};

// Ta bort bild (admin)
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      await cloudinary.uploader.destroy(image.public_id);
      await image.remove();
    }
    res.redirect('/gallery');
  } catch (err) {
    res.status(500).send('Borttagning misslyckades');
  }
};
