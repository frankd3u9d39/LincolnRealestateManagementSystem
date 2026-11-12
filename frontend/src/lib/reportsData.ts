import {
  ReportKpiMetric,
  MonthlyRevenuePoint,
  ServiceRevenueShare,
  YearlyRevenueBar,
  CollectionStatusData,
  DefaulterItem,
  MobileReportKpiItem,
  MobileRevenueTrendBar,
  MobileRevenueCategoryItem,
  MobileGeneratedReportItem,
  LifeThreatAlertItem,
  IntelligenceReportItem,
} from "@/types/reports";

export const initialReportKpis: ReportKpiMetric[] = [
  {
    id: "collection-rate",
    label: "COLLECTION RATE",
    value: "94.2%",
    subtext: "+2.4% vs LY",
    trendDirection: "up",
    iconType: "collection",
  },
  {
    id: "avg-revenue",
    label: "AVG REVENUE",
    value: "₦1.2M",
    subtext: "+5.1% vs LM",
    trendDirection: "up",
    iconType: "revenue",
  },
  {
    id: "top-service",
    label: "TOP SERVICE",
    value: "Security",
    subtext: "Stable Performance",
    trendDirection: "stable",
    iconType: "top_service",
  },
  {
    id: "laggard",
    label: "LAGGARD",
    value: "Waste",
    subtext: "-1.2% Drop",
    trendDirection: "down",
    iconType: "laggard",
  },
];

export const monthlyRevenueTrendData: MonthlyRevenuePoint[] = [
  { month: "Jan", valueM: 0.62, showMarker: false },
  { month: "Feb", valueM: 0.84, showMarker: true },
  { month: "Mar", valueM: 0.87, showMarker: false },
  { month: "Apr", valueM: 0.92, showMarker: true },
  { month: "May", valueM: 1.12, showMarker: true },
  { month: "Jun", valueM: 1.31, showMarker: true },
  { month: "Jul", valueM: 1.24, showMarker: true },
  { month: "Aug", valueM: 1.11, showMarker: false },
  { month: "Sep", valueM: 1.15, showMarker: true },
  { month: "Oct", valueM: 1.38, showMarker: true },
  { month: "Nov", valueM: 1.61, showMarker: true },
  { month: "Dec", valueM: 1.56, showMarker: false },
];

export const serviceRevenueShares: ServiceRevenueShare[] = [
  {
    id: "security",
    name: "Security",
    percentage: 42,
    dotColorClass: "bg-primary",
    strokeColor: "#B22222",
  },
  {
    id: "water",
    name: "Water",
    percentage: 28,
    dotColorClass: "bg-accent",
    strokeColor: "#C9A227",
  },
  {
    id: "electricity",
    name: "Electricity",
    percentage: 20,
    dotColorClass: "bg-border",
    strokeColor: "#D1D5DB",
  },
  {
    id: "waste",
    name: "Waste",
    percentage: 10,
    dotColorClass: "bg-accent/60",
    strokeColor: "#E5C86B",
  },
];

export const yearlyRevenueBars: YearlyRevenueBar[] = [
  { year: "2020", valueM: 7.0 },
  { year: "2021", valueM: 8.6 },
  { year: "2022", valueM: 10.4 },
  { year: "2023", valueM: 12.9 },
  { year: "2024", valueM: 15.4 },
];

export const initialCollectionStatus: CollectionStatusData = {
  statusLabel: "HEALTHY",
  paidPercentage: 94.2,
  paidAmountLabel: "₦14.2M",
  outstandingAmountLabel: "₦0.8M",
  outstandingPercentage: 5.8,
};

export const initialDefaultersList: DefaulterItem[] = [
  {
    id: 1,
    resident_name: "Robert King",
    unit: "Villa C-12",
    service: "Waste & Sanitation",
    amount_due: "₦240,000",
    days_overdue: 18,
  },
  {
    id: 2,
    resident_name: "Oluwaseun Adeyemi",
    unit: "Villa B-201",
    service: "Electricity Levy",
    amount_due: "₦310,000",
    days_overdue: 12,
  },
  {
    id: 3,
    resident_name: "David Taylor",
    unit: "Block A-108",
    service: "Water Utility",
    amount_due: "₦145,000",
    days_overdue: 9,
  },
  {
    id: 4,
    resident_name: "Marcus Wong",
    unit: "Unit C-22",
    service: "Waste & Sanitation",
    amount_due: "₦105,000",
    days_overdue: 5,
  },
];

export const mobileReportKpis: MobileReportKpiItem[] = [
  {
    id: "total-revenue",
    label: "TOTAL REVENUE",
    value: "$124,500",
    subtext: "+12% from last month",
    subtextType: "growth",
    iconType: "revenue",
  },
  {
    id: "properties-leased",
    label: "PROPERTIES LEASED",
    value: "845 / 900",
    subtext: "94% Occupancy Rate",
    subtextType: "growth",
    iconType: "leased",
  },
  {
    id: "outstanding-dues",
    label: "OUTSTANDING DUES",
    value: "$15,200",
    subtext: "12 Units Pending",
    subtextType: "warning",
    iconType: "dues",
  },
];

