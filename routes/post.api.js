const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");

// Get all posts
router.get("/", postController.getAllPosts);

module.exports = router;
