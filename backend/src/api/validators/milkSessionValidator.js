const Joi = require("joi");

exports.createSessionSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(50)
    .messages({
      'string.empty': 'Session name is required',
      'any.required': 'Session name is required'
    }),
  isActive: Joi.boolean().optional()
});

exports.updateSessionSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).optional(),
  isActive: Joi.boolean().optional()
}).min(1);