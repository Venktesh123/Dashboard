// routes/activityRoutes.js
const express = require("express");
const {
  trackUserActivity,
  getUserActivity,
} = require("../controllers/actvityController");

const router = express.Router();

router.post("/track", trackUserActivity);
router.get("/fetch", getUserActivity);

module.exports = router;
