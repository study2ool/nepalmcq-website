import React, { useMemo } from "react";
import { Users, School, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setScope,
  setGradeFilter,
  setSubjectFilter,
  setTimeframe,
  setSchoolFilter,
  setSearchQuery,
  setProfileModalOpen,
  setBadgesModalOpen,
  saveUserProfile,
} from "../store/api/leaderboardApi";
import { updateUserLocal } from "../store/api/authApi";
import { SubjectName, GradeLevel } from "../types/question";
import type { LeaderboardStudent } from "../types/leaderboard";
import {
  useGetCollegesQuery,
  useGetLeaderboardQuery,
} from "../store/api/apiSlice";
import {
  buildCurrentUserLeaderboardEntry,
  evaluateUserBadges,
} from "../utils/leaderboardUtils";
import LeaderboardPodium from "../components/leaderboard/LeaderboardPodium";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import SchoolLeaderboardTable from "../components/leaderboard/SchoolLeaderboardTable";
import UserRankStickyCard from "../components/leaderboard/UserRankStickyCard";
import ProfileModal from "../components/leaderboard/ProfileModal";
import BadgesShowcase from "../components/leaderboard/BadgesShowcase";
import { SearchableSelect } from "../components/common/SearchableSelect";
import { useSEO } from "../hooks/useSEO";

const SUBJECT_OPTIONS: Array<"All" | SubjectName> = [
  "All",
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "English",
  "Nepali",
  "Computer Science",
];

