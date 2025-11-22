// src/utils/calcOutstanding.js

/**
 * Utility to sum outstanding from orders list (for shopkeepers).
 */
function calcShopkeeperOutstanding(orders) {
  return orders.reduce((sum, order) => sum + (order.balance || 0), 0);
}

/**
 * Utility to sum outstanding for farmers.
 */
function calcFarmerOutstanding(farmers) {
  return farmers.reduce(
    (sum, farmer) => sum + (farmer.financials?.totalOutstanding || 0),
    0
  );
}

module.exports = { calcShopkeeperOutstanding, calcFarmerOutstanding };
