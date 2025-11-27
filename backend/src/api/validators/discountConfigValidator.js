const Joi = require("joi");

exports.createDiscountSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(100)
    .messages({
      'string.empty': 'Discount name is required',
      'any.required': 'Discount name is required'
    }),
  discountType: Joi.string().required().valid("percentage", "fixed_amount")
    .messages({
      'any.only': 'Discount type must be either percentage or fixed_amount',
      'any.required': 'Discount type is required'
    }),
  discountValue: Joi.number().required().min(0)
    .messages({
      'number.min': 'Discount value must be a positive number',
      'any.required': 'Discount value is required'
    }),
  minOrderAmount: Joi.number().min(0).optional(),
  isActive: Joi.boolean().optional()
});

exports.updateDiscountSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional(),
  discountType: Joi.string().valid("percentage", "fixed_amount").optional()
    .messages({
      'any.only': 'Discount type must be either percentage or fixed_amount'
    }),
  discountValue: Joi.number().min(0).optional()
    .messages({
      'number.min': 'Discount value must be a positive number'
    }),
  minOrderAmount: Joi.number().min(0).optional().allow(null),
  isActive: Joi.boolean().optional()
}).min(1);