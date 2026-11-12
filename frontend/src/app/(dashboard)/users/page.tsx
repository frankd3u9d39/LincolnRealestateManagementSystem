"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Download, Plus, ChevronRight, Users, UserCheck } from "lucide-react";
import { User, UserStats } from "@/types/user";
import { UserMetrics } from "@/components/users/UserMetrics";
import { UserFilterBar } from "@/components/users/UserFilterBar";
import { UserTableDesktop } from "@/components/users/UserTableDesktop";
import { UserCardsMobile } from "@/components/users/UserCardsMobile";
import { QuickTipCard } from "@/components/users/QuickTipCard";
import { UserModal, ModalMode } from "@/components/users/UserModal";

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.d@example.com",
    phone: "+234 801 234 5678",
    role: "resident",
    status: "active",
    unit_number: "Villa A-402",
    staff_id: null,
    job_title: "Resident Homeowner",
    avatar_url: "https://ui-avatars.com/api/?name=John+Doe&background=B22222&color=fff&bold=true",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "s.jenkins@example.com",
    phone: "+234 802 345 6789",
    role: "manager",
    status: "active",
    unit_number: "Block B, 204",
    staff_id: "STF-4829",
    job_title: "Senior Property Manager",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Mike Warden",
    email: "m.warden@example.com",
    phone: "+234 803 456 7890",
    role: "security",
    status: "inactive",
    unit_number: "Gate 1",
    staff_id: "STF-1044",
    job_title: "Security Gate Lead",
    avatar_url: "https://ui-avatars.com/api/?name=Mike+Warden&background=4B5563&color=fff&bold=true",
  },
  {
    id: 4,
    name: "Marcus Reed",
    email: "m.reed@lincolnestate.com",
    phone: "+234 804 567 8901",
    role: "agent",
    status: "pending",
    unit_number: null,
    staff_id: "STF-PEND",
    job_title: "Leasing Agent",
    requested_at: "2024-10-24T10:00:00Z",
    avatar_url: "https://ui-avatars.com/api/?name=Marcus+Reed&background=BAE6FD&color=0369A1&bold=true",
  },
  {
    id: 5,
    name: "David Chen",
    email: "d.chen@lincolnestate.com",
    phone: "+234 805 678 9012",
    role: "maintenance",
    status: "suspended",
    unit_number: null,
    staff_id: "STF-3391",
    job_title: "Maintenance Tech",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Amaka Eze",
    email: "amaka.eze@example.com",
    phone: "+234 806 789 0123",
    role: "resident",
    status: "active",
    unit_number: "Duplex 12",
    staff_id: null,
    job_title: "Resident Member",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    name: "Tunde Bakare",
    email: "tunde.b@lincolnestate.com",
    phone: "+234 807 890 1234",
    role: "maintenance",
    status: "active",
    unit_number: null,
    staff_id: "STF-2890",
    job_title: "Lead Electrical Engineer",
    avatar_url: "https://ui-avatars.com/api/?name=Tunde+Bakare&background=B22222&color=fff&bold=true",
  },
];

