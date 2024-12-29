// controllers/activityController.js
const UserActivity = require("../models/Activity");

exports.trackUserActivity = async (req, res) => {
  try {
    const { userId, action, productId } = req.body;
    const activity = await UserActivity.create({ userId, action, productId });
    res.status(201).json({ message: "User activity tracked", data: activity });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error tracking activity", error: err.message });
  }
};

exports.getUserActivity = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {
      ...(startDate && { timestamp: { $gte: new Date(startDate) } }),
      ...(endDate && { timestamp: { $lte: new Date(endDate) } }),
    };
    const activities = await UserActivity.find(filter)
      .populate("userId")
      .populate("productId");
    res.status(200).json({ data: activities });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching activity data", error: err.message });
  }
};
exports.trackActivity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    // Validate the action type
    if (!["visit", "click", "view"].includes(action)) {
      return res.status(400).json({ message: "Invalid action type" });
    }

    // Save the activity to the database
    const activity = await UserActivity.create({
      userId,
      productId,
      action,
    });

    res
      .status(201)
      .json({ message: "Activity logged successfully", data: activity });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error logging activity", error: err.message });
  }
};
// controllers/activityController.js
