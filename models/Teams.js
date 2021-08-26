const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamsSchema = Schema();

const Teams = mongoose.model("teams", teamsSchema);

module.exports = Teams;
