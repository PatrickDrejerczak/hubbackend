const express = require("express");
const router = express.Router();
const fakeDataController = require("../controller/fakeData.controller");

// Get all fakers
router.get("/seed", fakeDataController.createAllFakeData);

// Create a new faker

module.exports = router;