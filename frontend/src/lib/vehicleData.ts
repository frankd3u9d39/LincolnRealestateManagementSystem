import {
  VehicleMetricItem,
  VehicleRecord,
  ScannerFeed,
  MobileVehicleMetric,
  MobileScannerItem,
  MobileVehicleDirectoryItem,
} from "@/types/vehicle";

export const initialVehicleMetrics: VehicleMetricItem[] = [
  {
    id: "registered",
    label: "Registered Vehicles",
    value: 850,
    iconType: "registered",
  },
  {
    id: "visitor",
    label: "Visitor Vehicles",
    value: 12,
    iconType: "visitor",
  },
  {
    id: "pending",
    label: "Pending Verification",
    value: 5,
    iconType: "pending",
  },
  {
    id: "disabled",
    label: "Disabled Passes",
    value: 2,
    iconType: "disabled",
  },
];

export const initialVehicleRecords: VehicleRecord[] = [
  {
    id: 1,
    initials: "MH",
    owner_name: "Marcus Holloway",
    owner_role: "Resident",
    house_unit: "Villa A-402",
    vehicle_type: "SUV - Toyota Land Cruiser",
    plate_number: "LND - 234 - XG",
    status: "active",
  },
  {
    id: 2,
    initials: "SJ",
    owner_name: "Sarah Jenkins",
    owner_role: "Resident",
    house_unit: "Block C-105",
    vehicle_type: "Sedan - Honda Accord",
    plate_number: "KJA - 901 - BL",
    status: "active",
  },
  {
    id: 3,
    initials: "DT",
    owner_name: "David Taylor",
    owner_role: "Vendor",
    house_unit: "Maintenance",
    vehicle_type: "Van - Ford Transit",
    plate_number: "EKY - 555 - ZA",
    status: "disabled",
  },
  {
    id: 4,
    initials: "OA",
    owner_name: "Oluwaseun Adeyemi",
    owner_role: "Resident",
    house_unit: "Villa B-201",
    vehicle_type: "Hatchback - VW Golf",
    plate_number: "ABJ - 442 - QR",
    status: "pending",
  },
  // Additional rows shown when clicking "View All"
  {
    id: 5,
    initials: "ER",
    owner_name: "Elena Rodriguez",
    owner_role: "Resident",
    house_unit: "Block A-210",
    vehicle_type: "SUV - Lexus RX 350",
    plate_number: "LND - 884 - MK",
    status: "active",
  },
  {
    id: 6,
    initials: "RC",
    owner_name: "Robert Chen",
    owner_role: "Resident",
    house_unit: "Townhouse 7",
    vehicle_type: "Sedan - Mercedes C300",
    plate_number: "KJA - 119 - TP",
    status: "active",
  },
];

export const initialScannerFeeds: ScannerFeed[] = [
  {
    id: "main-in",
    name: "Main Gate Entrance",
    ip_address: "192.168.1.101",
    status: "online",
  },
  {
    id: "main-out",
    name: "Main Gate Exit",
    ip_address: "192.168.1.102",
    status: "online",
  },
  {
    id: "service-in",
    name: "Service Gate Entrance",
    ip_address: "192.168.1.105",
    status: "offline",
    offline_label: "OFFLINE - Check Conn.",
  },
];

/* ---------- Mobile Vehicle Management Data (Task 14) ---------- */

export const mobileVehicleMetrics: MobileVehicleMetric[] = [
  {
    id: "m-total-reg",
    label: "Total Registered",
    value: "1,248",
    iconType: "car",
  },
  {
    id: "m-scanners",
    label: "Active Scanners",
    value: "4 / 4",
    iconType: "scan",
  },
  {
    id: "m-entries",
    label: "Entries Today",
    value: "342",
    iconType: "entry",
  },
];

export const mobileScannerItems: MobileScannerItem[] = [
  {
    id: "ms-1",
    name: "Main Gate Entrance",
    last_ping: "Last ping: 2 mins ago",
    online: true,
  },
  {
    id: "ms-2",
    name: "Main Gate Exit",
    last_ping: "Last ping: 1 min ago",
    online: true,
  },
  {
    id: "ms-3",
    name: "Service Gate",
    last_ping: "Last ping: 5 mins ago",
    online: true,
  },
];

export const initialMobileVehicleDirectory: MobileVehicleDirectoryItem[] = [
  {
    id: 1,
    plate: "ABC-1234",
    make_color: "Toyota Camry - Silver",
    badge: "RESIDENT",
    owner_display: "John Doe",
    sub_info: "Block A, 102",
    sub_icon: "home",
  },
  {
    id: 2,
    plate: "XYZ-9876",
    make_color: "Honda Civic - Black",
    badge: "VISITOR",
    owner_display: "Jane Smith (Host: B, 204)",
    sub_info: "Valid till 8 PM",
    sub_icon: "clock",
  },
  {
    id: 3,
    plate: "LMN-4567",
    make_color: "Ford F150 - White",
    badge: "RESIDENT",
    owner_display: "Mike Johnson",
    sub_info: "Block C, 301",
    sub_icon: "home",
  },
  // Additional items revealed when clicking "Load More"
  {
    id: 4,
    plate: "LND-234-XG",
    make_color: "Toyota Land Cruiser - Black",
    badge: "RESIDENT",
    owner_display: "Marcus Holloway",
    sub_info: "Villa A, 402",
    sub_icon: "home",
  },
  {
    id: 5,
    plate: "KJA-901-BL",
    make_color: "Honda Accord - Grey",
    badge: "RESIDENT",
    owner_display: "Sarah Jenkins",
    sub_info: "Block C, 105",
    sub_icon: "home",
  },
];

