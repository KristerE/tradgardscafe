// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // använd memoryStorage med Cloudinary
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Endast bilder tillåtna'));
  },
});

module.exports = upload;
