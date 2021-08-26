const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = Schema();

const Users = mongoose.model("users-permissions_user", usersSchema);

module.exports = Users;
