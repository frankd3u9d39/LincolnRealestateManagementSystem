import EmergencyCommandCenter from "@/components/hq/EmergencyCommandCenter";
import ResidentAccessTable, { type ResidentRow } from "@/components/hq/ResidentAccessTable";
import IntelFeedCard, { type IntelItem } from "@/components/hq/IntelFeedCard";
import SecurityRevenueCard from "@/components/hq/SecurityRevenueCard";

// ── mock data ──────────────────────────────────────────────────────────────
const ACTIVE_ALERTS = [
  {
    id: "1",
    type: "LIFE_UNDER_THREAT" as const,
    resident: "Sarah Williams — Villa 402",
    location: "Villa 402",
    detail: "Panic button triggered. Possible intrusion.",
    time: "02:14m ago",
  },
  {
    id: "2",
    type: "MEDICAL_ALERT" as const,
    resident: "John Doe — North Gate",
    location: "North Gate",
    detail: "Elderly resident requires assistance.",
    time: "15:00m ago",
  },
];

const RESIDENTS: ResidentRow[] = [
  {
    id: "1",
    name: "Viktor Krumov",
    tag: "Blacklisted (Criminal History)",
    status: "RESTRICTED",
    lastActivity: "Attempted Entry: Gate 4 (12h ago)",
  },
  {
    id: "2",
    name: "Sarah Williams",
    tag: "Verified Resident",
    status: "ACTIVE_EMERGENCY",
    lastActivity: "Panic Trigger (Sector 4)",
  },
  {
    id: "3",
    name: "Marc Thompson",
    tag: "Contractor (Elevator Repair)",
    status: "PENDING_EXIT",
    lastActivity: "Entered Gate 1 (2h ago)",
  },
];

const INTEL_ITEMS: IntelItem[] = [
  {
    id: "1",
    title: "Unrecognized Vehicle 123",
    snippet: "Black SUV seen circling Perimeter Fence B for 15 minutes without stopping.",
    tags: [{ label: "Suspicious", variant: "suspicious" }, { label: "External", variant: "external" }],
    time: "1h ago",
  },
  {
    id: "2",
    title: "Fence Breach Alert 10",
    snippet: "Hole detected in sector 4. Sanson 88 triggered once.",
    tags: [{ label: "Investigation", variant: "investigation" }],
    time: "3h ago",
  },
];

const REVENUE_ROWS = [
  { label: "Monthly Subscriptions", value: "98.2%"  },
  { label: "Service Fees",          value: "$4,230"  },
  { label: "Outstanding Dues",      value: "$1,890"  },
];
// ──────────────────────────────────────────────────────────────────────────

export default function SecurityHQPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Top row: command center + right column */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left + Center — Emergency Command Center */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <EmergencyCommandCenter alerts={ACTIVE_ALERTS} highPriorityCount={3} />
          <ResidentAccessTable rows={RESIDENTS} />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          <IntelFeedCard items={INTEL_ITEMS} />
          <SecurityRevenueCard
            total="142,500.00"
            rows={REVENUE_ROWS}
            chartBars={[40, 55, 45, 70, 80, 90, 75]}
          />
        </div>
      </div>
    </div>
  );
}
