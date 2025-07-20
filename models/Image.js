const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  title: String,
  show: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema);
