"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AwayResidentRecord } from "@/types/away";
import { residentSelectOptions } from "@/lib/awayData";
import { cn } from "@/lib/utils";

interface LogAwayStatusFormCardProps {
  editingRecord: AwayResidentRecord | null;
  onCancelEdit: () => void;
  onSaveRecord: (record: Omit<AwayResidentRecord, "id">, editId?: number) => void;
}

function formatReadableDate(raw: string, fallback: string): string {
  if (!raw.trim()) return fallback;
  const parsed = new Date(raw);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return raw.trim();
}

export function LogAwayStatusFormCard({
  editingRecord,
  onCancelEdit,
  onSaveRecord,
}: LogAwayStatusFormCardProps) {
  const [selectedResidentLabel, setSelectedResidentLabel] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notifySecurity, setNotifySecurity] = useState(true);
  const [suspendPackages, setSuspendPackages] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    if (editingRecord) {
      const matchingOption = residentSelectOptions.find(
        (o) => o.resident_name === editingRecord.resident_name
      );
      setSelectedResidentLabel(
        matchingOption
          ? matchingOption.label
          : `${editingRecord.resident_name} — ${editingRecord.unit}`
      );
      setDepartureDate(editingRecord.departure_date);
      setExpectedReturnDate(editingRecord.expected_return_date);
      setContactName(editingRecord.emergency_contact_name || "");
      setContactPhone(editingRecord.emergency_contact_phone || "");
      setNotifySecurity(editingRecord.notify_security);
      setSuspendPackages(editingRecord.suspend_packages);
    }
  }, [editingRecord]);

  const handleReset = () => {
    setSelectedResidentLabel("");
    setDepartureDate("");
    setExpectedReturnDate("");
    setContactName("");
    setContactPhone("");
    setNotifySecurity(true);
    setSuspendPackages(false);
    onCancelEdit();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const matched = residentSelectOptions.find(
      (o) => o.label === selectedResidentLabel
    );
    const residentName = matched ? matched.resident_name : "Marcus Holloway";
    const unit = matched ? matched.unit : "Villa A-402";
    const initials = matched ? matched.initials : "MH";

    onSaveRecord(
      {
        initials,
        resident_name: residentName,
        unit,
        departure_date: formatReadableDate(departureDate, "Nov 20, 2023"),
        expected_return_date: formatReadableDate(
          expectedReturnDate,
          "Dec 02, 2023"
        ),
        is_overdue: false,
        status: "away",
        emergency_contact_name: contactName.trim() || "Emergency Contact",
        emergency_contact_phone: contactPhone.trim() || "+1 (555) 000-0000",
        notify_security: notifySecurity,
        suspend_packages: suspendPackages,
      },
      editingRecord?.id
    );

    setFeedbackMsg(
      editingRecord
        ? `Updated away status for ${residentName}.`
        : `Recorded new away status for ${residentName} (${unit}).`
    );
    setTimeout(() => setFeedbackMsg(null), 3500);
    handleReset();
  };

  return (
    <div
      id="log-away-form-card"
      className="bg-surface-card rounded-2xl border border-border/70 p-5 sm:p-7 shadow-xs space-y-6"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-dark tracking-tight">
            {editingRecord
              ? `Edit Away Status — ${editingRecord.resident_name}`
              : "Log Away Status"}
          </h2>
          <p className="text-xs text-muted font-medium mt-0.5">
            Manually record a resident&apos;s away period and preferences.
          </p>
        </div>

        {editingRecord && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-accent-light text-accent">
            Editing
          </span>
        )}
      </div>

      {feedbackMsg && (
        <div className="px-4 py-2.5 rounded-xl bg-accent-light/80 text-dark text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-primary shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Field 1: Resident / Unit */}
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold text-dark">
            Resident / Unit
          </label>
          <div className="relative">
            <select
              value={selectedResidentLabel}
              onChange={(e) => setSelectedResidentLabel(e.target.value)}
              aria-label="Resident / Unit"
              className="w-full appearance-none rounded-xl border border-border bg-[#F4F6FA] hover:bg-[#EDF0F6] focus:bg-white px-4 py-3 pr-10 text-xs sm:text-sm font-medium text-dark focus:border-primary focus:outline-none transition-all cursor-pointer"
            >
              <option value="">Select a resident...</option>
              {residentSelectOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Row 2: Departure Date & Expected Return Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-dark">
              Departure Date
            </label>
            <input
              type="text"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              placeholder="mm/dd/yyyy"
              aria-label="Departure Date"
              className="w-full rounded-xl border border-border bg-[#F4F6FA] focus:bg-white px-4 py-3 text-xs sm:text-sm font-medium text-dark placeholder:text-dark/70 focus:border-primary focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-dark">
              Expected Return Date
            </label>
            <input
              type="text"
              value={expectedReturnDate}
              onChange={(e) => setExpectedReturnDate(e.target.value)}
              placeholder="mm/dd/yyyy"
              aria-label="Expected Return Date"
              className="w-full rounded-xl border border-border bg-[#F4F6FA] focus:bg-white px-4 py-3 text-xs sm:text-sm font-medium text-dark placeholder:text-dark/70 focus:border-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Emergency Contact During Absence */}
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold text-dark">
            Emergency Contact During Absence
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Contact Name"
              aria-label="Emergency Contact Name"
              className="w-full rounded-xl border border-border bg-[#F4F6FA] focus:bg-white px-4 py-3 text-xs sm:text-sm font-medium text-dark placeholder:text-muted focus:border-primary focus:outline-none transition-all"
            />
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Phone Number"
              aria-label="Emergency Contact Phone Number"
              className="w-full rounded-xl border border-border bg-[#F4F6FA] focus:bg-white px-4 py-3 text-xs sm:text-sm font-medium text-dark placeholder:text-muted focus:border-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Toggle Box 1: Notify Security Gate */}
        <div className="rounded-xl border border-border/70 p-4 flex items-center gap-3.5">
          <button
            type="button"
            role="switch"
            aria-checked={notifySecurity}
            aria-label="Notify Security Gate"
            onClick={() => setNotifySecurity(!notifySecurity)}
            className={cn(
              "w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 flex items-center",
              notifySecurity ? "bg-primary" : "bg-[#DCE1EB]"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 rounded-full bg-white shadow-2xs transition-transform",
                notifySecurity ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>

          <div>
            <div className="text-xs sm:text-sm font-bold text-dark">
              Notify Security Gate
            </div>
            <div className="text-[11px] sm:text-xs text-muted font-medium mt-0.5">
              Alert security of expected vacancy.
            </div>
          </div>
        </div>

        {/* Toggle Box 2: Suspend Package Deliveries */}
        <div className="rounded-xl border border-border/70 p-4 flex items-center gap-3.5">
          <button
            type="button"
            role="switch"
            aria-checked={suspendPackages}
            aria-label="Suspend Package Deliveries"
            onClick={() => setSuspendPackages(!suspendPackages)}
            className={cn(
              "w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 flex items-center",
              suspendPackages ? "bg-primary" : "bg-[#DCE1EB]"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 rounded-full bg-white shadow-2xs transition-transform",
                suspendPackages ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>

          <div>
            <div className="text-xs sm:text-sm font-bold text-dark">
              Suspend Package Deliveries
            </div>
            <div className="text-[11px] sm:text-xs text-muted font-medium mt-0.5">
              Hold packages at management office.
            </div>
          </div>
        </div>

        {/* Footer Buttons: Cancel & Save Record */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl border border-border bg-surface-card hover:bg-surface-subtle text-xs sm:text-sm font-bold text-dark transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
}
