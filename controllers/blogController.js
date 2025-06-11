const { unlinkSync } = require("fs");
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");

module.exports = {
  createBlog: async (req, res) => {
    const authorId = req.user._id;
    const { title, description, blogImage, category } = req.body;
    try {
      const newBlog = new blogModel({
        title,
        description,
        blogImage,
        category,
        author: authorId,
      });
      newBlog.title = req.body.title.replace(/^[a-z]/, (match) =>
        match.toUpperCase()
      );
      const existingBlogPost = await blogModel.findOne({
        title: newBlog.title,
      });

      if (existingBlogPost) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "This blog with the title already exists",
        });
      } else {
        const filePath = `/uploads/blog/${req.file.filename}`;
        newBlog.blogImage = filePath;
        const blog = await newBlog.save();
        res.status(201).json({
          success: true,
          message: "Blog created",
          addedBlog: blog,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  blogList: async (req, res) => {
    try {
      const authorId = req.user._id;
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default limit is 10
      const skip = (page - 1) * limit;

      const totalBlogs = await blogModel.countDocuments({ author: authorId });
      const blogs = await blogModel
        .find({ author: authorId })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        success: true,
        message: "Paginated blog list",
        blogList: blogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
        totalBlogs: totalBlogs,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurred: ${err.message}`,
      });
    }
  },

  searchBlog: async (req, res) => {
    const searchData = req.body.title;
    try {
      const searchDatalist = await blogModel.find({ title: searchData });
      res.status(200).json({
        success: true,
        message: "Got all the data by title",
        searchDataList: searchDatalist,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  blogLikes: async (req, res) => {
    const userId = req.body.userId;
    const blogId = req.body.blogId;

    try {
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      if (blog.likes.includes(userId)) {
        return res.status(409).json({
          success: false,
          message: "Already liked by the user",
        });
      }

      if (blog.dislikes.includes(userId)) {
        blog.dislikes.pull(userId);
      }

      // Add the user's ID to the 'likes' array
      blog.likes.push(userId);
      const updatedBlog = await blog.save();
      const totalLikes = updatedBlog.likes.length;

      res.status(200).json({
        success: true,
        likedUserId: userId,
        likesCount: totalLikes,
        message: "Like added successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurred: ${err.message}`,
      });
    }
  },

  blogDislike: async (req, res) => {
    const userId = req.body.userId;
    const blogId = req.body.blogId;

    try {
      const blog = await blogModel.findById(blogId);
      // Checking if the blog exists
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }

      // Checking if the user has already disliked the blog
      if (blog.dislikes.includes(userId)) {
        return res.status(409).json({
          success: false,
          message: "Already disliked by the user",
        });
      }

      // Removing the userId from the likes array if they had previously liked the blog
      if (blog.likes.includes(userId)) {
        blog.likes = blog.likes.filter((id) => id.toString() !== userId);
      }

      // Adding the userId to the dislikes array
      blog.dislikes.push(userId);

      const updatedBlog = await blog.save();
      const dislikeCount = updatedBlog.dislikes.length;

      res.status(200).json({
        success: true,
        dislikedUserId: userId,
        dislikesCount: dislikeCount,
        message: "Dislike added successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurred: ${err.message}`,
      });
    }
  },

  blogDetails: async (req, res) => {
    const blogID = req.params.id;
    const userID = req.user._id;
    // console.log(blogID,userID)
    try {
      const blogData = await blogModel.findById(req.params.id);
      const commentList = await commentModel
        .find({ blogID: req.params.id })
        .populate({ path: "userID", select: "userName" })
        .sort({ createdAt: -1 }); //sort comments by newest first
      res.status(200).json({
        success: true,
        message: "Comment list fetched successfully",
        blog: blogData,
        comment: commentList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Comment not found ${err.message}`,
      });
    }
  },

  editBlog: async (req, res) => {
    const blogId = req.params.id;
    try {
      const blogData = await blogModel.findByIdAndUpdate(blogId, req.body, {
        new: true,
        runValidator: true,
      });
      res.status(200).send({
        success: true,
        message: "Description updated successfully",
        updatedData: blogData,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurred: ${err.message}`,
      });
    }
  },

  deleteBlog: async (req, res) => {
    const blogId = req.params.id;
    try {
      if (blogId) {
        const blogData = await blogModel.findByIdAndDelete(blogId);
        if (blogData) {
          res.status(204).json({
            success: true,
            message: "Blog deleted successfully",
            deletedBlog: blogData,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Blog not found",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid request missing blog ID",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occurd ${err.message}`,
      });
    }
  },
};
