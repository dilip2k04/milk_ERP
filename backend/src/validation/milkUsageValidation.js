// src/validation/milkUsageValidation.js

const Joi = require("joi");

const createMilkUsageSchema = Joi.object({
  productTypeId: Joi.string().required(),
  productId: Joi.string().required(),
  litersUsed: Joi.number().min(0).required(),
  productProduced: Joi.number().min(0).optional()
});

module.exports = { createMilkUsageSchema };
