var express = require("express");
var router = express.Router();
const ticketController = require("../controller/ticket.controller");

/* GET all tickets. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Create a new ticket
router.post("/", ticketController.createTicket);

module.exports = router;
