import React, { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeading,
  Button,
  Label,
  Select,
  Badge,
} from "../components/ui";

const classes = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5"];
const subjects = [
  "Mathematics",
  "English Language",
  "Biology",
  "Chemistry",
  "History",
  "French",
];
const sequences = [
  "Sequence 1",
  "Sequence 2",
  "Sequence 3",
  "Sequence 4",
  "Sequence 5",
  "Sequence 6",
];

const rosterByClass = {
  "Form 1": [{ id: "SCH001", name: "Ama Nkeng" }],
  "Form 2": [{ id: "SCH002", name: "Brian Ateh" }],
  "Form 3": [],
  "Form 4": [],
  "Form 5": [],
};

function grade(mark) {
  if (mark === "" || mark === null) return null;
  const n = Number(mark);
  if (n >= 16) return { label: "A", tone: "emerald" };
  if (n >= 12) return { label: "B", tone: "sky" };
  if (n >= 10) return { label: "C", tone: "amber" };
  return { label: "D", tone: "rose" };
}

export default function MarksEntry() {
  const [cls, setCls] = useState("Form 1");
  const [subject, setSubject] = useState(subjects[0]);
  const [sequence, setSequence] = useState(sequences[0]);
  const [marks, setMarks] = useState({});
  const [saved, setSaved] = useState(false);

  const roster = rosterByClass[cls] || [];

  function setMark(id, value) {
    setSaved(false);
    setMarks((m) => ({ ...m, [id]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <>
      <PageHeading
        title="Marks Entry"
        subtitle="Select a class, subject, and sequence, then enter marks out of 20."
      />

      <Card>
        <CardHeader
          title="Selection"
          subtitle="Choose which marks you're entering."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="cls">Class</Label>
            <Select
              id="cls"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="sequence">Sequence</Label>
            <Select
              id="sequence"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
            >
              {sequences.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <CardHeader
          title={`${cls} · ${subject} · ${sequence}`}
          subtitle={`${roster.length} student${roster.length === 1 ? "" : "s"} in this class`}
          action={
            saved && (
              <span className="flex items-center gap-1 text-sm font-medium text-[#10b981]">
                <CheckCircle2 size={16} /> Saved
              </span>
            )
          }
        />

        {roster.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] py-10 text-center text-sm text-slate-400">
            No students enrolled in {cls} yet. Add students from the Student
            Entry page first.
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f1f5f9]">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
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
                  {roster.map((s) => {
                    const g = grade(marks[s.id]);
                    return (
                      <tr
                        key={s.id}
                        className="transition-colors hover:bg-[#f1f5f9]/60"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#1e3a8a]">
                            {s.name}
                          </div>
                          <div className="font-mono text-xs text-slate-400">
                            {s.id}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min={0}
                            max={20}
                            step={0.5}
                            value={marks[s.id] ?? ""}
                            onChange={(e) => setMark(s.id, e.target.value)}
                            className="w-24 rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-sm focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/15"
                            placeholder="—"
                          />
                        </td>
                        <td className="px-4 py-3">
                          {g ? (
                            <Badge tone={g.tone}>{g.label}</Badge>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Button type="submit" icon={Save} className="mt-4">
              Save Marks
            </Button>
          </form>
        )}
      </Card>
    </>
  );
}
