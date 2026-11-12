"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StaffMember } from "@/types/staff";
import { initialStaffsListMembers } from "@/lib/staffData";
import { StaffsZebraListView } from "@/components/staff/StaffsZebraListView";
import { EditStaffProfileModal } from "@/components/staff/EditStaffProfileModal";
import { CreatingStaffOverlayModal } from "@/components/staff/CreatingStaffOverlayModal";

export default function AllStaffsListPage() {
  const [members, setMembers] = useState<StaffMember[]>(initialStaffsListMembers);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleOpenEdit = (member: StaffMember) => {
    setSelectedMember(member);
    setIsEditOpen(true);
  };

  const handleCreateStaff = (data: Partial<StaffMember>) => {
    const newStaff: StaffMember = {
      id: Date.now(),
      name: data.name || "New Staff",
      email: data.email || "staff@lincolnestate.com",
      role: data.role || "staff",
      job_title: data.job_title || "Staff",
      department: data.department || "Operations",
      staff_id: data.staff_id || "LES001",
      status: "active",
      avatar_url: data.avatar_url,
    };
    setMembers((prev) => [newStaff, ...prev]);
  };

  const handleSaveMember = (data: Partial<StaffMember>) => {
    if (!selectedMember) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === selectedMember.id ? { ...m, ...data } : m))
    );
  };

  const handleConfirmDelete = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteMember = (member: StaffMember) => {
    if (confirm(`Are you sure you want to remove ${member.name}?`)) {
      handleConfirmDelete(member.id);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/staffs"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-dark hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Staff Management</span>
        </Link>
      </div>

      <StaffsZebraListView
        members={members}
        totalCount={120}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteMember}
        onCreateNewStaff={() => setIsCreateOpen(true)}
      />

      <CreatingStaffOverlayModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateStaff}
      />

      <EditStaffProfileModal
        member={selectedMember}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveMember}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
}
