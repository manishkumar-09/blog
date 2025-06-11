const commentModel = require("../models/commentModel");

const addComment = async (req, res) => {
  const commentData = await commentModel(req.body);
  try {
    if (commentData) {
      let data = await commentData.save();
      res.status(201).json({
        success: true,
        message: "comment added suceessfully",
        commentData: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Comment data not present",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error occured ${err.message}`,
    });
  }
};

module.exports = { addComment };
