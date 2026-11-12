"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ResidentFinanceSummaryView } from "@/components/resident-finance/ResidentFinanceSummaryView";
import { getResidentFinanceById } from "@/data/mockResidentFinance";

export default function DynamicResidentFinanceSummaryPage() {
  const params = useParams();
  const id = (params?.id as string) || "marcus-holloway";
  const data = getResidentFinanceById(id);

  return <ResidentFinanceSummaryView data={data} />;
}
