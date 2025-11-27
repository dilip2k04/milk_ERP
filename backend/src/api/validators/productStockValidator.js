const Joi = require("joi");

exports.createProductStockSchema = Joi.object({
  productId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'Product ID must be a valid hexadecimal',
      'string.length': 'Product ID must be 24 characters long',
      'any.required': 'Product ID is required'
    }),
  quantity: Joi.number().min(0).max(100000).required()
    .messages({
      'number.min': 'Quantity cannot be negative',
      'number.max': 'Quantity cannot exceed 100,000',
      'any.required': 'Quantity is required'
    })
});

exports.updateProductStockSchema = Joi.object({
  productId: Joi.string().hex().length(24).optional()
    .messages({
      'string.hex': 'Product ID must be a valid hexadecimal',
      'string.length': 'Product ID must be 24 characters long'
    }),
  quantity: Joi.number().min(0).max(100000).required()
    .messages({
      'number.min': 'Quantity cannot be negative',
      'number.max': 'Quantity cannot exceed 100,000',
      'any.required': 'Quantity is required'
    })
});