export const mobileRevenueTrendBars: MobileRevenueTrendBar[] = [
  {
    month: "Jan",
    heightPct: 33,
    amountLabel: "$62k",
    opacityClass: "bg-primary/30",
  },
  {
    month: "Feb",
    heightPct: 55,
    amountLabel: "$84k",
    opacityClass: "bg-primary/55",
  },
  {
    month: "Mar",
    heightPct: 45,
    amountLabel: "$76k",
    opacityClass: "bg-primary/70",
  },
  {
    month: "Apr",
    heightPct: 65,
    amountLabel: "$98k",
    opacityClass: "bg-primary/85",
  },
  {
    month: "May",
    heightPct: 86,
    amountLabel: "$114k",
    opacityClass: "bg-primary/95",
  },
  {
    month: "Jun",
    heightPct: 100,
    amountLabel: "$124.5k",
    opacityClass: "bg-primary",
  },
];

export const mobileRevenueCategories: MobileRevenueCategoryItem[] = [
  {
    id: "leasing-fees",
    name: "Leasing Fees",
    amountLabel: "$85k",
    fillPct: 68,
    barColorClass: "bg-primary",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    amountLabel: "$25k",
    fillPct: 24,
    barColorClass: "bg-primary/65",
  },
  {
    id: "late-fees",
    name: "Late Fees",
    amountLabel: "$14k",
    fillPct: 14,
    barColorClass: "bg-dark/65",
  },
];

export const mobileGeneratedReports: MobileGeneratedReportItem[] = [
  {
    id: 1,
    title: "Q2 Financial Summary",
    meta: "PDF • Jun 30, 2024",
    fileName: "q2-financial-summary-2024.csv",
  },
  {
    id: 2,
    title: "May Occupancy Stats",
    meta: "CSV • Jun 1, 2024",
    fileName: "may-occupancy-stats-2024.csv",
  },
  {
    id: 3,
    title: "April Maintenance Audit",
    meta: "PDF • May 1, 2024",
    fileName: "april-maintenance-audit-2024.csv",
  },
];

export const TOTAL_LIFE_THREAT_ALERTS = 120;

export const initialLifeThreatAlerts: LifeThreatAlertItem[] = [
  { id: 1, name: "Devon Lane", house_number: "LEHN123B", date: "23-10-2023" },
  {
    id: 2,
    name: "Savannah Nguyen",
    house_number: "LEHN123B",
    date: "23-10-2023",
  },
  {
    id: 3,
    name: "Ralph Edwards",
    house_number: "LEHN123B",
    date: "23-10-2023",
  },
  { id: 4, name: "Jenny Wilson", house_number: "LEHN123B", date: "23-10-2023" },
  { id: 5, name: "Robert Fox", house_number: "LEHN123B", date: "23-10-2023" },
  {
    id: 6,
    name: "Esther Howard",
    house_number: "LEHN123B",
    date: "23-10-2023",
  },
  { id: 7, name: "Arlene McCoy", house_number: "LEHN123B", date: "23-10-2023" },
  { id: 8, name: "Floyd Miles", house_number: "LEHN123B", date: "23-10-2023" },
  {
    id: 9,
    name: "Cameron Williamson",
    house_number: "LEHN123B",
    date: "23-10-2023",
  },
  { id: 10, name: "Wade Warren", house_number: "LEHN123B", date: "23-10-2023" },
  {
    id: 11,
    name: "Esther Howard",
    house_number: "LEHN123B",
    date: "23-10-2023",
  },
];

export const initialIntelligenceReports: IntelligenceReportItem[] = [
  {
    id: 1,
    name: "Devon Lane",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Unscheduled late-night vehicle activity observed near North Perimeter fence. Security patrol dispatched and verified resident authorization.",
  },
  {
    id: 2,
    name: "Savannah Nguyen",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Visitor gate pass anomaly flagged at East Gate. Guard verified guest identity with resident via intercom.",
  },
  {
    id: 3,
    name: "Ralph Edwards",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Routine intelligence log: contractor crew remained 30 minutes past standard service window; escorted out by patrol.",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Perimeter CCTV motion alert triggered near Block B walkway; confirmed clear by night supervisor.",
  },
  {
    id: 5,
    name: "Robert Fox",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Unregistered delivery van attempted entry via Main Gate; redirected to Service Gate for inspection.",
  },
  {
    id: 6,
    name: "Esther Howard",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Resident reported suspicious drone sighting over sector 3; logged with estate security intelligence unit.",
  },
  {
    id: 7,
    name: "Arlene McCoy",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Access card duplicate scan detected at Main Gate terminal; temporary hold placed pending verification.",
  },
  {
    id: 8,
    name: "Floyd Miles",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Routine night patrol intelligence check completed around LEHN123B cluster with all gates secured.",
  },
  {
    id: 9,
    name: "Cameron Williamson",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Noise and gathering report filed by neighboring villa; resolved amicably by on-duty shift lead.",
  },
  {
    id: 10,
    name: "Wade Warren",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Emergency generator fuel line inspection report logged by estate engineering and security team.",
  },
  {
    id: 11,
    name: "Esther Howard",
    house_number: "LEHN123B",
    date: "23-10-2023",
    summary:
      "Follow-up intelligence clearance filed for LEHN123B; no further anomalies detected.",
  },
];
