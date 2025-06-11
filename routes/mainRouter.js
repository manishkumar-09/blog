const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./userRouter");
const blogRouter = require("./blogRouter");
const commentRouter = require("./commentRouter");

mainRouter.use("/user", userRouter);
mainRouter.use("/blog", blogRouter);
mainRouter.use("/comment", commentRouter);

module.exports = mainRouter;
