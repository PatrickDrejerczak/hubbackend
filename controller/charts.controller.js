const moment = require("moment");
const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");

var mongoose = require("mongoose");
const Items = require("../models/Items");
const SelectedItem = require("../models/SelectedItem");
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
          .sort({ createdAt: 1 })
          .count();
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
          .sort({ createdAt: 1 })
          .count();
      }
      return result;
    };
    let numberofweeks = 4;

    const reversedReceive = [];
    const reversedSend = [];
    for (let index = 0; index < numberofweeks; index++) {
      reversedReceive[index] = await getWeeklyPosts(index + 1, "receive");
      reversedSend[index] = await getWeeklyPosts(index + 1, "send");
    }
    const receive = reversedReceive.reverse();
    const send = reversedSend.reverse();

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

chartsController.getItemChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("61003d63918c8036b2cfcc7f");
    // let user = await Users.findOne({ _id: id }).populate("team");

    let user = await Users.findOne({ _id: id });
    let teamId = user.team;

    const receive = await Posts.find({ team: teamId, type: "receive" })
      .populate({
        path: "items",
        populate: [{ path: "selected" }],
      })
      .limit(10);

    const itemObjId = receive.items;
    var itemId = mongoose.Types.ObjectId("611e454cfadd5e47792f719b");

    const item = await SelectedItem.find({ _id: itemId });

    // const receive1 = await Posts.findOne({
    //   team: teamId,
    //   type: "receive",
    // }).populate("items");

    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { receive },
      null,
      "Get donut chart successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = chartsController;
