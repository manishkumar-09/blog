const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const blogValSchema = {
  createBlog: joi
    .object({
      title: joi
        .string()
        .min(3)
        .max(100)
        .message({
          "string.min": "{#label} should contain at least {#limit} character",
          "string.max":
            "{#label} should contain not more than {#limit} character",
        })
        .required(),
      description: joi
        .string()
        .min(10)
        .message({
          "string.min": "{#label} should contain at least {#limit} character",
        })
        .required(),
    })
    .unknown(true),
};

module.exports = blogValSchema;
