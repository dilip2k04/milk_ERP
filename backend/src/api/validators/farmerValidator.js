const Joi = require("joi");

exports.createFarmerSchema = Joi.object({
  userId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'User ID must be a valid hexadecimal',
      'string.length': 'User ID must be 24 characters long',
      'any.required': 'User ID is required'
    }),
  farmerCode: Joi.string().required().trim().min(1).max(50)
    .messages({
      'string.empty': 'Farmer code is required',
      'any.required': 'Farmer code is required'
    }),
  collectionCenter: Joi.string().required().trim().min(1).max(100)
    .messages({
      'string.empty': 'Collection center is required',
      'any.required': 'Collection center is required'
    }),
  qualityMetrics: Joi.object({
    avgFat: Joi.number().min(0).max(100).optional(),
    avgSNF: Joi.number().min(0).max(100).optional(),
    avgCLR: Joi.number().min(0).max(100).optional(),
    avgWater: Joi.number().min(0).max(100).optional(),
    consistencyScore: Joi.number().min(0).max(10).optional()
  }).optional(),
  financials: Joi.object({
    totalOutstanding: Joi.number().min(0).optional(),
    totalEarnings: Joi.number().min(0).optional(),
    lastPaymentDate: Joi.date().optional(),
    lastPaymentAmount: Joi.number().min(0).optional()
  }).optional(),
  preferences: Joi.object({
    paymentMethod: Joi.string().valid("cash", "gpay").optional(),
    paymentCycle: Joi.string().valid("daily", "weekly", "biweekly", "monthly").optional()
  }).optional(),
  status: Joi.string().valid("active", "inactive", "suspended").optional(),
  joinedDate: Joi.date().optional()
});

exports.updateFarmerSchema = Joi.object({
  farmerCode: Joi.string().trim().min(1).max(50).optional(),
  collectionCenter: Joi.string().trim().min(1).max(100).optional(),
  qualityMetrics: Joi.object({
    avgFat: Joi.number().min(0).max(100).optional(),
    avgSNF: Joi.number().min(0).max(100).optional(),
    avgCLR: Joi.number().min(0).max(100).optional(),
    avgWater: Joi.number().min(0).max(100).optional(),
    consistencyScore: Joi.number().min(0).max(10).optional()
  }).optional(),
  financials: Joi.object({
    totalOutstanding: Joi.number().min(0).optional(),
    totalEarnings: Joi.number().min(0).optional(),
    lastPaymentDate: Joi.date().optional(),
    lastPaymentAmount: Joi.number().min(0).optional()
  }).optional(),
  preferences: Joi.object({
    paymentMethod: Joi.string().valid("cash", "gpay").optional(),
    paymentCycle: Joi.string().valid("daily", "weekly", "biweekly", "monthly").optional()
  }).optional(),
  status: Joi.string().valid("active", "inactive", "suspended").optional(),
  joinedDate: Joi.date().optional()
}).min(1);