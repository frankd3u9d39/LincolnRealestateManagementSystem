"use client";

import { useState } from "react";
import { Search, Filter, Plus, UserX } from "lucide-react";
import BlacklistStatCards from "@/components/blacklist/BlacklistStatCards";
import BlacklistTable, { type BlacklistEntry } from "@/components/blacklist/BlacklistTable";
import WatchlistAccounts, { type WatchlistAccount } from "@/components/blacklist/WatchlistAccounts";
import AddToBlacklistDrawer from "@/components/blacklist/AddToBlacklistDrawer";

// ── mock data ──────────────────────────────────────────────────────────────
const ENTRIES: BlacklistEntry[] = [
  {
    id: "1",
    name: "Julian Vance",
    entityId: "ID: LE-99101-X",
    reason: "Repeated Trespass",
    reasonDetail: "Active warrant (City PD)",
    riskLevel: "EXTREME",
    status: "RESTRICTED",
    lastAttemptedDate: "May 12, 2024",
    lastAttemptedTime: "22:15",
    lastAttemptedLocation: "North Pedestrian Gate",
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    entityId: "ID: LE-22460-W",
    reason: "Financial Fraud Suspect",
    reasonDetail: "Previous delivery spoofing",
    riskLevel: "ELEVATED",
    status: "UNDER_OBSERVATION",
    lastAttemptedDate: "Apr 29, 2024",
    lastAttemptedTime: "08:42",
    lastAttemptedLocation: "Main Security Entry",
  },
  {
    id: "3",
    name: "Marcus Thorne",
    entityId: "ID: LE-10204-V",
    reason: "Assault History",
    reasonDetail: "Aggressive behaviour at Gate 4",
    riskLevel: "EXTREME",
    status: "RESTRICTED",
    lastAttemptedDate: "June 02, 2024",
    lastAttemptedTime: "14:10",
    lastAttemptedLocation: "West Perimeter Wall",
  },
  {
    id: "4",
    name: "Leo Chen",
    entityId: "ID: LE-09532-S",
    reason: "Solicitation",
    reasonDetail: "Door-to-door violations",
    riskLevel: "LOW",
    status: "UNDER_OBSERVATION",
    lastAttemptedDate: "Mar 15, 2024",
    lastAttemptedTime: "11:30",
    lastAttemptedLocation: "Clubhouse Access",
  },
  {
    id: "5",
    name: "Walter Stern",
    entityId: "ID: LE-56123-Z",
    reason: "Harassment",
    reasonDetail: "Reported by Estate Admin",
    riskLevel: "ELEVATED",
    status: "UNDER_OBSERVATION",
    lastAttemptedDate: "May 30, 2024",
    lastAttemptedTime: "16:45",
    lastAttemptedLocation: "Main Administration Office",
  },
];

const WATCHLIST: WatchlistAccount[] = [
  {
    id: "w1",
    name: "Global Reach Corp.",
    subtitle: "Suspicious Wire Activity",
    type: "organisation",
    riskLevel: "Level 3 (Amber)",
    riskFactor: "Level 3 (Amber)",
    linkedUnit: "Penthouse A-12",
    action: "Review Ledger",
  },
  {
    id: "w2",
    name: "Unknown MAC Address",
    subtitle: "Network Intrusion Attempt",
    type: "network",
    riskLevel: "Level 5 (Red)",
    riskFactor: "Level 5 (Red)",
    accessNode: "Security Wi-Fi 04",
    action: "Isolate Port",
  },
  {
    id: "w3",
    name: "Plate: TX-992-K",
    subtitle: "Frequent Slow Drive",
    type: "vehicle",
    riskLevel: "Level 1 (Grey)",
    riskFactor: "Level 1 (Grey)",
    vehicle: "Dark SUV (2022)",
    action: "Track Movement",
  },
];
// ──────────────────────────────────────────────────────────────────────────

export default function BlacklistPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [entries, setEntries] = useState(ENTRIES);
  const [search, setSearch] = useState("");

  const filtered = entries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.entityId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[--color-text]">Blacklist &amp; Watchlist</h2>
          <p className="text-sm text-[--color-text-muted] mt-0.5">
            Manage restricted personnel and monitor high-risk entities within the estate perimeter.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[--color-border] text-xs font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter List
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[--color-danger] text-white text-xs font-bold hover:opacity-90 transition-opacity"
          >
            <UserX className="w-3.5 h-3.5" /> Add to Blacklist
          </button>
        </div>
      </div>

      {/* Stats */}
      <BlacklistStatCards
        totalBlacklisted={5}
        highRiskAlerts={2}
        watchlistEntries={3}
        clearedRemoved={0}
      />

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-[--color-border] rounded-lg px-3 py-2.5 w-full max-w-sm">
        <Search className="w-4 h-4 text-[--color-text-subtle] shrink-0" />
        <input
          type="search"
          placeholder="Search blacklist by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-[--color-text] placeholder:text-[--color-text-subtle] outline-none w-full"
        />
      </div>

      {/* Table */}
      <BlacklistTable entries={filtered} onViewProfile={(id) => console.log("View profile", id)} />

      {/* Watchlist */}
      <WatchlistAccounts accounts={WATCHLIST} />

      {/* FAB */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[--color-primary] text-white shadow-lg flex items-center justify-center hover:bg-[--color-primary-dark] transition-colors z-20"
        aria-label="Add to blacklist"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add drawer */}
      <AddToBlacklistDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(data) => {
          setEntries((prev) => [
            {
              id: String(Date.now()),
              name: data.name,
              entityId: data.entityId || "ID: TBD",
              reason: data.reason,
              reasonDetail: data.details,
              riskLevel: data.riskLevel as BlacklistEntry["riskLevel"],
              status: "RESTRICTED",
              lastAttemptedDate: "—",
              lastAttemptedTime: "—",
              lastAttemptedLocation: "—",
            },
            ...prev,
          ]);
        }}
      />
    </div>
  );
}
