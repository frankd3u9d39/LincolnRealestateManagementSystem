"use client";

import { useState } from "react";
import { Activity, Plus, X } from "lucide-react";
import EstateActivityTable, { type ActivityRow } from "@/components/reports/EstateActivityTable";

// ── mock data ──────────────────────────────────────────────────────────────
const BASE_ROWS: ActivityRow[] = [
  { id: "1", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Alone" },
  { id: "2", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Wife"  },
  { id: "3", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Wife"  },
  { id: "4", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Wife"  },
  { id: "5", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Wife"  },
  { id: "6", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Wife"  },
  { id: "7", name: "David Onyemenam", out: "8:30am", outWith: "Family", in: "6:45pm", inWith: "Wife"  },
];
// ──────────────────────────────────────────────────────────────────────────

export default function EstateActivityPage() {
  const [rows, setRows]           = useState<ActivityRow[]>(BASE_ROWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm]           = useState({ name: "", out: "", outWith: "", in: "", inWith: "" });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setRows((prev) => [
      ...prev,
      { id: String(Date.now()), ...form },
    ]);
    setForm({ name: "", out: "", outWith: "", in: "", inWith: "" });
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Stat header */}
      <div className="bg-white rounded-xl border border-[--color-border] p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[--color-primary-light] flex items-center justify-center shrink-0">
            <Activity className="w-7 h-7 text-[--color-primary]" />
          </div>
          <div>
            <p className="text-3xl font-bold text-[--color-text]">{rows.length}</p>
            <p className="text-sm text-[--color-text-muted] mt-0.5">Estate Activities</p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[--color-primary] text-white text-xs font-bold hover:bg-[--color-primary-dark] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Activity
        </button>
      </div>

      {/* Table */}
      <EstateActivityTable
        rows={rows}
        total={rows.length}
        onAddActivity={() => setModalOpen(true)}
      />

      {/* Add Activity Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[--color-border]">
                <h3 className="text-base font-bold text-[--color-text]">Add Estate Activity</h3>
                <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5 text-[--color-text-muted]" />
                </button>
              </div>
              {/* Form */}
              <form onSubmit={handleAdd} className="p-6 flex flex-col gap-4">
                {[
                  { key: "name",    label: "Resident Name",   placeholder: "e.g. David Onyemenam" },
                  { key: "out",     label: "Check-Out Time",  placeholder: "e.g. 8:30am"          },
                  { key: "outWith", label: "Out With",        placeholder: "e.g. Family"           },
                  { key: "in",      label: "Check-In Time",   placeholder: "e.g. 6:45pm"          },
                  { key: "inWith",  label: "In With",         placeholder: "e.g. Wife"             },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-[--color-text] mb-1.5">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary] transition-colors"
                    />
                  </div>
                ))}
                <div className="flex gap-3 mt-2">
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
                    Add Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
