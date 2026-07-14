import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  PenSquare,
  FileText,
  GraduationCap,
  ChevronRight,
  BookOpen,
  CalendarRange,
} from "lucide-react";
import { Card, PageHeading } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import { getTeachers, getRoster, getMarks } from "../../utils/api";

const quickActions = [
  { label: "Enter Marks", icon: PenSquare, to: "/teacher/marks" },
  { label: "View Students", icon: GraduationCap, to: "/teacher/students" },
  { label: "Generate Report Card", icon: FileText, to: "/teacher/report-cards" },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load teacher's assigned classes and subjects
    const loadTeacherData = async () => {
      try {
        const teachers = await getTeachers();
        const currentTeacher = teachers.find(t => t.name === user.name);
        if (currentTeacher) {
          setTeacherData(currentTeacher);
          // Get unique classes from assignments
          const classNames = [...new Set(currentTeacher.assignments.map(a => a.class))];
          setClasses(classNames);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeacherData();
  }, [user]);

  return (
    <>
      <PageHeading
        title={`Welcome, ${user?.name || 'Teacher'}!`}
        subtitle="Manage your classes and enter marks for your students."
      />

      {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {quickActions.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-2xl border border-[#e2e8f0] bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] group-hover:bg-[#0ea5e9] group-hover:text-white transition-all">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1e3a8a]">{label}</h3>
                <p className="text-sm text-slate-400">Click to get started</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Teacher's Classes */}
      <div className="mt-6">
        <Card>
          <h3 className="text-lg font-bold text-[#1e3a8a]">Your Classes</h3>
          {loading ? (
            <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
          ) : classes.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No classes assigned yet. Contact your administrator.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {classes.map((className) => (
                <div
                  key={className}
                  className="rounded-lg border border-[#e2e8f0] p-4 hover:border-[#0ea5e9] transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1e3a8a]">{className}</span>
                    <ChevronRight className="text-slate-400" size={18} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {teacherData?.assignments.filter(a => a.class === className).map(a => a.subject).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Teacher's Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-[#0ea5e9]" size={20} />
            <div>
              <p className="text-2xl font-bold text-[#1e3a8a]">{classes.length}</p>
              <p className="text-xs text-slate-400">Classes</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-[#10b981]" size={20} />
            <div>
              <p className="text-2xl font-bold text-[#1e3a8a]">
                {teacherData?.assignments.length || 0}
              </p>
              <p className="text-xs text-slate-400">Subjects</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div className="flex items-center gap-3">
            <CalendarRange className="text-[#f59e0b]" size={20} />
            <div>
              <p className="text-2xl font-bold text-[#1e3a8a]">Term 2</p>
              <p className="text-xs text-slate-400">Current Term</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-[#8b5cf6]" size={20} />
            <div>
              <p className="text-2xl font-bold text-[#1e3a8a]">3</p>
              <p className="text-xs text-slate-400">Pending Reports</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}