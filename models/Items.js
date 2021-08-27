const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = Schema({
  unit: { type: Schema.Types.ObjectId, ref: "units" },
});

const Items = mongoose.model("items", itemSchema);

module.exports = Items;
