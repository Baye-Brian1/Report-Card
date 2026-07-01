import React from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  PenSquare,
  Users,
  FileText,
  ArrowUpRight,
  Award,
  Info,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, focusRing } from "../components/ui";

const ledgerStats = [
  { label: "Total Students", value: "2", trend: "+1 this term" },
  { label: "Classes", value: "9" },
  { label: "Academic Terms", value: "3" },
  { label: "Sequences", value: "6" },
];

const quickActions = [
  { label: "Add New Student", icon: UserPlus, to: "/students" },
  { label: "Enter Marks", icon: PenSquare, to: "/marks" },
  { label: "Generate Report Card", icon: FileText, to: "/report-cards" },
  { label: "View Classes", icon: Users, to: "/classes" },
];

const topClasses = [
  { rank: 1, name: "Form 1", average: "19.53", students: 1 },
  { rank: 2, name: "Form 2", average: "13.20", students: 1 },
];

// Sample data for illustration — wire this up to real per-class averages
const classPerformance = [
  { name: "Form 1", average: 19.53 },
  { name: "Form 2", average: 13.2 },
  { name: "Form 3", average: 15.8 },
  { name: "Form 4", average: 11.4 },
  { name: "Form 5", average: 16.9 },
];

const activity = [
  {
    icon: UserPlus,
    text: "New student enrolled — Form 1",
    time: "2h ago",
    tone: "navy",
  },
  {
    icon: PenSquare,
    text: "Marks entered — Form 2, Sequence 3",
    time: "5h ago",
    tone: "sky",
  },
  {
    icon: FileText,
    text: "Report card generated — J. Mbeki",
    time: "Yesterday",
    tone: "success",
  },
  {
    icon: Users,
    text: "New class added — Form 3",
    time: "2 days ago",
    tone: "muted",
  },
];

const toneClasses = {
  navy: "bg-[#1e3a8a] text-white",
  sky: "bg-[#0ea5e9] text-white",
  success: "bg-[#10b981] text-white",
  muted: "bg-slate-300 text-slate-700",
};

export default function Dashboard() {
  return (
    <>
      {/* Hero / ribbon divider */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent" />
        <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9]">
          Academic Year 2025 – 2026
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent" />
      </div>

      {/* System overview — ledger card */}
      <Card className="sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1e3a8a]">
              System Overview
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
              Welcome back. Here's where SCHOOL academic records stand this
              term.
            </p>
          </div>
          <button
            aria-label="More information"
            className={`mt-1 flex-shrink-0 rounded-full p-1 text-slate-300 transition-colors hover:bg-[#f1f5f9] hover:text-[#0ea5e9] ${focusRing}`}
          >
            <Info size={18} />
          </button>
        </div>

        <div className="mt-6 divide-y divide-dashed divide-[#e2e8f0]">
          {ledgerStats.map(({ label, value, trend }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg py-3 transition-colors hover:bg-[#f1f5f9]/60"
            >
              <span className="text-sm text-slate-500">{label}</span>
              <div className="flex items-center gap-3">
                {trend && (
                  <span className="flex items-center gap-1 rounded-full bg-[#10b981]/10 px-2 py-0.5 text-xs font-medium text-[#10b981]">
                    <ArrowUpRight size={12} />
                    {trend}
                  </span>
                )}
                <span className="font-mono text-2xl font-bold tabular-nums text-[#1e3a8a]">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="text-lg font-bold tracking-tight text-[#1e3a8a]">
              Quick Actions
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              {quickActions.map(({ label, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  className={`group flex items-center gap-3 rounded-lg border-l-4 border-[#10b981] bg-[#f1f5f9] px-4 py-3 text-left text-sm font-medium text-[#1e3a8a] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e2e8f0] hover:shadow-sm active:translate-y-0 ${focusRing}`}
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white transition-transform group-hover:scale-105">
                    <Icon size={15} />
                  </span>
                  {label}
                  <ChevronRight
                    size={15}
                    className="ml-auto flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#10b981]"
                  />
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold tracking-tight text-[#1e3a8a]">
              Recent Activity
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              {activity.map(({ icon: Icon, text, time, tone }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg p-1.5 transition-colors hover:bg-[#f1f5f9]"
                >
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${toneClasses[tone]}`}
                  >
                    <Icon size={14} />
                  </span>
                  <div>
                    <p className="text-sm leading-snug text-[#1e293b]">
                      {text}
                    </p>
                    <p className="text-xs text-slate-400">{time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/activities"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0ea5e9] hover:underline"
            >
              View all activity <ChevronRight size={14} />
            </Link>
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="text-lg font-bold tracking-tight text-[#1e3a8a]">
              Top Performing Classes
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {topClasses.map(({ rank, name, average, students }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-lg border border-[#e2e8f0] p-3 transition-colors hover:border-[#0ea5e9]/40 hover:bg-[#0ea5e9]/5"
                >
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                      rank === 1
                        ? "bg-[#0ea5e9] text-white shadow-[0_0_0_3px_rgba(14,165,233,0.15)]"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Award size={18} />
                  </span>
                  <div>
                    <div className="font-semibold text-[#1e3a8a]">{name}</div>
                    <div className="font-mono text-xs text-slate-500">
                      Avg {average} · {students} student
                      {students > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold tracking-tight text-[#1e3a8a]">
              Class Performance
            </h3>
            <p className="text-xs text-slate-400">
              Term average by class · sample data
            </p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformance}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="average" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
