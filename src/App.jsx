import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />

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
