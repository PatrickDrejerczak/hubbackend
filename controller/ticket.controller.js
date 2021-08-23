const utilsHelper = require("../helpers/utils.helper");
const Ticket = require("../models/Ticket");
const ticketController = {};

receiverController.getAllTickets = async (req, res, next) => {
  try {
    let ticket = Ticket;
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { ticket },
      null,
      "Get all tickets successfully."
    );
  } catch (error) {
    next(error);
  }
};

ticketController.createTicket = async (req, res, next) => {
  try {
    let { name, address, ticketType, status, items } = req.body;

    let ticket = await Ticket.create({
      name,
      address,
      ticketType,
      status,
      items,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { ticket },
      null,
      "Created new ticket successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = ticketController;
