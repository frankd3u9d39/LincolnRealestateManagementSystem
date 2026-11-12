"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";
import { FinanceSubNav } from "./FinanceSubNav";
import { MobileBottomNav } from "../mobile/MobileBottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
      {/* Top Navbar with Mobile Hamburger */}
      <Navbar onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />

      {/* Slide-over Drawer for Mobile */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main Body (Sidebar + Content) */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full pb-24 md:pb-8">
          <FinanceSubNav />
          {children}
        </main>
      </div>

      {/* Sticky Bottom Nav Bar for Mobile Screens */}
      <div className="md:hidden">
        <MobileBottomNav activeTab="finance" />
      </div>
    </div>
  );
}
