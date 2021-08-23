const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = Schema(
    {
      "type": {"donor", "receiver", "helper"},
      "name": "string",
      "address": "string",
      "loc": {
          "long": "number",
          "lat": "number",
      },
      "phone": "number",
      
  }
  );
  
  const Ticket = mongoose.model("Ticket", userSchema);