const express = require("express");
const blogUploads = require("../middlewares/blogUploads");
const {
  blogPostValidation,
} = require("../validations/blog/blogDataValidation");
const {
  createBlog,
  blogList,
  searchBlog,
  blogLikes,
  blogDislike,
  editBlog,
  deleteBlog,
  blogDetails,
} = require("../controllers/blogController");
const userAuthentication = require("../middlewares/userAuthentication");
const blogRouter = express.Router();

blogRouter.get("/list", userAuthentication, blogList);
blogRouter.post("/like/", userAuthentication, blogLikes);
blogRouter.post("/search", userAuthentication, searchBlog);
blogRouter.patch("/edit/:id", userAuthentication, editBlog);
blogRouter.post("/dislike/", userAuthentication, blogDislike);
blogRouter.delete("/delete/:id", userAuthentication, deleteBlog);
blogRouter.post("/details/:id/:user", userAuthentication, blogDetails);
blogRouter.post(
  "/create",
  blogUploads.single("blogImage"),
  userAuthentication,
  blogPostValidation,
  createBlog
);

module.exports = blogRouter;
