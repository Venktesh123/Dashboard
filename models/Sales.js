const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  transactionTime: { type: Date, default: Date.now },
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;
