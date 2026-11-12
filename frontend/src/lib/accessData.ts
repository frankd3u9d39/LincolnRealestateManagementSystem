import {
  AccessMetricCard,
  AccessLogItem,
  SecuritySummaryData,
  MobileAccessMetric,
  MobileAccessLogCardItem,
} from "@/types/access";

export const initialAccessMetrics: AccessMetricCard[] = [
  {
    id: "total-checkins",
    label: "TOTAL CHECK-INS",
    value: "245",
    iconType: "checkin",
  },
  {
    id: "total-checkouts",
    label: "TOTAL CHECK-OUTS",
    value: "180",
    iconType: "checkout",
  },
  {
    id: "residents-inside",
    label: "RESIDENTS INSIDE",
    value: "1,240",
    iconType: "residents",
  },
  {
    id: "visitors-inside",
    label: "VISITORS INSIDE",
    value: "45",
    iconType: "visitors",
  },
];

export const initialAccessLogs: AccessLogItem[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    person_type: "Resident",
    avatar_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    house_no: "Villa B-12",
    check_in: "08:45 AM",
    check_out: "-",
    gate: "Main Gate",
    status: "in_estate",
  },
  {
    id: 2,
    name: "Mark Davis",
    person_type: "Visitor (Food Delivery)",
    initials: "MD",
    house_no: "Apt 402",
    check_in: "09:12 AM",
    check_out: "09:35 AM",
    gate: "Service Gate",
    status: "checked_out",
  },
  {
    id: 3,
    name: "Robert Chen",
    person_type: "Resident",
    avatar_url:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    house_no: "Townhouse 7",
    check_in: "07:30 AM",
    check_out: "10:15 AM",
    gate: "Main Gate",
    status: "checked_out",
  },
  {
    id: 4,
    name: "Emma Watson",
    person_type: "Visitor (Guest)",
    initials: "EW",
    house_no: "Villa B-12",
    check_in: "10:45 AM",
    check_out: "-",
    gate: "Main Gate",
    status: "in_estate",
  },
  {
    id: 5,
    name: "David Lee",
    person_type: "Resident",
    avatar_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    house_no: "Apt 105",
    check_in: "11:20 AM",
    check_out: "-",
    gate: "East Gate",
    status: "in_estate",
  },
  // Additional logs revealed when clicking "View All Logs"
  {
    id: 6,
    name: "Marcus Thorne",
    person_type: "Resident",
    avatar_url:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    house_no: "Villa A-04",
    check_in: "11:42 AM",
    check_out: "-",
    gate: "Main Gate",
    status: "in_estate",
  },
  {
    id: 7,
    name: "Lucas Grant",
    person_type: "Visitor (Contractor)",
    initials: "LG",
    house_no: "Townhouse 3",
    check_in: "08:10 AM",
    check_out: "11:50 AM",
    gate: "Service Gate",
    status: "checked_out",
  },
  {
    id: 8,
    name: "Elena Rodriguez",
    person_type: "Resident",
    avatar_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    house_no: "Apt 210",
    check_in: "12:05 PM",
    check_out: "-",
    gate: "East Gate",
    status: "in_estate",
  },
];

export const initialSecuritySummary: SecuritySummaryData = {
  vehicles_entered: 185,
  vehicles_trend: "↑ 12%",
  pedestrians: 60,
  pedestrians_trend: "↓ 3%",
  alert_title: "ALERTS",
  alert_description: "2 Unregistered vehicles attempted entry at Service Gate.",
  incidents: [
    {
      id: 1,
      time: "09:48 AM",
      gate: "Service Gate",
      plate: "LND-849-KJ",
      description: "Unregistered commercial van denied automatic barrier access.",
      resolved: false,
    },
    {
      id: 2,
      time: "10:32 AM",
      gate: "Service Gate",
      plate: "ABJ-310-TR",
      description: "Expired contractor pass flagged by ANPR camera.",
      resolved: false,
    },
  ],
  active_personnel: [
    {
      id: 1,
      name: "Officer Samuel Okafor",
      role: "Chief Security Officer",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 2,
      name: "Officer Daniel Mensah",
      role: "Main Gate Supervisor",
      avatar_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 3,
      name: "Officer Grace Nwosu",
      role: "Patrol Lead",
      avatar_url:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80",
    },
  ],
  extra_personnel_count: 4,
};

/* ---------- Mobile Check-In / Check-Out Data (Task 12) ---------- */

export const mobileAccessMetrics: MobileAccessMetric[] = [
  {
    id: "m-checkins",
    label: "Total Check-ins",
    value: "142",
    iconType: "checkin",
  },
  {
    id: "m-checkouts",
    label: "Total Check-outs",
    value: "98",
    iconType: "checkout",
  },
  {
    id: "m-residents",
    label: "Residents Inside",
    value: "845",
    iconType: "residents",
  },
  {
    id: "m-visitors",
    label: "Visitors Inside",
    value: "34",
    iconType: "visitors",
  },
];

export const initialMobileAccessLogs: MobileAccessLogCardItem[] = [
  {
    id: 1,
    initials: "JS",
    name: "John Smith",
    unit_label: "Unit 402",
    badge_type: "Resident",
    action_type: "Check-in",
    time: "08:15 AM",
    gate: "Main Gate",
    vehicle: "ABC-1234",
  },
  {
    id: 2,
    initials: "AD",
    name: "Alice Doe",
    unit_label: "Visiting: Unit 105",
    badge_type: "Visitor",
    action_type: "Check-out",
    time: "09:30 AM",
    gate: "East Gate",
    vehicle: "Walk-in",
  },
  {
    id: 3,
    initials: "DP",
    name: "Delivery Pro",
    unit_label: "Delivery: Block B",
    badge_type: "Service",
    action_type: "Check-in",
    time: "10:05 AM",
    gate: "Service Gate",
    vehicle: "XYZ-9876",
  },
  {
    id: 4,
    initials: "SJ",
    name: "Sarah Jenkins",
    unit_label: "Villa B-12",
    badge_type: "Resident",
    action_type: "Check-in",
    time: "10:40 AM",
    gate: "Main Gate",
    vehicle: "LND-402",
  },
  {
    id: 5,
    initials: "RC",
    name: "Robert Chen",
    unit_label: "Townhouse 7",
    badge_type: "Resident",
    action_type: "Check-out",
    time: "11:15 AM",
    gate: "Main Gate",
    vehicle: "ABJ-918",
  },
  {
    id: 6,
    initials: "EW",
    name: "Emma Watson",
    unit_label: "Visiting: Villa B-12",
    badge_type: "Visitor",
    action_type: "Check-in",
    time: "11:50 AM",
    gate: "East Gate",
    vehicle: "Walk-in",
  },
];

