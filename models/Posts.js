const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = Schema({
  items: [
    {
      kind: String,
      selected: { type: Schema.Types.ObjectId, ref: "selectedItem" },
    },
  ],
});

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
