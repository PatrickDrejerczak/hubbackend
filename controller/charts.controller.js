const utilsHelper = require("../helpers/utils.helper");
const Posts = require("../models/Posts");
const Teams = require("../models/Teams");
const Users = require("../models/Users");
const chartsController = {};

chartsController.getDonutChart = async (req, res, next) => {
  try {
    let userId = req.body.userId;
    let teamId = await Users.findById("6102a08043bc5e0728a765ca").team;

    const data = await Posts.find({ team: teamId });

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
