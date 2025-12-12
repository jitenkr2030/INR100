"use client";

import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: ReactNode;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    notifications?: number;
  };
}

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}