const initialStats: UserStats = {
  total_users: 2450,
  total_users_trend: "+12%",
  pending_approval: 12,
  blocked_accounts: 4,
  active_staff: 86,
  active_staff_trend: "+3",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.unit_number && user.unit_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.staff_id && user.staff_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.job_title && user.job_title.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedRole === "all" || selectedRole === "all roles") return true;
      if (selectedRole === "all_staff" || selectedRole === "all staff") {
        return ["manager", "agent", "maintenance", "security", "admin", "super_admin", "staff"].includes(
          user.role
        );
      }
      if (selectedRole === "managers") return user.role === "manager";
      if (selectedRole === "agents") return user.role === "agent";
      if (selectedRole === "maintenance") return user.role === "maintenance";
      if (selectedRole === "residents") return user.role === "resident";
      if (selectedRole === "security") return user.role === "security";

      return user.role === selectedRole;
    });
  }, [users, searchTerm, selectedRole]);

  const handleAddUser = () => {
    setActiveUser(null);
    setModalMode("add");
  };

  const handleEditUser = (user: User) => {
    setActiveUser(user);
    setModalMode("edit");
  };

  const handleViewUser = (user: User) => {
    setActiveUser(user);
    setModalMode("view");
  };

  const handleDeleteUser = (user: User) => {
    setActiveUser(user);
    setModalMode("delete");
  };

  const handleSuspendUser = (user: User) => {
    setActiveUser(user);
    setModalMode("suspend");
  };

  const handleConfirmDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setStats((prev) => ({
      ...prev,
      total_users: Math.max(0, prev.total_users - 1),
    }));
  };

  const handleConfirmSuspend = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "suspended" } : u))
    );
    setStats((prev) => ({
      ...prev,
      blocked_accounts: prev.blocked_accounts + 1,
    }));
  };

  const handleApprove = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              status: "active",
              staff_id: u.staff_id === "STF-PEND" ? `STF-${Math.floor(1000 + Math.random() * 9000)}` : u.staff_id,
            }
          : u
      )
    );
    setStats((prev) => ({
      ...prev,
      pending_approval: Math.max(0, prev.pending_approval - 1),
      active_staff: prev.active_staff + 1,
    }));
  };

  const handleReject = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "inactive" } : u))
    );
    setStats((prev) => ({
      ...prev,
      pending_approval: Math.max(0, prev.pending_approval - 1),
    }));
  };

  const handleReactivate = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "active" } : u))
    );
    setStats((prev) => ({
      ...prev,
      blocked_accounts: Math.max(0, prev.blocked_accounts - 1),
    }));
  };

  const handleSaveModal = (data: Partial<User>) => {
    if (modalMode === "add") {
      const newUser: User = {
        id: Date.now(),
        name: data.name || "New User",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "resident",
        status: data.status || "active",
        unit_number: data.unit_number || null,
        job_title: data.job_title || null,
        staff_id:
          data.staff_id ||
          (data.role !== "resident" ? `STF-${Math.floor(1000 + Math.random() * 9000)}` : null),
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.name || "User"
        )}&background=B22222&color=fff&bold=true`,
      };
      setUsers([newUser, ...users]);
      setStats((prev) => ({ ...prev, total_users: prev.total_users + 1 }));
    } else if (modalMode === "edit" && activeUser) {
      setUsers(
        users.map((u) => (u.id === activeUser.id ? { ...u, ...data } : u))
      );
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "Status", "Unit/House", "Staff ID", "Job Title"];
    const rows = filteredUsers.map((u) => [
      u.id,
      `"${u.name}"`,
      `"${u.email}"`,
      u.role,
      u.status,
      `"${u.unit_number || ""}"`,
      u.staff_id || "",
      `"${u.job_title || ""}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LincolnEstate_Users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-surface-card border border-border/70 rounded-2xl w-fit shadow-xs">
        <Link
          href="/staffs"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-muted hover:text-dark hover:bg-surface-subtle transition-all"
        >
          <UserCheck className="w-4 h-4" />
          <span>Staff Directory</span>
        </Link>
        <Link
          href="/users"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white shadow-xs transition-all"
        >
          <Users className="w-4 h-4" />
          <span>Resident Management</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted mb-1.5">
            <Link href="/dashboard" className="hover:text-dark transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
            <span className="text-primary font-bold">User Management</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-muted font-medium mt-1">
            <span className="hidden sm:inline">Manage estate residents and roles.</span>
            <span className="sm:hidden">Manage staff, roles, and permissions.</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface-card hover:bg-surface-subtle text-xs sm:text-sm font-bold text-dark transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-accent" />
            <span>Export</span>
          </button>

          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold transition-all shadow-sm group"
          >
            <Plus className="w-4 h-4 stroke-[2.5] transition-transform group-hover:rotate-90" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <UserMetrics stats={stats} />

      {/* Filters */}
      <UserFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
      />

      {/* Desktop Table + Quick Tip */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-9">
          <UserTableDesktop
            users={filteredUsers}
            totalCount={stats.total_users}
            currentPage={currentPage}
            totalPages={Math.ceil(stats.total_users / 10)}
            onPageChange={setCurrentPage}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onView={handleViewUser}
            onApprove={handleApprove}
          />
        </div>

        <div className="lg:col-span-3">
          <QuickTipCard />
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        <UserCardsMobile
          users={filteredUsers}
          onEdit={handleEditUser}
          onSuspend={handleSuspendUser}
          onApprove={handleApprove}
          onReject={handleReject}
          onReactivate={handleReactivate}
          onView={handleViewUser}
        />
      </div>

      <UserModal
        mode={modalMode}
        user={activeUser}
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        onSave={handleSaveModal}
        onConfirmDelete={handleConfirmDelete}
        onConfirmSuspend={handleConfirmSuspend}
      />
    </div>
  );
}
