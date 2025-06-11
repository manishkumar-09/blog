const { unlinkSync } = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const transporter = require("../services/emailService");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new userModel(req.body);
    try {
      newUser.userName = req.body.userName
        .trim()
        .replace(/^[a-z]/, (match) => match.toUpperCase());
      const isUserExist = await userModel.findOne({
        userEmail: newUser.userEmail,
      });

      if (isUserExist) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "User is already registered with this email",
        });
      } else {
        const saltRounds = await bcrypt.genSalt(10);
        newUser.userPassword = await bcrypt.hash(
          req.body.userPassword,
          saltRounds
        );

        const filePath = req.file ? `/uploads/user/${req.file.filename}` : null;
        newUser.profilePic = filePath;
        const user = await newUser.save();
        res.status(201).json({
          success: true,
          message: "User registered sucessfully",
          createdUser: user,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  userLogin: async (req, res) => {
    const newUser = await userModel.findOne({ userEmail: req.body.userEmail });
    try {
      if (newUser) {
        const hashPassword = await bcrypt.compare(
          req.body.userPassword,
          newUser.userPassword
        );
        if (newUser && hashPassword) {
          const token = jwt.sign({ newUser }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).json({
            success: true,
            message: "User logged in sucessfully",
            accessToken: token,
          });
        } else {
          res.status(401).json({
            //unauthorised
            success: false,
            message: "Invalid email or password",
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: "User are not reconised with email",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  forgetUserPassword: async (req, res) => {
    const { userEmail } = req.body;
    try {
      const newUser = await userModel.findOne({
        userEmail: req.body.userEmail,
      });
      if (newUser != null) {
        const secret = process.env.SECRET_KEY + newUser._id;
        const token = jwt.sign({ userID: newUser._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:8080/user/reset/${newUser._id}/${token}`;
        let info = await transporter.sendMail({
          from: "shoppingonline2109@gmail.com",
          to: userEmail,
          subject: "Link for reset user password",
          html: `<a href=${link}>Click on link to reset password</a>`,
        });
        return res.status(200).json({
          success: true,
          message: "Email sent sucessfully",
          userId: newUser._id,
          token: token,
        });
      } else {
        res.status(403).json({
          //forbidden
          success: false,
          message: "Please enter valid email",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },

  resetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    console.log(req.body);
    try {
      const checkUser = await userModel.findById(id);
      if (checkUser === null) {
        res.status(403).json({
          success: false,
          message: "User is not authorised",
        });
      } else {
        const secretkey = process.env.SECRET_KEY + checkUser._id;
        jwt.verify(token, secretkey);
        if (newPassword === confirmPassword) {
          const saltRounds = await bcrypt.genSalt(8);
          const bcryptPassword = await bcrypt.hash(confirmPassword, saltRounds);
          await userModel.findByIdAndUpdate(checkUser._id, {
            $set: { userPassword: bcryptPassword },
          });
        }
        res.status(201).json({
          success: true,
          message: "Password updated successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error occured ${err.message}`,
      });
    }
  },
};
