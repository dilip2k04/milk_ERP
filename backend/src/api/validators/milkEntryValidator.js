const Joi = require("joi");

exports.createMilkEntrySchema = Joi.object({
  sessionId: Joi.string().required().trim().min(1).max(50)
    .messages({
      'string.empty': 'Session ID is required',
      'any.required': 'Session ID is required'
    }),
  farmerId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'Farmer ID must be a valid hexadecimal',
      'string.length': 'Farmer ID must be 24 characters long',
      'any.required': 'Farmer ID is required'
    }),
  liters: Joi.number().required().positive().max(1000)
    .messages({
      'number.positive': 'Liters must be a positive number',
      'number.max': 'Liters cannot exceed 1000',
      'any.required': 'Liters is required'
    }),
  fat: Joi.number().min(0).max(100).required()
    .messages({
      'number.min': 'Fat cannot be negative',
      'number.max': 'Fat cannot exceed 100',
      'any.required': 'Fat is required'
    }),
  snf: Joi.number().min(0).max(100).required()
    .messages({
      'number.min': 'SNF cannot be negative',
      'number.max': 'SNF cannot exceed 100',
      'any.required': 'SNF is required'
    }),
  water: Joi.number().min(0).max(100).required()
    .messages({
      'number.min': 'Water cannot be negative',
      'number.max': 'Water cannot exceed 100',
      'any.required': 'Water is required'
    }),
  rate: Joi.number().required().positive().max(1000)
    .messages({
      'number.positive': 'Rate must be a positive number',
      'number.max': 'Rate cannot exceed 1000',
      'any.required': 'Rate is required'
    }),
  amount: Joi.number().required().positive().max(1000000)
    .messages({
      'number.positive': 'Amount must be a positive number',
      'number.max': 'Amount cannot exceed 1,000,000',
      'any.required': 'Amount is required'
    }),
  date: Joi.date().optional(),
  createdBy: Joi.string().hex().length(24).optional()
    .messages({
      'string.hex': 'Created by must be a valid hexadecimal',
      'string.length': 'Created by must be 24 characters long'
    })
});

exports.updateMilkEntrySchema = Joi.object({
  sessionId: Joi.string().trim().min(1).max(50).optional(),
  liters: Joi.number().positive().max(1000).optional()
    .messages({
      'number.positive': 'Liters must be a positive number',
      'number.max': 'Liters cannot exceed 1000'
    }),
  fat: Joi.number().min(0).max(100).optional()
    .messages({
      'number.min': 'Fat cannot be negative',
      'number.max': 'Fat cannot exceed 100'
    }),
  snf: Joi.number().min(0).max(100).optional()
    .messages({
      'number.min': 'SNF cannot be negative',
      'number.max': 'SNF cannot exceed 100'
    }),
  water: Joi.number().min(0).max(100).optional()
    .messages({
      'number.min': 'Water cannot be negative',
      'number.max': 'Water cannot exceed 100'
    }),
  rate: Joi.number().positive().max(1000).optional()
    .messages({
      'number.positive': 'Rate must be a positive number',
      'number.max': 'Rate cannot exceed 1000'
    }),
  amount: Joi.number().positive().max(1000000).optional()
    .messages({
      'number.positive': 'Amount must be a positive number',
      'number.max': 'Amount cannot exceed 1,000,000'
    }),
  date: Joi.date().optional()
}).min(1);