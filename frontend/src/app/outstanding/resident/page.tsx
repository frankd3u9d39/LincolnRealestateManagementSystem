"use client";

import React from "react";
import { ResidentFinanceSummaryView } from "@/components/resident-finance/ResidentFinanceSummaryView";
import { mockResidentFinanceSummary } from "@/data/mockResidentFinance";

export default function ResidentFinanceSummaryPage() {
  return <ResidentFinanceSummaryView data={mockResidentFinanceSummary} />;
}
