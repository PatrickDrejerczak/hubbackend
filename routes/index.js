const express = require("express");
const router = express.Router();

const ticketApi = require('./ticket.api');
router.use('/ticket', ticketApi);

module.exports = router;
