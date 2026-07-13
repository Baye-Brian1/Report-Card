import { useEffect, useMemo, useState } from "react";
import { Save, CheckCircle2, UserCog } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeading,
  Button,
  Label,
  Select,
  Table,
} from "../../components/ui";
import {
  getTeachers,
  getRoster,
  getMarks,
  saveMarks,
  getSettings,
} from "../../utils/api";
import { getSubjectsForStudent } from "../../utils/subjects";

const termSequences = {
  "First Term": ["Sequence 1", "Sequence 2"],
  "Second Term": ["Sequence 3", "Sequence 4"],
  "Third Term": ["Sequence 5", "Sequence 6"],
};
const terms = Object.keys(termSequences);

export default function TeacherMarksEntry() {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [assignmentKey, setAssignmentKey] = useState(""); // "className|||subject"
  const [term, setTerm] = useState("Second Term");
  const [roster, setRoster] = useState([]);
  const [marksBySequence, setMarksBySequence] = useState({}); // { seq: { studentId: value } }
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [marksScale, setMarksScale] = useState(20);

  useEffect(() => {
    getTeachers()
      .then(setTeachers)
      .catch((err) => setError(err.message));

    getSettings()
      .then((settings) => {
        setMarksScale(Number(settings.marksScale) || 20);
      })
      .catch(() => {
        // Keep the built-in default if settings can't be loaded.
      });
  }, []);

  const selectedTeacher = teachers.find((t) => t.id === teacherId) || null;
  const assignments = selectedTeacher ? selectedTeacher.assignments : [];

  const [className, subjectName] = assignmentKey
    ? assignmentKey.split("|||")
    : ["", ""];

  const sequences = termSequences[term] || [];

  // Load the roster for the assignment's class, then filter down to only
  // the students who actually study this subject (Science/Arts streaming,
  // electives, Sixth Form free choice all affect this).
  useEffect(() => {
    if (!className || !subjectName) {
      setRoster([]);
      return;
    }
    setLoadingRoster(true);
    getRoster(className)
      .then((data) => {
        const relevant = data.filter((s) =>
          getSubjectsForStudent(s).some((sub) => sub.name === subjectName),
        );
        setRoster(relevant);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingRoster(false));
  }, [className, subjectName]);

  // Load existing marks for both sequences of the selected term.
  useEffect(() => {
    if (!className || !subjectName || sequences.length === 0) return;

    let active = true;
    const load = async () => {
      try {
        const results = await Promise.all(
          sequences.map((seq) => getMarks(className, subjectName, seq)),
        );
        if (!active) return;
        const next = {};
        sequences.forEach((seq, i) => {
          next[seq] = results[i];
        });
        setMarksBySequence(next);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className, subjectName, term]);

  function updateMark(studentId, sequence, value) {
    setSaved(false);
    setMarksBySequence((prev) => ({
      ...prev,
      [sequence]: { ...prev[sequence], [studentId]: value },
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaved(false);
    setError("");
    if (!className || !subjectName) {
      setError("Please select a class and subject.");
      return;
    }
    setSaving(true);
    try {
      for (const seq of sequences) {
        const seqMarks = marksBySequence[seq] || {};
        const cleaned = {};
        roster.forEach((s) => {
          const v = seqMarks[s.id];
          if (
            v !== undefined &&
            v !== "" &&
            v !== null &&
            !Number.isNaN(Number(v))
          ) {
            cleaned[s.id] = Number(v);
          }
        });
        if (Object.keys(cleaned).length > 0) {
          await saveMarks(className, subjectName, seq, cleaned);
        }
      }
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const assignmentOptions = useMemo(
    () =>
      assignments.map((a) => ({
        key: `${a.class}|||${a.subject}`,
        label: `${a.subject} · ${a.class}`,
      })),
    [assignments],
  );

  return (
    <>
      <PageHeading
        title="My Marks Entry"
        subtitle={`Choose your class and subject, then enter marks for both sequences of the term (out of ${marksScale}).`}
      />

      <Card>
        <CardHeader
          title="Select Assignment"
          subtitle="Pick which teacher you are, then which class/subject to mark."
          action={<UserCog size={18} className="text-slate-300" />}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label htmlFor="teacher">Teacher</Label>
            <Select
              id="teacher"
              value={teacherId}
              onChange={(e) => {
                setTeacherId(e.target.value);
                setAssignmentKey("");
              }}
            >
              <option value="">-- Select yourself --</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.id})
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="assignment">Class · Subject</Label>
            <Select
              id="assignment"
              value={assignmentKey}
              onChange={(e) => setAssignmentKey(e.target.value)}
              disabled={!teacherId}
            >
              <option value="">-- Select an assignment --</option>
              {assignmentOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {teacherId && assignmentOptions.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                No classes/subjects assigned yet — see Settings → Staff
                Management.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="term">Term</Label>
            <Select
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            >
              {terms.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <CardHeader
          title={
            className && subjectName
              ? `${subjectName} · ${className} · ${term}`
              : "No assignment selected"
          }
          subtitle={
            className && subjectName
              ? `${roster.length} student${roster.length === 1 ? "" : "s"} offering this subject`
              : "Select a teacher and assignment above to begin."
          }
          action={
            saved && (
              <span className="flex items-center gap-1 text-sm font-medium text-[#10b981]">
                <CheckCircle2 size={16} /> Saved
              </span>
            )
          }
        />

        {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

        {!className || !subjectName ? (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] py-10 text-center text-sm text-slate-400">
            Choose a teacher and an assignment to see the student list.
          </div>
        ) : loadingRoster ? (
          <p className="py-10 text-center text-sm text-slate-400">
            Loading roster…
          </p>
        ) : roster.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] py-10 text-center text-sm text-slate-400">
            No students in {className} currently offer {subjectName}.
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <Table columns={["Student ID", "Student Name", ...sequences]}>
              {roster.map((s) => (
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
                  {sequences.map((seq) => (
                    <td key={seq} className="px-4 py-3">
                      <input
                        type="number"
                        min={0}
                        max={marksScale}
                        step={0.5}
                        value={marksBySequence[seq]?.[s.id] ?? ""}
                        onChange={(e) => updateMark(s.id, seq, e.target.value)}
                        className="w-24 rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-sm focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/15"
                        placeholder="—"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </Table>

            <div className="mt-4 flex gap-3">
              <Button
                type="submit"
                icon={Save}
                className="flex-1"
                disabled={saving}
              >
                {saving ? "Saving…" : "Save Marks"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </>
  );
}
