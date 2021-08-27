const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = Schema({
  items: [{ kind: String, ref: { type: Schema.Types.ObjectId, ref: "items" } }],
});

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
