const express = require("express");
const commentRouter = express();
const { addComment } = require("../controllers/commentController");

commentRouter.post("/add", addComment)

module.exports = commentRouter;
