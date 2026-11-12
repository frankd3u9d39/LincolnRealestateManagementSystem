"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, CheckCircle2 } from "lucide-react";
import { ServiceKpiCards } from "@/components/services/ServiceKpiCards";
import { ServiceDirectoryCard } from "@/components/services/ServiceDirectoryCard";
import { ServiceInsightsRow } from "@/components/services/ServiceInsightsRow";
import { AddServiceModal } from "@/components/services/AddServiceModal";
import { mockServiceManagementData } from "@/data/mockServicesData";
import { EstateServiceItem, ServiceStatus } from "@/types/serviceManagement";

export default function ServiceManagementPage() {
  const [services, setServices] = useState<EstateServiceItem[]>(
    mockServiceManagementData.services
  );
  const [statusFilter, setStatusFilter] = useState<"All" | ServiceStatus>(
    "All"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] =
    useState<EstateServiceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredServices = useMemo(() => {
    if (statusFilter === "All") return services;
    return services.filter((s) => s.status === statusFilter);
  }, [services, statusFilter]);

  const handleCycleFilter = () => {
    const order: ("All" | ServiceStatus)[] = ["All", "Active", "Inactive"];
    const nextIdx = (order.indexOf(statusFilter) + 1) % order.length;
    setStatusFilter(order[nextIdx]);
  };

  const handleOpenAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: EstateServiceItem) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSaveService = (
    serviceData: Omit<EstateServiceItem, "id" | "dateCreated">
  ) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((item) =>
          item.id === editingService.id ? { ...item, ...serviceData } : item
        )
      );
      showToast(`Updated "${serviceData.name}" successfully.`);
    } else {
      const newService: EstateServiceItem = {
        id: `SRV-${Date.now()}`,
        ...serviceData,
        dateCreated: "Nov 11, 2024",
      };
      setServices((prev) => [newService, ...prev]);
      showToast(`Added "${serviceData.name}" to the Service Directory.`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (target) {
      showToast(`Removed "${target.name}" from Service Directory.`);
    }
  };

  const handleToggleStatus = (service: EstateServiceItem) => {
    const nextStatus: ServiceStatus =
      service.status === "Active" ? "Inactive" : "Active";
    setServices((prev) =>
      prev.map((item) =>
        item.id === service.id ? { ...item, status: nextStatus } : item
      )
    );
    showToast(`Changed "${service.name}" status to ${nextStatus}.`);
  };

  const handleExportCsv = () => {
    showToast("Service Directory exported to CSV successfully.");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-dark">
            Service Management
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
            Configure and manage various estate maintenance and utility services.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-primary/25 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4 text-accent" />
            <span>Add Service</span>
          </button>

          <Link
            href="/analytics"
            className="inline-flex items-center gap-2 rounded-xl bg-dark hover:bg-dark-soft px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors"
          >
            <span>Payment Analysis</span>
          </Link>
        </div>
      </div>

      {/* Feedback Toast Banner */}
      {toastMessage && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs font-bold text-dark shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Top Row: 4 KPI Summary Cards */}
      <ServiceKpiCards kpis={mockServiceManagementData.kpis} />

      {/* 3. Middle Section: Service Directory Table / Mobile Cards */}
      <ServiceDirectoryCard
        services={filteredServices}
        statusFilter={statusFilter}
        onCycleFilter={handleCycleFilter}
        onExportCsv={handleExportCsv}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteService}
        onToggleStatus={handleToggleStatus}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* 4. Bottom Section: Revenue Forecast & Quick Tip */}
      <ServiceInsightsRow
        forecastText={mockServiceManagementData.forecastText}
        quickTipText={mockServiceManagementData.quickTipText}
      />

      {/* 5. Footer */}
      <footer className="pt-4 pb-2 text-center text-xs font-medium text-slate-400">
        © 2024 LincolnEstate Corporate. All rights reserved. Built for secure
        property management.
      </footer>

      {/* Add / Edit Service Modal */}
      <AddServiceModal
        isOpen={isModalOpen}
        editingService={editingService}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
      />
    </div>
  );
}