export const Leaderboard: React.FC = () => {
  useSEO({
    title: "National & Inter-College Leaderboard | Nepal MCQ",
    description:
      "Track top performing Grade 11 & 12 students and secondary schools across Nepal by subject, accuracy, and examination scores.",
    canonicalPath: "/leaderboard",
  });

  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.results.history);
  const authUser = useAppSelector((state) => state.auth.user);
  const {
    profile,
    scope,
    gradeFilter,
    subjectFilter,
    timeframe,
    schoolFilter,
    searchQuery,
    isProfileModalOpen,
    isBadgesModalOpen,
  } = useAppSelector((state) => state.leaderboard);

  const { data: colleges = [] } = useGetCollegesQuery();
  const { data: backendData = null } = useGetLeaderboardQuery({
    timeframe,
    grade: gradeFilter === "All" ? undefined : String(gradeFilter),
    subject: subjectFilter,
  });

  // Build current user's live performance entry
  const currentUser = useMemo(() => {
    const activeProfile = {
      ...profile,
      school: authUser?.collegeName || profile.school,
      city: authUser?.collegeCity || profile.city,
      grade: authUser?.grade || profile.grade,
      name: authUser?.name || profile.name,
    };
    return buildCurrentUserLeaderboardEntry(activeProfile, history);
  }, [profile, history, authUser]);

  // Compute ranked students list
  const rankedStudents = useMemo(() => {
    let list: LeaderboardStudent[] = [];
    if (backendData && backendData.students.length > 0) {
      list = backendData.students;
    } else if (currentUser.examsCompleted > 0) {
      list = [currentUser];
    }

    if (gradeFilter !== "All") {
      list = list.filter((s) => s.grade === gradeFilter);
    }
    if (schoolFilter && schoolFilter !== "All Schools") {
      list = list.filter((s) =>
        s.school.toLowerCase().includes(schoolFilter.toLowerCase()),
      );
    }

    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.school.toLowerCase().includes(query) ||
        s.city.toLowerCase().includes(query),
    );
  }, [backendData, currentUser, gradeFilter, schoolFilter, searchQuery]);

  // Compute school standings
  const schoolOptions = useMemo(() => {
    return [
      { value: "All Schools", label: "All Colleges & Schools" },
      ...colleges.map((sch) => ({
        value: sch.name,
        label: sch.name,
        description: sch.city,
      })),
    ];
  }, [colleges]);

  const rankedSchools = useMemo(() => {
    let list =
      backendData && backendData.schools.length > 0 ? backendData.schools : [];

    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.city.toLowerCase().includes(query),
    );
  }, [backendData, searchQuery]);

  // Find user's national rank
  const userRankIndex = rankedStudents.findIndex((s) => s.isCurrentUser);
  const userRank =
    userRankIndex !== -1 ? userRankIndex + 1 : rankedStudents.length;
  const nextStudent =
    userRankIndex > 0 ? rankedStudents[userRankIndex - 1] : undefined;

  // Compute badges for user
  const userBadges = useMemo(() => evaluateUserBadges(history), [history]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Competitive Examination Honors</span>
            <span>·</span>
            <span>NEB Curriculum Ranking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            National &amp; College Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compare your examination scores with students and secondary schools
            across Nepal.
          </p>
        </div>

        {/* View Scope Tabs: Students vs Schools */}
        <div className="flex w-full sm:w-auto items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => dispatch(setScope("students"))}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              scope === "students"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Top Students</span>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setScope("schools"))}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              scope === "schools"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>Colleges &amp; Schools</span>
          </button>
        </div>
      </div>

      {/* User Personal Standing Card */}
      <UserRankStickyCard
        currentUser={currentUser}
        userRank={userRank}
        totalStudents={rankedStudents.length}
        nextStudent={nextStudent}
        onEditProfile={() => dispatch(setProfileModalOpen(true))}
        onViewBadges={() => dispatch(setBadgesModalOpen(true))}
      />

      {/* Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Grade and Timeframe filter tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Grade level filter */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Grade:
              </span>
              {(["All", 11, 12] as const).map((g) => (
                <button
                  key={String(g)}
                  type="button"
                  onClick={() =>
                    dispatch(setGradeFilter(g as "All" | GradeLevel))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    gradeFilter === g
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {g === "All" ? "All Grades" : `Grade ${g}`}
                </button>
              ))}
            </div>

            <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">
              |
            </span>

            {/* Timeframe filter */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Period:
              </span>
              {(
                [
                  { id: "all-time", label: "All Time" },
                  { id: "weekly", label: "Weekly Challenge" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => dispatch(setTimeframe(t.id))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    timeframe === t.id
                      ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* School filter and search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* School Filter Dropdown */}
            {scope === "students" && (
              <SearchableSelect
                options={schoolOptions}
                value={schoolFilter}
                onChange={(val) => dispatch(setSchoolFilter(val))}
                searchPlaceholder="Search colleges..."
                icon={<School className="w-3.5 h-3.5" />}
                className="w-full sm:w-56"
                buttonClassName="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
              />
            )}

            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder={
                  scope === "students"
                    ? "Search student, school, city..."
                    : "Search college or city..."
                }
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Subject Filter Pills / Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Subject:
          </span>
          {SUBJECT_OPTIONS.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => dispatch(setSubjectFilter(sub))}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                subjectFilter === sub
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {sub === "All" ? "All Subjects (Composite)" : sub}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Display (Top 3 Performers) for Student View */}
      {scope === "students" &&
        !searchQuery &&
        schoolFilter === "All Schools" && (
          <LeaderboardPodium
            topStudents={rankedStudents.slice(0, 3)}
            subjectFilter={subjectFilter}
          />
        )}

      {/* Main Ranking Display */}
      {scope === "students" ? (
        <LeaderboardTable
          students={rankedStudents}
          subjectFilter={subjectFilter}
          onEditProfile={() => dispatch(setProfileModalOpen(true))}
        />
      ) : (
        <SchoolLeaderboardTable
          schools={rankedSchools}
          userSchoolName={profile.school}
        />
      )}

      {/* Profile Customization Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        profile={{
          ...profile,
          school: authUser?.collegeName || profile.school,
          city: authUser?.collegeCity || profile.city,
          grade: authUser?.grade || profile.grade,
          name: authUser?.name || profile.name,
        }}
        onClose={() => dispatch(setProfileModalOpen(false))}
        onSave={(updated) => {
          dispatch(saveUserProfile(updated));
          if (authUser) {
            dispatch(
              updateUserLocal({
                name: updated.name,
                collegeName: updated.school,
                collegeCity: updated.city,
                grade: updated.grade,
              }),
            );
          }
        }}
      />

      {/* Gamified Badges Showcase Modal */}
      <BadgesShowcase
        isOpen={isBadgesModalOpen}
        badges={userBadges}
        onClose={() => dispatch(setBadgesModalOpen(false))}
      />
    </div>
  );
};

export default Leaderboard;
