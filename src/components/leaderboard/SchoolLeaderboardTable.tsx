import React from "react";
import { School, Users, Target, Trophy, Award } from "lucide-react";
import { SchoolStanding } from "../../types/leaderboard";

interface SchoolLeaderboardTableProps {
  schools: SchoolStanding[];
  userSchoolName?: string;
}

export const SchoolLeaderboardTable: React.FC<SchoolLeaderboardTableProps> = ({
  schools,
  userSchoolName,
}) => {
  return (
    <div className="space-y-6">
      {/* College Championship Banner */}
      <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Inter-College Examination Championship</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Nepal Secondary School &amp; College Standings
          </h3>
          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            Represent your college! Every practice test and full examination you
            complete earns points for your school's national leaderboard
            standing.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">College / School</th>
                <th className="py-3.5 px-4 text-center">Active Students</th>
                <th className="py-3.5 px-4">Strongest Discipline</th>
                <th className="py-3.5 px-4 text-center">Avg Accuracy</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Combined XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {schools.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500">
                        <School className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          No college standings logged yet
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                          Complete quiz attempts to score the first XP points
                          and put your institution on the national leaderboard!
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                schools.map((school, idx) => {
                  const rank = idx + 1;
                  const isUserSchool =
                    userSchoolName &&
                    school.name.toLowerCase().trim() ===
                      userSchoolName.toLowerCase().trim();

                  return (
                    <tr
                      key={school.id}
                      className={`transition-colors ${
                        isUserSchool
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

                      {/* School Name & City */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                            <School className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white truncate">
                                {school.name}
                              </span>
                              {isUserSchool && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shrink-0">
                                  Your School
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                              {school.city}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Student Count */}
                      <td className="py-4 px-4 text-center font-mono text-slate-600 dark:text-slate-300">
                        <div className="flex items-center justify-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{school.studentCount}</span>
                        </div>
                      </td>

                      {/* Leading Subject */}
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        {school.topSubject}
                      </td>

                      {/* Avg Accuracy */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {school.averageAccuracy}%
                      </td>

                      {/* Total Community XP */}
                      <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                        {school.totalXp.toLocaleString()}{" "}
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          XP
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolLeaderboardTable;
