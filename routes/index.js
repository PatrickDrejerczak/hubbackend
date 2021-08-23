const express = require("express");
const router = express.Router();

const ticketApi = require('./ticket.api');
router.use('/ticket', ticketApi);
const fakeDataApi = require('./fakeData.api')
router.use('/fakedata',fakeDataApi)
module.exports = router;
