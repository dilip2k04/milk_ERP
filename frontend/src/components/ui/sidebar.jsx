import React from "react";
import { cn } from "@/lib/utils";

export function Sidebar({ className, children }) {
  return (
    <div className={cn("w-64 h-screen bg-gray-900 text-white flex flex-col", className)}>
      {children}
    </div>
  );
}

export function SidebarContent({ children }) {
  return <div className="flex-1 overflow-y-auto px-4">{children}</div>;
}

export function SidebarGroup({ children }) {
  return <div className="mt-4">{children}</div>;
}

export function SidebarGroupLabel({ children }) {
  return <div className="text-gray-400 text-xs uppercase font-bold mb-2 px-2">{children}</div>;
}

export function SidebarGroupContent({ children }) {
  return <div className="flex flex-col gap-1 px-2">{children}</div>;
}
