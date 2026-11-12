"use client";

import React, { useState } from "react";
import { Download, Plus, CreditCard, BarChart2 } from "lucide-react";
import { MetricCards } from "@/components/finance/MetricCards";
import { RevenueHistoryChart } from "@/components/finance/RevenueHistoryChart";
import { RevenueByServiceChart } from "@/components/finance/RevenueByServiceChart";
import { RevenueBreakdownsTable } from "@/components/finance/RevenueBreakdownsTable";
import { MobileMetricCards } from "@/components/mobile/MobileMetricCards";
import { MobileRevenueTrends } from "@/components/mobile/MobileRevenueTrends";
import { MobileTransactionsList } from "@/components/mobile/MobileTransactionsList";
import { mockFinanceOverview } from "@/data/mockFinanceData";
import { mockMobileFinanceData } from "@/data/mockMobileFinanceData";

export default function FinanceDashboardPage() {
  const [desktopData] = useState(mockFinanceOverview);
  const [mobileData] = useState(mockMobileFinanceData);

  return (
    <>
      {/* =========================================================================
          1. NATIVE MOBILE VIEW (< 768px): Task 3 Finance Mobile Dashboard
          Automatically displays on any mobile phone or narrow viewport
          ========================================================================= */}
      <div className="block md:hidden space-y-5">
        {/* Mobile Greeting */}
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Good Morning, {mobileData.greetingName}
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Here&apos;s your property portfolio performance today.
          </p>
        </div>

        {/* 3 Stripe Highlight Metric Cards */}
        <MobileMetricCards metrics={mobileData.metrics} />

        {/* 6-Month Revenue Trends Timeline */}
        <MobileRevenueTrends months={mobileData.trendMonths} />

        {/* Recent Transactions List */}
        <MobileTransactionsList transactions={mobileData.recentTransactions} />

        {/* Action Buttons: New Payment + Export Report */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-xs font-bold text-white shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            <span>New Payment</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-200/80 py-3 text-xs font-bold text-dark hover:bg-slate-300/80 transition-colors"
          >
            <BarChart2 className="h-4 w-4 text-accent" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. NATIVE DESKTOP VIEW (>= 768px): Task 1 Finance Dashboard 1
          Automatically displays on laptops, monitors, and tablets
          ========================================================================= */}
      <div className="hidden md:block space-y-6">
        {/* Page Title & Quick Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-dark">
              Financial Overview
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Track and manage estate revenues and payments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-dark shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Download className="h-4 w-4 text-accent" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Transaction</span>
            </button>
          </div>
        </div>

        {/* 6 Key Financial Metrics */}
        <MetricCards metrics={desktopData.metrics} />

        {/* Mid Section: History Spline Chart + Service Share Donut */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <RevenueHistoryChart data={desktopData.revenueHistory} />
          </div>
          <div className="lg:col-span-4">
            <RevenueByServiceChart data={desktopData.revenueByService} />
          </div>
        </div>

        {/* Bottom Section: Service Revenue Breakdowns Table */}
        <RevenueBreakdownsTable breakdowns={desktopData.breakdowns} />
      </div>
    </>
  );
}
