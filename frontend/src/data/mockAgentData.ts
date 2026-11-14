import { Agent, AgentDashboardData } from "@/types/agent";
import { isoDaysFromToday } from "@/lib/dates";

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-purple-100 text-purple-700",
  "bg-cyan-100 text-cyan-700",
  "bg-orange-100 text-orange-700",
  "bg-indigo-100 text-indigo-700",
];

export const avatarColorFor = (index: number) =>
  AVATAR_COLORS[index % AVATAR_COLORS.length];

export const initialsFor = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

type Seed = Omit<Agent, "id" | "initials" | "avatarBg">;

const seeds: Seed[] = [
  { name: "Chiamaka Okafor", email: "chiamaka.o@lincolnestate.ng", phone: "+234 803 412 7781", zone: "Phase 1 – Lekki", status: "Active", joinedOn: "2021-03-08", activeListings: 14, openLeads: 38, dealsClosed: 11, commission: 3850000, targetProgress: 92, rating: 4.9, reviews: 64 },
  { name: "Tunde Adebayo", email: "tunde.a@lincolnestate.ng", phone: "+234 806 551 2093", zone: "Phase 2 – Ajah", status: "Active", joinedOn: "2020-11-16", activeListings: 12, openLeads: 34, dealsClosed: 9, commission: 3120000, targetProgress: 81, rating: 4.7, reviews: 52 },
  { name: "Aisha Bello", email: "aisha.b@lincolnestate.ng", phone: "+234 809 220 4410", zone: "Phase 1 – Lekki", status: "Active", joinedOn: "2022-01-24", activeListings: 10, openLeads: 29, dealsClosed: 8, commission: 2640000, targetProgress: 74, rating: 4.8, reviews: 41 },
  { name: "Funke Ajayi", email: "funke.a@lincolnestate.ng", phone: "+234 813 908 3321", zone: "Phase 2 – Ajah", status: "Active", joinedOn: "2022-06-02", activeListings: 9, openLeads: 27, dealsClosed: 7, commission: 2280000, targetProgress: 66, rating: 4.6, reviews: 38 },
  { name: "Ibrahim Musa", email: "ibrahim.m@lincolnestate.ng", phone: "+234 817 640 5502", zone: "Phase 3 – Sangotedo", status: "Active", joinedOn: "2023-02-13", activeListings: 8, openLeads: 24, dealsClosed: 6, commission: 1960000, targetProgress: 58, rating: 4.5, reviews: 29 },
  { name: "Emeka Nwosu", email: "emeka.n@lincolnestate.ng", phone: "+234 802 117 6634", zone: "Phase 3 – Sangotedo", status: "On Leave", joinedOn: "2021-08-30", activeListings: 6, openLeads: 12, dealsClosed: 5, commission: 1710000, targetProgress: 48, rating: 4.4, reviews: 33 },
  { name: "Blessing Okon", email: "blessing.o@lincolnestate.ng", phone: "+234 708 223 9015", zone: "Phase 1 – Lekki", status: "Active", joinedOn: "2023-05-22", activeListings: 11, openLeads: 31, dealsClosed: 4, commission: 1420000, targetProgress: 52, rating: 4.6, reviews: 21 },
  { name: "Yusuf Danjuma", email: "yusuf.d@lincolnestate.ng", phone: "+234 811 470 2286", zone: "Phase 2 – Ajah", status: "Active", joinedOn: "2023-09-11", activeListings: 9, openLeads: 26, dealsClosed: 3, commission: 980000, targetProgress: 41, rating: 4.3, reviews: 17 },
  { name: "Grace Akinola", email: "grace.a@lincolnestate.ng", phone: "+234 814 556 7712", zone: "Phase 3 – Sangotedo", status: "Active", joinedOn: "2024-01-15", activeListings: 7, openLeads: 22, dealsClosed: 2, commission: 720000, targetProgress: 35, rating: 4.5, reviews: 12 },
  { name: "Samuel Etim", email: "samuel.e@lincolnestate.ng", phone: "+234 816 302 4478", zone: "Phase 1 – Lekki", status: "Active", joinedOn: "2024-04-08", activeListings: 6, openLeads: 19, dealsClosed: 1, commission: 410000, targetProgress: 22, rating: 4.2, reviews: 8 },
  { name: "Ngozi Eze", email: "ngozi.e@lincolnestate.ng", phone: "+234 805 332 9087", zone: "Phase 1 – Lekki", status: "Inactive", joinedOn: "2020-07-20", activeListings: 0, openLeads: 0, dealsClosed: 2, commission: 540000, targetProgress: 15, rating: 4.1, reviews: 26 },
  { name: "Kunle Bakare", email: "kunle.b@lincolnestate.ng", phone: "+234 818 664 1190", zone: "Phase 2 – Ajah", status: "On Leave", joinedOn: "2022-10-03", activeListings: 3, openLeads: 6, dealsClosed: 1, commission: 380000, targetProgress: 18, rating: 4.0, reviews: 14 },
];

