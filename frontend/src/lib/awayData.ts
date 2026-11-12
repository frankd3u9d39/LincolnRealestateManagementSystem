import {
  AwayMetricCard,
  AwayResidentRecord,
  UpcomingReturnItem,
  ResidentSelectOption,
  MobileAwayMetric,
  MobileActiveAwayLogItem,
} from "@/types/away";

export const initialAwayMetrics: AwayMetricCard[] = [
  {
    id: "residents-away",
    label: "RESIDENTS AWAY",
    value: 14,
    iconType: "away",
  },
  {
    id: "expected-returns",
    label: "EXPECTED RETURNS (7 DAYS)",
    value: 3,
    iconType: "returns",
  },
  {
    id: "security-alerts",
    label: "SECURITY ALERTS",
    value: 0,
    iconType: "alerts",
  },
];

export const residentSelectOptions: ResidentSelectOption[] = [
  {
    label: "Amanda Jones — Unit B-105",
    resident_name: "Amanda Jones",
    unit: "Unit B-105",
    initials: "AJ",
  },
  {
    label: "Robert King — Villa C-12",
    resident_name: "Robert King",
    unit: "Villa C-12",
    initials: "RK",
  },
  {
    label: "Lydia Smith — Apt 4A",
    resident_name: "Lydia Smith",
    unit: "Apt 4A",
    initials: "LS",
  },
  {
    label: "Chen Family — Unit A-204",
    resident_name: "Chen Family",
    unit: "Unit A-204",
    initials: "CF",
  },
  {
    label: "Marcus Holloway — Villa A-402",
    resident_name: "Marcus Holloway",
    unit: "Villa A-402",
    initials: "MH",
  },
  {
    label: "Sarah Jenkins — Block C-105",
    resident_name: "Sarah Jenkins",
    unit: "Block C-105",
    initials: "SJ",
  },
];

export const initialAwayResidents: AwayResidentRecord[] = [
  {
    id: 1,
    initials: "AJ",
    resident_name: "Amanda Jones",
    unit: "Unit B-105",
    departure_date: "Nov 10, 2023",
    expected_return_date: "Nov 25, 2023",
    is_overdue: false,
    status: "away",
    emergency_contact_name: "Daniel Jones",
    emergency_contact_phone: "+1 (555) 234-8891",
    notify_security: true,
    suspend_packages: false,
  },
  {
    id: 2,
    initials: "RK",
    resident_name: "Robert King",
    unit: "Villa C-12",
    departure_date: "Nov 12, 2023",
    expected_return_date: "Nov 18, 2023",
    is_overdue: true,
    status: "check_required",
    emergency_contact_name: "Evelyn King",
    emergency_contact_phone: "+1 (555) 892-1102",
    notify_security: true,
    suspend_packages: true,
  },
  {
    id: 3,
    initials: "LS",
    resident_name: "Lydia Smith",
    unit: "Apt 4A",
    departure_date: "Nov 15, 2023",
    expected_return_date: "Dec 10, 2023",
    is_overdue: false,
    status: "away",
    emergency_contact_name: "Michael Smith",
    emergency_contact_phone: "+1 (555) 441-9023",
    notify_security: true,
    suspend_packages: true,
  },
  // Additional rows shown when clicking "View All"
  {
    id: 4,
    initials: "CF",
    resident_name: "Chen Family",
    unit: "Unit A-204",
    departure_date: "Nov 11, 2023",
    expected_return_date: "Nov 20, 2023",
    is_overdue: false,
    status: "away",
    emergency_contact_name: "David Chen",
    emergency_contact_phone: "+1 (555) 333-4455",
    notify_security: true,
    suspend_packages: false,
  },
];

export const initialUpcomingReturns: UpcomingReturnItem[] = [
  {
    id: 1,
    month_short: "NOV",
    day: "18",
    resident_name: "Robert King",
    unit: "Villa C-12",
    has_warning: true,
    highlight_badge: true,
  },
  {
    id: 2,
    month_short: "NOV",
    day: "20",
    resident_name: "Chen Family",
    unit: "Unit A-204",
    has_warning: false,
    highlight_badge: false,
  },
  {
    id: 3,
    month_short: "NOV",
    day: "25",
    resident_name: "Amanda Jones",
    unit: "Unit B-105",
    has_warning: false,
    highlight_badge: false,
  },
];

export const initialMobileAwayMetrics: MobileAwayMetric[] = [
  {
    id: "currently-away",
    label: "CURRENTLY AWAY",
    value: 12,
    iconType: "currently_away",
  },
  {
    id: "returning-this-week",
    label: "RETURNING THIS WEEK",
    value: 5,
    iconType: "returning_week",
  },
];

export const initialMobileActiveAwayLogs: MobileActiveAwayLogItem[] = [
  {
    id: 101,
    resident_name: "Sarah Jenkins",
    unit: "Unit A-05",
    status: "AWAY",
    date_range: "Oct 12 - Oct 25",
    from_date: "10/12/2023",
    to_date: "10/25/2023",
    footer_note: "Contact: Sister (055-1234)",
  },
  {
    id: 102,
    resident_name: "Marcus Wong",
    unit: "Unit C-22",
    status: "AWAY",
    date_range: "Oct 18 - Nov 02",
    from_date: "10/18/2023",
    to_date: "11/02/2023",
    footer_note: "Notes: Check mail",
  },
  {
    id: 103,
    resident_name: "Elara Vance",
    unit: "Unit D-10",
    status: "RETURNING SOON",
    date_range: "Sep 30 - Oct 20",
    from_date: "09/30/2023",
    to_date: "10/20/2023",
    footer_note: "Contact: N/A",
  },
  {
    id: 104,
    resident_name: "Amanda Jones",
    unit: "Unit B-105",
    status: "AWAY",
    date_range: "Nov 10 - Nov 25",
    from_date: "11/10/2023",
    to_date: "11/25/2023",
    footer_note: "Contact: Brother (055-8891)",
  },
];
