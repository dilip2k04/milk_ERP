const { ROLES } = require("../config/appConfig");

const entities = [
  {
    name: "User",
    fileName: "user",
    route: "/users",
    modelPath: "../models/User",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "Farmer",
    fileName: "farmer",
    route: "/farmers",
    modelPath: "../models/Farmer",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "ProductType",
    fileName: "productType",
    route: "/product-types",
    modelPath: "../models/ProductType",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "Product",
    fileName: "product",
    route: "/products",
    modelPath: "../models/Product",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "ProductStock",
    fileName: "productStock",
    route: "/product-stocks",
    modelPath: "../models/ProductStock",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "MilkSession",
    fileName: "milkSession",
    route: "/milk-sessions",
    modelPath: "../models/MilkSession",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "MilkEntry",
    fileName: "milkEntry",
    route: "/milk-entries",
    modelPath: "../models/MilkEntry",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "MilkUsage",
    fileName: "milkUsage",
    route: "/milk-usage",
    modelPath: "../models/MilkUsage",
    allowedRoles: [ROLES.ADMIN, ROLES.COMPANY]
  },
  {
    name: "Customer",
    fileName: "customer",
    route: "/customers",
    modelPath: "../models/Customer",
    allowedRoles: [ROLES.SHOP_KEEPER, ROLES.ADMIN]
  },
  {
    name: "Order",
    fileName: "order",
    route: "/orders",
    modelPath: "../models/Order",
    allowedRoles: [ROLES.SHOP_KEEPER, ROLES.ADMIN]
  },
  {
    name: "Payment",
    fileName: "payment",
    route: "/payments",
    modelPath: "../models/Payment",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "PaymentMethod",
    fileName: "paymentMethod",
    route: "/payment-methods",
    modelPath: "../models/PaymentMethod",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "RateConfig",
    fileName: "rateConfig",
    route: "/rate-configs",
    modelPath: "../models/RateConfig",
    allowedRoles: [ROLES.ADMIN]
  },
  {
    name: "DiscountConfig",
    fileName: "discountConfig",
    route: "/discounts",
    modelPath: "../models/DiscountConfig",
    allowedRoles: [ROLES.ADMIN]
  }
];

module.exports = entities;
