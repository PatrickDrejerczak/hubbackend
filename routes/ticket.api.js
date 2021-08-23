const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticket.controller");

// Get all tickets
router.get("/", ticketController.getAllTickets);

// Create a new ticket
router.post("/", ticketController.createTicket);

module.exports = router;