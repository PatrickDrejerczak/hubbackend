const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    usertype: {
        type: String,
        enum: {
          values: ["donor", "receiver", "team"],
        },
    name: String,
    address: String,
    loc: {
        long: Number,
        lat: Number,
    },
    phone: Number,
    
}
);

const User = mongoose.model("User", userSchema);