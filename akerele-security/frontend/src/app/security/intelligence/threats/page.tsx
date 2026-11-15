import { AlertTriangle } from "lucide-react";
import IntelReportTable, { type ReportRow } from "@/components/intelligence/IntelReportTable";

// ── mock data ──────────────────────────────────────────────────────────────
const THREAT_ROWS: ReportRow[] = [
  { id: "1",  name: "Devon Lane",          houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "2",  name: "Savannah Nguyen",     houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "3",  name: "Ralph Edwards",       houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "4",  name: "Jenny Wilson",        houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "5",  name: "Robert Fox",          houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "6",  name: "Esther Howard",       houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "7",  name: "Arlene McCoy",        houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "8",  name: "Floyd Miles",         houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "9",  name: "Cameron Williamson",  houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "10", name: "Wade Warren",         houseNumber: "LEHN123B", date: "23-10-2023" },
  { id: "11", name: "Esther Howard",       houseNumber: "LEHN123B", date: "23-10-2023" },
];
// ──────────────────────────────────────────────────────────────────────────

export default function LifeThreatAlertsPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Stat header */}
      <div className="bg-white rounded-xl border border-[--color-border] p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[--color-danger-light] flex items-center justify-center shrink-0">
          <AlertTriangle className="w-7 h-7 text-[--color-danger]" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[--color-text]">11</p>
          <p className="text-sm text-[--color-text-muted] mt-0.5">Life Threat Alerts</p>
        </div>
      </div>

      {/* Table — no view button, matches design */}
      <IntelReportTable
        title="List of Life Threat Alerts"
        rows={THREAT_ROWS}
        total={120}
        showViewButton={false}
      />
    </div>
  );
}
