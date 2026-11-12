"use client";

import React, { useState } from "react";
import { DesktopReceipt } from "@/components/receipt/DesktopReceipt";
import { MobileReceipt } from "@/components/receipt/MobileReceipt";
import { mockDesktopReceipt, mockMobileReceipt } from "@/data/mockReceiptData";

export default function PaymentReceiptPage() {
  const [desktopData] = useState(mockDesktopReceipt);
  const [mobileData] = useState(mockMobileReceipt);

  return (
    <>
      {/* 1. Mobile Receipt View (< 768px): Matches Figma Mobile Screenshot */}
      <div className="block md:hidden">
        <MobileReceipt receipt={mobileData} />
      </div>

      {/* 2. Desktop Official Receipt (>= 768px): Matches Figma Desktop Screenshot */}
      <div className="hidden md:block">
        <DesktopReceipt receipt={desktopData} />
      </div>
    </>
  );
}
