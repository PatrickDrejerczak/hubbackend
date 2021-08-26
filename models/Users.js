const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = Schema({
  team: { type: Schema.Types.ObjectId, ref: "teams" },
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
