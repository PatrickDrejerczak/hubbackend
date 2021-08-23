const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = Schema(
  {
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

    itemName: String,
    enum: {
      values: [
        "rice",
        "eggs",
        "noodles",
        "veggies",
        "children clothes",
        "mask",
        "fish",
        "protective gear",
        "adult clothes",
        "meat",
      ],
    },
    quantity: Number,
  },

  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
