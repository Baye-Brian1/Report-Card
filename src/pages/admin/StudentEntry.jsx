import { useEffect, useState } from "react";
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
} from "../../components/ui";
import { addStudent, getClasses, getStudents } from "../../utils/api";
import {
  CLASS_NAMES,
  requiresStream,
  isSixthForm,
  getCoreSubjects,
  getSixthFormElectivePool,
  ELECTIVE_SUBJECTS,
  SIXTH_FORM_MAX_SUBJECTS,
} from "../../utils/subjects";

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
    option: "",
    electives: [],
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message));
    getClasses()
      .then((data) => {
        const names = data.map((c) => c.name);
        const merged = Array.from(new Set([...CLASS_NAMES, ...names]));
        setClasses(merged);
      })
      .catch((err) => setError(err.message));
  }, []);

  const streamRequired = requiresStream(form.class);
  const sixthForm = isSixthForm(form.class);

  // Sixth form: pick freely from the stream's pool, capped so that
  // anchor (1) + chosen extras never exceed SIXTH_FORM_MAX_SUBJECTS.
  const sixthFormPool = sixthForm ? getSixthFormElectivePool(form.option) : [];
  const sixthFormMaxExtra = SIXTH_FORM_MAX_SUBJECTS - 1; // slot reserved for the anchor
  const sixthFormAtLimit = form.electives.length >= sixthFormMaxExtra;

  // Form 4/5: fixed core subjects + optional bonus electives, uncapped.
  const coreSubjects =
    streamRequired && !sixthForm
      ? getCoreSubjects(form.class, form.option)
      : [];

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleElective(name) {
    setForm((f) => {
      const has = f.electives.includes(name);
      if (has) {
        return { ...f, electives: f.electives.filter((e) => e !== name) };
      }
      if (sixthForm && f.electives.length >= sixthFormMaxExtra) {
        return f; // at the cap, ignore further additions
      }
      return { ...f, electives: [...f.electives, name] };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (streamRequired && !form.option) {
      setError("Please select Science or Arts for this class.");
      return;
    }
    if (sixthForm && form.option && form.electives.length === 0) {
      setError(
        "Please select at least one additional subject alongside the compulsory one.",
      );
      return;
    }
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
        option: streamRequired ? form.option : "",
        electives: streamRequired ? form.electives.join(",") : "",
      });
      setStudents((prev) => [...prev, student]);
      setForm({
        name: "",
        dob: "",
        gender: "Male",
        class: classes[0] || "Form 1",
        guardian: "",
        phone: "",
        option: "",
        electives: [],
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
                onChange={(e) => {
                  update("class", e.target.value);
                  update("option", "");
                  update("electives", []);
                }}
              >
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>

            {streamRequired && (
              <div>
                <Label htmlFor="option">Option (Science / Arts)</Label>
                <Select
                  id="option"
                  value={form.option}
                  onChange={(e) => {
                    update("option", e.target.value);
                    update("electives", []);
                  }}
                >
                  <option value="">-- Select an option --</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                </Select>
              </div>
            )}

            {/* Form 4 / Form 5: fixed core, plus optional bonus subjects */}
            {streamRequired && !sixthForm && form.option && (
              <>
                <div className="rounded-lg border border-dashed border-[#e2e8f0] bg-[#f8fafc] p-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">
                    Compulsory subjects ({form.option}):
                  </span>{" "}
                  {coreSubjects.map((s) => s.name).join(", ")}
                </div>

                <div>
                  <Label>Optional Subjects (choose any extra)</Label>
                  <div className="flex flex-col gap-1.5 rounded-lg border border-[#e2e8f0] p-3">
                    {ELECTIVE_SUBJECTS.map((subject) => (
                      <label
                        key={subject.name}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <input
                          type="checkbox"
                          checked={form.electives.includes(subject.name)}
                          onChange={() => toggleElective(subject.name)}
                        />
                        {subject.name}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Lower / Upper Sixth: one compulsory anchor + free choice, capped at 5 total */}
            {sixthForm && form.option && (
              <>
                <div className="rounded-lg border border-dashed border-[#e2e8f0] bg-[#f8fafc] p-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">
                    Compulsory subject ({form.option}):
                  </span>{" "}
                  {form.option === "Science" ? "Chemistry" : "History"}
                </div>

                <div>
                  <Label>
                    Choose Subjects ({form.electives.length + 1} /{" "}
                    {SIXTH_FORM_MAX_SUBJECTS})
                  </Label>
                  <div className="flex flex-col gap-1.5 rounded-lg border border-[#e2e8f0] p-3">
                    {sixthFormPool.map((subject) => {
                      const checked = form.electives.includes(subject.name);
                      const disabled = !checked && sixthFormAtLimit;
                      return (
                        <label
                          key={subject.name}
                          className={`flex items-center gap-2 text-sm ${
                            disabled ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={() => toggleElective(subject.name)}
                          />
                          {subject.name}
                        </label>
                      );
                    })}
                  </div>
                  {sixthFormAtLimit && (
                    <p className="mt-1 text-xs text-amber-600">
                      Maximum of {SIXTH_FORM_MAX_SUBJECTS} subjects reached.
                    </p>
                  )}
                </div>
              </>
            )}

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
                "Option",
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
                  <td className="px-4 py-3 text-slate-600">
                    {s.option || "—"}
                  </td>
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
