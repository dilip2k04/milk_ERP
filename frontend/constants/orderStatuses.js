// constants/orderStatuses.js

export const ORDER_STATUS = {
  PENDING: "pending",              // waiting for admin approval
  APPROVED: "approved",            // approved by admin
  REJECTED: "rejected",            // rejected by admin
  CANCELLED: "cancelled",          // cancelled by shopkeeper before approval
  DISPATCHED: "dispatched",        // moving to shop
  DELIVERED: "delivered",          // completed
};

export const PAYMENT_STATUS = {
  NOT_PAID: "not_paid",
  PARTIAL: "partial",
  PAID: "paid",
};
