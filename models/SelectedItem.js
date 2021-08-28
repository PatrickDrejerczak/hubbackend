const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selectedSchema = Schema({
  item: { type: Schema.Types.ObjectId, ref: "items" },
});

const Selected = mongoose.model("selected", selectedSchema, "selected");

module.exports = Selected;
