const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String
}, { timestamps: true });

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
