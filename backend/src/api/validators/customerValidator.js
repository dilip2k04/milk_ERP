const Joi = require("joi");

exports.createCustomerSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(100)
    .messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
  phone: Joi.string().required().trim().min(10).max(15)
    .pattern(/^[0-9+\-() ]+$/)
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must contain only numbers and valid characters',
      'any.required': 'Phone number is required'
    }),
  address: Joi.string().trim().max(500).allow("")
});

exports.updateCustomerSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100),
  phone: Joi.string().trim().min(10).max(15)
    .pattern(/^[0-9+\-() ]+$/)
    .messages({
      'string.pattern.base': 'Phone number must contain only numbers and valid characters'
    }),
  address: Joi.string().trim().max(500).allow("")
}).min(1);