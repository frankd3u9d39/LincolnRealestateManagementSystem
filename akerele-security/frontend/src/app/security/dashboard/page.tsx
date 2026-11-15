"use client";

import { useState } from "react";
import { Brain, AlertTriangle, Activity } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ThreatAlertBanner from "@/components/dashboard/ThreatAlertBanner";
import ReminderPanel from "@/components/dashboard/ReminderPanel";
import EstateUpdateCard from "@/components/dashboard/EstateUpdateCard";
import type { Reminder } from "@/components/dashboard/ReminderPanel";

// ── mock data ──────────────────────────────────────────────────────────────
const STATS = [
  { label: "Intelligent Reports",    value: 6,  icon: Brain         },
  { label: "Under Threat Reports",   value: 6,  icon: AlertTriangle },
  { label: "Estate Activities",      value: 29, icon: Activity      },
];

const REMINDERS: Reminder[] = [
  { id: "1", text: "Review overnight patrol logs before morning briefing.", time: "7:00 AM",  priority: "high"   },
  { id: "2", text: "Submit weekly intelligence summary to estate admin.",   time: "10:00 AM", priority: "medium" },
  { id: "3", text: "Conduct access-card audit for Block C residents.",      time: "12:00 PM", priority: "medium" },
  { id: "4", text: "Follow up on the two open blacklist applications.",     time: "2:00 PM",  priority: "low"    },
  { id: "5", text: "Brief incoming shift on active under-threat cases.",    time: "4:30 PM",  priority: "high"   },
  { id: "6", text: "Sync patrol schedule with security management HQ.",    time: "6:00 PM",  priority: "low"    },
];

const UPDATE = {
  author:    "Estate Admin",
  role:      "Estate Management",
  timestamp: "Today, 8:45 AM",
  body:      "All gate officers are reminded to enforce the new visitor pre-registration policy effective from today. Residents must pre-register guests at least 2 hours before arrival via the resident portal. Unregistered visitors will be held at Gate A pending verification.",
  imageUrl:  "/images/patrol-car.jpg",
};
// ──────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [threatVisible, setThreatVisible] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>(REMINDERS);

  return (
    <div className="flex flex-col gap-5">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
          />
        ))}
      </div>

      {/* Threat banner */}
      {threatVisible && (
        <ThreatAlertBanner
          count={6}
          onDismiss={() => setThreatVisible(false)}
          onView={() => {}}
        />
      )}

      {/* Two-column content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left – reminders */}
        <ReminderPanel
          reminders={reminders}
          onAdd={() => {
            const text = window.prompt("New reminder:");
            if (text?.trim()) {
              setReminders((prev) => [
                ...prev,
                {
                  id:       String(Date.now()),
                  text:     text.trim(),
                  time:     new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  priority: "low",
                },
              ]);
            }
          }}
        />

        {/* Right – estate update */}
        <EstateUpdateCard
          author={UPDATE.author}
          role={UPDATE.role}
          timestamp={UPDATE.timestamp}
          body={UPDATE.body}
          imageUrl={UPDATE.imageUrl}
        />
      </div>
    </div>
  );
}
