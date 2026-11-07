import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Flame, ArrowRight, UserCheck } from "lucide-react";
import { LeaderboardStudent } from "../../types/leaderboard";

interface UserRankStickyCardProps {
  currentUser: LeaderboardStudent;
  userRank: number;
  totalStudents: number;
  nextStudent?: LeaderboardStudent;
  onEditProfile: () => void;
  onViewBadges: () => void;
}

export const UserRankStickyCard: React.FC<UserRankStickyCardProps> = ({
  currentUser,
  userRank,
  totalStudents,
  nextStudent,
  onEditProfile,
  onViewBadges,
}) => {
  const xpNeeded =
    nextStudent && nextStudent.totalXp > currentUser.totalXp
      ? nextStudent.totalXp - currentUser.totalXp + 1
      : 0;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-full overflow-hidden">
      {/* Left: Avatar & Rank */}
      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
        <div className="relative shrink-0">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-inner ${currentUser.avatarBg}`}
          >
            {currentUser.avatarInitials}
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
            #{userRank}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm sm:text-base text-white truncate">
              {currentUser.name}
            </h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase shrink-0">
              You
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate">
            {currentUser.school} · Class {currentUser.grade}
          </p>
        </div>
      </div>

      {/* Middle: Metrics in 2x2 on mobile, 4 columns on tablet/desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-xs border-y md:border-y-0 md:border-x border-slate-800 py-3 md:py-0 md:px-6 w-full md:w-auto shrink-0">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">
            National Rank
          </span>
          <div className="font-mono text-sm sm:text-base font-black text-amber-400">
            #{userRank}{" "}
            <span className="text-[11px] font-normal text-slate-400">
              / {totalStudents}
            </span>
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">
            Accumulated XP
          </span>
          <div className="font-mono text-sm sm:text-base font-black text-white">
            {currentUser.totalXp.toLocaleString()}
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">
            Accuracy
          </span>
          <div className="font-mono text-sm sm:text-base font-black text-emerald-400">
            {currentUser.overallAccuracy}%
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">
            Study Streak
          </span>
          <div className="flex items-center gap-1 font-mono text-sm sm:text-base font-black text-amber-500">
            <Flame className="w-3.5 h-3.5 shrink-0" />
            <span>{currentUser.streakDays}d</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={onViewBadges}
          className="flex-1 sm:flex-none justify-center px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Badges ({currentUser.badgesCount})</span>
        </button>

        <button
          type="button"
          onClick={onEditProfile}
          className="flex-1 sm:flex-none justify-center px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Profile</span>
        </button>

        <Link
          to="/practice"
          className="w-full sm:w-auto justify-center px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
        >
          <span>Take Test to Climb</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default UserRankStickyCard;
