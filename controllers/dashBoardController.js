const mongoose = require("mongoose");
const UserActivity = require("../models/Activity");
const Sales = require("../models/Sales");
const Product = require("../models/product");

exports.getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate, category, region } = req.query;

    // Build a dynamic match filter
    const matchFilter = {};

    // Filter by date range if provided
    if (startDate || endDate) {
      matchFilter.timestamp = {};
      if (startDate) matchFilter.timestamp.$gte = new Date(startDate);
      if (endDate) matchFilter.timestamp.$lte = new Date(endDate);
    }

    // Filter by product category if provided
    if (category) {
      const productsInCategory = await Product.find({ category }, "_id").exec();
      const productIds = productsInCategory.map((product) => product._id);
      matchFilter.productId = { $in: productIds };
    }

    // Filter by user region if provided
    if (region) {
      const userIdsInRegion = await User.find({ region }, "_id").exec();
      const userIds = userIdsInRegion.map((user) => user._id);
      matchFilter.userId = { $in: userIds };
    }

    // Aggregate user activity data
    const activityData = await UserActivity.aggregate([
      { $match: matchFilter }, // Apply dynamic filters
      {
        $group: {
          _id: "$action", // Group by action type (visit, click, view)
          count: { $sum: 1 }, // Count occurrences of each action
        },
      },
    ]);

    const activitySummary = activityData.reduce((summary, activity) => {
      summary[activity._id] = activity.count;
      return summary;
    }, {});

    // Aggregate total sales data
    const salesData = await Sales.aggregate([
      { $match: matchFilter }, // Apply the same filters
      {
        $group: {
          _id: null, // Total sales
          totalSales: { $sum: { $multiply: ["$quantity", 1] } }, // Sum quantities sold
        },
      },
    ]);

    const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;

    res.status(200).json({
      activitySummary, // Views, clicks, visits
      totalSales, // Total sales for the filtered range
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: err.message });
  }
};
