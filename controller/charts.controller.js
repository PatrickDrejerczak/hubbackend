const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");
const chartsController = {};
var mongoose = require("mongoose");

chartsController.getDonutChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("6102a08043bc5e0728a765ca");
    // let user = await Users.findOne({ _id: id }).populate("team");
    let user = await Users.findOne({ _id: id });
    const posts = await Posts.find({ team: user.team });

    let completedPosts = 0;
    let pendingPosts = 0;
    posts.map((post) => {
      if (post.isApproved) {
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
