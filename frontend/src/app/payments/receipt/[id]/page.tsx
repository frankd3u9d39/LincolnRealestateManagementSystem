"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { DesktopReceipt } from "@/components/receipt/DesktopReceipt";
import { MobileReceipt } from "@/components/receipt/MobileReceipt";
import { mockDesktopReceipt, mockMobileReceipt } from "@/data/mockReceiptData";

export default function DynamicPaymentReceiptPage() {
  const params = useParams();
  const id = (params?.id as string) || "RE-2023-88421";

  const [desktopData] = useState({
    ...mockDesktopReceipt,
    receiptNumber: id.startsWith("RE-") ? id : `#REC-${id}`,
  });

  const [mobileData] = useState({
    ...mockMobileReceipt,
    receiptNumber: id.startsWith("#") ? id : `#${id}`,
  });

  return (
    <>
      <div className="block md:hidden">
        <MobileReceipt receipt={mobileData} />
      </div>

      <div className="hidden md:block">
        <DesktopReceipt receipt={desktopData} />
      </div>
    </>
  );
}
