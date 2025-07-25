const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

// Skydda modellen mot att överskrivas
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
