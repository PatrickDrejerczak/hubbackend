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

    items: [
      {
        name: {
          type: String,
          require: true,
          enum: [
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
        quantity: { type: Number, default: 0 },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
