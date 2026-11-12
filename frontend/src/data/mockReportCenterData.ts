import { ReportCenterData } from "@/types/reportCenter";

export const mockReportCenterData: ReportCenterData = {
  templates: [
    {
      id: "monthly-report",
      title: "Monthly Report",
      description:
        "Complete summary of income, expenses, and occupancy for the current billing cycle.",
      badgeLabel: "Auto-Generated",
      badgeTone: "neutral",
      iconType: "monthly",
    },
    {
      id: "yearly-report",
      title: "Yearly Report",
      description:
        "Aggregate financial health metrics and growth analysis for the fiscal year 2023–2024.",
      badgeLabel: "Annual",
      badgeTone: "neutral",
      iconType: "yearly",
    },
    {
      id: "service-report",
      title: "Service Report",
      description:
        "Operational efficiency report covering utility maintenance, security logs, and waste management.",
      badgeLabel: "Maintenance",
      badgeTone: "accent",
      iconType: "service",
    },
    {
      id: "resident-payment-report",
      title: "Resident Payment Report",
      description:
        "Detailed ledger of all payments made by residents, including service fees and penalties.",
      badgeLabel: "Ledger",
      badgeTone: "neutral",
      iconType: "resident",
    },
    {
      id: "outstanding-payment-report",
      title: "Outstanding Payment Report",
      description:
        "Track overdue accounts, total debt volume, and payment defaults by zone.",
      badgeLabel: "Critical",
      badgeTone: "critical",
      iconType: "outstanding",
    },
  ],
  usageMetrics: {
    title: "Report Usage Metrics",
    subtitle: "Total reports generated this month across all modules.",
    totalDownloads: 1248,
    barHeights: [38, 60, 92, 54, 38],
  },
  recentExports: [
    {
      id: "EXP-01",
      fileName: "Monthly_Tax_Summary_Oct.pdf",
      generatedBy: "Admin_Sarah_V",
      dateTime: "Oct 24, 2023 • 02:15 PM",
      format: "PDF",
      downloadUrl: "#download-oct-pdf",
    },
    {
      id: "EXP-02",
      fileName: "Resident_Ledger_Q3.xlsx",
      generatedBy: "System_Auto",
      dateTime: "Oct 23, 2023 • 09:00 AM",
      format: "XLSX",
      downloadUrl: "#download-q3-xlsx",
    },
    {
      id: "EXP-03",
      fileName: "Outstanding_Payments_All_Zones.pdf",
      generatedBy: "Admin_John_D",
      dateTime: "Oct 21, 2023 • 11:45 AM",
      format: "PDF",
      downloadUrl: "#download-outstanding-pdf",
    },
  ],
};
