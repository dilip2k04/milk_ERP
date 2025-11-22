// common/AppHeader.jsx
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  User,
  Settings,
  Building,
  ChevronDown,
} from "lucide-react";

export default function AppHeader() {
  const { user, logout } = useAuth();

  const formatRoleName = (role) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-black rounded-lg">
          <Building className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-black">
          MilkERP
        </h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-black">{user?.name}</p>
            <Badge 
              variant="outline" 
              className="text-xs font-medium px-2 py-0 h-5 bg-gray-100 text-gray-700 border-gray-300"
            >
              {formatRoleName(user?.role)}
            </Badge>

            
          </div>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1 p-2 hover:bg-gray-100"
            >
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-black">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700">
              <User className="h-4 w-4" />
              <span className="text-sm">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={logout}
              className="flex items-center gap-2 cursor-pointer text-gray-700"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Simple Logout Button for mobile */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={logout}
          className="md:hidden flex items-center gap-2 border-gray-300 text-gray-700"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}