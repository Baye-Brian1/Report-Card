import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  PenSquare,
  Users,
  FileText,
  TrendingUp,
  RotateCcw,
  Settings as SettingsIcon,
  Search,
  Bell,
  ChevronRight,
  Shield,
} from "lucide-react";
import { focusRing } from "./ui";

export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Student Entry", icon: UserPlus, path: "/students" },
  { label: "Marks Entry", icon: PenSquare, path: "/marks" },
  { label: "Classes", icon: Users, path: "/classes" },
  { label: "Report Cards", icon: FileText, path: "/report-cards" },
  { label: "Performance", icon: TrendingUp, path: "/performance" },
  { label: "Activities", icon: RotateCcw, path: "/activities" },
  { label: "Settings", icon: SettingsIcon, path: "/settings" },
];

function NavList({ vertical = true }) {
  return (
    <ul className={vertical ? "flex flex-col gap-1" : "flex gap-1"}>
      {navItems.map(({ label, icon: Icon, path }) => (
        <li key={label} className={vertical ? "" : "flex-shrink-0"}>
          <NavLink
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.98] ${focusRing} focus-visible:ring-offset-[#1e3a8a] ${
                vertical ? "w-full" : "flex-col gap-1 px-3 py-2 text-xs"
              } ${
                isActive
                  ? "bg-[#0ea5e9]/15 text-[#0ea5e9] shadow-[inset_0_0_0_1px_rgba(14,165,233,0.25)]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} className="flex-shrink-0" />
            <span className={vertical ? "" : "whitespace-nowrap"}>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function Layout() {
  const location = useLocation();
  const current =
    navItems.find((n) =>
      n.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(n.path),
    )?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-[#1e293b] antialiased">
      <div className="flex min-h-screen">
        {/* ---------- Sidebar ---------- */}
        <aside className="hidden w-64 flex-shrink-0 flex-col bg-gradient-to-b from-[#1e3a8a] to-[#1d4ed8] shadow-xl lg:flex">
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0ea5e9] bg-[#1e3a8a] shadow-[0_0_0_4px_rgba(14,165,233,0.12)]">
              <Shield size={20} className="text-[#0ea5e9]" strokeWidth={2} />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight tracking-tight text-white">
                SCHOOL
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">
                Records System
              </div>
            </div>
          </div>

          <div className="mx-6 h-px bg-white/10" />

          <nav className="flex-1 overflow-y-auto px-4 py-5">
            <NavList />
          </nav>

          {/* Term progress widget */}
          <div className="mx-4 mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Term 2 of 3</span>
              <span className="font-mono font-semibold text-[#0ea5e9]">
                66%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-[#0ea5e9] transition-all duration-500" />
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              Sequence 4 of 6 in progress
            </div>
          </div>
        </aside>

        {/* ---------- Main column ---------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile nav */}
          <div className="flex gap-1 overflow-x-auto border-b border-[#e2e8f0] bg-[#1e3a8a] px-3 py-2 lg:hidden">
            <NavList vertical={false} />
          </div>

          {/* Top bar */}
          <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-[#e2e8f0] bg-white/90 px-6 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>SCHOOL</span>
                <ChevronRight size={12} />
                <span className="font-medium text-[#0ea5e9]">{current}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#1e3a8a]">
                {current}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="group relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0ea5e9]"
                />
                <input
                  type="text"
                  placeholder="Search students by name or ID…"
                  className="w-56 rounded-full border border-[#e2e8f0] bg-[#f1f5f9] py-2 pl-9 pr-4 text-sm text-slate-600 placeholder:text-slate-400 transition-all focus:w-64 focus:border-[#0ea5e9] focus:bg-white focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)] focus:outline-none sm:w-64 sm:focus:w-80"
                />
              </div>
              <button
                aria-label="Notifications"
                className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-slate-500 transition-colors hover:border-[#0ea5e9]/40 hover:bg-[#0ea5e9]/10 hover:text-[#0ea5e9] ${focusRing}`}
              >
                <Bell size={16} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#0ea5e9] ring-2 ring-white" />
              </button>
              <button
                className={`flex items-center gap-2 rounded-full border border-[#e2e8f0] py-1 pl-1 pr-3 transition-colors hover:bg-[#f1f5f9] ${focusRing}`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e3a8a] font-mono text-xs font-semibold text-[#0ea5e9]">
                  AD
                </div>
                <span className="hidden text-sm font-medium text-slate-600 sm:inline">
                  Admin
                </span>
              </button>
            </div>
          </header>

          {/* Routed page content */}
          <main className="flex-1 px-6 py-6">
            <Outlet />
            <footer className="mt-8 pb-4 text-center text-xs text-slate-400">
              SCHOOL Report Card &amp; Information System
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
