import React from "react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RemindersWidget } from "@/components/dashboard/RemindersWidget";
import { EstateUpdatesWidget } from "@/components/dashboard/EstateUpdatesWidget";
import { MetricCardData } from "@/types/dashboard";

const metrics: MetricCardData[] = [
  {
    id: "residents",
    label: "TOTAL RESIDENTS",
    value: "1,248",
    trend: "+24",
    trendType: "positive",
    iconType: "residents",
  },
  {
    id: "houses",
    label: "OCCUPIED HOUSES",
    value: "356",
    badge: "94%",
    iconType: "houses",
  },
  {
    id: "revenue",
    label: "MONTHLY REVENUE",
    value: "₦15.2M",
    trend: "+8.4%",
    trendType: "positive",
    iconType: "revenue",
  },
  {
    id: "requests",
    label: "PENDING REQUESTS",
    value: "18",
    iconType: "requests",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner matching Figma */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
            Welcome back, Administrator
          </h1>
          <p className="text-sm sm:text-base text-muted mt-1 font-medium">
            Here&apos;s an overview of everything happening across LincolnEstate today.
          </p>
        </div>
      </div>

      {/* 4 Summary Cards: Responsive across mobile (1 col), tablet (2 cols), desktop (4 cols) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric) => (
          <SummaryCard key={metric.id} data={metric} />
        ))}
      </section>

      {/* Lower Grid: Reminders and Estate Updates */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        <RemindersWidget />
        <EstateUpdatesWidget />
      </section>
    </div>
  );
}
