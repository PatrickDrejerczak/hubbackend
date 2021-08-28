const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Units = require("./Units");

const itemSchema = Schema({
  unit: { type: Schema.Types.ObjectId, ref: Units },
});

const Items = mongoose.model("items", itemSchema, "items");

module.exports = Items;
