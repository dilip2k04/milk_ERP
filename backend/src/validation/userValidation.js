// src/validation/userValidation.js

const Joi = require("joi");
const { ROLES } = require("../config/appConfig");

const createUserSchema = Joi.object({
  firebaseUid: Joi.string().optional(), // admin may set later
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(8).max(20).required(),
  email: Joi.string().email().allow(null, ""),
  role: Joi.string()
    .valid(ROLES.ADMIN, ROLES.COMPANY, ROLES.SHOP_KEEPER, ROLES.FARMER)
    .required(),
  isActive: Joi.boolean().optional()
});

module.exports = { createUserSchema };
