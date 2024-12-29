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
exports.getProductActivity = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Aggregate activity data for the product
    const activityData = await UserActivity.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(productId) } }, // Filter by product ID
      {
        $group: {
          _id: "$action", // Group by action type (visit, click, view)
          count: { $sum: 1 }, // Count occurrences of each action
        },
      },
    ]);

    // Format response data
    const activitySummary = activityData.reduce((summary, activity) => {
      summary[activity._id] = activity.count;
      return summary;
    }, {});

    res.status(200).json({ productId, activitySummary });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching activity data", error: err.message });
  }
};
