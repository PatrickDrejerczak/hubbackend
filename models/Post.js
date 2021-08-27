const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
    {
        name: String,
    },

    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
