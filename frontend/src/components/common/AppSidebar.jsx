// common/AppSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import useAuth from "../../hooks/useAuth";



const MENU = {
  admin: [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Products", path: "/admin/products", icon: "📦" },
    { name: "Milk Sessions", path: "/admin/sessions", icon: "🥛" },
    { name: "Upload CSV", path: "/admin/upload-csv", icon: "📤" },
    { name: "Milk Entries", path: "/admin/milk-entries", icon: "📜" },
    { name: "Rates", path: "/admin/rates", icon: "💱" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
    { name: "Shopkeeper Dues", path: "/admin/shopkeeper-dues", icon: "💰" },
    { name: "Farmer Payments", path: "/admin/farmer-payments", icon: "🧾" },
    { name: "Shopkeeper Payments", path: "/admin/shopkeeper-payments", icon: "💳" },
    { name: "Payment Methods", path: "/admin/payment-methods", icon: "🏦" },
    { name: "Discounts", path: "/admin/discounts", icon: "🏷️" },
    { name: "Reports", path: "/admin/reports", icon: "📈" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
    { name: "Profile", path: "/admin/profile", icon: "👤" },
  ],

  company: [
    { name: "Dashboard", path: "/company", icon: "📊" },
    { name: "Milk Usage", path: "/company/milk-usage", icon: "🥛" },
    { name: "Reports", path: "/company/reports", icon: "📈" },
  ],

  shop_keeper: [
    { name: "Dashboard", path: "/shop", icon: "🛒" },
    { name: "Place Order", path: "/shop/order", icon: "➕" },
    { name: "My Customers", path: "/shop/customers", icon: "👥" },
    { name: "Orders History", path: "/shop/orders", icon: "📜" },
    { name: "My Payments", path: "/shop/payments", icon: "💰" },
  ],

  farmer: [
    { name: "Dashboard", path: "/farmer", icon: "🌾" },
    { name: "Milk Records", path: "/farmer/milk", icon: "🥛" },
    { name: "Payments", path: "/farmer/payments", icon: "💰" },
  ],
};

export default function AppSidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const role = user?.role;

  const items = MENU[role] ?? [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role?.toUpperCase()}</SidebarGroupLabel>

          <SidebarGroupContent>
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
