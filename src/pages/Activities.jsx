import React, { useState } from "react";
import { UserPlus, PenSquare, FileText, Users, Filter } from "lucide-react";
import { Card, PageHeading, Select } from "../components/ui";

const allActivity = [
  { icon: UserPlus, text: "New student enrolled — Ama Nkeng (Form 1)", time: "2 hours ago", type: "Student" },
  { icon: PenSquare, text: "Marks entered — Form 2, Mathematics, Sequence 3", time: "5 hours ago", type: "Marks" },
  { icon: FileText, text: "Report card generated — Brian Ateh (Form 2)", time: "Yesterday, 4:12 PM", type: "Report Card" },
  { icon: Users, text: "New class added — Form 3", time: "2 days ago", type: "Class" },
  { icon: PenSquare, text: "Marks entered — Form 1, English Language, Sequence 3", time: "3 days ago", type: "Marks" },
  { icon: UserPlus, text: "New student enrolled — Brian Ateh (Form 2)", time: "1 week ago", type: "Student" },
  { icon: FileText, text: "Report card generated — Ama Nkeng (Form 1)", time: "1 week ago", type: "Report Card" },
];

const toneByType = {
  Student: "bg-[#1e3a8a] text-white",
  Marks: "bg-[#0ea5e9] text-white",
  "Report Card": "bg-[#10b981] text-white",
  Class: "bg-slate-300 text-slate-700",
};

const types = ["All", "Student", "Marks", "Report Card", "Class"];

export default function Activities() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? allActivity : allActivity.filter((a) => a.type === filter);

  return (
    <>
      <PageHeading
        title="Activities"
        subtitle="A complete log of actions taken across the system."
        action={
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-40">
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </div>
        }
      />

      <Card>
        <ol className="relative flex flex-col gap-6 border-l-2 border-dashed border-[#e2e8f0] pl-6">
          {filtered.map(({ icon: Icon, text, time, type }, i) => (
            <li key={i} className="relative">
              <span
                className={`absolute -left-[31px] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white ${toneByType[type]}`}
              >
                <Icon size={13} />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-[#1e293b]">{text}</p>
                <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-medium text-slate-500">
                  {type}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">{time}</p>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="py-6 text-sm text-slate-400">
              No activity found for this filter.
            </li>
          )}
        </ol>
      </Card>
    </>
  );
}
