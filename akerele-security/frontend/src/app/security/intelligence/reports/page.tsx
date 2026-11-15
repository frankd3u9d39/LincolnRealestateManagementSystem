import { Brain } from "lucide-react";
import IntelReportTable, { type ReportRow } from "@/components/intelligence/IntelReportTable";

// ── mock data ──────────────────────────────────────────────────────────────
const REPORT_ROWS: ReportRow[] = [
  { id: "1",  name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "2",  name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "3",  name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "4",  name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "5",  name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "6",  name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "7",  name: "Devon Lane",      houseNumber: "LEHN123B", date: "23-10-2023", report: "Suspicious Vehicle at Gate" },
  { id: "8",  name: "Savannah Nguyen", houseNumber: "LEHN123B", date: "23-10-2023", report: "Noise Disturbance at Night" },
  { id: "9",  name: "Ralph Edwards",   houseNumber: "LEHN123B", date: "23-10-2023", report: "Broken Fence Section" },
  { id: "10", name: "Jenny Wilson",    houseNumber: "LEHN123B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "11", name: "Robert Fox",      houseNumber: "LEHN123B", date: "23-10-2023", report: "Suspicious Activity" },
];
// ──────────────────────────────────────────────────────────────────────────

export default function IntelligenceReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Stat header */}
      <div className="bg-white rounded-xl border border-[--color-border] p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[--color-primary-light] flex items-center justify-center shrink-0">
          <Brain className="w-7 h-7 text-[--color-primary]" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[--color-text]">6</p>
          <p className="text-sm text-[--color-text-muted] mt-0.5">Intelligent Reports</p>
        </div>
      </div>

      {/* Table */}
      <IntelReportTable
        title="List Of All Intelligent Report"
        rows={REPORT_ROWS}
        total={120}
        showViewButton={true}
      />
    </div>
  );
}
