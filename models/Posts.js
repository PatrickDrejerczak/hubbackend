const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = Schema({
  isApproved: Boolean,
});

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
