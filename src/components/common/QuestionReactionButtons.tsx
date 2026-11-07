import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleReactionThunk } from "../../store/api/questionReactionApi";

interface QuestionReactionButtonsProps {
  questionId: string;
  size?: "xs" | "sm" | "md";
  className?: string;
  showLabels?: boolean;
}

export const QuestionReactionButtons: React.FC<
  QuestionReactionButtonsProps
> = ({ questionId, size = "sm", className = "", showLabels = false }) => {
  const dispatch = useAppDispatch();
  const reactionStats = useAppSelector(
    (state) => state.questionReactions.reactions[questionId],
  );

  const likesCount = reactionStats?.likesCount || 0;
  const dislikesCount = reactionStats?.dislikesCount || 0;
  const userReaction = reactionStats?.userReaction || null;

  const isLiked = userReaction === "like";
  const isDisliked = userReaction === "dislike";

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleReactionThunk({ questionId, target: "like" }));
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleReactionThunk({ questionId, target: "dislike" }));
  };

  // Size styling tokens
  const iconSizeClass =
    size === "xs" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  const textClass =
    size === "xs" ? "text-[10px]" : size === "md" ? "text-xs" : "text-[11px]";
  const paddingClass =
    size === "xs"
      ? "px-1.5 py-0.5"
      : size === "md"
        ? "px-3 py-1.5"
        : "px-2 py-1";

  return (
    <div
      className={`inline-flex items-center gap-1 p-0.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 ${className}`}
      role="group"
      aria-label="Question feedback"
    >
      {/* Like Button */}
      <button
        type="button"
        onClick={handleLike}
        title={isLiked ? "Liked (Click to remove like)" : "Like this question"}
        aria-pressed={isLiked}
        className={`inline-flex items-center gap-1.5 rounded-md font-semibold transition-all cursor-pointer ${paddingClass} ${textClass} ${
          isLiked
            ? "bg-emerald-500 text-white shadow-2xs font-bold"
            : "text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700/60"
        }`}
      >
        <ThumbsUp
          className={`${iconSizeClass} ${
            isLiked ? "fill-current stroke-emerald-600" : ""
          }`}
        />
        <span className="font-mono">{likesCount}</span>
        {showLabels && <span className="hidden sm:inline">Like</span>}
      </button>

      {/* Dislike Button */}
      <button
        type="button"
        onClick={handleDislike}
        title={
          isDisliked
            ? "Disliked (Click to remove dislike)"
            : "Dislike this question"
        }
        aria-pressed={isDisliked}
        className={`inline-flex items-center gap-1.5 rounded-md font-semibold transition-all cursor-pointer ${paddingClass} ${textClass} ${
          isDisliked
            ? "bg-rose-500 text-white shadow-2xs font-bold"
            : "text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700/60"
        }`}
      >
        <ThumbsDown
          className={`${iconSizeClass} ${
            isDisliked ? "fill-current stroke-rose-600" : ""
          }`}
        />
        <span className="font-mono">{dislikesCount}</span>
        {showLabels && <span className="hidden sm:inline">Dislike</span>}
      </button>
    </div>
  );
};

export default QuestionReactionButtons;
