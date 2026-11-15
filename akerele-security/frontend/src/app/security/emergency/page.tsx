"use client";

import { useState } from "react";
import { Filter, Download, MapPin } from "lucide-react";
import ActiveAlertCard, { type ActiveAlertData } from "@/components/emergency/ActiveAlertCard";
import EmergencyHistoryTable, { type HistoryRow } from "@/components/emergency/EmergencyHistoryTable";
import EmergencyReportPanel from "@/components/emergency/EmergencyReportPanel";

// ── mock data ──────────────────────────────────────────────────────────────
const ACTIVE_ALERTS: ActiveAlertData[] = [
  {
    id: "1",
    variant: "primary",
    severity: "CRITICAL",
    title: "Life Under Threat",
    location: "Villa 402-B",
    section: "Section: Highland Crest",
    detail: "Unauthorized entry reported via panic button.",
    resident: "Dr. Helena Vane",
    timeElapsed: "04m 15s",
    dispatched: "Alpha Squad",
    eta: "ETA 2m",
  },
  {
    id: "2",
    variant: "secondary",
    severity: "MEDICAL",
    title: "Medical Assistance Req.",
    location: "Villa 12-A (Clubside)",
    section: "",
    detail: "",
    resident: "Marcus Thorne",
    timeElapsed: "08:42 AM",
    dispatched: "Medic Unit",
    status: "Medic En Route",
  },
];

const HISTORY: HistoryRow[] = [
  { id: "1", date: "Oct 24, 2023", time: "02:15 AM", alertType: "Fire Alarm",          resident: "Sarah Jenkins",   location: "Villa 88-C",      status: "Resolved"     },
  { id: "2", date: "Oct 23, 2023", time: "11:45 PM", alertType: "Intrusion Sensor",    resident: "System Trigger",  location: "Perimeter Zone 2",status: "Investigating" },
  { id: "3", date: "Oct 23, 2023", time: "09:30 PM", alertType: "Medical",             resident: "Arthur Pendragon",location: "Villa 120-A",     status: "Resolved"     },
  { id: "4", date: "Oct 23, 2023", time: "04:12 PM", alertType: "Suspicious Activity", resident: "Guard Observation",location: "North Entrance",  status: "Pending"      },
];

const CONTACTS = [
  { name: "Estate Security Post", number: "+234 801 234 5678" },
  { name: "Local Police (SAPS)",  number: "+234 802 345 6789" },
];
// ──────────────────────────────────────────────────────────────────────────

export default function EmergencyAlertsPage() {
  const [alerts, setAlerts] = useState(ACTIVE_ALERTS);
  const [mapOpen, setMapOpen] = useState(false);

  function handleResolve(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[--color-text]">Emergency Alerts</h2>
          <p className="text-sm text-[--color-text-muted] mt-0.5">Real-time threat monitoring and incident response management.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[--color-border] text-xs font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[--color-border] text-xs font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export Log
          </button>
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: alerts + history */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {/* Active emergencies */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-[--color-text]">🔴 Active Emergencies</span>
              {alerts.length > 0 && (
                <span className="bg-[--color-danger] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {alerts.length} URGENT
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alerts.map((alert) => (
                <ActiveAlertCard
                  key={alert.id}
                  alert={alert}
                  onResolve={handleResolve}
                />
              ))}
              {alerts.length === 0 && (
                <div className="col-span-2 py-8 text-center text-sm text-[--color-text-muted] bg-white rounded-xl border border-[--color-border]">
                  No active emergencies.
                </div>
              )}
            </div>
          </div>

          {/* History table */}
          <EmergencyHistoryTable rows={HISTORY} total={124} />
        </div>

        {/* Right: report panel + tactical map toggle */}
        <div className="flex flex-col gap-5">
          <EmergencyReportPanel contacts={CONTACTS} />

          {/* Live tactical map */}
          <div className="bg-white rounded-xl border border-[--color-border] overflow-hidden">
            <button
              onClick={() => setMapOpen((p) => !p)}
              className="flex items-center justify-between w-full px-5 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[--color-primary]" />
                <span className="text-sm font-semibold text-[--color-text]">Live Tactical Map</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[--color-danger] animate-pulse" />
            </button>
            {mapOpen && (
              <div className="h-48 bg-gray-100 flex items-center justify-center border-t border-[--color-border]">
                <p className="text-xs text-[--color-text-subtle]">Map view — connect mapping service</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
