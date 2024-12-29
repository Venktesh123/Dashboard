const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Refers to User
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, // Refers to Product
  action: { type: String, enum: ["visit", "click", "view"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
