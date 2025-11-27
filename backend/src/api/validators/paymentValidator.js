const Joi = require("joi");

exports.createPaymentSchema = Joi.object({
  type: Joi.string().required().valid("farmer_payout", "shopkeeper_receipt")
    .messages({
      'any.only': 'Payment type must be either farmer_payout or shopkeeper_receipt',
      'any.required': 'Payment type is required'
    }),
  
  farmerId: Joi.when('type', {
    is: 'farmer_payout',
    then: Joi.string().required().hex().length(24)
      .messages({
        'string.hex': 'Farmer ID must be a valid hexadecimal',
        'string.length': 'Farmer ID must be 24 characters long',
        'any.required': 'Farmer ID is required for farmer payouts'
      }),
    otherwise: Joi.string().hex().length(24).optional().allow(null)
  }),
  
  shopKeeperId: Joi.when('type', {
    is: 'shopkeeper_receipt',
    then: Joi.string().required().hex().length(24)
      .messages({
        'string.hex': 'Shopkeeper ID must be a valid hexadecimal',
        'string.length': 'Shopkeeper ID must be 24 characters long',
        'any.required': 'Shopkeeper ID is required for shopkeeper receipts'
      }),
    otherwise: Joi.string().hex().length(24).optional().allow(null)
  }),
  
  amount: Joi.number().required().positive().max(1000000)
    .messages({
      'number.positive': 'Amount must be a positive number',
      'number.max': 'Amount cannot exceed 1,000,000',
      'any.required': 'Amount is required'
    }),
  
  mode: Joi.when('type', {
    is: 'farmer_payout',
    then: Joi.string().required().valid("cash", "gpay")
      .messages({
        'any.only': 'Payment mode must be either cash or gpay',
        'any.required': 'Payment mode is required for farmer payouts'
      }),
    otherwise: Joi.string().valid("cash", "gpay").optional().allow(null)
  }),
  
  paymentMethodId: Joi.when('type', {
    is: 'shopkeeper_receipt',
    then: Joi.string().required().hex().length(24)
      .messages({
        'string.hex': 'Payment Method ID must be a valid hexadecimal',
        'string.length': 'Payment Method ID must be 24 characters long',
        'any.required': 'Payment Method ID is required for shopkeeper receipts'
      }),
    otherwise: Joi.string().hex().length(24).optional().allow(null)
  })
}).with('type', ['farmerId', 'shopKeeperId', 'mode', 'paymentMethodId']);

exports.updatePaymentSchema = Joi.object({
  type: Joi.string().valid("farmer_payout", "shopkeeper_receipt").optional(),
  farmerId: Joi.string().hex().length(24).optional().allow(null),
  shopKeeperId: Joi.string().hex().length(24).optional().allow(null),
  amount: Joi.number().positive().max(1000000).optional(),
  mode: Joi.string().valid("cash", "gpay").optional().allow(null),
  paymentMethodId: Joi.string().hex().length(24).optional().allow(null)
}).min(1);