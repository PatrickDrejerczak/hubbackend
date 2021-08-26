const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = Schema(
  {
    name: String,

    address: String,

    ticketType: {
      type: String,
      enum: {
        values: ["receive", "donate"],
      },
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "notStarted", "complete"],
      },
    },

    timeAgo: Number,

    items: [
      {
        itemName: {
          type: String,
          require: true,
          enum: [
            "rice",
            "eggs",
            "noodles",
            "veggies",
            "children clothes",
            "mask",
            "fish",
            "protective gear",
            "adult clothes",
            "meat",
          ],
        },
        quantity: { type: Number, default: 0 },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
