// utils/routeConfig.js

export const routeConfig = {
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "Products", path: "/admin/products" },
    { label: "Milk Sessions", path: "/admin/milk-sessions" },
    { label: "Upload CSV", path: "/admin/upload-csv" },
    { label: "Milk Entries", path: "/admin/milk-entries" },
    { label: "Milk Rates", path: "/admin/milk-rates" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Shopkeeper Dues", path: "/admin/shopkeeper-dues" },
    { label: "Farmer Payments", path: "/admin/farmer-payments" },
    { label: "Shopkeeper Payments", path: "/admin/shopkeeper-payments" },
    { label: "Payment Methods", path: "/admin/payment-methods" },
    { label: "Discounts", path: "/admin/discounts" },
    { label: "Reports", path: "/admin/reports" },
    { label: "Settings", path: "/admin/settings" },
    { label: "Profile", path: "/admin/profile" },
  ],

  company: [
    { label: "Dashboard", path: "/company" },
    { label: "Milk Summary", path: "/company/milk-summary" },
    { label: "Milk Usage", path: "/company/milk-usage" },
  ],

  shop_keeper: [
    { label: "Dashboard", path: "/shop" },
    { label: "Customers", path: "/shop/customers" },
    { label: "Create Order", path: "/shop/create-order" },
    { label: "Order History", path: "/shop/order-history" },
    { label: "Pending Payments", path: "/shop/pending-payments" },
    { label: "Profile", path: "/shop/profile" },
  ],

  farmer: [
    { label: "Dashboard", path: "/farmer" },
    { label: "Milk History", path: "/farmer/milk-history" },
    { label: "Payments", path: "/farmer/payments" },
    { label: "Profile", path: "/farmer/profile" },
  ],
};
