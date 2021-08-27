const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");
const chartsController = {};
var mongoose = require("mongoose");

chartsController.getDonutChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("6102a7fe43bc5e0728a76722");
    // var id = mongoose.Types.ObjectId("6110fe14f743e01e61caefbf");
    // let user = await Users.findOne({ _id: id }).populate("team");

    let user = await Users.findOne({ _id: id });
    let teamId = user.team;
    const completed = await Posts.find({ team: teamId }).count({
      isFinished: true,
    });
    const pending = await Posts.find({ team: teamId }).count({
      isFinished: false,
    });
    // let completedPosts = 0;
    // let pendingPosts = 0;
    // posts.map((post) => {
    //   if (post.isApproved == true) {
    //     completedPosts += 1;
    //   } else if (post.isApproved == false) {
    //     pendingPosts += 1;
    //   }
    // });
    // let data = [completedPosts, pendingPosts];

    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { completed, pending },
      null,
      "Get donut chart successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = chartsController;
