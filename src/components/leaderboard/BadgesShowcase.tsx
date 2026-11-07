import React from "react";
import {
  X,
  Trophy,
  Target,
  Zap,
  Star,
  Award,
  Book,
  Cpu,
  Flame,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Badge } from "../../types/leaderboard";

interface BadgesShowcaseProps {
  isOpen: boolean;
  badges: Badge[];
  onClose: () => void;
}

export const BadgesShowcase: React.FC<BadgesShowcaseProps> = ({
  isOpen,
  badges,
  onClose,
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const getBadgeIcon = (iconName: Badge["icon"], isUnlocked: boolean) => {
    const iconClass = `w-5 h-5 ${isUnlocked ? "text-amber-500" : "text-slate-400"}`;
    switch (iconName) {
      case "trophy":
        return <Trophy className={iconClass} />;
      case "target":
        return <Target className={iconClass} />;
      case "zap":
        return <Zap className={iconClass} />;
      case "star":
        return <Star className={iconClass} />;
      case "flame":
        return <Flame className={iconClass} />;
      case "book":
        return <Book className={iconClass} />;
      case "cpu":
        return <Cpu className={iconClass} />;
      case "award":
      default:
        return <Award className={iconClass} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Gamification Badges &amp; Honors
              </h3>
              <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                {unlockedCount} / {badges.length} Unlocked
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete mock exams, achieve high accuracy, and maintain study
              streaks to unlock achievements
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.unlocked
                  ? "border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 opacity-80"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  badge.unlocked
                    ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {getBadgeIcon(badge.icon, badge.unlocked)}
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {badge.name}
                  </h4>
                  {badge.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Lock className="w-3 h-3" />
                      <span>{badge.progress}%</span>
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {badge.description}
                </p>

                {/* Progress bar */}
                {!badge.unlocked && (
                  <div className="pt-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      Requirement: {badge.criteria}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgesShowcase;
