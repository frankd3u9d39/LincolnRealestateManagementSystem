"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, RotateCcw } from "lucide-react";
import { usePortalAgent } from "@/components/agent-portal/AgentPortalShell";
import { PortalKpiCards } from "@/components/agent-portal/PortalKpiCards";
import { ListingsSection } from "@/components/agent-portal/ListingsSection";
import { ClientRequestsSection } from "@/components/agent-portal/ClientRequestsSection";
import { ViewingsSection } from "@/components/agent-portal/ViewingsSection";
import { EarningsSection } from "@/components/agent-portal/EarningsSection";
import { AddListingModal } from "@/components/agent-portal/AddListingModal";
import { MatchesModal } from "@/components/agent-portal/MatchesModal";
import { AgentToast } from "@/components/agents/AgentToast";
import { usePersistentState } from "@/components/agents/usePersistentState";
import { formatNaira, formatTime, nowTime, todayIso } from "@/components/agent-portal/portalUtils";
import { isoDaysFromToday } from "@/lib/dates";
import {
  mockClientRequests,
  mockEarnings,
  mockListings,
  mockPortalViewings,
} from "@/data/mockAgentPortal";
import {
  COMMISSION_RATE,
  ClientRequest,
  EarningsPoint,
  Listing,
  ListingStatus,
  NewListingInput,
  PortalViewing,
} from "@/types/agentPortal";

interface PortalData {
  listings: Listing[];
  requests: ClientRequest[];
  viewings: PortalViewing[];
  earnings: EarningsPoint[];
  /** Listings whose commission has already been paid, so it is never paid twice. */
  paidListingIds: string[];
}

const INITIAL_DATA: PortalData = {
  listings: mockListings,
  requests: mockClientRequests,
  viewings: mockPortalViewings,
  earnings: mockEarnings,
  paidListingIds: mockListings.filter((l) => l.status === "Rented").map((l) => l.id),
};

/** A request whose viewings are all done or cancelled is no longer "Viewing Booked". */
function settleRequests(
  requests: ClientRequest[],
  viewings: PortalViewing[],
  requestIds: Array<string | null>
): ClientRequest[] {
  const affected = new Set(requestIds.filter((id): id is string => !!id));
  return requests.map((r) =>
    affected.has(r.id) &&
    r.status === "Viewing Booked" &&
    !viewings.some((v) => v.requestId === r.id && v.status === "Scheduled")
      ? { ...r, status: "Contacted" }
      : r
  );
}

