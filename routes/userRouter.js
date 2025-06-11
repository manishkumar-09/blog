const express = require("express");
const userRouter = express.Router();
const uploads = require("../middlewares/userUploads");
const {
  createUser,
  userLogin,
  forgetUserPassword,
  resetPassword,
} = require("../controllers/userController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validations/user/userDataval");
const userAuthentication = require("../middlewares/userAuthentication");

userRouter.post("/login", loginUserValidation, userLogin);
userRouter.post("/resetpassword", forgetUserPassword);
userRouter.post("/reset/:id/:token", resetPassword);
userRouter.post(
  "/create",
  uploads.single("profilePic"),
  registerUserValidation,
  createUser
);

module.exports = userRouter;
