const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const commentValSchema = {
  addComment: joi
    .object({
      text: joi
        .string()
        .min(3)
        .max()
        .message({
          "string.min": "{#label} should contain at least {#limit} character",
          "string.max":
            "{#label} should contain not more than {#limit} character",
        })
        .required(), 
    })
    .unknown(true),
};

module.exports = commentValSchema;
