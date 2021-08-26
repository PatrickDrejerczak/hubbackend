const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = Schema();

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
