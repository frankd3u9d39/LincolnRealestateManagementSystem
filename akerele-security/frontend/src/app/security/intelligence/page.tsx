"use client";

import { useState } from "react";
import { Download, SlidersHorizontal, ChevronDown, RefreshCw } from "lucide-react";
import IntelStatCards from "@/components/intelligence/IntelStatCards";
import IntelFeedGrid, { type FeedItem } from "@/components/intelligence/IntelFeedGrid";
import { cn } from "@/lib/utils";

// ── mock data ──────────────────────────────────────────────────────────────
const FEED_ITEMS: FeedItem[] = [
  {
    id: "1",
    status: "URGENT",
    category: "PERIMETER_BREACH",
    timeAgo: "14 mins ago",
    title: "Unidentified Vehicle in Zone C",
    snippet: "Resident reported a dark sedan riding near the North Gate.",
    location: "North Gate Perimeter",
  },
  {
    id: "2",
    status: "ACTION_REQUIRED",
    category: "ACCESS_CONTROL",
    timeAgo: "42 mins ago",
    title: "Tampered Access Panel",
    snippet: "Physical tampering detected on the digital keypad of Block F.",
    location: "Residential Block F",
  },
  {
    id: "3",
    status: "INVESTIGATING",
    category: "SUSPICIOUS_ACTIVITY",
    timeAgo: "2 hours ago",
    title: "Individual Loitering at West Fence",
    snippet: "Security drone flagged a person in non-resident attire near the boundary trail.",
    location: "West Boundary Trail",
  },
  {
    id: "4",
    status: "RESOLVED",
    category: "DRONE_RECON",
    timeAgo: "5 hours ago",
    title: "Automated Perimeter Sweep",
    snippet: "Drone Unit 04 completed a full infrared sweep of the Central park area.",
    location: "Central Park Area",
  },
];

type FilterTab = "All Activities" | "Suspicious Activity" | "Perimeter Breach" | "Vehicle Tracking";
const FILTER_TABS: FilterTab[] = ["All Activities", "Suspicious Activity", "Perimeter Breach", "Vehicle Tracking"];
// ──────────────────────────────────────────────────────────────────────────

export default function IntelligenceFeedPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All Activities");
  const [urgency, setUrgency] = useState("All Levels");
  const [items, setItems] = useState(FEED_ITEMS);

  const filtered = items.filter((item) => {
    if (activeFilter === "Suspicious Activity") return item.category === "SUSPICIOUS_ACTIVITY";
    if (activeFilter === "Perimeter Breach")    return item.category === "PERIMETER_BREACH";
    if (activeFilter === "Vehicle Tracking")    return item.category === "VEHICLE_TRACKING";
    return true;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[--color-text]">Intelligence Feed</h2>
          <p className="text-sm text-[--color-text-muted] mt-0.5">Real-time situational awareness and resident reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[--color-border] text-xs font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[--color-primary] text-white text-xs font-bold hover:bg-[--color-primary-dark] transition-colors">
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <IntelStatCards urgentReports={4} resolvedToday={12} activePatrols={8} pendingReview={27} />

      {/* Filter bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-white border border-[--color-border] rounded-xl p-1">
          <span className="text-xs text-[--color-text-muted] px-2 font-medium whitespace-nowrap">Filter by:</span>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap",
                activeFilter === tab
                  ? "bg-[--color-primary] text-white"
                  : "text-[--color-text-muted] hover:bg-gray-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white border border-[--color-border] rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
          <span className="text-xs text-[--color-text-muted] font-medium">Urgency:</span>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="text-xs font-semibold text-[--color-text] bg-transparent outline-none cursor-pointer"
          >
            {["All Levels", "Urgent", "High", "Medium", "Low"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Feed grid */}
      <IntelFeedGrid items={filtered} />

      {/* Load older */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[--color-border] text-sm font-semibold text-[--color-text-muted] hover:bg-white hover:text-[--color-primary] transition-colors">
          <RefreshCw className="w-4 h-4" /> Load Older Reports
        </button>
      </div>
    </div>
  );
}
