const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  visitTime: { type: Date, default: Date.now },
  clicks: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  productViews: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const UserActivity = mongoose.model("UserActivity", UserActivitySchema);

module.exports = UserActivity;
