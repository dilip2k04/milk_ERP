const Joi = require("joi");

exports.createProductTypeSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(100)
    .messages({
      'string.empty': 'Product type name is required',
      'any.required': 'Product type name is required'
    }),
  description: Joi.string().trim().max(500).optional().allow(''),
  isActive: Joi.boolean().optional()
});

exports.updateProductTypeSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional(),
  description: Joi.string().trim().max(500).optional().allow(''),
  isActive: Joi.boolean().optional()
}).min(1);