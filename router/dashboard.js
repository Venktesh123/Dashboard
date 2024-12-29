// routes/activityRoutes.js
const express = require("express");

const router = express.Router();
const { getDashboardData } = require("../controllers/dashBoardController");
router.get("/fetch", getDashboardData);

module.exports = router;
