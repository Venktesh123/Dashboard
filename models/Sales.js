const mongoose = require("mongoose");
const salesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Refers to User
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, // Refers to Product
  quantity: { type: Number, required: true },
  transactionTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sales", salesSchema);
