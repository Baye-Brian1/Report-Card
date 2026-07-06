import { useEffect, useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeading,
  Button,
  Label,
  Select,
} from "../components/ui";
import { getClasses, getRoster, saveMarks, getMarks } from "../utils/api";

const subjectRows = [
  { name: "English Language", coefficient: 5 },
  { name: "French Language", coefficient: 5 },
  { name: "Mathematics", coefficient: 5 },
  { name: "Geography", coefficient: 3 },
  { name: "Physics", coefficient: 3 },
  { name: "Chemistry", coefficient: 3 },
  { name: "Biology", coefficient: 3 },
  { name: "History", coefficient: 3 },
  { name: "Literature in English", coefficient: 3 },
  { name: "Computer Science", coefficient: 3 },
  { name: "Sports", coefficient: 1 },
  { name: "Manual Labour", coefficient: 1 },
  { name: "Citizenship", coefficient: 3 },
  { name: "Food and Nutrition", coefficient: 3 },
  { name: "Sound and Word Building", coefficient: 3 },
];
const termSequences = {
  "First Term": ["Sequence 1", "Sequence 2"],
  "Second Term": ["Sequence 3", "Sequence 4"],
  "Third Term": ["Sequence 5", "Sequence 6"],
};
const terms = Object.keys(termSequences);
const teacherAssignments = {
  "English Language": "Mrs. Ekema Grace",
  "French Language": "Mr. Njoh Divine",
  Mathematics: "Mr. Njoh Divine",
  Geography: "Mrs. Ekema Grace",
  Physics: "Mr. Njoh Divine",
  Chemistry: "Mrs. Ekema Grace",
  Biology: "Mrs. Ekema Grace",
  History: "Mrs. Ekema Grace",
  "Literature in English": "Mrs. Ekema Grace",
  "Computer Science": "Mr. Njoh Divine",
  Sports: "Mr. Njoh Divine",
  "Manual Labour": "Mrs. Ekema Grace",
  Citizenship: "Mr. Njoh Divine",
  "Food and Nutrition": "Mrs. Ekema Grace",
  "Sound and Word Building": "Mrs. Ekema Grace",
};

export default function MarksEntry() {
  const [classes, setClasses] = useState([]);
  const [cls, setCls] = useState("");
  const [student, setStudent] = useState("");
  const [term, setTerm] = useState("Second Term");
  const [sequence, setSequence] = useState(termSequences["Second Term"][0]);
  const [marks, setMarks] = useState({});
  const [roster, setRoster] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getClasses()
      .then((data) => {
        const list = data.map((c) => c.name);
        setClasses(list);
        if (list.length > 0) setCls(list[0]);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!cls) return;
    getRoster(cls)
      .then(setRoster)
      .catch((err) => setError(err.message));
  }, [cls]);

  // Load marks for the selected student/sequence when they change
  useEffect(() => {
    if (!student || !sequence || !cls) return;

    const loadMarksForStudent = async () => {
      try {
        const allMarks = {};
        for (const subject of subjectRows) {
          const subjectMarks = await getMarks(cls, subject.name, sequence);
          // subjectMarks is an object like { "student-id": 15.5 }
          if (subjectMarks[student]) {
            allMarks[subject.name] = String(subjectMarks[student]);
          }
        }
        setMarks(allMarks);
      } catch (err) {
        console.error("Failed to load marks:", err);
      }
    };

    loadMarksForStudent();
  }, [student, sequence, cls]);

  async function handleSave(e) {
    e.preventDefault();
    setSaved(false);
    setError("");
    if (!student) {
      setError("Please select a student");
      return;
    }
    try {
      // Save marks for each subject for the selected student
      for (const subject of Object.keys(marks)) {
        const mark = marks[subject];
        if (mark !== "" && mark !== null) {
          const marksObj = { [student]: Number(mark) };
          await saveMarks(cls, subject, sequence, marksObj);
        }
      }
      setSaved(true);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHeading
        title="Marks Entry"
        subtitle="Select a class, subject, and sequence, then enter marks out of 20."
      />

      <Card>
        <CardHeader
          title="Enter Academic Results"
          subtitle="Fill marks for each subject and save them per sequence."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="cls">Class</Label>
            <Select
              id="cls"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="student">Student</Label>
            <Select
              id="student"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            >
              <option value="">-- Select a student --</option>
              {roster.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="term">Term</Label>
            <Select
              id="term"
              value={term}
              onChange={(e) => {
                const nextTerm = e.target.value;
                setTerm(nextTerm);
                setSequence(termSequences[nextTerm][0] || "");
              }}
            >
              {terms.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="sequence">Sequence</Label>
            <Select
              id="sequence"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
            >
              {(termSequences[term] || []).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <CardHeader
          title={`${cls}${cls ? " · " + term + " · " + sequence : ""}`}
          subtitle={`${roster.length} student${roster.length === 1 ? "" : "s"} in this class`}
          action={
            saved && (
              <span className="flex items-center gap-1 text-sm font-medium text-[#10b981]">
                <CheckCircle2 size={16} /> Saved
              </span>
            )
          }
        />

        {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

        {roster.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] py-10 text-center text-sm text-slate-400">
            No students enrolled in {cls} yet. Add students from the Student
            Entry page first.
          </div>
        ) : !student ? (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] py-10 text-center text-sm text-slate-400">
            Select a student to enter marks.
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#0ea5e9] text-white">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Coefficient
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Teacher
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Marks (0–20)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {subjectRows.map((subject, idx) => {
                    const mark = marks[subject.name] ?? "";
                    const teacher = teacherAssignments[subject.name] || "—";
                    return (
                      <tr
                        key={idx}
                        className="transition-colors hover:bg-[#f1f5f9]/60"
                      >
                        <td className="px-4 py-3 font-medium text-[#1e3a8a]">
                          {subject.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {subject.coefficient}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{teacher}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min={0}
                            max={20}
                            step={0.5}
                            value={mark}
                            onChange={(e) =>
                              setMarks((m) => ({
                                ...m,
                                [subject.name]: e.target.value,
                              }))
                            }
                            className="w-24 rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-sm focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/15"
                            placeholder="—"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-3">
              <Button type="submit" icon={Save} className="flex-1">
                Save Marks
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setMarks({});
                  setSaved(false);
                }}
              >
                Clear Marks
              </Button>
            </div>
          </form>
        )}
      </Card>
    </>
  );
}
