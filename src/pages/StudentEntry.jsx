import React, { useEffect, useState } from "react";
import { UserPlus, Search, Pencil, Trash2, GraduationCap } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeading,
  Button,
  Label,
  Input,
  Select,
  Table,
  Badge,
  focusRing,
} from "../components/ui";
import { addStudent, getClasses, getStudents } from "../utils/api";

export default function StudentEntry() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "Male",
    class: "",
    guardian: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message));
    getClasses()
      .then((data) => setClasses(data.map((c) => c.name)))
      .catch((err) => setError(err.message));
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError("");
    try {
      const student = await addStudent({
        name: form.name.trim(),
        class: form.class || classes[0] || "Form 1",
        gender: form.gender,
        guardian: form.guardian.trim() || "—",
        phone: form.phone.trim() || "—",
        dob: form.dob || "—",
      });
      setStudents((prev) => [...prev, student]);
      setForm({
        name: "",
        dob: "",
        gender: "Male",
        class: classes[0] || "Form 1",
        guardian: "",
        phone: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeading
        title="Student Entry"
        subtitle="Register new students and manage existing student records."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
        {/* New student form */}
        <Card>
          <CardHeader
            title="Add New Student"
            subtitle="Fill in the details below to enroll a student."
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                placeholder="e.g. Ama Nkeng"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="class">Class</Label>
              <Select
                id="class"
                value={form.class}
                onChange={(e) => update("class", e.target.value)}
              >
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="guardian">Guardian Name</Label>
              <Input
                id="guardian"
                placeholder="e.g. Mr. Nkeng Paul"
                value={form.guardian}
                onChange={(e) => update("guardian", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Guardian Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+237 6•• ••• •••"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <Button
              type="submit"
              icon={UserPlus}
              className="mt-2 w-full"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Student"}
            </Button>
            {error && <p className="text-sm text-rose-500">{error}</p>}
          </form>
        </Card>

        {/* Student list */}
        <Card>
          <CardHeader
            title={`All Students (${students.length})`}
            subtitle="Search, edit, or remove student records."
            action={
              <div className="relative">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  placeholder="Search…"
                  className={`w-44 rounded-full border border-[#e2e8f0] bg-[#f1f5f9] py-1.5 pl-8 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none ${focusRing}`}
                />
              </div>
            }
          />

          {students.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center text-slate-400">
              <GraduationCap size={28} className="mb-2" />
              No students yet — add your first one.
            </div>
          ) : (
            <Table
              columns={[
                "Student ID",
                "Name",
                "Class",
                "Gender",
                "Guardian",
                "Phone",
                "Status",
                "",
              ]}
            >
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="transition-colors hover:bg-[#f1f5f9]/60"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {s.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1e3a8a]">
                    {s.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{s.class}</td>
                  <td className="px-4 py-3 text-slate-600">{s.gender}</td>
                  <td className="px-4 py-3 text-slate-600">{s.guardian}</td>
                  <td className="px-4 py-3 text-slate-600">{s.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge tone="emerald">{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Edit student"
                        className={`rounded-md p-1.5 text-slate-400 hover:bg-[#0ea5e9]/10 hover:text-[#0ea5e9] ${focusRing}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        aria-label="Remove student"
                        onClick={() =>
                          setStudents((list) =>
                            list.filter((x) => x.id !== s.id),
                          )
                        }
                        className={`rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 ${focusRing}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      </div>
    </>
  );
}
