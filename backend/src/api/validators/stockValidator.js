const Joi = require("joi");

exports.addStockSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().positive().required(),
});
