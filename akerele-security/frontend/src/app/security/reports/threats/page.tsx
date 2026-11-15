import { ShieldAlert } from "lucide-react";
import IntelReportTable, { type ReportRow } from "@/components/intelligence/IntelReportTable";

// ── mock data ──────────────────────────────────────────────────────────────
const ROWS: ReportRow[] = [
  { id: "1", name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "2", name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "3", name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "4", name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "5", name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
  { id: "6", name: "David Onyemenam", houseNumber: "EHN102B", date: "23-10-2023", report: "Unknown Face in My Compound" },
];
// ──────────────────────────────────────────────────────────────────────────

export default function UnderThreatReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Stat header */}
      <div className="bg-white rounded-xl border border-[--color-border] p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[--color-danger-light] flex items-center justify-center shrink-0">
          <ShieldAlert className="w-7 h-7 text-[--color-danger]" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[--color-text]">6</p>
          <p className="text-sm text-[--color-text-muted] mt-0.5">Under Threat Reports</p>
        </div>
      </div>

      {/* Table — reuses the same component pattern */}
      <IntelReportTable
        title="List Of All Life Under Threat Reports"
        rows={ROWS}
        total={ROWS.length}
        showViewButton={false}
      />
    </div>
  );
}
