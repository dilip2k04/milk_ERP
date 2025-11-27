const Joi = require("joi");

exports.createRateSchema = Joi.object({
  currentRate: Joi.number().required().positive().max(1000)
    .messages({
      'number.positive': 'Current rate must be a positive number',
      'number.max': 'Current rate cannot exceed 1000',
      'any.required': 'Current rate is required'
    })
});

exports.updateRateSchema = Joi.object({
  currentRate: Joi.number().required().positive().max(1000)
    .messages({
      'number.positive': 'Current rate must be a positive number',
      'number.max': 'Current rate cannot exceed 1000',
      'any.required': 'Current rate is required'
    })
});