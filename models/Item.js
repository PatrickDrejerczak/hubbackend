const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
