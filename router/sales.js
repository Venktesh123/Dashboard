// routes/salesRoutes.js
const express = require("express");
const { trackSales, getSalesData } = require("../controllers/saleController");

const router = express.Router();

router.post("/track", trackSales);
router.get("/fetch", getSalesData);

module.exports = router;
