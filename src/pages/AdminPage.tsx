import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  School,
  Activity,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  AlertTriangle,
  BookOpen,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminSchoolsQuery,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
  useCreateAdminSchoolMutation,
  useUpdateAdminSchoolMutation,
  useDeleteAdminSchoolMutation,
  AdminStats,
  AdminSchool,
} from "../store/api/apiSlice";
import type { User } from "../store/api/authApi";
import { SearchableSelect } from "../components/common/SearchableSelect";
import { useSEO } from "../hooks/useSEO";

type AdminTab = "overview" | "users" | "schools";

export const AdminPage: React.FC = () => {
  useSEO({
    title: "Admin Command Center | Study2ool Nepal",
    description:
      "System administration, user role management, school catalog, and platform diagnostics.",
    canonicalPath: "/admin",
  });

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const { data: stats, isLoading: isStatsLoading } = useGetAdminStatsQuery();
  const { data: users = [], isLoading: isUsersLoading } =
    useGetAdminUsersQuery();
  const { data: schools = [], isLoading: isSchoolsLoading } =
    useGetAdminSchoolsQuery();

  const [updateUserMutation] = useUpdateAdminUserMutation();
  const [deleteUserMutation] = useDeleteAdminUserMutation();
  const [createSchoolMutation] = useCreateAdminSchoolMutation();
  const [updateSchoolMutation] = useUpdateAdminSchoolMutation();
  const [deleteSchoolMutation] = useDeleteAdminSchoolMutation();

  const isLoading = isStatsLoading || isUsersLoading || isSchoolsLoading;
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // User Filter State
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [userGradeFilter, setUserGradeFilter] = useState(0);

  // School Filter State
  const [schoolSearch, setSchoolSearch] = useState("");

  // Modals State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userRoleSelect, setUserRoleSelect] = useState<
    "student" | "teacher" | "admin"
  >("student");
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<AdminSchool | null>(null);
  const [schoolForm, setSchoolForm] = useState({
    name: "",
    city: "",
    isPopular: false,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "user" | "school";
    id: string;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (type: "success" | "error", text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        !userSearch.trim() ||
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.collegeName &&
          u.collegeName.toLowerCase().includes(userSearch.toLowerCase()));

      const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
      const matchesGrade = userGradeFilter === 0 || u.grade === userGradeFilter;

      return matchesSearch && matchesRole && matchesGrade;
    });
  }, [users, userSearch, userRoleFilter, userGradeFilter]);

  // Filtered Schools
  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (!schoolSearch.trim()) return true;
      const q = schoolSearch.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
      );
    });
  }, [schools, schoolSearch]);

  // User Role Update Handler
  const handleUpdateUserRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsSubmitting(true);
    try {
      const updated = await updateUserMutation({
        id: editingUser.id,
        updates: { role: userRoleSelect },
      }).unwrap();
      showNotification(
        "success",
        `Role for ${updated.name} updated to ${updated.role}`,
      );
      setEditingUser(null);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update user role");
    } finally {
      setIsSubmitting(false);
    }
  };

  // School Save Handler (Add / Edit)
  const handleSaveSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolForm.name.trim() || !schoolForm.city.trim()) {
      showNotification("error", "School name and city are required");
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingSchool) {
        const updated = await updateSchoolMutation({
          id: editingSchool.id,
          payload: schoolForm,
        }).unwrap();
        showNotification("success", `Updated school: ${updated.name}`);
      } else {
        const created = await createSchoolMutation(schoolForm).unwrap();
        showNotification("success", `Added new school: ${created.name}`);
      }
      setIsSchoolModalOpen(false);
      setEditingSchool(null);
      setSchoolForm({ name: "", city: "", isPopular: false });
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save school");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Action Handler
  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    setIsSubmitting(true);
    try {
      if (deleteConfirm.type === "user") {
        await deleteUserMutation(deleteConfirm.id).unwrap();
        showNotification("success", `Deleted user ${deleteConfirm.name}`);
      } else {
        await deleteSchoolMutation(deleteConfirm.id).unwrap();
        showNotification("success", `Deleted school ${deleteConfirm.name}`);
      }
      setDeleteConfirm(null);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Root Administration</span>
            <span>·</span>
            <span>Study2ool Nepal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Admin Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student &amp; teacher accounts, regulate institution records,
            and monitor examination metrics across Nepal.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/80 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "users"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users ({users.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schools")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "schools"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>Colleges ({schools.length})</span>
          </button>
        </div>
      </div>

      {/* Global Action Notification */}
      {actionMessage && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between border animate-slideDown ${
            actionMessage.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TAB 1: OVERVIEW & PLATFORM DIAGNOSTICS */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Total Users
                </span>
                <Users className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats?.totalUsers ?? users.length}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  {stats?.usersByRole.student ?? 0} Students
                </span>
                <span>·</span>
                <span>{stats?.usersByRole.admin ?? 1} Admin</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Registered Colleges
                </span>
                <School className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats?.totalColleges ?? schools.length}
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                Across Kathmandu, Pokhara, Butwal &amp; Nepal
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Quiz Attempts
                </span>
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats?.totalAttempts ?? 0}
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                {stats?.totalQuestionsAnswered ?? 0} total questions attempted
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Average Accuracy
                </span>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats?.averageAccuracy ?? 0}%
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                Avg. Score: {stats?.averageScore ?? 0} marks / exam
              </p>
            </div>
          </div>

          {/* Demographic Breakdown & System Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grade Distribution */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Grade Level Distribution</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">
                      Class 11 Science
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono">
                      {stats?.gradeDistribution["11"] ?? 0}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          users.length > 0
                            ? Math.round(
                                ((stats?.gradeDistribution["11"] ?? 0) /
                                  users.length) *
                                  100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">
                      Class 12 Science
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono">
                      {stats?.gradeDistribution["12"] ?? 0}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          users.length > 0
                            ? Math.round(
                                ((stats?.gradeDistribution["12"] ?? 0) /
                                  users.length) *
                                  100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">
                      Unspecified / Guest
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold font-mono">
                      {stats?.gradeDistribution["unspecified"] ?? 0}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-400 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          users.length > 0
                            ? Math.round(
                                ((stats?.gradeDistribution["unspecified"] ??
                                  0) /
                                  users.length) *
                                  100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gender Demographics */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>Gender Demographics</span>
              </h3>
              <div className="space-y-2 text-xs">
                {Object.entries(stats?.genderDistribution || {}).map(
                  ([key, val]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60"
                    >
                      <span className="capitalize font-medium text-slate-700 dark:text-slate-300">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {val}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Top Represented Schools */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Top Ranked Colleges</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                {(stats?.topSchools && stats.topSchools.length > 0
                  ? stats.topSchools
                  : schools.slice(0, 5)
                ).map((s: any, idx) => (
                  <div
                    key={s.id || idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">
                      {s.studentCount ?? 0} enrolled
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Platform Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Registrations */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Recent User Registrations</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("users")}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {(stats?.recentUsers || users.slice(0, 6)).map((u) => (
                  <div
                    key={u.id}
                    className="py-3 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      {u.picture ? (
                        <img
                          src={u.picture}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {u.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {u.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {u.role}
                      </span>
                      {u.collegeName && (
                        <p className="text-[10px] text-slate-400 truncate max-w-[140px] mt-0.5">
                          {u.collegeName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quiz Attempts */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Recent Exam Attempts</span>
              </h3>

              {stats?.recentAttempts && stats.recentAttempts.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {stats.recentAttempts.slice(0, 6).map((a) => (
                    <div
                      key={a.id}
                      className="py-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {a.studentName} ·{" "}
                          <span className="font-normal text-slate-500">
                            {a.subject}
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {new Date(a.completedAt).toLocaleDateString()}{" "}
                          {new Date(a.completedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {a.accuracy}% accuracy
                        </span>
                        <p className="text-[10px] text-slate-400">
                          Score: {a.score}/{a.totalMarks}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No examination attempts logged yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === "users" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users by name, email, or institution..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <SearchableSelect
                options={[
                  { value: "all", label: "All Roles" },
                  { value: "student", label: "Student" },
                  { value: "teacher", label: "Teacher" },
                  { value: "admin", label: "Administrator" },
                ]}
                value={userRoleFilter}
                onChange={(val) => setUserRoleFilter(String(val))}
                searchPlaceholder="Search roles..."
                className="w-36"
                buttonClassName="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
              />

              <SearchableSelect
                options={[
                  { value: 0, label: "All Grades" },
                  { value: 11, label: "Class 11" },
                  { value: 12, label: "Class 12" },
                ]}
                value={userGradeFilter}
                onChange={(val) => setUserGradeFilter(Number(val))}
                searchPlaceholder="Search grades..."
                className="w-32"
                buttonClassName="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">User</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">College / School</th>
                    <th className="py-3.5 px-4 text-center">Grade</th>
                    <th className="py-3.5 px-4 text-center">Gender</th>
                    <th className="py-3.5 px-4">Last Active</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* User Info */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          {u.picture ? (
                            <img
                              src={u.picture}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {u.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white truncate">
                              {u.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400"
                              : u.role === "teacher"
                                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400"
                                : "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      {/* College */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {u.collegeName || (
                            <span className="text-slate-400 italic">
                              Not set
                            </span>
                          )}
                        </span>
                        {u.collegeCity && (
                          <p className="text-[10px] text-slate-400">
                            {u.collegeCity}
                          </p>
                        )}
                      </td>

                      {/* Grade */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        {u.grade ? (
                          `Class ${u.grade}`
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Gender */}
                      <td className="py-3.5 px-4 text-center capitalize">
                        {u.gender && u.gender !== "prefer_not_to_say" ? (
                          u.gender
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Last Active */}
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {u.lastLoginAt
                          ? new Date(u.lastLoginAt).toLocaleDateString()
                          : "New"}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            title="Edit Role"
                            onClick={() => {
                              setEditingUser(u);
                              setUserRoleSelect(u.role);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {u.email.toLowerCase() !==
                            "study2ool.nepal@gmail.com" && (
                            <button
                              type="button"
                              title="Delete User"
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "user",
                                  id: u.id,
                                  name: u.name,
                                })
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-slate-400"
                      >
                        No users match the search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHOOLS & COLLEGES MANAGEMENT */}
      {activeTab === "schools" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search colleges by name or city..."
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingSchool(null);
                setSchoolForm({ name: "", city: "", isPopular: false });
                setIsSchoolModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New College</span>
            </button>
          </div>

          {/* Schools Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">
                      College / Higher Secondary Institution
                    </th>
                    <th className="py-3.5 px-4">Location / City</th>
                    <th className="py-3.5 px-4 text-center">
                      Enrolled Students
                    </th>
                    <th className="py-3.5 px-4 text-center">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredSchools.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <School className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              {s.name}
                            </p>
                            <p className="text-[10px] font-mono text-slate-400">
                              {s.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        {s.city}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                        {s.studentCount}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {s.isPopular ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                            <Sparkles className="w-2.5 h-2.5" /> Popular
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            title="Edit School"
                            onClick={() => {
                              setEditingSchool(s);
                              setSchoolForm({
                                name: s.name,
                                city: s.city,
                                isPopular: !!s.isPopular,
                              });
                              setIsSchoolModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {s.id !== "clg_other" && (
                            <button
                              type="button"
                              title="Delete School"
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "school",
                                  id: s.id,
                                  name: s.name,
                                })
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSchools.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-slate-400"
                      >
                        No colleges match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER ROLE */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Modify User Role
                </h3>
                <p className="text-xs text-slate-500">
                  {editingUser.name} ({editingUser.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUserRole} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  System Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["student", "teacher", "admin"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setUserRoleSelect(r)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                        userRoleSelect === r
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SCHOOL */}
      {isSchoolModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingSchool
                    ? "Edit College Details"
                    : "Add New Institution"}
                </h3>
                <p className="text-xs text-slate-500">
                  Registered institutions are selectable by students during
                  onboarding and appear on national leaderboards.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSchoolModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchool} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Xavier International College"
                  value={schoolForm.name}
                  onChange={(e) =>
                    setSchoolForm({ ...schoolForm, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  City / Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kalopul, Kathmandu"
                  value={schoolForm.city}
                  onChange={(e) =>
                    setSchoolForm({ ...schoolForm, city: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={schoolForm.isPopular}
                  onChange={(e) =>
                    setSchoolForm({
                      ...schoolForm,
                      isPopular: e.target.checked,
                    })
                  }
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <label
                  htmlFor="isPopular"
                  className="text-slate-700 dark:text-slate-300 select-none"
                >
                  Highlight as Popular / Prominent Nepal +2 College
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSchoolModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60 shadow-xs"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingSchool
                      ? "Save Changes"
                      : "Create School"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Confirm Deletion
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete{" "}
                <strong className="text-slate-900 dark:text-white">
                  {deleteConfirm.name}
                </strong>
                ? This action cannot be reversed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs disabled:opacity-60"
              >
                {isSubmitting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
