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
  MessageSquare,
  Mail,
  Inbox,
  Filter,
  CheckCircle,
  Eye,
  ExternalLink,
  RefreshCw,
  BarChart3,
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
  useGetAdminInquiriesQuery,
  useUpdateAdminInquiryMutation,
  useDeleteAdminInquiryMutation,
  useSyncPlatformAnalyticsMutation,
  AdminStats,
  AdminSchool,
  type ContactInquiry,
  type PlatformAnalytics,
} from "../store/api/apiSlice";
import type { User } from "../store/api/authApi";
import { SearchableSelect } from "../components/common/SearchableSelect";
import { useSEO } from "../hooks/useSEO";

type AdminTab = "overview" | "users" | "schools" | "inquiries";

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

  // Inquiries Filter & Selection State
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryCategoryFilter, setInquiryCategoryFilter] = useState("all");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [inquiryAdminNotes, setInquiryAdminNotes] = useState("");
  const [isUpdatingInquiry, setIsUpdatingInquiry] = useState(false);

  const { data: inquiries = [], isLoading: isInquiriesLoading } =
    useGetAdminInquiriesQuery({
      search: inquirySearch,
      category: inquiryCategoryFilter,
      status: inquiryStatusFilter,
    });

  const [updateUserMutation] = useUpdateAdminUserMutation();
  const [deleteUserMutation] = useDeleteAdminUserMutation();
  const [createSchoolMutation] = useCreateAdminSchoolMutation();
  const [updateSchoolMutation] = useUpdateAdminSchoolMutation();
  const [deleteSchoolMutation] = useDeleteAdminSchoolMutation();
  const [updateInquiryMutation] = useUpdateAdminInquiryMutation();
  const [deleteInquiryMutation] = useDeleteAdminInquiryMutation();
  const [syncAnalytics, { isLoading: isSyncingAnalytics }] =
    useSyncPlatformAnalyticsMutation();

  const handleSyncAnalytics = async () => {
    try {
      await syncAnalytics().unwrap();
      showNotification("success", "Analytics collection recalculated and synced successfully!");
    } catch (err: any) {
      showNotification("error", err?.data?.error || err.message || "Failed to sync analytics");
    }
  };

  const isLoading =
    isStatsLoading || isUsersLoading || isSchoolsLoading || isInquiriesLoading;
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // User Filter State
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [userStatusFilter, setUserStatusFilter] = useState("all");

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
    type: "user" | "school" | "inquiry";
    id: string;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (type: "success" | "error", text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // School-Wise Analytics List
  const schoolAnalyticsList = useMemo(() => {
    const sw = stats?.analytics?.schoolWise || stats?.schoolWise || {};
    return Object.values(sw).sort((a, b) => b.studentCount - a.studentCount);
  }, [stats]);

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
      const isOnboarded = Boolean(u.collegeId || u.gender);
      const matchesStatus =
        userStatusFilter === "all" ||
        (userStatusFilter === "onboarded" && isOnboarded) ||
        (userStatusFilter === "pending" && !isOnboarded);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, userSearch, userRoleFilter, userStatusFilter]);

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
      } else if (deleteConfirm.type === "school") {
        await deleteSchoolMutation(deleteConfirm.id).unwrap();
        showNotification("success", `Deleted school ${deleteConfirm.name}`);
      } else if (deleteConfirm.type === "inquiry") {
        await deleteInquiryMutation(deleteConfirm.id).unwrap();
        showNotification("success", `Deleted inquiry ${deleteConfirm.name}`);
        if (selectedInquiry?.id === deleteConfirm.id) {
          setSelectedInquiry(null);
        }
      }
      setDeleteConfirm(null);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateInquiryStatus = async (
    id: string,
    status: ContactInquiry["status"],
  ) => {
    setIsUpdatingInquiry(true);
    try {
      const updated = await updateInquiryMutation({ id, status }).unwrap();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(updated);
      }
      showNotification("success", `Inquiry #${id} marked as ${status}`);
    } catch (err: any) {
      showNotification("error", err?.data?.error || err.message || "Failed to update inquiry status");
    } finally {
      setIsUpdatingInquiry(false);
    }
  };

  const handleSaveInquiryNotes = async (id: string) => {
    setIsUpdatingInquiry(true);
    try {
      const updated = await updateInquiryMutation({
        id,
        adminNotes: inquiryAdminNotes,
      }).unwrap();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(updated);
      }
      showNotification("success", `Saved notes for inquiry #${id}`);
    } catch (err: any) {
      showNotification("error", err?.data?.error || err.message || "Failed to save notes");
    } finally {
      setIsUpdatingInquiry(false);
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

        {/* Tab switcher & Sync Action */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/80">
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
            <button
              type="button"
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === "inquiries"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries ({inquiries.length})</span>
              {stats?.pendingInquiries && stats.pendingInquiries > 0 ? (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-extrabold bg-amber-500 text-white rounded-full">
                  {stats.pendingInquiries}
                </span>
              ) : null}
            </button>
          </div>

          <button
            type="button"
            onClick={handleSyncAnalytics}
            disabled={isSyncingAnalytics}
            title="Recalculate & Sync Analytics Collection"
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-all disabled:opacity-60"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-indigo-500 ${
                isSyncingAnalytics ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">
              {isSyncingAnalytics ? "Syncing..." : "Sync Analytics"}
            </span>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Contact Inquiries
                </span>
                <MessageSquare className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats?.totalInquiries ?? inquiries.length}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  {stats?.pendingInquiries ??
                    inquiries.filter((i) => i.status === "pending").length}{" "}
                  Pending
                </span>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("inquiries")}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  Manage &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Demographic Breakdown & System Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Onboarding & Demographics */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>Student Onboarding</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                  {stats?.totalStudents && stats.totalStudents > 0
                    ? Math.round(
                        ((stats.onboardedCount || 0) / stats.totalStudents) *
                          100,
                      )
                    : 0}
                  % Complete
                </span>
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">
                      Profile Completed
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                      {stats?.onboardedCount ?? 0}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          stats?.totalStudents && stats.totalStudents > 0
                            ? Math.min(
                                100,
                                Math.round(
                                  ((stats.onboardedCount || 0) /
                                    stats.totalStudents) *
                                    100,
                                ),
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
                      Pending Onboarding
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">
                      {Math.max(
                        0,
                        (stats?.totalStudents ?? 0) -
                          (stats?.onboardedCount ?? 0),
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{
                        width: `${
                          stats?.totalStudents && stats.totalStudents > 0
                            ? Math.min(
                                100,
                                Math.round(
                                  (Math.max(
                                    0,
                                    stats.totalStudents -
                                      (stats.onboardedCount || 0),
                                  ) /
                                    stats.totalStudents) *
                                    100,
                                ),
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500">
                  <span>Total Registered Students:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {stats?.totalStudents ?? stats?.usersByRole.student ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Gender Demographics */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span>Gender Demographics</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {(stats?.genderDistribution?.male || 0) +
                    (stats?.genderDistribution?.female || 0) +
                    (stats?.genderDistribution?.other || 0)}{" "}
                  Total
                </span>
              </h3>
              <div className="space-y-2.5 text-xs">
                {/* Male */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Male
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {stats?.genderDistribution?.male ?? 0}
                  </span>
                </div>

                {/* Female */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Female
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {stats?.genderDistribution?.female ?? 0}
                  </span>
                </div>

                {/* Other */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Other
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {stats?.genderDistribution?.other ?? 0}
                  </span>
                </div>
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

          {/* School-Wise & School-Gender Wise Analytics Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                  <span>College-Wise Demographics &amp; Gender Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Aggregated in real-time from single platform summary document (Zero full-table scans)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">
                  {schoolAnalyticsList.length} colleges with active students
                </span>
              </div>
            </div>

            {schoolAnalyticsList.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <School className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  No college enrollments recorded yet.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  As students complete their onboarding profile and pick a college, metrics update automatically.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full text-left text-xs min-w-[580px]">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 sm:px-6">College / School</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4 text-center">Enrolled Students</th>
                      <th className="py-3 px-4">Gender Breakdown</th>
                      <th className="py-3 px-4 text-right">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {schoolAnalyticsList.map((item, idx) => {
                      const sharePct =
                        stats?.totalStudents && stats.totalStudents > 0
                          ? Math.round(
                              (item.studentCount / stats.totalStudents) * 100,
                            )
                          : 0;

                      return (
                        <tr
                          key={item.collegeId || idx}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 sm:px-6">
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                                #{idx + 1}
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                            {item.city || "Nepal"}
                          </td>
                          <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                            {item.studentCount}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              {(item.male ?? 0) > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold font-mono">
                                  {item.male} Male
                                </span>
                              )}
                              {(item.female ?? 0) > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-semibold font-mono">
                                  {item.female} Female
                                </span>
                              )}
                              {(item.other ?? 0) > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold font-mono">
                                  {item.other} Other
                                </span>
                              )}
                              {!(item.male > 0) &&
                                !(item.female > 0) &&
                                !(item.other > 0) && (
                                  <span className="text-slate-400 italic">
                                    -
                                  </span>
                                )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-semibold text-slate-600 dark:text-slate-400">
                            {sharePct}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
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
                  { value: "all", label: "All Statuses" },
                  { value: "onboarded", label: "Onboarded" },
                  { value: "pending", label: "Pending Setup" },
                ]}
                value={userStatusFilter}
                onChange={(val) => setUserStatusFilter(String(val))}
                searchPlaceholder="Search status..."
                className="w-36"
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
                    <th className="py-3.5 px-4 text-center">Status</th>
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

                      {/* Onboarding Status */}
                      <td className="py-3.5 px-4 text-center">
                        {u.collegeId || u.gender ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Onboarded</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                            <Clock className="w-2.5 h-2.5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>

                      {/* Gender */}
                      <td className="py-3.5 px-4 text-center capitalize">
                        {u.gender ? (
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

      {/* TAB 4: CONTACT & ACADEMIC INQUIRIES */}
      {activeTab === "inquiries" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header & Filter Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Academic Inquiries &amp; Feedback Queue</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Review student question typo reports, college partnership proposals, and curriculum feedback.
                </p>
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                {(["all", "pending", "reviewed", "resolved", "archived"] as const).map(
                  (st) => {
                    const count =
                      st === "all"
                        ? inquiries.length
                        : inquiries.filter((i) => i.status === st).length;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          inquiryStatusFilter === st
                            ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {st} ({count})
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Search and Category Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search by sender name, email, subject, or #ID..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={inquiryCategoryFilter}
                  onChange={(e) => setInquiryCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="question_feedback">Question Bank &amp; Answer Key</option>
                  <option value="technical_issue">Technical &amp; Platform</option>
                  <option value="college_partnership">College Partnership</option>
                  <option value="curriculum_request">Curriculum &amp; Syllabus</option>
                  <option value="account_support">Account &amp; Data Support</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inquiries Table View */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Sender Details</th>
                    <th className="py-3.5 px-4">Category &amp; Subject</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4">Submitted At</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {inquiries.map((inq) => {
                    const categoryColors: Record<string, string> = {
                      question_feedback:
                        "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
                      technical_issue:
                        "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60",
                      college_partnership:
                        "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
                      curriculum_request:
                        "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60",
                      account_support:
                        "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
                      general:
                        "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
                    };
                    const catClass =
                      categoryColors[inq.category] || categoryColors.general;

                    return (
                      <tr
                        key={inq.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Sender */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                              {inq.name.charAt(0) || "U"}
                            </div>
                            <div className="min-w-0 max-w-xs">
                              <p className="font-bold text-slate-900 dark:text-white truncate">
                                {inq.name}
                              </p>
                              <a
                                href={`mailto:${inq.email}`}
                                className="text-[11px] text-slate-500 hover:text-indigo-600 dark:text-slate-400 truncate block"
                              >
                                {inq.email}
                              </a>
                              <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                                {inq.role.replace(/_/g, " ")}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category & Subject */}
                        <td className="py-3.5 px-4 max-w-md">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${catClass}`}
                              >
                                {inq.category.replace(/_/g, " ")}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                #{inq.id}
                              </span>
                            </div>
                            <p className="font-bold text-slate-900 dark:text-white truncate">
                              {inq.subject}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {inq.message}
                            </p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                              inq.status === "pending"
                                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400"
                                : inq.status === "reviewed"
                                ? "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400"
                                : inq.status === "resolved"
                                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                inq.status === "pending"
                                  ? "bg-amber-500 animate-pulse"
                                  : inq.status === "reviewed"
                                  ? "bg-blue-500"
                                  : inq.status === "resolved"
                                  ? "bg-emerald-500"
                                  : "bg-slate-400"
                              }`}
                            />
                            {inq.status}
                          </span>
                        </td>

                        {/* Submitted At */}
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          <div>
                            {new Date(inq.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(inq.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              title="View and Manage Inquiry"
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setInquiryAdminNotes(inq.adminNotes || "");
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              title="Delete Inquiry"
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "inquiry",
                                  id: inq.id,
                                  name: `Inquiry #${inq.id} (${inq.subject})`,
                                })
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                        <p className="font-semibold text-xs text-slate-600 dark:text-slate-400">
                          No inquiries match the current filter.
                        </p>
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
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INQUIRY DETAILS & REPLY */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                    #{selectedInquiry.id}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {selectedInquiry.category.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedInquiry.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Sender</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {selectedInquiry.name}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Email</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-mono text-indigo-600 dark:text-indigo-400 hover:underline truncate block"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Role</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 capitalize block">
                  {selectedInquiry.role.replace(/_/g, " ")}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Date</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 block">
                  {new Date(selectedInquiry.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Inquiry Message Body */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 uppercase tracking-wider">
                Inquiry Message
              </label>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 uppercase tracking-wider">
                Status Resolution
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["pending", "reviewed", "resolved", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={isUpdatingInquiry}
                    onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border cursor-pointer ${
                      selectedInquiry.status === st
                        ? st === "pending"
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : st === "reviewed"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : st === "resolved"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-slate-700 text-white border-slate-700 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Administrator Internal Notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Admin Internal Notes
                </label>
                <span className="text-[11px] text-slate-400">Visible to team only</span>
              </div>
              <textarea
                rows={3}
                value={inquiryAdminNotes}
                onChange={(e) => setInquiryAdminNotes(e.target.value)}
                placeholder="Add notes about actions taken, response sent, or curriculum updates..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  disabled={isUpdatingInquiry}
                  onClick={() => handleSaveInquiryNotes(selectedInquiry.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white transition-colors cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirm({
                    type: "inquiry",
                    id: selectedInquiry.id,
                    name: `Inquiry #${selectedInquiry.id} (${selectedInquiry.subject})`,
                  });
                }}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: [Nepal MCQ #${selectedInquiry.id}] ${selectedInquiry.subject}`,
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedInquiry.name},\n\nThank you for contacting the Nepal MCQ Academic Team regarding "${selectedInquiry.subject}".\n\n\n---\nNepal MCQ Academic Team\nKathmandu, Nepal`,
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
