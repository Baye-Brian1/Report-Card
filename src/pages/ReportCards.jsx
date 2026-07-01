import React, { useState } from "react";
import { Search, FileDown, Printer, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeading,
  Button,
  Badge,
  EmptyState,
} from "../components/ui";

const students = [
  {
    id: "SCH001",
    name: "Ama Nkeng",
    class: "Form 1",
    term: "Term 2",
    overallAverage: 19.53,
    position: "1st / 1",
    subjects: [
      { name: "Mathematics", mark: 18.5, grade: "A" },
      { name: "English Language", mark: 19, grade: "A" },
      { name: "Biology", mark: 20, grade: "A" },
      { name: "Chemistry", mark: 19, grade: "A" },
    ],
  },
  {
    id: "SCH002",
    name: "Brian Ateh",
    class: "Form 2",
    term: "Term 2",
    overallAverage: 13.2,
    position: "1st / 1",
    subjects: [
      { name: "Mathematics", mark: 12, grade: "B" },
      { name: "English Language", mark: 14.5, grade: "B" },
      { name: "History", mark: 13, grade: "B" },
      { name: "French", mark: 13.3, grade: "B" },
    ],
  },
];

export default function ReportCards() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(students[0]);

  const filtered = students.filter((s) =>
    `${s.name} ${s.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        title="Report Cards"
        subtitle="Search for a student and generate their term report card."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        {/* Student list */}
        <Card>
          <CardHeader title="Students" />
          <div className="relative mb-4">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or ID…"
              className="w-full rounded-full border border-[#e2e8f0] bg-[#f1f5f9] py-2 pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  selected?.id === s.id
                    ? "bg-[#0ea5e9]/10 text-[#0ea5e9]"
                    : "text-slate-600 hover:bg-[#f1f5f9]"
                }`}
              >
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="font-mono text-xs text-slate-400">{s.id}</div>
                </div>
                <span className="text-xs text-slate-400">{s.class}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Report preview */}
        <Card>
          {!selected ? (
            <EmptyState
              icon={FileText}
              title="No student selected"
              subtitle="Choose a student from the list to preview their report card."
            />
          ) : (
            <>
              <div className="flex flex-col justify-between gap-3 border-b border-[#e2e8f0] pb-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[#1e3a8a]">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selected.class} · {selected.term} · {selected.id}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" icon={Printer}>
                    Print
                  </Button>
                  <Button icon={FileDown}>Download PDF</Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#e2e8f0] p-4 text-center">
                  <div className="font-mono text-2xl font-bold text-[#1e3a8a]">
                    {selected.overallAverage.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500">Overall Average</div>
                </div>
                <div className="rounded-xl border border-[#e2e8f0] p-4 text-center">
                  <div className="font-mono text-2xl font-bold text-[#1e3a8a]">
                    {selected.position}
                  </div>
                  <div className="text-xs text-slate-500">Class Position</div>
                </div>
                <div className="rounded-xl border border-[#e2e8f0] p-4 text-center">
                  <Badge tone="emerald">Promoted</Badge>
                  <div className="mt-1 text-xs text-slate-500">
                    Term Outcome
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto rounded-xl border border-[#e2e8f0]">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-[#f1f5f9]">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Mark / 20
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {selected.subjects.map((sub) => (
                      <tr key={sub.name} className="hover:bg-[#f1f5f9]/60">
                        <td className="px-4 py-3 font-medium text-[#1e3a8a]">
                          {sub.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600">
                          {sub.mark}
                        </td>
                        <td className="px-4 py-3">
                          <Badge tone={sub.grade === "A" ? "emerald" : "sky"}>
                            {sub.grade}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
