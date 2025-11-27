const Joi = require("joi");

exports.uploadCSVSchema = Joi.object({
  sessionId: Joi.string().required(),
});
