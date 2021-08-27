const utilsHelper = require("../helpers/utils.helper");
const Post = require("../models/Post");
const postController = {};

postController.getAllPosts = async (req, res, next) => {
    try {
        let post = await Post.find().limit(20);
        const response = utilsHelper.sendResponse(
            res,
            200,
            true,
            { post },
            null,
            "Get all posts successfully."
        );
    } catch (error) {
        next(error);
    }
};



module.exports = postController;
