// constants/apiRoutes.js

export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },

  USERS: {
    BASE: "/users",
  },

  PRODUCT_TYPES: {
    BASE: "/product-types",
  },

  PRODUCTS: {
    BASE: "/products",
  },

  PRODUCT_STOCK: {
    BASE: "/product-stocks",
  },

  MILK_SESSIONS: {
    BASE: "/milk-sessions",
  },

  MILK_ENTRIES: {
    BASE: "/milk-entries",
  },

  CSV_UPLOAD: {
    BASE: "/milk/upload-csv",
  },

  RATE_CONFIGS: {
    BASE: "/rate-configs",
  },

  MILK_USAGE: {
    BASE: "/milk-usage",
  },

  CUSTOMERS: {
    BASE: "/customers",
  },

  ORDERS: {
    BASE: "/orders",
    APPROVE: (id) => `/orders/${id}/approve`,
    CANCEL: (id) => `/orders/${id}/cancel`,
  },

  PAYMENTS: {
    BASE: "/payments",
    FARMER: "/payments/farmer",
    SHOPKEEPER: "/payments/shopkeeper",
  },

  PAYMENT_METHODS: {
    BASE: "/payment-methods",
  },

  DISCOUNTS: {
    BASE: "/discounts",
  },

  REPORTS: {
    MILK: "/reports/milk",
    FINANCE: "/reports/finance",
    SALES: "/reports/sales",
    FARMER: "/reports/farmer",
  },
};
