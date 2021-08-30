const express = require("express");
const router = express.Router();

const chartsApi = require("./charts.api");
router.use("/charts", chartsApi);

module.exports = router;
