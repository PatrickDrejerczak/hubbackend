const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = Schema({
  name: String,
  address: String,
  loc: {
    long: Number,
    lat: Number,
  },
  phone: Number,
  ticket: [{ Number }],
});

const Team = mongoose.model("Team", userSchema);
