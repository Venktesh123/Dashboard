const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Electronics, Fashion
  price: { type: Number, required: true },
  region: { type: String, required: true }, // e.g., North America, Europe
});

module.exports = mongoose.model("Product", productSchema);
