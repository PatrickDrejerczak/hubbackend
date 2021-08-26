const express = require("express");
const router = express.Router();
const chartsController = require("../controller/charts.controller");

// Get all charts

// Get all donut charts
router.get("/donut", chartsController.getDonutChart);

// Get charts that are completed and it is a request
router;
// Get Tina Chart

module.exports = router;
