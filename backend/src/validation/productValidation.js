// src/validation/productValidation.js

const Joi = require("joi");

const createProductTypeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("", null)
});

const createProductSchema = Joi.object({
  productTypeId: Joi.string().required(),
  name: Joi.string().min(2).max(100).required(),
  unit: Joi.string().required(), // liter, packet, etc.
  size: Joi.string().allow("", null),
  price: Joi.number().min(0).required()
});

module.exports = { createProductTypeSchema, createProductSchema };
