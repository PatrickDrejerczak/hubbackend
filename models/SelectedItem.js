const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selectedItemSchema = Schema({
  item: { type: Schema.Types.ObjectId, ref: "items" },
});

const SelectedItem = mongoose.model("selectedItem", selectedItemSchema);

module.exports = SelectedItem;
