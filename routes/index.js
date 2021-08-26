const express = require("express");
const router = express.Router();
const fakeDataApi = require('./fakeData.api')
const ticketApi = require('./ticket.api');
const postApi = require('./post.api');



router.use('/fakedata', fakeDataApi)
router.use('/ticket', ticketApi);
router.use('/post', postApi);


module.exports = router;
