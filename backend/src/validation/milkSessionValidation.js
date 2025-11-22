// src/validation/milkSessionValidation.js

const Joi = require("joi");

const createMilkSessionSchema = Joi.object({
  date: Joi.date().required(),
  shift: Joi.string().valid("morning", "evening").required()
});

module.exports = { createMilkSessionSchema };
