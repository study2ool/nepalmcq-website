import React from "react";
import { Crown, Medal, Award, Flame, Target } from "lucide-react";
import { LeaderboardStudent } from "../../types/leaderboard";

interface LeaderboardPodiumProps {
  topStudents: LeaderboardStudent[];
  subjectFilter: string;
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({
  topStudents,
  subjectFilter,
}) => {
  if (topStudents.length < 3) return null;

  const first = topStudents[0];
  const second = topStudents[1];
  const third = topStudents[2];

  const renderStudentCard = (
    student: LeaderboardStudent,
    rank: number,
    colorClass: string,
    borderClass: string,
    badgeBg: string,
    icon: React.ReactNode,
    heightClass: string,
  ) => {
    return (
      <div
        className={`flex-1 flex flex-col items-center justify-end relative transition-all ${
          student.isCurrentUser ? "scale-[1.02]" : ""
        }`}
      >
        {/* Crown/Medal Badge */}
        <div className="flex flex-col items-center mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${badgeBg}`}
          >
            {icon}
          </div>
          <span className="text-xs font-mono font-bold mt-1 text-slate-500 dark:text-slate-400">
            Rank #{rank}
          </span>
        </div>

        {/* Student Avatar */}
        <div className="relative mb-2">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-md ${student.avatarBg} ${
              student.isCurrentUser
                ? "ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900"
                : ""
            }`}
          >
            {student.avatarInitials}
          </div>
          {student.isCurrentUser && (
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-600 text-white">
              You
            </span>
          )}
        </div>

        {/* Info */}
        <div className="text-center w-full px-2">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
            {student.name}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px] mx-auto">
            {student.school}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
            <span>Grade {student.grade}</span>
            <span>·</span>
            <span>{student.city}</span>
          </div>
        </div>

        {/* Metric Pill-free Podium Block */}
        <div
          className={`w-full mt-4 rounded-t-2xl border-t-2 border-x-2 ${borderClass} bg-white dark:bg-slate-900 p-4 flex flex-col items-center justify-center shadow-xs ${heightClass}`}
        >
          <div className="text-center space-y-1">
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {student.totalXp.toLocaleString()}{" "}
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                XP
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-0.5 sm:gap-1 text-emerald-600 dark:text-emerald-400 font-semibold font-mono whitespace-nowrap">
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{student.overallAccuracy}% acc</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-0.5 sm:gap-1 text-amber-600 dark:text-amber-400 font-semibold font-mono whitespace-nowrap">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{student.streakDays}d streak</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Top:{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {student.topSubject}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-100/70 dark:bg-slate-900/40 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Medal className="w-4 h-4" />
          <span>National Top Achievers Podium</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
          {subjectFilter === "All"
            ? "Overall National Honors"
            : `${subjectFilter} Excellence`}
        </h2>
      </div>

      <div className="flex items-end justify-center gap-2 sm:gap-6 max-w-3xl mx-auto pt-2">
        {/* Rank 2 - Silver */}
        {renderStudentCard(
          second,
          2,
          "text-slate-400",
          "border-slate-300 dark:border-slate-700",
          "bg-slate-400",
          <Award className="w-5 h-5" />,
          "min-h-[140px]",
        )}

        {/* Rank 1 - Gold (Elevated) */}
        {renderStudentCard(
          first,
          1,
          "text-amber-500",
          "border-amber-400 dark:border-amber-600",
          "bg-amber-500",
          <Crown className="w-6 h-6" />,
          "min-h-[180px]",
        )}

        {/* Rank 3 - Bronze */}
        {renderStudentCard(
          third,
          3,
          "text-amber-700",
          "border-amber-700/60 dark:border-amber-700/60",
          "bg-amber-700",
          <Medal className="w-5 h-5" />,
          "min-h-[120px]",
        )}
      </div>
    </div>
  );
};

export default LeaderboardPodium;
