const {addComment}=require("./commentValSchema")

const commentValidation = async (req, res, next) => {
  let isValid = await addComment.validate(req.body, {
    aboutEarly: false,
  });
  if (isValid.error) {
    res.status(403).json({
      success: false,
      message: isValid.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports =  commentValidation ;
