const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const postsController = {};

postsController.getAllPosts = async (req, res, next) => {
  try {
    let posts = await Posts.find().limit(20);
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { posts },
      null,
      "Get all postss successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = postsController;