export const mockAgents: Agent[] = seeds.map((s, i) => ({
  ...s,
  id: `AGT-${String(i + 1).padStart(3, "0")}`,
  initials: initialsFor(s.name),
  avatarBg: avatarColorFor(i),
}));

export const mockAgentDashboard: AgentDashboardData = {
  // Trailing 12 months (Dec 2025 – Nov 2026, Nov is month-to-date)
  performance: [
    { month: "Dec", dealsClosed: 3, commission: 1050000 },
    { month: "Jan", dealsClosed: 3, commission: 980000 },
    { month: "Feb", dealsClosed: 4, commission: 1240000 },
    { month: "Mar", dealsClosed: 6, commission: 1720000 },
    { month: "Apr", dealsClosed: 5, commission: 1510000 },
    { month: "May", dealsClosed: 7, commission: 2050000 },
    { month: "Jun", dealsClosed: 4, commission: 1300000 },
    { month: "Jul", dealsClosed: 6, commission: 1880000 },
    { month: "Aug", dealsClosed: 8, commission: 2400000 },
    { month: "Sep", dealsClosed: 5, commission: 1620000 },
    { month: "Oct", dealsClosed: 9, commission: 2760000 },
    { month: "Nov", dealsClosed: 4, commission: 1300000 },
  ],

  pipeline: [
    { stage: "New Leads", count: 124, color: "#3B82F6" },
    { stage: "Contacted", count: 86, color: "#8B5CF6" },
    { stage: "Viewing Scheduled", count: 54, color: "#C9A227" },
    { stage: "Negotiation", count: 31, color: "#F97316" },
    { stage: "Closed Won", count: 17, color: "#10B981" },
  ],

  agents: mockAgents,

  viewings: [
    { id: "VW-1041", property: "4-Bed Duplex, Block C12", client: "Mr. & Mrs. Olawale", agentId: "AGT-001", date: isoDaysFromToday(1), time: "10:00 AM", status: "Confirmed" },
    { id: "VW-1042", property: "3-Bed Terrace, Block A4", client: "Dr. Kelechi Obi", agentId: "AGT-002", date: isoDaysFromToday(1), time: "1:30 PM", status: "Pending" },
    { id: "VW-1043", property: "2-Bed Apartment, Tower B", client: "Halima Yusuf", agentId: "AGT-003", date: isoDaysFromToday(2), time: "11:00 AM", status: "Rescheduled" },
    { id: "VW-1044", property: "5-Bed Detached, Plot 22", client: "Segun Martins", agentId: "AGT-004", date: isoDaysFromToday(3), time: "3:00 PM", status: "Confirmed" },
    { id: "VW-1045", property: "3-Bed Semi-Detached, Block F2", client: "Amaka Nnadi", agentId: "AGT-001", date: isoDaysFromToday(4), time: "9:30 AM", status: "Pending" },
  ],
};
