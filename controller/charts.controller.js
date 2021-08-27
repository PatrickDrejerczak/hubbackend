const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");
const chartsController = {};
var mongoose = require("mongoose");

chartsController.getDonutChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("6102a7fe43bc5e0728a76722");
    // let user = await Users.findOne({ _id: id }).populate("team");
    let user = await Users.findOne({ _id: id });
    const posts = await Posts.find({ team: user.team });

    let completedPosts = 0;
    let pendingPosts = 0;
    posts.map((post) => {
      if (post.isFinished == true) {
        completedPosts += 1;
      } else {
        pendingPosts += 1;
      }
    });
    let data = [completedPosts, pendingPosts];

    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { data },
      null,
      "Get all postss successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = chartsController;
