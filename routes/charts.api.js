const express = require("express");
const router = express.Router();
const chartsController = require("../controller/charts.controller");

// Get all charts

// Get all donut charts
router.get("/donut", chartsController.getDonutChart);
// Get charts that are completed and it is a request
router.get("/bar/:weekAgo", chartsController.getBarChart);
// Get individual item chart
router.get("/item", chartsController.getItemChart);
// Get today posts
router.get("/todayPosts", chartsController.getTodayPosts);
// Get items for pie chart
router.get("/pie", chartsController.getItems);
// Get all for province+district
router.get("/all/:province/:district", chartsController.getAllForTeam);

module.exports = router;
