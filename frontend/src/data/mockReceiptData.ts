import { PaymentReceiptData } from "@/types/receipt";

export const mockDesktopReceipt: PaymentReceiptData = {
  receiptNumber: "RE-2023-88421",
  status: "Payment Success",
  residentName: "Alexander J. Montgomery",
  residentEmail: "alexander.m@example.com",
  propertyName: "House No. 42B, Willow Creek",
  estatePhase: "LincolnEstate Phase II",
  lineItems: [
    {
      id: "1",
      serviceDescription: "Monthly Security Levy",
      subDescription: "24/7 Patrol & Access Control",
      billingPeriod: "Oct 01 - Oct 31, 2023",
      amount: 150.0,
    },
    {
      id: "2",
      serviceDescription: "Waste Management Service",
      subDescription: "Bi-weekly pickup schedule",
      billingPeriod: "Oct 01 - Oct 31, 2023",
      amount: 45.0,
    },
    {
      id: "3",
      serviceDescription: "Estate Maintenance Fee",
      subDescription: "Landscaping & Public Lighting",
      billingPeriod: "Oct 01 - Oct 31, 2023",
      amount: 85.0,
    },
  ],
  totalAmount: 280.0,
  paymentMethod: "Visa ending in •••• 4492",
  transactionDate: "October 14, 2023 | 09:42 AM",
  generatedBy: "Fin-System v4.0 (Auth: LV)",
  qrVerificationUrl: "https://lincolnestate.ng/verify/RE-2023-88421",
  authorizationStampText: "LINCOLN APPROVED",
  disclaimer:
    "This is a computer-generated document. No physical signature is required. LincolnEstate Finance Office, 500 Corporate Blvd, Sector 9.",
};

export const mockMobileReceipt: PaymentReceiptData = {
  receiptNumber: "#29402",
  status: "Payment Success",
  residentName: "Marcus Holloway",
  residentEmail: "marcus.h@example.com",
  propertyName: "Villa A-402",
  estatePhase: "LincolnEstate Central",
  lineItems: [
    {
      id: "1",
      serviceDescription: "Monthly Maintenance",
      subDescription: "Facility and infrastructure care",
      billingPeriod: "Oct 01 - Oct 31, 2023",
      amount: 1450.0,
    },
  ],
  totalAmount: 1450.0,
  paymentMethod: "Visa •••• 4242",
  transactionDate: "Oct 24, 2023",
  generatedBy: "Fin-System v4.0 (Auth: LV)",
  qrVerificationUrl: "https://lincolnestate.ng/verify/29402",
  authorizationStampText: "LINCOLN APPROVED",
  disclaimer:
    "This is a computer-generated document. No physical signature is required.",
};
