// src/validation/orderValidation.js

const Joi = require("joi");

const createOrderSchema = Joi.object({
  shopKeeperId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  paymentType: Joi.string().valid("full", "partial").required(),
  paidAmount: Joi.number().min(0).default(0),
  paymentMethodId: Joi.string().required()
});

module.exports = { createOrderSchema };
