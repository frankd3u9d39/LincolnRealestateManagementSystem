"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import LiveVerificationCard from "@/components/access/LiveVerificationCard";
import AccessAlertPanel from "@/components/access/AccessAlertPanel";
import GuestPassesPanel, { type GuestPass } from "@/components/access/GuestPassesPanel";
import AccessLogsTable, { type AccessLogRow } from "@/components/access/AccessLogsTable";

// ── mock data ──────────────────────────────────────────────────────────────
const GUEST_PASSES: GuestPass[] = [
  { id: "1", name: "Sarah K.",       subtitle: "Invited by #12A",    status: "cleared"  },
  { id: "2", name: "FedEx Delivery", subtitle: "One-time entry",     status: "cleared"  },
  { id: "3", name: "Mike Ross",      subtitle: "Expiring in 10m",    status: "expiring" },
];

const TRAFFIC_BARS = [
  { height: 30 }, { height: 50 }, { height: 40 }, { height: 70 },
  { height: 60 }, { height: 85, active: true }, { height: 90, active: true },
  { height: 75 }, { height: 65 }, { height: 55 }, { height: 45 }, { height: 35 },
];

const ACCESS_LOGS: AccessLogRow[] = [
  { id: "1", name: "Elara Aris",    role: "Resident · Block B",    gateNo: "Gate 02 (North)",   verificationType: "Face ID",   status: "Authorised", timestamp: "14:52:10" },
  { id: "2", name: "Marcus Brown",  role: "Guest · Visitor Pass",  gateNo: "Gate 01 (Main)",    verificationType: "QR Code",   status: "Success",    timestamp: "14:50:45" },
  { id: "3", name: "Unidentified",  role: "Unknown",               gateNo: "Gate 04 (Service)", verificationType: "Manual",    status: "Denied",     timestamp: "14:48:22", tag: "Blacklisted Attempt" },
  { id: "4", name: "Dante Leone",   role: "Contractor · Maintenance", gateNo: "Gate 03 (East)", verificationType: "QR Code",   status: "Success",    timestamp: "14:45:01" },
];
// ──────────────────────────────────────────────────────────────────────────

export default function AccessControlPage() {
  const [toastVisible, setToastVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 relative">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[--color-text]">Access Control Monitoring</h2>
          <p className="text-sm text-[--color-text-muted] mt-0.5">Live surveillance and entry authorisation management.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[--color-border] text-xs font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors">
            Filters
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[--color-primary] text-white text-xs font-bold hover:bg-[--color-primary-dark] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New Temporary Pass
          </button>
        </div>
      </div>

      {/* Top 3-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LiveVerificationCard
          personName="Julian Vance"
          personRole="Resident · Villa 402"
          matchScore={99.8}
          verificationType="Face/ID Biometric"
          gateLocation="North Entrance"
          verified={true}
        />
        <AccessAlertPanel
          failedTime="14:02"
          failureReason="Identity Mismatch"
          failureDetail="Manual override required for Main Pedestrian Gate. Verification score below 40%."
          flaggedSubject="Unknown Subject"
          trafficBars={TRAFFIC_BARS}
          totalEntries={1248}
        />
        <GuestPassesPanel passes={GUEST_PASSES} />
      </div>

      {/* Logs table */}
      <AccessLogsTable rows={ACCESS_LOGS} total={2450} />

      {/* Toast notification */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[--color-primary-dark] text-white px-4 py-3 rounded-xl shadow-xl max-w-xs">
          <div className="w-2 h-2 rounded-full bg-[--color-success] animate-pulse shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold">Entry Verified</p>
            <p className="text-[10px] opacity-80 mt-0.5">Julian Vance authorized at North Entrance.</p>
          </div>
          <button onClick={() => setToastVisible(false)} className="p-0.5 hover:opacity-70">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
