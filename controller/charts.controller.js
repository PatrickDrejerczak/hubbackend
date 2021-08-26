const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Teams = require("../models/Teams");
const Users = require("../models/Users");
const chartsController = {};
var mongoose = require("mongoose");

chartsController.getDonutChart = async (req, res, next) => {
  try {
    var id = mongoose.Types.ObjectId("6102a08043bc5e0728a765ca");
    let user = await Users.findOne({ _id: id }).populate("team");
    let user1 = await Users.findOne({ _id: id });
    console.log(user);
    console.log(user1);

    const posts = await Posts.find({ team: user.team });

    // let data = await Posts.find().limit(20);

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

module.exports = chartsController;
