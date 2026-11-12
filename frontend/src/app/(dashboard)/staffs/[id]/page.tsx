"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, UserX } from "lucide-react";
import { StaffMember } from "@/types/staff";
import { getStaffById, getStaffProfileDetail } from "@/lib/staffData";
import { ProfileHeader } from "@/components/staff/profile/ProfileHeader";
import { ProfileCover } from "@/components/staff/profile/ProfileCover";
import { PersonalInfoCard } from "@/components/staff/profile/PersonalInfoCard";
import { PerformanceChart } from "@/components/staff/profile/PerformanceChart";
import { EmploymentCard } from "@/components/staff/profile/EmploymentCard";
import { CurrentDutiesCard } from "@/components/staff/profile/CurrentDutiesCard";
import { VerifiedDocumentsCard } from "@/components/staff/profile/VerifiedDocumentsCard";
import { EditStaffProfileModal } from "@/components/staff/EditStaffProfileModal";

export default function StaffProfilePage() {
  const params = useParams<{ id: string }>();
  const staffId = Number(params?.id);
  const initial = useMemo(() => getStaffById(staffId), [staffId]);

  const [member, setMember] = useState<StaffMember | undefined>(initial);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-4">
        <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
          <UserX className="w-8 h-8" />
        </div>
        <h1 className="mt-5 text-xl font-extrabold text-dark">Staff member not found</h1>
        <p className="text-sm text-muted mt-1 max-w-sm">
          The profile you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/staffs"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Staff Directory
        </Link>
      </div>
    );
  }

  const detail = getStaffProfileDetail(member);
  const isSuspended = member.status === "suspended";

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-12 max-w-6xl">
      <ProfileHeader
        name={member.name}
        isSuspended={isSuspended}
        onPrint={() => window.print()}
        onToggleSuspend={() =>
          setMember((prev) =>
            prev ? { ...prev, status: prev.status === "active" ? "suspended" : "active" } : prev
          )
        }
        onEdit={() => setIsEditOpen(true)}
      />

      <ProfileCover
        name={member.name}
        jobTitle={member.job_title}
        department={member.department || "Operations"}
        avatarUrl={
          member.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=B22222&color=fff&bold=true`
        }
        isSuspended={isSuspended}
      />

      {/* Row 1: Personal Info + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="lg:col-span-5 xl:col-span-4">
          <PersonalInfoCard
            email={member.email}
            phone={member.phone || "—"}
            address={detail.home_address}
          />
        </div>
        <div className="lg:col-span-7 xl:col-span-8">
          <PerformanceChart data={detail.performance} year={detail.performance_year} />
        </div>
      </div>

      {/* Row 2: Employment + Duties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <EmploymentCard
          employeeId={detail.employee_id}
          joinDate={detail.join_date}
          department={member.department || "Operations"}
          reportsTo={detail.reports_to}
          leaveUsed={detail.leave_used}
          leaveTotal={detail.leave_total}
        />
        <CurrentDutiesCard duties={detail.duties} />
      </div>

      {/* Row 3: Documents */}
      <VerifiedDocumentsCard documents={detail.documents} />

      <EditStaffProfileModal
        member={member}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={(data) => setMember((prev) => (prev ? { ...prev, ...data } : prev))}
      />
    </div>
  );
}
