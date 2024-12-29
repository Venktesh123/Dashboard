// controllers/salesController.js
const Sales = require("../models/Sales");

exports.trackSales = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const sale = await Sales.create({ userId, productId, quantity });
    res.status(201).json({ message: "Sale tracked", data: sale });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error tracking sale", error: err.message });
  }
};

exports.getSalesData = async (req, res) => {
  try {
    const { startDate, endDate, category, region } = req.query;
    const filter = {
      ...(startDate && { transactionTime: { $gte: new Date(startDate) } }),
      ...(endDate && { transactionTime: { $lte: new Date(endDate) } }),
      // Assuming region and category are available in related documents
    };
    const sales = await Sales.find(filter)
      .populate("userId")
      .populate("productId");
    res.status(200).json({ data: sales });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching sales data", error: err.message });
  }
};
