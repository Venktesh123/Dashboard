const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  region: { type: String, required: true }, // e.g., North America, Asia
});

module.exports = mongoose.model("User", userSchema);
