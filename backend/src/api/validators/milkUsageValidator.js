const Joi = require("joi");

exports.createMilkUsageSchema = Joi.object({
  productTypeId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'Product Type ID must be a valid hexadecimal',
      'string.length': 'Product Type ID must be 24 characters long',
      'any.required': 'Product Type ID is required'
    }),
  productId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'Product ID must be a valid hexadecimal',
      'string.length': 'Product ID must be 24 characters long',
      'any.required': 'Product ID is required'
    }),
  litersUsed: Joi.number().required().positive().max(10000)
    .messages({
      'number.positive': 'Liters used must be a positive number',
      'number.max': 'Liters used cannot exceed 10,000',
      'any.required': 'Liters used is required'
    }),
  productProduced: Joi.number().positive().max(10000).optional()
    .messages({
      'number.positive': 'Product produced must be a positive number',
      'number.max': 'Product produced cannot exceed 10,000'
    })
});

exports.updateMilkUsageSchema = Joi.object({
  productTypeId: Joi.string().hex().length(24).optional()
    .messages({
      'string.hex': 'Product Type ID must be a valid hexadecimal',
      'string.length': 'Product Type ID must be 24 characters long'
    }),
  productId: Joi.string().hex().length(24).optional()
    .messages({
      'string.hex': 'Product ID must be a valid hexadecimal',
      'string.length': 'Product ID must be 24 characters long'
    }),
  litersUsed: Joi.number().positive().max(10000).optional()
    .messages({
      'number.positive': 'Liters used must be a positive number',
      'number.max': 'Liters used cannot exceed 10,000'
    }),
  productProduced: Joi.number().positive().max(10000).optional()
    .messages({
      'number.positive': 'Product produced must be a positive number',
      'number.max': 'Product produced cannot exceed 10,000'
    })
}).min(1);