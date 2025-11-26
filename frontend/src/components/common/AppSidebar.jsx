// common/AppSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import useAuth from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Package,
  Layers,
  Droplets,
  Upload,
  FileText,
  IndianRupee,
  ShoppingCart,
  CreditCard,
  Receipt,
  Wallet,
  Building,
  Tag,
  BarChart3,
  Settings,
  User
} from "lucide-react";

const MENU = {
  admin: [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Products Type", path: "/admin/product-type", icon: Layers },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Milk Sessions", path: "/admin/milk-sessions", icon: Droplets },
    { name: "Upload CSV", path: "/admin/upload-csv", icon: Upload },
    { name: "Milk Entries", path: "/admin/milk-entries", icon: FileText },
    { name: "Farmers", path: "/admin/farmers", icon: Users },
    { name: "Rates", path: "/admin/milk-rates", icon: IndianRupee },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Shopkeeper Dues", path: "/admin/shopkeeper-dues", icon: CreditCard },
    { name: "Farmer Payments", path: "/admin/farmer-payments", icon: Receipt },
    { name: "Shopkeeper Payments", path: "/admin/shopkeeper-payments", icon: Wallet },
    { name: "Payment Methods", path: "/admin/payment-methods", icon: Building },
    { name: "Discounts", path: "/admin/discounts", icon: Tag },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Profile", path: "/admin/profile", icon: User },
  ],

  company: [
    { name: "Dashboard", path: "/company", icon: LayoutDashboard },
    { name: "Milk Usage", path: "/company/milk-usage", icon: Droplets },
    { name: "Reports", path: "/company/reports", icon: BarChart3 },
  ],

  shop_keeper: [
    { name: "Dashboard", path: "/shop", icon: LayoutDashboard },
    { name: "Place Order", path: "/shop/order", icon: ShoppingCart },
    { name: "My Customers", path: "/shop/customers", icon: Users },
    { name: "Orders History", path: "/shop/orders", icon: FileText },
    { name: "My Payments", path: "/shop/payments", icon: Wallet },
  ],

  farmer: [
    { name: "Dashboard", path: "/farmer", icon: LayoutDashboard },
    { name: "Milk Records", path: "/farmer/milk-history", icon: Droplets },
    { name: "Payments", path: "/farmer/payments", icon: CreditCard },
  ],
};

export default function AppSidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const role = user?.role;

  const items = MENU[role] ?? [];

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent className="space-y-1">
            {items.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  <IconComponent className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isActive ? "text-white" : "text-gray-500"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}