import { useEffect, useMemo, useState } from "react";
import { Search, FileDown, Printer, ChevronRight, Layers } from "lucide-react";
import {
  Card,
  CardHeader,
  PageHeading,
  Button,
  Badge,
  Select,
} from "../components/ui";
import { getClasses, getMarks, getRoster } from "../utils/api";

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

function grade(mark) {
  if (mark === "" || mark === null || Number.isNaN(Number(mark))) return null;
  const n = Number(mark);
  if (n >= 16) return { label: "A", tone: "emerald" };
  if (n >= 12) return { label: "B", tone: "sky" };
  if (n >= 10) return { label: "C", tone: "amber" };
  return { label: "D", tone: "rose" };
}

function subjectRemark(average) {
  if (average >= 16) return "Excellent";
  if (average >= 14) return "Very Good";
  if (average >= 12) return "Good";
  if (average >= 10) return "Fair";
  if (average >= 8) return "Weak";
  return "Poor";
}

function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getStatus(average) {
  if (average >= 10) return "Pass";
  if (average >= 8) return "Trial";
  return "Fail";
}

function computeSubjectRanks(studentId, records) {
  return subjectRows.reduce((acc, subject) => {
    const ranking = records
      .map((r) => ({
        id: r.student.id,
        score: r.subjects
          .find((s) => s.name === subject.name)
          .marks.reduce((sum, m) => sum + m, 0),
      }))
      .sort((a, b) => b.score - a.score);
    const idx = ranking.findIndex((item) => item.id === studentId);
    acc[subject.name] = idx >= 0 ? idx + 1 : "—";
    return acc;
  }, {});
}

function computePosition(studentId, records) {
  const ranking = [...records].sort((a, b) => b.average - a.average);
  const idx = ranking.findIndex((r) => r.student.id === studentId);
  return idx >= 0 ? `${idx + 1} / ${ranking.length}` : "—";
}

const summaryToneClasses = {
  navy: "bg-[#1e3a8a]/10 text-[#1e3a8a]",
  sky: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  emerald: "bg-[#10b981]/10 text-[#10b981]",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-600",
};

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4 print:rounded-md print:p-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 print:text-[7px] print:tracking-[0.15em]">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-[#0f172a] print:mt-0.5 print:text-[10px]">
        {value}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 print:text-[7px] print:tracking-[0.15em]">
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-semibold text-slate-500 print:text-[9.5px]">
        {label}
      </span>
      <span className="text-right text-slate-800 print:text-[9.5px]">
        {value}
      </span>
    </div>
  );
}

