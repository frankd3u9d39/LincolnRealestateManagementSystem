import { isoDaysFromToday } from "@/lib/dates";
import {
  ClientRequest,
  EarningsPoint,
  Listing,
  PortalViewing,
} from "@/types/agentPortal";

export const mockListings: Listing[] = [
  { id: "LST-201", title: "4-Bed Duplex with BQ", type: "Duplex", zone: "Phase 1 – Lekki", address: "Block C12, Admiralty Way", beds: 4, baths: 5, rentPerYear: 9500000, status: "Available", listedOn: "2026-10-02", views: 412, inquiries: 18 },
  { id: "LST-202", title: "3-Bed Terrace", type: "Terrace", zone: "Phase 1 – Lekki", address: "Block A4, Fola Osibo Rd", beds: 3, baths: 4, rentPerYear: 6500000, status: "Under Offer", listedOn: "2026-09-18", views: 388, inquiries: 22 },
  { id: "LST-203", title: "2-Bed Serviced Apartment", type: "Apartment", zone: "Phase 2 – Ajah", address: "Tower B, Abraham Adesanya", beds: 2, baths: 2, rentPerYear: 3200000, status: "Available", listedOn: "2026-10-21", views: 265, inquiries: 14 },
  { id: "LST-204", title: "5-Bed Detached House", type: "Detached", zone: "Phase 1 – Lekki", address: "Plot 22, Chief Yesufu Abiodun", beds: 5, baths: 6, rentPerYear: 15000000, status: "Available", listedOn: "2026-08-30", views: 530, inquiries: 9 },
  { id: "LST-205", title: "1-Bed Mini Flat", type: "Apartment", zone: "Phase 3 – Sangotedo", address: "Block F2, Monastery Rd", beds: 1, baths: 1, rentPerYear: 1400000, status: "Rented", listedOn: "2026-07-11", views: 301, inquiries: 27 },
  { id: "LST-206", title: "3-Bed Apartment, Pool View", type: "Apartment", zone: "Phase 2 – Ajah", address: "Tower A, Ogombo Rd", beds: 3, baths: 3, rentPerYear: 4800000, status: "Available", listedOn: "2026-11-03", views: 142, inquiries: 7 },
  { id: "LST-207", title: "Studio Self-contain", type: "Self-contain", zone: "Phase 3 – Sangotedo", address: "Block H9, Peace Estate Rd", beds: 1, baths: 1, rentPerYear: 850000, status: "Available", listedOn: "2026-11-08", views: 96, inquiries: 11 },
  { id: "LST-208", title: "4-Bed Semi-Detached", type: "Duplex", zone: "Phase 2 – Ajah", address: "Block D7, Addo Rd", beds: 4, baths: 4, rentPerYear: 5500000, status: "Rented", listedOn: "2026-06-25", views: 447, inquiries: 19 },
  { id: "LST-209", title: "2-Bed Terrace", type: "Terrace", zone: "Phase 3 – Sangotedo", address: "Block J3, Lufasi Rd", beds: 2, baths: 3, rentPerYear: 2600000, status: "Available", listedOn: "2026-10-28", views: 178, inquiries: 6 },
];

export const mockClientRequests: ClientRequest[] = [
  { id: "REQ-501", clientName: "Amaka Nnadi", phone: "+234 803 221 4470", email: "amaka.nnadi@example.com", propertyType: "Apartment", minBeds: 2, zone: "Phase 2 – Ajah", maxBudget: 3500000, moveInBy: isoDaysFromToday(17), note: "Works remotely, needs steady power and a quiet block.", status: "New", receivedOn: isoDaysFromToday(-1) },
  { id: "REQ-502", clientName: "Mr. & Mrs. Olawale", phone: "+234 806 715 9902", email: "olawale.family@example.com", propertyType: "Duplex", minBeds: 4, zone: "Phase 1 – Lekki", maxBudget: 10000000, moveInBy: isoDaysFromToday(62), note: "Family of five. Wants a BQ and parking for three cars.", status: "Viewing Booked", receivedOn: isoDaysFromToday(-5) },
  { id: "REQ-503", clientName: "Dr. Kelechi Obi", phone: "+234 809 334 1186", email: "kelechi.obi@example.com", propertyType: "Any", minBeds: 3, zone: "Any", maxBudget: 5000000, moveInBy: isoDaysFromToday(36), note: "Relocating from Abuja. Flexible on area, close to a hospital.", status: "Contacted", receivedOn: isoDaysFromToday(-3) },
  { id: "REQ-504", clientName: "Halima Yusuf", phone: "+234 813 660 2754", email: "halima.yusuf@example.com", propertyType: "Self-contain", minBeds: 1, zone: "Phase 3 – Sangotedo", maxBudget: 1000000, moveInBy: isoDaysFromToday(16), note: "NYSC corps member, first apartment.", status: "New", receivedOn: isoDaysFromToday(0) },
  { id: "REQ-505", clientName: "Segun Martins", phone: "+234 817 902 5531", email: "segun.martins@example.com", propertyType: "Detached", minBeds: 5, zone: "Phase 1 – Lekki", maxBudget: 12000000, moveInBy: isoDaysFromToday(79), note: "Wants a detached house; budget is firm.", status: "New", receivedOn: isoDaysFromToday(-2) },
  { id: "REQ-506", clientName: "Tolu Bankole", phone: "+234 708 441 3098", email: "tolu.bankole@example.com", propertyType: "Apartment", minBeds: 1, zone: "Any", maxBudget: 1500000, moveInBy: isoDaysFromToday(-30), note: "Moved into Block F2 mini flat.", status: "Closed", receivedOn: isoDaysFromToday(-55) },
];

export const mockPortalViewings: PortalViewing[] = [
  { id: "VW-9001", listingId: "LST-201", requestId: "REQ-502", clientName: "Mr. & Mrs. Olawale", date: isoDaysFromToday(0), time: "16:00", status: "Scheduled" },
  { id: "VW-9002", listingId: "LST-206", requestId: "REQ-503", clientName: "Dr. Kelechi Obi", date: isoDaysFromToday(1), time: "10:30", status: "Scheduled" },
  { id: "VW-9003", listingId: "LST-204", requestId: null, clientName: "Ifeanyi Chukwu", date: isoDaysFromToday(2), time: "13:00", status: "Scheduled" },
  { id: "VW-9004", listingId: "LST-202", requestId: null, clientName: "Bisi Adeyemi", date: isoDaysFromToday(-4), time: "11:00", status: "Completed" },
  { id: "VW-9005", listingId: "LST-203", requestId: null, clientName: "Chidi Okeke", date: isoDaysFromToday(-6), time: "15:30", status: "Cancelled" },
];

// Commission paid out per month (trailing 6 months, Nov is month-to-date)
export const mockEarnings: EarningsPoint[] = [
  { month: "Jun", commission: 550000 },
  { month: "Jul", commission: 140000 },
  { month: "Aug", commission: 640000 },
  { month: "Sep", commission: 0 },
  { month: "Oct", commission: 890000 },
  { month: "Nov", commission: 320000 },
];
