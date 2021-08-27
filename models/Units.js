const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitsSchema = Schema({});

const Units = mongoose.model("units", unitsSchema);

module.exports = Units;
