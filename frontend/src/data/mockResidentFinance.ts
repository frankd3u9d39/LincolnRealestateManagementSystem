import { ResidentFinanceSummaryData } from "@/types/residentFinance";
import { mockOutstandingPayments } from "@/data/mockOutstandingPayments";

export const mockResidentFinanceSummary: ResidentFinanceSummaryData = {
  profile: {
    id: "marcus-holloway",
    name: "Marcus Holloway",
    unit: "Villa A-402",
    street: "Boulevard Crescent",
    phone: "+234 810 445 2291",
    status: "ACTIVE",
  },
  kpis: {
    totalPaid: 1400000,
    outstandingBalance: 150000,
    lastPaymentDate: "Oct 24, 2023",
    activeServicesCount: 4,
  },
  paymentTimeline: [
    {
      id: "TL-1",
      serviceName: "Security Levy",
      invoiceNumber: "#INV-4402",
      iconType: "security",
      amount: 45000,
      date: "Oct 24, 2023",
      status: "PAID",
    },
    {
      id: "TL-2",
      serviceName: "Waste Management",
      invoiceNumber: "#INV-4401",
      iconType: "waste",
      amount: 12500,
      date: "Sep 28, 2023",
      status: "PAID",
    },
    {
      id: "TL-3",
      serviceName: "Utility Maintenance",
      invoiceNumber: "#INV-4398",
      iconType: "utility",
      amount: 25000,
      date: "Sep 15, 2023",
      status: "PAID",
    },
  ],
  outstandingBills: [
    {
      id: "BILL-Q4",
      title: "Service Charge (Q4)",
      dueDate: "Nov 15, 2023",
      amount: 150000,
      daysOverdue: 12,
      status: "OVERDUE",
    },
  ],
  nextBillingNotice:
    "Automated billing for the next cycle (Q1 2024) will be generated on Dec 20, 2023.",
  preferences: {
    preferredMethod: "Bank Transfer",
    billingFrequency: "Quarterly",
    autoPayStatus: "Disabled",
    documentName: "Lease Agreement.pdf",
    documentUrl: "#lease-agreement",
  },
};

export function getResidentFinanceById(id: string): ResidentFinanceSummaryData {
  const matchedOutstanding = mockOutstandingPayments.find(
    (item) =>
      item.id.toLowerCase() === id.toLowerCase() ||
      item.residentName.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );

  if (!matchedOutstanding) {
    return mockResidentFinanceSummary;
  }

  const balance = matchedOutstanding.amountDue - matchedOutstanding.amountPaid;

  return {
    ...mockResidentFinanceSummary,
    profile: {
      id: matchedOutstanding.id,
      name: matchedOutstanding.residentName,
      unit: matchedOutstanding.propertyAddress.split(",")[0] || "Villa A-402",
      street:
        matchedOutstanding.propertyAddress.split(",")[1]?.trim() ||
        "Boulevard Crescent",
      phone: "+234 810 445 2291",
      status: "ACTIVE",
    },
    kpis: {
      ...mockResidentFinanceSummary.kpis,
      outstandingBalance: balance > 1000 ? balance : balance * 1000,
    },
    outstandingBills: [
      {
        id: matchedOutstanding.invoiceNumber,
        title: `${matchedOutstanding.serviceType} (Q4)`,
        dueDate: matchedOutstanding.dueDate,
        amount: balance > 1000 ? balance : balance * 1000,
        daysOverdue: matchedOutstanding.daysOverdue || 5,
        status: "OVERDUE",
      },
    ],
  };
}
