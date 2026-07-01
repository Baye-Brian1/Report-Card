import React from "react";
import { Link } from "react-router-dom";
import { Users, ArrowUpRight, Plus } from "lucide-react";
import { Card, PageHeading, Button, Badge } from "../components/ui";

const classList = [
  { name: "Form 1", students: 1, average: 19.53, teacher: "Mrs. Ekema Grace" },
  { name: "Form 2", students: 1, average: 13.2, teacher: "Mr. Njoh Divine" },
  { name: "Form 3", students: 0, average: null, teacher: "Unassigned" },
  { name: "Form 4", students: 0, average: null, teacher: "Unassigned" },
  { name: "Form 5", students: 0, average: null, teacher: "Unassigned" },
  { name: "Lower Sixth Arts", students: 0, average: null, teacher: "Unassigned" },
  { name: "Lower Sixth Science", students: 0, average: null, teacher: "Unassigned" },
  { name: "Upper Sixth Arts", students: 0, average: null, teacher: "Unassigned" },
  { name: "Upper Sixth Science", students: 0, average: null, teacher: "Unassigned" },
];

function averageTone(avg) {
  if (avg === null) return "slate";
  if (avg >= 16) return "emerald";
  if (avg >= 10) return "sky";
  return "rose";
}

export default function Classes() {
  return (
    <>
      <PageHeading
        title="Classes"
        subtitle={`${classList.length} classes configured this academic year.`}
        action={<Button icon={Plus}>Add Class</Button>}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classList.map((c) => (
          <Card key={c.name} className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a8a]/10 text-[#1e3a8a]">
                <Users size={20} />
              </div>
              <Badge tone={averageTone(c.average)}>
                {c.average !== null ? `Avg ${c.average.toFixed(2)}` : "No data"}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-[#1e3a8a]">
                {c.name}
              </h3>
              <p className="text-sm text-slate-500">{c.teacher}</p>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-[#e2e8f0] pt-3 text-sm">
              <span className="text-slate-500">
                {c.students} student{c.students === 1 ? "" : "s"}
              </span>
              <Link
                to="/students"
                className="flex items-center gap-1 font-medium text-[#0ea5e9] hover:underline"
              >
                View roster <ArrowUpRight size={14} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
