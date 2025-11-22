// src/validation/paymentValidation.js

const Joi = require("joi");

const payFarmerSchema = Joi.object({
  farmerId: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  mode: Joi.string().valid("cash", "gpay").required()
});

const shopkeeperPaymentSchema = Joi.object({
  shopKeeperId: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  paymentMethodId: Joi.string().required()
});

module.exports = { payFarmerSchema, shopkeeperPaymentSchema };