export default function AgentPortalPage() {
  const agent = usePortalAgent();

  const [data, setData, resetData] = usePersistentState<PortalData>(
    `lincoln.portal.${agent.email.toLowerCase()}`,
    INITIAL_DATA
  );
  const { listings, requests, viewings, earnings } = data;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [matchRequestId, setMatchRequestId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Greeting is computed after mount so server and browser time zones can't disagree
  const [greeting, setGreeting] = useState("Welcome");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const closeAdd = useCallback(() => setIsAddOpen(false), []);
  const closeMatches = useCallback(() => setMatchRequestId(null), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const kpis = useMemo(() => {
    const today = todayIso();
    const weekEnd = isoDaysFromToday(7);
    return {
      activeListings: listings.filter((l) => l.status === "Available").length,
      newRequests: requests.filter((r) => r.status === "New").length,
      viewingsThisWeek: viewings.filter((v) => v.status === "Scheduled" && v.date >= today && v.date <= weekEnd).length,
      earnedThisMonth: earnings[earnings.length - 1]?.commission ?? 0,
      pendingCommission: listings
        .filter((l) => l.status === "Under Offer")
        .reduce((s, l) => s + Math.round(l.rentPerYear * COMMISSION_RATE), 0),
    };
  }, [listings, requests, viewings, earnings]);

  const matchRequest = requests.find((r) => r.id === matchRequestId) ?? null;

  const handleCreateListing = (input: NewListingInput) => {
    const nextNum = listings.reduce((m, l) => Math.max(m, parseInt(l.id.replace(/\D/g, ""), 10) || 0), 0) + 1;
    const listing: Listing = {
      ...input,
      id: `LST-${nextNum}`,
      status: "Available",
      listedOn: todayIso(),
      views: 0,
      inquiries: 0,
    };
    setData((prev) => ({ ...prev, listings: [listing, ...prev.listings] }));
    setIsAddOpen(false);
    setToast(`“${listing.title}” is now live as ${listing.id}.`);
  };

  const handleListingStatus = (listingId: string, status: ListingStatus) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing || listing.status === status) return;

    if (status !== "Rented") {
      setData((prev) => ({
        ...prev,
        listings: prev.listings.map((l) => (l.id === listingId ? { ...l, status } : l)),
      }));
      setToast(`${listing.title} is now ${status}.`);
      return;
    }

    // Rented: pay commission once per property, and cancel viewings that no longer make sense
    const alreadyPaid = data.paidListingIds.includes(listingId);
    const fee = Math.round(listing.rentPerYear * COMMISSION_RATE);
    const cancelled = data.viewings.filter((v) => v.listingId === listingId && v.status === "Scheduled");

    setData((prev) => {
      const nextViewings = prev.viewings.map((v) =>
        v.listingId === listingId && v.status === "Scheduled" ? { ...v, status: "Cancelled" as const } : v
      );
      return {
        ...prev,
        listings: prev.listings.map((l) => (l.id === listingId ? { ...l, status } : l)),
        viewings: nextViewings,
        requests: settleRequests(prev.requests, nextViewings, cancelled.map((v) => v.requestId)),
        earnings: alreadyPaid
          ? prev.earnings
          : prev.earnings.map((e, i) => (i === prev.earnings.length - 1 ? { ...e, commission: e.commission + fee } : e)),
        paidListingIds: alreadyPaid ? prev.paidListingIds : [...prev.paidListingIds, listingId],
      };
    });

    const extra = cancelled.length
      ? ` ${cancelled.length} scheduled viewing${cancelled.length === 1 ? " was" : "s were"} cancelled.`
      : "";
    setToast(
      alreadyPaid
        ? `${listing.title} is rented again. Commission was already paid for it.${extra}`
        : `${listing.title} is rented. You earned ${formatNaira(fee)} commission.${extra}`
    );
  };

  const handleMarkContacted = (requestId: string) => {
    const r = requests.find((x) => x.id === requestId);
    setData((prev) => ({
      ...prev,
      requests: prev.requests.map((x) => (x.id === requestId ? { ...x, status: "Contacted" } : x)),
    }));
    if (r) setToast(`${r.clientName} marked as contacted.`);
  };

  /** Returns an error message when the viewing can't be booked, otherwise null. */
  const handleBook = ({
    request,
    listing,
    date,
    time,
  }: {
    request: ClientRequest;
    listing: Listing;
    date: string;
    time: string;
  }): string | null => {
    const clash = viewings.find((v) => v.status === "Scheduled" && v.date === date && v.time === time);
    if (clash) return `You already have a viewing with ${clash.clientName} at ${formatTime(time)} that day.`;
    if (date === todayIso() && time <= nowTime()) return "That time has already passed today. Pick a later time.";

    const nextNum = viewings.reduce((m, v) => Math.max(m, parseInt(v.id.replace(/\D/g, ""), 10) || 0), 9000) + 1;
    setData((prev) => ({
      ...prev,
      viewings: [
        ...prev.viewings,
        { id: `VW-${nextNum}`, listingId: listing.id, requestId: request.id, clientName: request.clientName, date, time, status: "Scheduled" },
      ],
      requests: prev.requests.map((r) => (r.id === request.id ? { ...r, status: "Viewing Booked" } : r)),
    }));
    setMatchRequestId(null);
    setToast(`Viewing booked for ${request.clientName} at ${listing.title}.`);
    return null;
  };

  const handleViewing = (viewingId: string, status: "Completed" | "Cancelled") => {
    const v = viewings.find((x) => x.id === viewingId);
    if (!v) return;
    setData((prev) => {
      const nextViewings = prev.viewings.map((x) => (x.id === viewingId ? { ...x, status } : x));
      return { ...prev, viewings: nextViewings, requests: settleRequests(prev.requests, nextViewings, [v.requestId]) };
    });
    setToast(`Viewing with ${v.clientName} ${status === "Completed" ? "marked as done" : "cancelled"}.`);
  };

  const handleReset = () => {
    if (window.confirm("Reset the portal back to the sample data? Your changes will be lost.")) {
      resetData();
      setToast("Sample data restored.");
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Greeting */}
        <div id="overview" className="flex scroll-mt-28 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-dark sm:text-2xl">
              {greeting}, {agent.firstName}
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Here&apos;s what&apos;s happening with your rentals today.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Add Listing
          </button>
        </div>

        <PortalKpiCards values={kpis} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <ListingsSection listings={listings} onStatusChange={handleListingStatus} onAdd={() => setIsAddOpen(true)} />
            <ClientRequestsSection
              requests={requests}
              listings={listings}
              onFindMatches={(r) => setMatchRequestId(r.id)}
              onMarkContacted={handleMarkContacted}
            />
          </div>
          <div className="space-y-6 xl:col-span-4">
            <ViewingsSection
              viewings={viewings}
              listings={listings}
              onComplete={(id) => handleViewing(id, "Completed")}
              onCancel={(id) => handleViewing(id, "Cancelled")}
            />
            <EarningsSection earnings={earnings} listings={listings} />
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset sample data
          </button>
        </div>
      </div>

      {/* Overlays sit outside the space-y container so they get no stray top margin */}
      <AddListingModal isOpen={isAddOpen} onClose={closeAdd} onCreate={handleCreateListing} />
      <MatchesModal request={matchRequest} listings={listings} onClose={closeMatches} onBook={handleBook} />
      <AgentToast message={toast} onDismiss={dismissToast} />
    </>
  );
}
