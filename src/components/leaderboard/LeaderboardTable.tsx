import React, { useState } from "react";
import { Flame, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { LeaderboardStudent } from "../../types/leaderboard";
import { SubjectName } from "../../types/question";

interface LeaderboardTableProps {
  students: LeaderboardStudent[];
  subjectFilter: "All" | SubjectName;
  onEditProfile?: () => void;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  students,
  subjectFilter,
  onEditProfile,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (students.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
        <Trophy className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          No students found matching your filters
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Try expanding your grade, subject, or school search filters to see all
          active test-takers across Nepal.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Rank</th>
              <th className="py-3.5 px-4">Student &amp; Institution</th>
              <th className="py-3.5 px-4 text-center">Grade</th>
              <th className="py-3.5 px-4">Top Subject</th>
              <th className="py-3.5 px-4 text-center">Accuracy</th>
              <th className="py-3.5 px-4 text-center">Streak</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Points / XP</th>
              <th className="py-3.5 px-3 text-center w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student, idx) => {
              const rank = idx + 1;
              const isExpanded = expandedId === student.id;
              const isTopThree = rank <= 3;
              const displayXp =
                subjectFilter !== "All"
                  ? student.subjectXp[subjectFilter] || 0
                  : student.totalXp;
              const displayAccuracy =
                subjectFilter !== "All"
                  ? student.subjectAccuracy[subjectFilter] ||
                    student.overallAccuracy
                  : student.overallAccuracy;

              return (
                <React.Fragment key={student.id}>
                  <tr
                    onClick={() => toggleExpand(student.id)}
                    className={`cursor-pointer transition-colors ${
                      student.isCurrentUser
                        ? "bg-indigo-50/70 dark:bg-indigo-950/30 font-medium"
                        : "hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 sm:px-6 text-center font-mono">
                      {rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                          1
                        </span>
                      ) : rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-sm">
                          2
                        </span>
                      ) : rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-900/10 dark:bg-amber-950/40 text-amber-800 dark:text-amber-500 font-extrabold text-sm">
                          3
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-500 dark:text-slate-400">
                          #{rank}
                        </span>
                      )}
                    </td>

                    {/* Student Name & School */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 ${student.avatarBg}`}
                        >
                          {student.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white truncate">
                              {student.name}
                            </span>
                            {student.isCurrentUser && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shrink-0">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {student.school} · {student.city}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="py-4 px-4 text-center font-mono text-slate-600 dark:text-slate-300">
                      Class {student.grade}
                    </td>

                    {/* Top Subject */}
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {subjectFilter !== "All"
                          ? subjectFilter
                          : student.topSubject}
                      </span>
                    </td>

                    {/* Accuracy */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {displayAccuracy}%
                    </td>

                    {/* Streak */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono text-amber-600 dark:text-amber-400 font-semibold">
                        <Flame className="w-3.5 h-3.5" />
                        {student.streakDays}d
                      </span>
                    </td>

                    {/* XP Points */}
                    <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {displayXp.toLocaleString()}{" "}
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        XP
                      </span>
                    </td>

                    {/* Expand icon */}
                    <td className="py-4 px-3 text-center text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {isExpanded && (
                    <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                      <td
                        colSpan={8}
                        className="p-4 sm:p-6 border-y border-slate-100 dark:border-slate-800"
                      >
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                              <span>
                                Exams Completed:{" "}
                                <strong className="text-slate-900 dark:text-white font-mono">
                                  {student.examsCompleted}
                                </strong>
                              </span>
                              <span>·</span>
                              <span>
                                Badges Unlocked:{" "}
                                <strong className="text-indigo-600 dark:text-indigo-400 font-mono">
                                  {student.badgesCount}
                                </strong>
                              </span>
                            </div>

                            {student.isCurrentUser && onEditProfile && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditProfile();
                                }}
                                className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                              >
                                Edit Your Profile &amp; College
                              </button>
                            )}
                          </div>

                          {/* Subject Performance Breakdown Grid */}
                          <div>
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                              Subject Mastery &amp; Accuracy Breakdown
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                              {(
                                [
                                  "Physics",
                                  "Chemistry",
                                  "Biology",
                                  "Mathematics",
                                  "English",
                                  "Nepali",
                                  "Computer Science",
                                ] as SubjectName[]
                              ).map((sub) => {
                                const acc = student.subjectAccuracy[sub] || 0;
                                const xp = student.subjectXp[sub] || 0;
                                return (
                                  <div
                                    key={sub}
                                    className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
                                  >
                                    <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                                      {sub}
                                    </div>
                                    <div className="flex items-center justify-between font-mono text-[11px]">
                                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                        {acc}%
                                      </span>
                                      <span className="text-slate-400">
                                        {xp} XP
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
