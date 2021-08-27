const moment = require("moment");
const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");
var mongoose = require("mongoose");
const chartsController = {};

chartsController.getDonutChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("61003d63918c8036b2cfcc7f");
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

chartsController.getBarChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("61003d63918c8036b2cfcc7f");
    let user = await Users.findOne({ _id: id });
    let teamId = user.team;

    const getWeeklyPosts = async (weekAgo, type) => {
      let result;
      if (weekAgo == 1) {
        result = await Posts.find({
          team: teamId,
          type: type,
          createdAt: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        })
          .sort({ createdAt: -1 })
          .countDocuments();
      } else if (weekAgo > 1) {
        result = await Posts.find({
          team: teamId,
          type: type,
          createdAt: {
            $gte: new Date(
              new Date().getTime() - weekAgo * 7 * 24 * 60 * 60 * 1000
            ),
            $lte: new Date(
              new Date().getTime() - (weekAgo - 1) * 7 * 24 * 60 * 60 * 1000
            ),
          },
        })
          .sort({ createdAt: -1 })
          .countDocuments();
      }
      return result;
    };
    let numberofweeks = 10;

    const receive = [];
    const send = [];
    for (let index = 1; index <= numberofweeks; index++) {
      receive[index] = await getWeeklyPosts(index, "receive");
      send[index] = await getWeeklyPosts(index, "send");
    }

    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { receive, send },
      null,
      "Get donut chart successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = chartsController;
