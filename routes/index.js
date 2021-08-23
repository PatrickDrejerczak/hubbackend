var express = require("express");
var router = express.Router();
const ticketController = require("../controller/ticket.controller");

/* GET all tickets. */
router.get("/ticket", ticketController.getAllTickets);

// Create a new ticket
router.post("/ticket", ticketController.createTicket);

module.exports = router;
