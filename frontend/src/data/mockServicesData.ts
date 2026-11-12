import { ServiceManagementData } from "@/types/serviceManagement";

export const mockServiceManagementData: ServiceManagementData = {
  kpis: {
    totalServices: 12,
    activeServices: 10,
    inactiveServices: 2,
    expectedRevenue: "₦15.2M",
  },
  services: [
    {
      id: "SRV-01",
      name: "Security Services",
      category: "Estate Security",
      fee: 45000.0,
      frequency: "Monthly",
      status: "Active",
      dateCreated: "Jan 12, 2024",
    },
    {
      id: "SRV-02",
      name: "Waste Management",
      category: "Utilities",
      fee: 12500.0,
      frequency: "Monthly",
      status: "Active",
      dateCreated: "Feb 05, 2024",
    },
    {
      id: "SRV-03",
      name: "Annual Maintenance Fee",
      category: "General",
      fee: 250000.0,
      frequency: "Yearly",
      status: "Active",
      dateCreated: "Jan 01, 2024",
    },
    {
      id: "SRV-04",
      name: "Gardening (Premium)",
      category: "Landscaping",
      fee: 30000.0,
      frequency: "Quarterly",
      status: "Inactive",
      dateCreated: "Mar 10, 2024",
    },
    {
      id: "SRV-05",
      name: "Electricity Surcharge",
      category: "Utilities",
      fee: 15000.0,
      frequency: "Monthly",
      status: "Active",
      dateCreated: "Feb 22, 2024",
    },
  ],
  forecastText:
    "Based on current active services, the projected revenue for Q2 2024 is estimated at ₦45.6M. Consider reviewing inactive services to optimize cash flow.",
  quickTipText:
    'You can set up "Auto-Billing" for utilities to reduce manual intervention. Automated invoices are sent 5 days before the frequency deadline.',
};
