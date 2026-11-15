"use client";

import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import SecurityProfileHeader from "@/components/members/SecurityProfileHeader";
import SecurityMembersTable, { type SecurityMember } from "@/components/members/SecurityMembersTable";

type Tab = "About" | "Security Members";

const INITIAL_ABOUT =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.";

const INITIAL_MEMBERS: SecurityMember[] = [
  { id: "1", name: "David Onyemena", role: "Patrol",      age: 36, gender: "Male"   },
  { id: "2", name: "David Onyemena", role: "Gate Keeper", age: 34, gender: "Female" },
  { id: "3", name: "David Onyemena", role: "Patrol",      age: 34, gender: "Male"   },
];

export default function SecurityMembersPage() {
  const [activeTab, setActiveTab]   = useState<Tab>("About");
  const [about, setAbout]           = useState(INITIAL_ABOUT);
  const [editing, setEditing]       = useState(false);
  const [draft, setDraft]           = useState(INITIAL_ABOUT);
  const [members, setMembers]       = useState<SecurityMember[]>(INITIAL_MEMBERS);

  function saveEdit() {
    setAbout(draft);
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(about);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Profile header — cover + avatar */}
      <SecurityProfileHeader
        name={activeTab === "Security Members" ? "David Onyemena" : "Estate Security"}
        unitId="LEHN123B"
        email="Broklyn@gmail.com"
        showEmail={activeTab === "Security Members"}
      />

      {/* Tabs + content card */}
      <div className="bg-white rounded-xl border border-[--color-border] flex flex-col">
        {/* Tab bar */}
        <div className="flex border-b border-[--color-border] px-5">
          {(["About", "Security Members"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors",
                activeTab === tab
                  ? "border-[--color-primary] text-[--color-primary]"
                  : "border-transparent text-[--color-text-muted] hover:text-[--color-text]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* About tab */}
        {activeTab === "About" && (
          <div className="p-6 flex flex-col gap-4 min-h-[280px]">
            {editing ? (
              <textarea
                rows={8}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full text-sm text-[--color-text] border border-[--color-border] rounded-lg px-3 py-2.5 resize-none outline-none focus:border-[--color-primary] transition-colors leading-relaxed"
              />
            ) : (
              <p className="text-sm text-[--color-text-muted] leading-relaxed">{about}</p>
            )}

            {/* Edit / Save / Cancel */}
            <div className="flex justify-end gap-2 mt-auto">
              {editing ? (
                <>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[--color-border] text-xs font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[--color-primary] text-white text-xs font-bold hover:bg-[--color-primary-dark] transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" /> Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setDraft(about); setEditing(true); }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[--color-primary] text-white text-xs font-bold hover:bg-[--color-primary-dark] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>
          </div>
        )}

        {/* Security Members tab */}
        {activeTab === "Security Members" && (
          <SecurityMembersTable
            members={members}
            onMembersChange={setMembers}
          />
        )}
      </div>
    </div>
  );
}
