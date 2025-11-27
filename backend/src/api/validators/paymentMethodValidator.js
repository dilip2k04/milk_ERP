const Joi = require("joi");

exports.createPaymentMethodSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(50)
    .messages({
      'string.empty': 'Payment method name is required',
      'any.required': 'Payment method name is required'
    }),
  isActive: Joi.boolean().optional()
});

exports.updatePaymentMethodSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).optional(),
  isActive: Joi.boolean().optional()
}).min(1);