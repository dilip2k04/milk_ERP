// common/AppHeader.jsx
import useAuth from "../../hooks/useAuth";

import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">
      <h1 className="text-xl font-semibold tracking-tight">
        Milk ERP System
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>

        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