function SummaryTile({ label, value, tone }) {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 print:rounded-md print:p-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 print:text-[7px] print:tracking-[0.15em]">
        {label}
      </div>
      <div
        className={`mt-2 inline-flex rounded-lg px-2.5 py-1 text-lg font-bold print:mt-1 print:rounded print:px-1.5 print:py-0.5 print:text-[11px] ${
          summaryToneClasses[tone] || ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function RemarkCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-[#e2e8f0] bg-white p-6 print:rounded-md print:p-2.5">
      <div className="text-sm font-semibold text-[#1e3a8a] print:text-[10px]">
        {title}
      </div>
      <p className="mt-3 text-sm text-slate-600 print:mt-1 print:text-[9px] print:leading-snug">
        {text}
      </p>
      <div className="mt-6 flex items-center gap-3 text-sm text-slate-400 print:mt-2 print:text-[8px]">
        <span>Signature</span>
        <span className="mx-1 h-px flex-1 border-t border-dashed border-[#e2e8f0]" />
        <span>Date</span>
      </div>
    </div>
  );
}

function ReportCardBody({
  student,
  subjects,
  term,
  reportDate,
  average,
  position,
  classAverage,
  status,
  className = "",
}) {
  const sequences = termSequences[term] || [];
  return (
    <div
      className={`report-card-sheet overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none ${className}`}
    >
      <div className="h-2 w-full bg-gradient-to-r from-[#1e3a8a] via-[#0ea5e9] to-[#10b981] print:h-1" />

      <div className="p-6 sm:p-8 print:p-3">
        {/* Letterhead */}
        <div className="mb-6 flex flex-col gap-4 border-b border-dashed border-[#e2e8f0] pb-6 sm:flex-row sm:items-center sm:justify-between print:mb-2 print:gap-1 print:pb-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0ea5e9] print:text-[8px] print:tracking-[0.2em]">
              Springfield College
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl print:mt-0 print:text-base">
              School Report Card
            </h1>
            <p className="mt-1 text-sm text-slate-500 print:mt-0 print:text-[9px]">
              {term} · Academic Year 2025 – 2026
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 print:gap-2 print:rounded-md print:px-2 print:py-1.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#0ea5e9] text-xl font-bold text-white shadow-sm print:h-8 print:w-8 print:rounded-lg print:text-sm">
              S
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 print:text-[6.5px] print:tracking-[0.1em]">
                School Seal
              </p>
              <p className="text-sm font-semibold text-[#1e3a8a] print:text-[9px]">
                Springfield College
              </p>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3 print:mb-2 print:gap-1.5">
          <InfoTile label="Term" value={term} />
          <InfoTile label="Date Issued" value={reportDate} />
          <InfoTile label="Authorised By" value="Class Teacher / Principal" />
        </div>

        {/* Details + Summary */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 print:mb-2 print:gap-1.5">
          <div className="rounded-2xl border border-[#e2e8f0] p-5 print:rounded-md print:p-2">
            <SectionLabel>Student Details</SectionLabel>
            <dl className="mt-3 space-y-2 text-sm text-slate-700 print:mt-1 print:space-y-0.5">
              <Row label="Name" value={student.name} />
              <Row label="Student ID" value={student.id} />
              <Row label="Class" value={student.class} />
              <Row label="Gender" value={student.gender} />
              <Row label="Date of Birth" value={student.dob || "Not set"} />
            </dl>
          </div>
        </div>

        {/* Subjects table */}
        <div className="mb-6 overflow-x-auto rounded-2xl border border-[#e2e8f0] print:mb-2 print:overflow-visible print:rounded-md">
          <table className="w-full min-w-[900px] text-left text-sm print:min-w-0 print:text-[8.5px]">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Subject
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Coef.
                </th>
                {sequences.map((sequence) => (
                  <th
                    key={sequence}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]"
                  >
                    {sequence}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Average
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Teacher
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Rank
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Grade
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide print:px-1.5 print:py-1 print:text-[7px]">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] bg-white">
              {subjects.map((subject, i) => (
                <tr
                  key={subject.name}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}
                >
                  <td className="px-4 py-3 font-medium text-[#1e3a8a] print:px-1.5 print:py-0.5">
                    {subject.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 print:px-1.5 print:py-0.5">
                    {subject.coefficient}
                  </td>
                  {subject.marks.map((mark, idx) => (
                    <td
                      key={idx}
                      className="px-4 py-3 font-mono text-slate-600 print:px-1.5 print:py-0.5"
                    >
                      {mark > 0 ? mark.toFixed(1) : "—"}
                    </td>
                  ))}
                  <td className="px-4 py-3 font-mono font-semibold text-[#0f172a] print:px-1.5 print:py-0.5">
                    {subject.average > 0 ? subject.average.toFixed(2) : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 print:px-1.5 print:py-0.5">
                    {subject.teacher}
                  </td>
                  <td className="px-4 py-3 text-slate-600 print:px-1.5 print:py-0.5">
                    {subject.rank}
                  </td>
                  <td className="px-4 py-3 print:px-1.5 print:py-0.5">
                    <Badge tone={subject.grade?.tone || "slate"}>
                      {subject.grade?.label || "—"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500 print:px-1.5 print:py-0.5">
                    {subject.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom tiles */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:mb-2 print:gap-1.5">
          <SummaryTile
            label="Student Average"
            value={average.toFixed(2)}
            tone="navy"
          />
          <SummaryTile label="Overall Position" value={position} tone="sky" />
          <SummaryTile
            label="Class Average"
            value={classAverage.toFixed(2)}
            tone="emerald"
          />
          <SummaryTile
            label="Result Status"
            value={status}
            tone={
              status === "Pass"
                ? "emerald"
                : status === "Trial"
                  ? "amber"
                  : "rose"
            }
          />
        </div>

        {/* Remarks */}
        <div className="grid gap-4 lg:grid-cols-2 print:gap-1.5">
          <RemarkCard
            title="Class Master's Remarks"
            text="Well done. Keep working hard, and aim for consistency across all subjects."
          />
          <RemarkCard
            title="Principal's Remarks"
            text="Good performance. Maintain discipline and continue improving in the next term."
          />
        </div>
      </div>
    </div>
  );
}

export default function ReportCards() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("Second Term");
  const [classMarks, setClassMarks] = useState({});
  const [error, setError] = useState("");
  const [printAll, setPrintAll] = useState(false);

  useEffect(() => {
    getClasses()
      .then((data) => {
        const classNames = data.map((item) => item.name);
        setClasses(classNames);
        if (classNames.length > 0) setSelectedClass(classNames[0]);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    getRoster(selectedClass)
      .then((data) => {
        setStudents(data);
        setSelectedStudent(data[0] || null);
      })
      .catch((err) => setError(err.message));
  }, [selectedClass]);

  useEffect(() => {
    if (!selectedClass) return;

    let active = true;
    const sequences = termSequences[term] || [];

    const loadMarks = async () => {
      try {
        const results = await Promise.all(
          subjectRows.flatMap((subject) =>
            sequences.map((sequence) =>
              getMarks(selectedClass, subject.name, sequence).then((marks) => ({
                subject: subject.name,
                sequence,
                marks,
              })),
            ),
          ),
        );

        if (!active) return;

        const marksBySubject = {};
        results.forEach(({ subject, sequence, marks }) => {
          marksBySubject[subject] = marksBySubject[subject] || {};
          marksBySubject[subject][sequence] = marks;
        });

        setClassMarks(marksBySubject);
      } catch (err) {
        if (active) setError(err.message);
      }
    };

    loadMarks();

    return () => {
      active = false;
    };
  }, [selectedClass, term]);

  useEffect(() => {
    if (!printAll) return;
    const timer = setTimeout(() => {
      window.print();
    }, 150);
    return () => clearTimeout(timer);
  }, [printAll]);

  useEffect(() => {
    function handleAfterPrint() {
      setPrintAll(false);
    }
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  const filteredStudents = useMemo(
    () =>
      students.filter((student) =>
        `${student.name} ${student.id}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [students, search],
  );

  const studentRecords = useMemo(() => {
    const sequences = termSequences[term] || [];
    return students.map((student) => {
      const subjects = subjectRows.map((subject) => {
        const marks = sequences.map((sequence) =>
          Number(classMarks[subject.name]?.[sequence]?.[student.id] ?? 0),
        );
        const average = marks.reduce((sum, m) => sum + m, 0) / marks.length;
        return {
          ...subject,
          teacher: teacherAssignments[subject.name] || "—",
          marks,
          average,
          grade: grade(average),
        };
      });
      const totalWeighted = subjects.reduce(
        (acc, item) => acc + item.average * item.coefficient,
        0,
      );
      const totalCoefficient = subjects.reduce(
        (acc, item) => acc + item.coefficient,
        0,
      );
      return {
        student,
        subjects,
        average: totalCoefficient ? totalWeighted / totalCoefficient : 0,
      };
    });
  }, [students, classMarks, term]);

  const selectedRecord = useMemo(
    () =>
      selectedStudent
        ? studentRecords.find(
            (record) => record.student.id === selectedStudent.id,
          )
        : null,
    [studentRecords, selectedStudent],
  );

  const classAverage = useMemo(() => {
    if (!studentRecords.length) return 0;
    return (
      studentRecords.reduce((sum, record) => sum + record.average, 0) /
      studentRecords.length
    );
  }, [studentRecords]);

  const selectedPosition = useMemo(
    () =>
      selectedRecord
        ? computePosition(selectedRecord.student.id, studentRecords)
        : "—",
    [selectedRecord, studentRecords],
  );

  const selectedSubjects = useMemo(() => {
    if (!selectedRecord) return [];
    const ranks = computeSubjectRanks(
      selectedRecord.student.id,
      studentRecords,
    );
    return selectedRecord.subjects.map((s) => ({
      ...s,
      rank: ranks[s.name],
      remark: subjectRemark(s.average),
    }));
  }, [selectedRecord, studentRecords]);

  const reportDate = formatDate(new Date());

  function handlePrint() {
    window.print();
  }

  function handlePrintAll() {
    if (!studentRecords.length) return;
    setPrintAll(true);
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }
          html, body {
            height: auto !important;
          }
          body * { visibility: hidden; }
          .report-card-print-area, .report-card-print-area * { visibility: visible; }
          .report-card-print-area {
            position: static !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
          }
          .report-card-page {
            page-break-after: always;
            break-after: page;
          }
          .report-card-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
          .report-card-sheet {
            page-break-inside: avoid;
            break-inside: avoid;
            width: 100%;
            height: 100%;
            max-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .report-card-sheet table {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      <PageHeading
        title="Report Cards"
        subtitle="Choose a class and generate a printable report card for any student."
        action={
          <Button
            icon={Layers}
            variant="outline"
            onClick={handlePrintAll}
            disabled={!selectedClass || !studentRecords.length}
          >
            Print All — {selectedClass || "Select a class"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Classes"
              subtitle="Pick a class to explore report cards."
            />
            <div className="space-y-2">
              {classes.map((name) => (
                <button
                  key={name}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    selectedClass === name
                      ? "border-[#0ea5e9] bg-[#0ea5e9]/10 text-[#0b61a6]"
                      : "border-[#e2e8f0] bg-white text-slate-700 hover:border-[#0ea5e9] hover:bg-[#f1f5f9]"
                  }`}
                  onClick={() => setSelectedClass(name)}
                >
                  <span>{name}</span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Class roster"
              subtitle={
                selectedClass
                  ? `${students.length} students`
                  : "Select a class first"
              }
            />
            <div className="relative mb-4">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student name or ID…"
                className="w-full rounded-full border border-[#e2e8f0] bg-[#f1f5f9] py-2 pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none"
              />
            </div>
            {filteredStudents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#e2e8f0] p-6 text-center text-sm text-slate-400">
                {selectedClass
                  ? "No matching students found."
                  : "Pick a class to view students."}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                      selectedStudent?.id === student.id
                        ? "border-[#0ea5e9] bg-[#0ea5e9]/10 text-[#0b61a6]"
                        : "border-[#e2e8f0] bg-white text-slate-700 hover:border-[#0ea5e9] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-slate-400">{student.id}</div>
                    </div>
                    <Badge tone="slate">Generate</Badge>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Report card preview"
              subtitle={
                selectedStudent
                  ? "Ready to print or save."
                  : "Choose a student to generate the report card."
              }
            />
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-slate-500">Selected Class</div>
                <div className="text-lg font-semibold text-[#1e3a8a]">
                  {selectedClass || "None"}
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="max-w-[180px]"
                >
                  {Object.keys(termSequences).map((termName) => (
                    <option key={termName}>{termName}</option>
                  ))}
                </Select>
                <Button variant="outline" icon={Printer} onClick={handlePrint}>
                  Print
                </Button>
                <Button icon={FileDown} onClick={handlePrint}>
                  Download PDF
                </Button>
              </div>
            </div>
            {error && <p className="text-sm text-rose-500">{error}</p>}

            {!selectedStudent ? (
              <div className="rounded-xl border border-dashed border-[#e2e8f0] p-6 text-center text-sm text-slate-400">
                Pick a student to view the full report card.
              </div>
            ) : (
              <ReportCardBody
                className={printAll ? "" : "report-card-print-area"}
                student={selectedStudent}
                subjects={selectedSubjects}
                term={term}
                reportDate={reportDate}
                average={selectedRecord ? selectedRecord.average : 0}
                position={selectedPosition}
                classAverage={classAverage}
                status={
                  selectedRecord ? getStatus(selectedRecord.average) : "—"
                }
              />
            )}
          </Card>
        </div>
      </div>

      {printAll && (
        <div className="report-card-print-area absolute -left-[9999px] top-0 w-full space-y-10 p-6">
          {studentRecords.map((record) => {
            const ranks = computeSubjectRanks(
              record.student.id,
              studentRecords,
            );
            const pos = computePosition(record.student.id, studentRecords);
            const augmentedSubjects = record.subjects.map((s) => ({
              ...s,
              rank: ranks[s.name],
              remark: subjectRemark(s.average),
            }));
            return (
              <div key={record.student.id} className="report-card-page">
                <ReportCardBody
                  student={record.student}
                  subjects={augmentedSubjects}
                  term={term}
                  reportDate={reportDate}
                  average={record.average}
                  position={pos}
                  classAverage={classAverage}
                  status={getStatus(record.average)}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
