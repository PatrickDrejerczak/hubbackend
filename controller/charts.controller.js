var mongoose = require("mongoose");
const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Users = require("../models/Users");
const Items = require("../models/Items");
const Selected = require("../models/SelectedItem");
const Units = require("../models/Units");
const allDataForHCMQ1 = require("../data/allForTeamHCMQ1.json");
const allDataForHCMQ2 = require("../data/allForTeamHCMQ2.json");

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

    utilsHelper.sendResponse(
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
    let { weekAgo } = req.params;
    weekAgo = parseInt(weekAgo);

    const getWeeklyPosts = async (weekAgo, type, isFinished) => {
      let result;
      if (isFinished) {
        result = await Posts.find({
          team: teamId,
          type: type,
          isFinished,
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
      } else {
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
      }
      return result;
    };

    let reversedReceive = [];
    let reversedSend = [];
    let reversedApproved = [];
    for (let index = 0; index < weekAgo; index++) {
      reversedReceive[index] = await getWeeklyPosts(index + 1, "receive");
      reversedSend[index] = await getWeeklyPosts(index + 1, "send");
      reversedApproved[index] = await getWeeklyPosts(
        index + 1,
        "receive",
        true
      );
    }
    const receive = reversedReceive.reverse();
    const send = reversedSend.reverse();
    const finish = reversedApproved.reverse();

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { receive, send, finish },
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
        $group: {
          _id: { name: "$items.ref.item.name", type: "$type" },
          total: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.type",
          biggest: { $max: "$total" },
          name: { $first: "$_id.name" },
        },
      },
      // {
      //   $facet: {
      //     send: [
      //       {
      //         $group: {
      //           _id: "$items.ref.item.name",
      //           count: { $sum: 1 },
      //         },
      //       },
      //     ],
      //     receive: [
      //       {
      //         $group: {
      //           _id: "$items.ref.item.name",
      //           count: { $sum: 1 },
      //           biggest: { $max: "$count" },
      //         },
      //       },
      //     ],
      //   },
      // },
    ]);

    utilsHelper.sendResponse(
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

chartsController.getItems = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("61003d63918c8036b2cfcc7f");

    let user = await Users.findOne({ _id: id });
    let teamId = user.team;

    const data = await Posts.aggregate([
      { $match: { team: teamId, isFinished: false } },
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
        $lookup: {
          from: Units.collection.name,
          localField: "items.ref.item.unit",
          foreignField: "_id",
          as: "items.ref.item.unit",
        },
      },
      { $unwind: "$items.ref.item.unit" },
      {
        $group: {
          _id: { name: "$items.ref.item.name", type: "$type" },
          name: { $first: "$items.ref.item.name" },
          type: { $first: "$type" },
          unit: { $first: "$items.ref.item.unit.Name" },
          count: { $sum: 1 },
        },
      },

      // {
      //   $addFields: {
      //     send: {
      //       $cond: {
      //         if: { $eq: ["$type", "send"] },
      //         then: "$count",
      //         else: 0,
      //       },
      //     },
      //     receive: {
      //       $cond: {
      //         if: { $eq: ["$type", "receive"] },
      //         then: "$count",
      //         else: 0,
      //       },
      //     },
      //   },
      // },

      {
        $group: {
          _id: "$_id.name",
          items: {
            $push: {
              type: "$_id.type",
              total: "$count",
            },
          },
        },
      },

      // {
      //   $facet: {
      //     send: [
      //       {
      //         $group: {
      //           _id: "$items.ref.item.name",
      //           count: { $sum: 1 },
      //         },
      //       },
      //     ],
      //     receive: [
      //       {
      //         $group: {
      //           _id: "$items.ref.item.name",
      //           count: { $sum: 1 },
      //         },
      //       },
      //     ],
      //   },
      // },
    ]);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { data },
      null,
      "Get all pie chart successfully."
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
        $gte: new Date(d.getTime() - 12 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 11 * 24 * 60 * 60 * 1000),
      },
      type: "send",
    }).countDocuments();

    const todayReceive = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 12 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 11 * 24 * 60 * 60 * 1000),
      },
      type: "receive",
    }).countDocuments();

    const yesterdaySend = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 13 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 12 * 24 * 60 * 60 * 1000),
      },
      type: "send",
    }).countDocuments();

    const yesterdayReceive = await Posts.find({
      createdAt: {
        $gte: new Date(d.getTime() - 13 * 24 * 60 * 60 * 1000),
        $lte: new Date(d.getTime() - 12 * 24 * 60 * 60 * 1000),
      },
      type: "receive",
    }).countDocuments();

    utilsHelper.sendResponse(
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

chartsController.getAllForTeam = async (req, res, next) => {
  try {
    const { province, district } = req.params;
    console.log(req.params);
    if (province === "hochiminh" && district === "quan-1") {
      console.log("heeh");
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { allData: allDataForHCMQ1 },
        null,
        "Get all data posts successfully."
      );
    } else if (province === "hochiminh" && district === "quan-2") {
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { allData: allDataForHCMQ2 },
        null,
        "Get all data posts successfully."
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = chartsController;
