import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import StudentEntry from "./pages/StudentEntry";
import MarksEntry from "./pages/MarksEntry";
import Classes from "./pages/Classes";
import ReportCards from "./pages/ReportCards";
import Performance from "./pages/Performance";
import Activities from "./pages/Activities";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentEntry />} />
        <Route path="/marks" element={<MarksEntry />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/report-cards" element={<ReportCards />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
