import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, PageHeading, Badge } from "../components/ui";

// Sample data for illustration — wire up to real sequence averages
const termTrend = [
  { sequence: "Seq 1", average: 12.4 },
  { sequence: "Seq 2", average: 13.1 },
  { sequence: "Seq 3", average: 14.8 },
  { sequence: "Seq 4", average: 15.9 },
  { sequence: "Seq 5", average: 15.2 },
  { sequence: "Seq 6", average: 16.4 },
];

const classComparison = [
  { name: "Form 1", average: 19.53 },
  { name: "Form 2", average: 13.2 },
  { name: "Form 3", average: 15.8 },
  { name: "Form 4", average: 11.4 },
  { name: "Form 5", average: 16.9 },
];

const topPerformers = [
  { name: "Ama Nkeng", class: "Form 1", average: 19.53 },
  { name: "Brian Ateh", class: "Form 2", average: 13.2 },
];

const bottomPerformers = [
  { name: "Brian Ateh", class: "Form 2", average: 13.2 },
  { name: "Ama Nkeng", class: "Form 1", average: 19.53 },
];

export default function Performance() {
  return (
    <>
      <PageHeading
        title="Performance"
        subtitle="Academic trends across sequences, classes, and students."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Overall Trend"
            subtitle="School-wide average by sequence"
          />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={termTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="sequence"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0ea5e9" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Class Comparison"
            subtitle="Current term average by class"
          />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Bar dataKey="average" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Top Performers"
            subtitle="Highest overall averages this term"
            action={<TrendingUp size={18} className="text-[#10b981]" />}
          />
          <div className="flex flex-col gap-2">
            {topPerformers.map((s, i) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-lg border border-[#e2e8f0] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10b981]/10 text-xs font-bold text-[#10b981]">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-[#1e3a8a]">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.class}</div>
                  </div>
                </div>
                <Badge tone="emerald">{s.average.toFixed(2)}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Needs Attention"
            subtitle="Lowest overall averages this term"
            action={<TrendingDown size={18} className="text-rose-500" />}
          />
          <div className="flex flex-col gap-2">
            {bottomPerformers.map((s, i) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-lg border border-[#e2e8f0] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-500">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-[#1e3a8a]">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.class}</div>
                  </div>
                </div>
                <Badge tone="rose">{s.average.toFixed(2)}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
