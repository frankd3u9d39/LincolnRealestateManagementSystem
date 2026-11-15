"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SecurityMember {
  id: string;
  name: string;
  role: "Patrol" | "Gate Keeper" | "Supervisor" | "CCTV Operator" | string;
  age: number;
  gender: "Male" | "Female" | string;
}

interface Props {
  members: SecurityMember[];
  onMembersChange?: (members: SecurityMember[]) => void;
}

export default function SecurityMembersTable({ members, onMembersChange }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Patrol", age: "", gender: "Male" });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const updated = [
      ...members,
      {
        id: String(Date.now()),
        name: form.name.trim(),
        role: form.role,
        age: Number(form.age) || 0,
        gender: form.gender,
      },
    ];
    onMembersChange?.(updated);
    setForm({ name: "", role: "Patrol", age: "", gender: "Male" });
    setModalOpen(false);
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[--color-border] bg-[--color-bg]">
              {["Name", "Role", "Age", "Gender"].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-[--color-text-muted] px-5 py-2.5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[--color-border]">
            {members.map((m, i) => (
              <tr
                key={m.id}
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                )}
              >
                <td className="px-5 py-2.5 text-sm text-[--color-text]">{m.name}</td>
                <td className="px-5 py-2.5 text-sm text-[--color-text-muted]">{m.role}</td>
                <td className="px-5 py-2.5 text-sm text-[--color-text-muted]">{m.age}</td>
                <td className="px-5 py-2.5 text-sm text-[--color-text-muted]">{m.gender}</td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-xs text-center text-[--color-text-muted]">
                  No members yet. Add your first member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add a Member button */}
      <div className="flex justify-end px-5 py-4 border-t border-[--color-border]">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[--color-primary] text-white text-xs font-bold hover:bg-[--color-primary-dark] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add a Member
        </button>
      </div>

      {/* Add Member Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[--color-border]">
                <h3 className="text-base font-bold text-[--color-text]">Add Security Member</h3>
                <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5 text-[--color-text-muted]" />
                </button>
              </div>
              <form onSubmit={handleAdd} className="p-6 flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[--color-text] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Onyemena"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary] transition-colors"
                  />
                </div>
                {/* Role */}
                <div>
                  <label className="block text-xs font-semibold text-[--color-text] mb-1.5">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary] bg-white transition-colors"
                  >
                    {["Patrol", "Gate Keeper", "Supervisor", "CCTV Operator"].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                {/* Age */}
                <div>
                  <label className="block text-xs font-semibold text-[--color-text] mb-1.5">Age</label>
                  <input
                    type="number"
                    min={18}
                    max={70}
                    placeholder="e.g. 34"
                    value={form.age}
                    onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary] transition-colors"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-[--color-text] mb-1.5">Gender</label>
                  <div className="flex gap-3">
                    {["Male", "Female"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, gender: g }))}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors",
                          form.gender === g
                            ? "bg-[--color-primary] text-white border-[--color-primary]"
                            : "bg-white text-[--color-text-muted] border-[--color-border] hover:bg-gray-50"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 rounded-lg border border-[--color-border] text-sm font-semibold text-[--color-text-muted] hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-[--color-primary] text-white text-sm font-bold hover:bg-[--color-primary-dark] transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
