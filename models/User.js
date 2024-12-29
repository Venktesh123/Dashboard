const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  region: { type: String, required: true }, // e.g., North America, Asia
});

module.exports = mongoose.model('User', userSchema);
