import React, { useState } from "react";
import { Save, UserCog, School, CalendarRange, SlidersHorizontal } from "lucide-react";
import { Card, CardHeader, PageHeading, Button, Label, Input, Select, Badge } from "../components/ui";

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
      <span className="text-sm text-slate-600">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#10b981]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

const users = [
  { name: "Admin User", email: "admin@spxcc.edu", role: "Administrator" },
  { name: "Mrs. Ekema Grace", email: "ekema.g@spxcc.edu", role: "Teacher" },
  { name: "Mr. Njoh Divine", email: "njoh.d@spxcc.edu", role: "Teacher" },
];

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoLock, setAutoLock] = useState(false);
  const [publicResults, setPublicResults] = useState(false);

  return (
    <>
      <PageHeading
        title="Settings"
        subtitle="Manage school information, academic structure, and system preferences."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* School info */}
        <Card>
          <CardHeader
            title="School Information"
            subtitle="Shown on report cards and headers"
            action={<School size={18} className="text-slate-300" />}
          />
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input id="schoolName" defaultValue="St. Pius X Catholic College Tatum" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="code">School Code</Label>
                <Input id="code" defaultValue="SPXCC" />
              </div>
              <div>
                <Label htmlFor="region">Region</Label>
                <Input id="region" defaultValue="South-West" />
              </div>
            </div>
            <div>
              <Label htmlFor="motto">Motto</Label>
              <Input id="motto" placeholder="e.g. Faith, Discipline, Excellence" />
            </div>
            <Button icon={Save} className="mt-1 self-start">
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Academic structure */}
        <Card>
          <CardHeader
            title="Academic Structure"
            subtitle="Current term and sequence configuration"
            action={<CalendarRange size={18} className="text-slate-300" />}
          />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="term">Current Term</Label>
                <Select id="term" defaultValue="Term 2">
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Term 3</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="seq">Current Sequence</Label>
                <Select id="seq" defaultValue="Sequence 4">
                  {Array.from({ length: 6 }, (_, i) => (
                    <option key={i}>{`Sequence ${i + 1}`}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="year">Academic Year</Label>
                <Input id="year" defaultValue="2025 – 2026" />
              </div>
              <div>
                <Label htmlFor="marksOutOf">Marks Scale</Label>
                <Select id="marksOutOf" defaultValue="20">
                  <option>20</option>
                  <option>100</option>
                </Select>
              </div>
            </div>
            <Button icon={Save} className="mt-1 self-start">
              Save Structure
            </Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader
            title="System Preferences"
            subtitle="Notifications and access behavior"
            action={<SlidersHorizontal size={18} className="text-slate-300" />}
          />
          <div className="divide-y divide-dashed divide-[#e2e8f0]">
            <Toggle
              checked={emailNotif}
              onChange={setEmailNotif}
              label="Email me when report cards are generated"
            />
            <Toggle
              checked={autoLock}
              onChange={setAutoLock}
              label="Auto-lock marks entry after sequence closes"
            />
            <Toggle
              checked={publicResults}
              onChange={setPublicResults}
              label="Allow guardians to view results online"
            />
          </div>
        </Card>

        {/* Users */}
        <Card>
          <CardHeader
            title="Users & Roles"
            subtitle="People with access to this system"
            action={<UserCog size={18} className="text-slate-300" />}
          />
          <div className="flex flex-col gap-2">
            {users.map((u) => (
              <div
                key={u.email}
                className="flex items-center justify-between rounded-lg border border-[#e2e8f0] px-4 py-3 transition-colors hover:bg-[#f1f5f9]/60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e3a8a] font-mono text-xs font-semibold text-[#0ea5e9]">
                    {u.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1e3a8a]">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </div>
                </div>
                <Badge tone={u.role === "Administrator" ? "navy" : "sky"}>{u.role}</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full">
            Invite New User
          </Button>
        </Card>
      </div>
    </>
  );
}
