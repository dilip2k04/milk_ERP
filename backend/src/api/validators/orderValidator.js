const Joi = require("joi");

exports.createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().hex().length(24)
          .messages({
            'string.hex': 'Product ID must be a valid hexadecimal',
            'string.length': 'Product ID must be 24 characters long',
            'any.required': 'Product ID is required'
          }),
        quantity: Joi.number().required().min(1).max(1000)
          .messages({
            'number.min': 'Quantity must be at least 1',
            'number.max': 'Quantity cannot exceed 1000',
            'any.required': 'Quantity is required'
          })
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one item is required',
      'any.required': 'Items are required'
    }),

  paymentType: Joi.string().required().valid("full", "partial")
    .messages({
      'any.only': 'Payment type must be either full or partial',
      'any.required': 'Payment type is required'
    }),

  paymentMethodId: Joi.string().required().hex().length(24)
    .messages({
      'string.hex': 'Payment Method ID must be a valid hexadecimal',
      'string.length': 'Payment Method ID must be 24 characters long',
      'any.required': 'Payment Method ID is required'
    }),

  amountPaid: Joi.number().min(0).max(1000000).required()
    .messages({
      'number.min': 'Amount paid cannot be negative',
      'number.max': 'Amount paid cannot exceed 1,000,000',
      'any.required': 'Amount paid is required'
    }),

  orderDate: Joi.date().required()
    .messages({
      'any.required': 'Order date is required'
    }),

  deliveryDate: Joi.date().required().min(Joi.ref('orderDate'))
    .messages({
      'any.required': 'Delivery date is required',
      'date.min': 'Delivery date cannot be before order date'
    })
});

exports.updateOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required()
          .messages({
            'string.hex': 'Product ID must be a valid hexadecimal',
            'string.length': 'Product ID must be 24 characters long',
            'any.required': 'Product ID is required'
          }),
        quantity: Joi.number().min(1).max(1000).required()
          .messages({
            'number.min': 'Quantity must be at least 1',
            'number.max': 'Quantity cannot exceed 1000',
            'any.required': 'Quantity is required'
          })
      })
    )
    .min(1)
    .optional(),

  paymentType: Joi.string().valid("full", "partial").optional()
    .messages({
      'any.only': 'Payment type must be either full or partial'
    }),

  paymentMethodId: Joi.string().hex().length(24).optional()
    .messages({
      'string.hex': 'Payment Method ID must be a valid hexadecimal',
      'string.length': 'Payment Method ID must be 24 characters long'
    }),

  amountPaid: Joi.number().min(0).max(1000000).optional()
    .messages({
      'number.min': 'Amount paid cannot be negative',
      'number.max': 'Amount paid cannot exceed 1,000,000'
    }),

  orderDate: Joi.date().optional(),
  deliveryDate: Joi.date().optional(),
  
  status: Joi.string().valid("pending", "confirmed", "rejected", "delivered", "cancelled").optional()
}).min(1);