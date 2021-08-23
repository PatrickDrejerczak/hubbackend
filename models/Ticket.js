const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = Schema({
  name: String,

  address: String,

  ticketType: {
    type: String,
    enum: {
      values: ["receive", "donate"],
    },
  },

  status: {
    type: String,
    enum: {
      values: ["pending", "notStarted", "complete"],
    },
  },

  items: [{ ref: "Item", type: Schema.ObjectId }],

  timestamps: true,
});

const Ticket = mongoose.model("Ticket", userSchema);

module.exports = Ticket;
