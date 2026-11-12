"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Download,
  UserPlus,
  ArrowRight,
  Users,
  LayoutGrid,
  Table2,
  Rows3,
  ListChecks,
} from "lucide-react";
import {
  StaffMember,
  StaffMetrics,
  StaffActivityItem,
  StaffStatus,
} from "@/types/staff";
import {
  initialStaffMembers,
  initialStaffsListMembers,
  initialMetrics,
  initialActivities,
  initialDepartmentAnalytics,
} from "@/lib/staffData";
import { StaffMetricsBar } from "@/components/staff/StaffMetricsBar";
import { StaffCard } from "@/components/staff/StaffCard";
import { RecentActivityWidget } from "@/components/staff/RecentActivityWidget";
import { StaffTipWidget } from "@/components/staff/StaffTipWidget";
import { EditStaffProfileModal } from "@/components/staff/EditStaffProfileModal";
import { CreateStaffModal } from "@/components/staff/CreateStaffModal";
import { StaffFilterBar } from "@/components/staff/StaffFilterBar";
import { StaffManagementTable } from "@/components/staff/StaffManagementTable";
import { DepartmentOverviewCard } from "@/components/staff/DepartmentOverviewCard";
import { PerformanceGoalCard } from "@/components/staff/PerformanceGoalCard";
import { StaffHorizontalListView } from "@/components/staff/StaffHorizontalListView";
import { StaffsZebraListView } from "@/components/staff/StaffsZebraListView";
import { CreatingStaffOverlayModal } from "@/components/staff/CreatingStaffOverlayModal";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;
const FEATURED_LIST_IDS = [1, 8, 9, 10]; // Bessie Cooper (LES10), Darrell Steward (LES11), Jerome Bell (LES12), Floyd Miles (LES13)

