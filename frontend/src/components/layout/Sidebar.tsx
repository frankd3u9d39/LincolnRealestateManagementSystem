"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Store,
  MessageSquare,
  BarChart3,
  Users,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Finance", href: "/finance", icon: CreditCard },
  { name: "Store", href: "/store", icon: Store },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: 6 },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Staffs", href: "/staffs", icon: Users },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-surface-card border-r border-border transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-border/60">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            {/* Monogram Logo */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white font-bold text-lg shadow-md transition-transform group-hover:scale-105">
              <span className="tracking-tighter">LE</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-dark">
                Lincoln<span className="text-primary">Estate</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-muted uppercase">
                Admin Dashboard
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-surface-subtle lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard"));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-white shadow-sm font-semibold"
                    : "text-muted hover:text-dark hover:bg-surface-subtle"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-white" : "text-muted group-hover:text-primary"
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-bold rounded-full",
                      isActive
                        ? "bg-white text-primary"
                        : "bg-accent text-dark"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Security / System Footer */}
        <div className="p-4 border-t border-border/60">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-2 rounded-lg bg-surface-subtle text-[11px] font-medium text-muted">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Lincoln Guard v2.4 Active</span>
          </div>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                window.location.href = "/login";
              }
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-primary hover:bg-primary-light transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
