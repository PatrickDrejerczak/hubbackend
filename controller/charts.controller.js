const moment = require("moment");
const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");

var mongoose = require("mongoose");
const Items = require("../models/Items");
const Selected = require("../models/SelectedItem");

const chartsController = {};

chartsController.getDonutChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("61003d63918c8036b2cfcc7f");

    let user = await Users.findOne({ _id: id });
    let teamId = user.team;
    const completed = await Posts.find({ team: teamId }).count({
      isFinished: true,
    });
    const pending = await Posts.find({ team: teamId }).count({
      isFinished: false,
    });

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

    let user = await Users.findOne({ _id: id });
    let teamId = user.team;

    const data = await Posts.aggregate([
      { $match: { team: teamId } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: Selected.collection.name,
          localField: "items.ref",
          foreignField: "_id",
          as: "items.ref",
        },
      },
      { $unwind: "$items.ref" },
      {
        $lookup: {
          from: Items.collection.name,
          localField: "items.ref.item",
          foreignField: "_id",
          as: "items.ref.item",
        },
      },
      { $unwind: "$items.ref.item" },
      {
        $facet: {
          send: [
            {
              $group: {
                _id: "$items.ref.item.name",
                count: { $sum: 1 },
              },
            },
          ],
          receive: [
            {
              $group: {
                _id: "$items.ref.item.name",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { data },
      null,
      "Get item chart successfully."
    );
  } catch (error) {
    next(error);
  }
};

chartsController.getTodayPosts = async (req, res, next) => {
  try {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    console.log("no Types", mongoose.Schema.Types);
    console.log("with types", mongoose.Schema);

    //--------- THIS IS FOR CURRENT DAY, CAN'T BE USED AT THE MOMENT DUE TO LACK OF CURRENT DATA
    // const todayReceivePost = await Posts.find({
    //   createdAt: {
    //     $gte: d,
    //     $lte: new Date(d.getTime() + 24 * 60 * 60 * 1000),
    //   },
    // });

    //--------- THIS IS FOR 23-8-2021
    const todaySend = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 6 * 24 * 60 * 60 * 1000),
      },
      type: "send",
    }).countDocuments();

    const todayReceive = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 6 * 24 * 60 * 60 * 1000),
      },
      type: "receive",
    }).countDocuments();

    const yesterdaySend = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 8 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
      type: "send",
    }).countDocuments();

    const yesterdayReceive = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 8 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
      type: "receive",
    }).countDocuments();

    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { todaySend, todayReceive, yesterdaySend, yesterdayReceive },
      null,
      "Get today total posts successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = chartsController;
