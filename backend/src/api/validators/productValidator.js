const Joi = require("joi");

exports.createProductSchema = Joi.object({
  productTypeId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'Product Type ID must be a valid hexadecimal',
      'string.length': 'Product Type ID must be 24 characters long',
      'any.required': 'Product Type ID is required'
    }),
  name: Joi.string().required().trim().min(1).max(100)
    .messages({
      'string.empty': 'Product name is required',
      'any.required': 'Product name is required'
    }),
  unit: Joi.string().required().trim().min(1).max(20)
    .messages({
      'string.empty': 'Unit is required',
      'any.required': 'Unit is required'
    }),
  size: Joi.string().trim().max(50).optional().allow(''),
  price: Joi.number().required().positive().max(10000)
    .messages({
      'number.positive': 'Price must be a positive number',
      'number.max': 'Price cannot exceed 10,000',
      'any.required': 'Price is required'
    }),
  currentStock: Joi.number().min(0).max(100000).optional()
    .messages({
      'number.min': 'Current stock cannot be negative',
      'number.max': 'Current stock cannot exceed 100,000'
    }),
  isActive: Joi.boolean().optional()
});

exports.updateProductSchema = Joi.object({
  productTypeId: Joi.string().hex().length(24).optional()
    .messages({
      'string.hex': 'Product Type ID must be a valid hexadecimal',
      'string.length': 'Product Type ID must be 24 characters long'
    }),
  name: Joi.string().trim().min(1).max(100).optional(),
  unit: Joi.string().trim().min(1).max(20).optional(),
  size: Joi.string().trim().max(50).optional().allow(''),
  price: Joi.number().positive().max(10000).optional()
    .messages({
      'number.positive': 'Price must be a positive number',
      'number.max': 'Price cannot exceed 10,000'
    }),
  currentStock: Joi.number().min(0).max(100000).optional()
    .messages({
      'number.min': 'Current stock cannot be negative',
      'number.max': 'Current stock cannot exceed 100,000'
    }),
  isActive: Joi.boolean().optional()
}).min(1);