const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts.controller");

// Get all posts
router.get("/", postsController.getAllPosts);

// Get posts that are completed and it is a request

module.exports = router;
