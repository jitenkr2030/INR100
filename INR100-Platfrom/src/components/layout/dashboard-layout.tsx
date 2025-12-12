"use client";

import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    level?: number;
    xp?: number;
    nextLevelXp?: number;
    walletBalance?: number;
    notifications?: number;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar user={user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}