export default function StaffPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<
    "staffs_list" | "list" | "table" | "grid"
  >("staffs_list");
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaffMembers);
  const [zebraStaffList, setZebraStaffList] = useState<StaffMember[]>(
    initialStaffsListMembers
  );
  const [metrics, setMetrics] = useState<StaffMetrics>(initialMetrics);
  const [activities, setActivities] = useState<StaffActivityItem[]>(initialActivities);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSimpleCreateOverlayOpen, setIsSimpleCreateOverlayOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  // Filters & Selection for Table View (Figma Staff 5)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<StaffStatus | "all">("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter for Grid View (Figma Staff 1)
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);

  // Horizontal List View members (Figma "staffs": LES10 - LES13 + any newly added session staff)
  const horizontalListStaff = useMemo(() => {
    const newlyCreated = staffList.filter((s) => s.id > 1000);
    const featured = FEATURED_LIST_IDS.map((id) =>
      staffList.find((s) => s.id === id)
    ).filter((s): s is StaffMember => Boolean(s));
    return [...newlyCreated, ...featured];
  }, [staffList]);

  // Distinct departments list
  const departments = useMemo(() => {
    const set = new Set<string>();
    staffList.forEach((s) => {
      if (s.department) set.add(s.department);
    });
    return Array.from(set);
  }, [staffList]);

  // Filtered staff list for Table View
  const filteredTableStaff = useMemo(() => {
    return staffList.filter((s) => {
      const matchesDept =
        selectedDepartment === "all" || s.department === selectedDepartment;
      const matchesStatus =
        selectedStatus === "all" || s.status === selectedStatus;
      return matchesDept && matchesStatus;
    });
  }, [staffList, selectedDepartment, selectedStatus]);

  // Paginated rows for Table View (6 per page, matching Figma Staff 5)
  const paginatedTableStaff = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTableStaff.slice(start, start + PAGE_SIZE);
  }, [filteredTableStaff, currentPage]);

  const totalMembersDisplay =
    selectedDepartment === "all" && selectedStatus === "all"
      ? 152
      : filteredTableStaff.length;

  const totalPagesDisplay =
    selectedDepartment === "all" && selectedStatus === "all"
      ? 26
      : Math.max(1, Math.ceil(filteredTableStaff.length / PAGE_SIZE));

  // Filtered staff list for Card Directory View
  const displayedGridStaff = useMemo(() => {
    if (filterActiveOnly) {
      return staffList.filter((s) => s.status === "active");
    }
    return staffList;
  }, [staffList, filterActiveOnly]);

  // Selection handlers
  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const pageIds = paginatedTableStaff.map((m) => m.id);
    const allSelected =
      pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const handleBulkStatusChange = (status: StaffStatus) => {
    setStaffList((prev) =>
      prev.map((member) =>
        selectedIds.includes(member.id) ? { ...member, status } : member
      )
    );
    setSelectedIds([]);
  };

  // Staff CRUD handlers
  const handleOpenAdd = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewProfile = (member: StaffMember) => {
    router.push(`/staffs/${member.id}`);
  };

  const handleOpenEdit = (member: StaffMember) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleToggleMemberStatus = (member: StaffMember) => {
    const nextStatus: StaffStatus =
      member.status === "suspended" ? "active" : "suspended";
    setStaffList((prev) =>
      prev.map((s) => (s.id === member.id ? { ...s, status: nextStatus } : s))
    );
  };

  const handleCreateStaff = (data: Partial<StaffMember>) => {
    const newStaff: StaffMember = {
      id: Date.now(),
      name: data.name || "Jonathan Aris",
      email: data.email || "j.aris@lincolnestate.com",
      phone: data.phone || "+1 (555) 000-0000",
      role: data.role || "Property Manager",
      job_title: data.job_title || "Property Manager",
      department: data.department || "Leasing Operations",
      staff_id: data.staff_id || `LES001`,
      employment_type: data.employment_type || "full_time",
      status: data.status || "active",
      avatar_url:
        data.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.name || "Jonathan Aris"
        )}&background=B22222&color=fff&bold=true`,
    };

    setStaffList([newStaff, ...staffList]);
    setZebraStaffList([newStaff, ...zebraStaffList]);
    setCurrentPage(1);
    setMetrics((prev) => ({
      ...prev,
      total_staff: prev.total_staff + 1,
      active: newStaff.status === "active" ? prev.active + 1 : prev.active,
      new_joining: prev.new_joining + 1,
    }));

    setActivities([
      {
        id: Date.now(),
        staff_name: "Admin",
        action_text: "added a new staff member:",
        target_entity: `${newStaff.name}.`,
        timestamp_display: "Just now",
        dot_color: "gold",
      },
      ...activities,
    ]);
  };

  const handleConfirmDelete = (id: number) => {
    const deleted =
      staffList.find((s) => s.id === id) ??
      zebraStaffList.find((s) => s.id === id);
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    setZebraStaffList((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => prev.filter((selId) => selId !== id));
    setMetrics((prev) => ({
      ...prev,
      total_staff: Math.max(0, prev.total_staff - 1),
      active:
        deleted?.status === "active" ? Math.max(0, prev.active - 1) : prev.active,
      suspended:
        deleted?.status === "suspended"
          ? Math.max(0, prev.suspended - 1)
          : prev.suspended,
    }));
  };

  const handleDeleteMember = (member: StaffMember) => {
    if (confirm(`Are you sure you want to remove ${member.name}?`)) {
      handleConfirmDelete(member.id);
    }
  };

  const handleSaveMember = (data: Partial<StaffMember>) => {
    if (!selectedMember) return;

    setStaffList((prev) =>
      prev.map((s) => (s.id === selectedMember.id ? { ...s, ...data } : s))
    );
    setZebraStaffList((prev) =>
      prev.map((s) => (s.id === selectedMember.id ? { ...s, ...data } : s))
    );

    if (data.status && data.status !== selectedMember.status) {
      setActivities([
        {
          id: Date.now(),
          staff_name: "System alert:",
          action_text: `${selectedMember.name}'s access credentials`,
          target_entity:
            data.status === "suspended" ? "suspended." : "reactivated.",
          timestamp_display: "Just now",
          dot_color: data.status === "suspended" ? "red" : "gold",
        },
        ...activities,
      ]);
    }
  };

  // Export Staff to CSV
  const handleExportCSV = () => {
    const headers = [
      "Staff ID",
      "Full Name",
      "Email",
      "Phone",
      "Role",
      "Department",
      "Status",
    ];
    const source =
      viewMode === "table"
        ? filteredTableStaff
        : viewMode === "staffs_list"
          ? zebraStaffList
          : viewMode === "list"
            ? horizontalListStaff
            : displayedGridStaff;
    const rows = source.map((s) => [
      s.staff_id,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.phone || ""}"`,
      `"${s.job_title}"`,
      `"${s.department || ""}"`,
      s.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `LincolnEstate_Staff_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* ================= TOP VIEW & MODULE SWITCHER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-card border border-border/70 rounded-2xl w-fit shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode("staffs_list")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              viewMode === "staffs_list"
                ? "bg-primary text-white shadow-xs"
                : "text-muted hover:text-dark hover:bg-surface-subtle"
            )}
          >
            <ListChecks className="w-4 h-4" />
            <span>Staffs List</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              viewMode === "list"
                ? "bg-primary text-white shadow-xs"
                : "text-muted hover:text-dark hover:bg-surface-subtle"
            )}
          >
            <Rows3 className="w-4 h-4" />
            <span>Staff Cards</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              viewMode === "table"
                ? "bg-primary text-white shadow-xs"
                : "text-muted hover:text-dark hover:bg-surface-subtle"
            )}
          >
            <Table2 className="w-4 h-4" />
            <span>Staff Table</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all",
              viewMode === "grid"
                ? "bg-primary text-white shadow-xs"
                : "text-muted hover:text-dark hover:bg-surface-subtle"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Staff Directory</span>
          </button>

          <Link
            href="/users"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-muted hover:text-dark hover:bg-surface-subtle transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Resident Management</span>
          </Link>
        </div>
      </div>

      {/* ================= VIEW 1: FIGMA "staffs List" ZEBRA TABLE (TASK 9) ================= */}
      {viewMode === "staffs_list" ? (
        <StaffsZebraListView
          members={zebraStaffList}
          totalCount={120}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteMember}
          onCreateNewStaff={() => setIsSimpleCreateOverlayOpen(true)}
        />
      ) : viewMode === "list" ? (
        /* ================= VIEW 2: FIGMA "staffs" HORIZONTAL CARDS ================= */
        <StaffHorizontalListView
          members={horizontalListStaff}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteMember}
          onCreateNewStaff={() => setIsSimpleCreateOverlayOpen(true)}
          onViewAllStaff={() => setViewMode("staffs_list")}
        />
      ) : (
        <>
          {/* ================= TITLE & ACTION BUTTONS (TABLE & GRID VIEWS) ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                Staff Management
              </h1>
              <p className="text-xs sm:text-sm text-muted font-medium mt-1">
                {viewMode === "table"
                  ? "Manage and monitor employee performance and roles across departments."
                  : "Oversee and manage your real estate operational team."}
              </p>
            </div>

            {/* Action Buttons: Export + Add New Staff (Primary #B22222) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface-card hover:bg-surface-subtle text-xs sm:text-sm font-bold text-dark shadow-xs transition-all"
              >
                <Download className="w-4 h-4 text-dark/80" />
                <span>{viewMode === "table" ? "Export" : "Export Staff"}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-all group"
              >
                <UserPlus className="w-4 h-4 stroke-[2.2] transition-transform group-hover:scale-110" />
                <span>{viewMode === "table" ? "Add New Staff" : "Add Staff"}</span>
              </button>
            </div>
          </div>

          {/* ================= VIEW 3: FIGMA STAFF 5 TABLE & ANALYTICS ================= */}
          {viewMode === "table" ? (
            <div className="space-y-6">
              <StaffFilterBar
                selectedDepartment={selectedDepartment}
                onDepartmentChange={(dept) => {
                  setSelectedDepartment(dept);
                  setCurrentPage(1);
                }}
                selectedStatus={selectedStatus}
                onStatusChange={(status) => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
                departments={departments}
                selectedCount={selectedIds.length}
                onClearSelection={() => setSelectedIds([])}
                onBulkStatusChange={handleBulkStatusChange}
              />

              <StaffManagementTable
                members={paginatedTableStaff}
                totalMembersCount={totalMembersDisplay}
                currentPage={currentPage}
                totalPages={totalPagesDisplay}
                onPageChange={(page) => setCurrentPage(page)}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                onView={handleViewProfile}
                onEdit={handleOpenEdit}
                onToggleStatus={handleToggleMemberStatus}
                onDelete={handleDeleteMember}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8">
                  <DepartmentOverviewCard analytics={initialDepartmentAnalytics} />
                </div>
                <div className="lg:col-span-4">
                  <PerformanceGoalCard
                    title={initialDepartmentAnalytics.goal.title}
                    subtitle={initialDepartmentAnalytics.goal.subtitle}
                    achievedPct={initialDepartmentAnalytics.goal.achieved_pct}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* ================= VIEW 4: FIGMA STAFF 1 DIRECTORY CARDS ================= */
            <div className="space-y-6 sm:space-y-8">
              <StaffMetricsBar metrics={metrics} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-extrabold text-dark tracking-tight">
                      Staff Directory
                    </h2>
                    <button
                      type="button"
                      onClick={() => setFilterActiveOnly(!filterActiveOnly)}
                      className="flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
                    >
                      <span>{filterActiveOnly ? "Show All Staff" : "View All"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {displayedGridStaff.map((member) => (
                      <StaffCard
                        key={member.id}
                        member={member}
                        onView={handleViewProfile}
                        onEdit={handleOpenEdit}
                        onDelete={handleDeleteMember}
                      />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <RecentActivityWidget activities={activities} />
                  <StaffTipWidget />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= FIGMA "creating staff ol" OVERLAY MODAL (TASK 10) ================= */}
      <CreatingStaffOverlayModal
        isOpen={isSimpleCreateOverlayOpen}
        onClose={() => setIsSimpleCreateOverlayOpen(false)}
        onSave={handleCreateStaff}
      />

      {/* ================= FIGMA STAFF 3 CREATE MODAL (TASK 6) ================= */}
      <CreateStaffModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateStaff}
        staffSequence={staffList.length + 1}
      />

      {/* ================= FIGMA STAFF 2 EDIT MODAL (TASK 5) ================= */}
      <EditStaffProfileModal
        member={selectedMember}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveMember}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
}
