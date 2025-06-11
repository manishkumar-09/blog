const { registerUser, loginUser } = require("./userValschema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    let isValid = await registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },

  loginUserValidation: async (req, res, next) => {
    let isValid = await loginUser.validate(req.body, { abortEarly: false });
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
