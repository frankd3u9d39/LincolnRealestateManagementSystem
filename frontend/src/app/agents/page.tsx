"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Download, UserPlus, CalendarDays, RotateCcw } from "lucide-react";
import { AgentKpiCards } from "@/components/agents/AgentKpiCards";
import { AgentPerformanceChart } from "@/components/agents/AgentPerformanceChart";
import { LeadPipelineCard } from "@/components/agents/LeadPipelineCard";
import { TopAgentsCard } from "@/components/agents/TopAgentsCard";
import { UpcomingViewingsCard } from "@/components/agents/UpcomingViewingsCard";
import { AgentsTable } from "@/components/agents/AgentsTable";
import { AddAgentModal } from "@/components/agents/AddAgentModal";
import { AgentDetailDrawer } from "@/components/agents/AgentDetailDrawer";
import { AgentToast } from "@/components/agents/AgentToast";
import { usePersistentState } from "@/components/agents/usePersistentState";
import {
  agentsToCsv,
  buildAgentKpis,
  downloadTextFile,
} from "@/components/agents/agentUtils";
import {
  avatarColorFor,
  initialsFor,
  mockAgentDashboard,
} from "@/data/mockAgentData";
import { Agent, AgentStatus, NewAgentInput } from "@/types/agent";

export default function AgentDashboardPage() {
  const [agents, setAgents, resetAgents] = usePersistentState<Agent[]>(
    "lincoln.admin.agents",
    mockAgentDashboard.agents
  );
  const [visibleAgents, setVisibleAgents] = useState<Agent[]>(mockAgentDashboard.agents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const kpis = useMemo(() => buildAgentKpis(agents), [agents]);
  const selectedAgent = agents.find((a) => a.id === selectedId) ?? null;

  // Rendered on the client only to avoid server/browser timezone hydration mismatches
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const openAgent = useCallback((agent: Agent) => setSelectedId(agent.id), []);
  const closeDrawer = useCallback(() => setSelectedId(null), []);
  const closeAdd = useCallback(() => setIsAddOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const handleCreate = (input: NewAgentInput) => {
    const nextNum =
      agents.reduce((max, a) => Math.max(max, parseInt(a.id.replace(/\D/g, ""), 10) || 0), 0) + 1;
    const agent: Agent = {
      ...input,
      id: `AGT-${String(nextNum).padStart(3, "0")}`,
      initials: initialsFor(input.name),
      avatarBg: avatarColorFor(nextNum - 1),
      joinedOn: new Date().toISOString().slice(0, 10),
      activeListings: 0,
      openLeads: 0,
      dealsClosed: 0,
      commission: 0,
      targetProgress: 0,
      rating: 0,
      reviews: 0,
    };
    setAgents((prev) => [agent, ...prev]);
    setIsAddOpen(false);
    setToast(`${agent.name} was added as ${agent.id}.`);
  };

  const handleStatusChange = (agentId: string, status: AgentStatus) => {
    const agent = agents.find((a) => a.id === agentId);
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status } : a)));
    if (agent) setToast(`${agent.name} is now ${status}.`);
  };

  const handleExport = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadTextFile(`lincoln-agents-${stamp}.csv`, agentsToCsv(visibleAgents));
    setToast(
      `Exported ${visibleAgents.length} agent${visibleAgents.length === 1 ? "" : "s"} to CSV.`
    );
  };

  return (
    <>
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex h-4 items-center gap-1.5 text-xs font-semibold text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" />
            {today}
          </p>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-dark">
            Agent Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Monitor agent performance, listings, leads and viewings.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
          <button
            type="button"
            onClick={handleExport}
            disabled={visibleAgents.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-dark shadow-sm hover:bg-slate-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-accent" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Agent</span>
          </button>
        </div>
      </div>

      {/* KPIs (derived from the roster) */}
      <AgentKpiCards kpis={kpis} />

      {/* Performance chart + Lead pipeline */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <AgentPerformanceChart data={mockAgentDashboard.performance} />
        </div>
        <div className="lg:col-span-4">
          <LeadPipelineCard pipeline={mockAgentDashboard.pipeline} />
        </div>
      </div>

      {/* Top performers + Upcoming viewings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopAgentsCard agents={agents} onView={openAgent} />
        <UpcomingViewingsCard
          viewings={mockAgentDashboard.viewings}
          agents={agents}
          onViewAgent={openAgent}
        />
      </div>

      {/* Agent directory */}
      <AgentsTable agents={agents} onView={openAgent} onFilteredChange={setVisibleAgents} />

      <div className="flex justify-center pb-2">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Reset the agent list back to the sample data? Your changes will be lost.")) {
              resetAgents();
              setSelectedId(null);
              setToast("Sample data restored.");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset sample data
        </button>
      </div>
    </div>

      {/* Overlays (outside the space-y container so they get no stray top margin) */}
      <AddAgentModal
        isOpen={isAddOpen}
        existingAgents={agents}
        onClose={closeAdd}
        onCreate={handleCreate}
      />
      <AgentDetailDrawer
        agent={selectedAgent}
        viewings={mockAgentDashboard.viewings}
        onClose={closeDrawer}
        onStatusChange={handleStatusChange}
      />
      <AgentToast message={toast} onDismiss={dismissToast} />
    </>
  );
}
