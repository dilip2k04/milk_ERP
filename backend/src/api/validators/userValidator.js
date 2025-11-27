const Joi = require("joi");
const { ROLES } = require("../../config/appConfig");

exports.createUserSchema = Joi.object({
  firebaseUid: Joi.string().required().trim().min(1).max(128)
    .messages({
      'string.empty': 'Firebase UID is required',
      'any.required': 'Firebase UID is required'
    }),
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
  email: Joi.string().trim().email().max(100).optional().allow('')
    .messages({
      'string.email': 'Email must be a valid email address'
    }),
  role: Joi.string().required().valid(...Object.values(ROLES))
    .messages({
      'any.only': 'Role must be a valid role',
      'any.required': 'Role is required'
    }),
  isActive: Joi.boolean().optional()
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional(),
  phone: Joi.string().trim().min(10).max(15)
    .pattern(/^[0-9+\-() ]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must contain only numbers and valid characters'
    }),
  email: Joi.string().trim().email().max(100).optional().allow('')
    .messages({
      'string.email': 'Email must be a valid email address'
    }),
  role: Joi.string().valid(...Object.values(ROLES)).optional()
    .messages({
      'any.only': 'Role must be a valid role'
    }),
  isActive: Joi.boolean().optional()
}).min(1);