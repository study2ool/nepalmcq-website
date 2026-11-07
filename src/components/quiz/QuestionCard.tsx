import React, { useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  Flag,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Scroll,
} from "lucide-react";
import { Question } from "../../types/question";
import MathRenderer from "../common/MathRenderer";
import QuestionReactionButtons from "../common/QuestionReactionButtons";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption?: "A" | "B" | "C" | "D";
  isMarkedForReview: boolean;
  isBookmarked: boolean;
  isStudyMode?: boolean;
  onSelectOption: (optionId: "A" | "B" | "C" | "D") => void;
  onClearOption: () => void;
  onToggleReview: () => void;
  onToggleBookmark: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  isMarkedForReview,
  isBookmarked,
  isStudyMode = false,
  onSelectOption,
  onClearOption,
  onToggleReview,
  onToggleBookmark,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  // Dynamically determine 1x1 vs 2x2 layout based on option content length and complexity
  const optionsGridClass = useMemo(() => {
    const options = question.options || [];
    if (options.length === 0) return "grid-cols-1";

    let maxLen = 0;
    let hasMultilineOrBlock = false;

    for (const opt of options) {
      const text = (opt.text || "").trim();
      if (text.length > maxLen) {
        maxLen = text.length;
      }
      if (
        text.includes("\n") ||
        text.includes("$$") ||
        text.includes("\\[") ||
        text.includes("\\begin")
      ) {
        hasMultilineOrBlock = true;
      }
    }

    // Long options, paragraph text, or multiline block formulas: 1x1 full width everywhere
    if (hasMultilineOrBlock || maxLen > 55) {
      return "grid-cols-1";
    }

    // Short options (<= 28 chars, e.g. single words, numbers, units, short terms): 2x2 everywhere
    if (maxLen <= 28) {
      return "grid-cols-2";
    }

    // Medium-length options (29-55 chars): 1x1 on mobile to prevent cramped text, 2x2 on desktop/tablet
    return "grid-cols-1 sm:grid-cols-2";
  }, [question.options]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between min-h-[460px] sm:min-h-[500px]">
      {/* Top Question Meta */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>·</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {question.subject}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline truncate max-w-[200px]">
              {question.topic}
            </span>
            <span>·</span>
            <span className="font-mono text-slate-500">
              +{question.marks}.0 Mark
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Year / Source badge */}
            {(question.year || question.source) && (
              <span className="font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1 shadow-2xs">
                <Scroll className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>{question.year || question.source}</span>
              </span>
            )}

            {/* Difficulty badge */}
            <span
              className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                question.difficulty === "Easy"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                  : question.difficulty === "Medium"
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400"
              }`}
            >
              {question.difficulty}
            </span>

            {/* Like & Dislike Reactions */}
            <QuestionReactionButtons questionId={question.id} size="sm" />

            {/* Bookmark button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              title={
                isBookmarked ? "Remove Bookmark" : "Bookmark this question"
              }
              className="p-1 sm:p-1.5 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Question Text with KaTeX Rendering */}
        <div className="py-3.5 sm:py-5 text-slate-900 dark:text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
          <MathRenderer content={question.question} />
        </div>

        {/* Dynamically Adaptive Options Grid: 1x1 or 2x2 based on option content length */}
        <div className={`grid ${optionsGridClass} gap-2 sm:gap-3 pt-1 sm:pt-2`}>
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === question.correctAnswer;
            const hasAnswered = Boolean(selectedOption);

            let cardStyle =
              "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200";
            let badgeStyle =
              "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700";

            if (isStudyMode && hasAnswered) {
              if (isCorrectOption) {
                cardStyle =
                  "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/80 shadow-xs";
                badgeStyle = "bg-emerald-600 text-white shadow-xs";
              } else if (isSelected && !isCorrectOption) {
                cardStyle =
                  "border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/80 shadow-xs";
                badgeStyle = "bg-rose-600 text-white shadow-xs";
              } else {
                cardStyle =
                  "border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-60";
                badgeStyle =
                  "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600";
              }
            } else if (isSelected) {
              cardStyle =
                "border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 ring-1 ring-indigo-600 dark:ring-indigo-500 text-slate-900 dark:text-white";
              badgeStyle = "bg-indigo-600 text-white shadow-xs";
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-2.5 sm:p-4 rounded-lg sm:rounded-xl border transition-all flex items-start sm:items-center gap-2 sm:gap-3.5 group cursor-pointer ${cardStyle}`}
              >
                {/* Option Identifier Badge */}
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}
                >
                  {isStudyMode && hasAnswered && isCorrectOption ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isStudyMode &&
                    hasAnswered &&
                    isSelected &&
                    !isCorrectOption ? (
                    <XCircle className="w-4 h-4 text-white" />
                  ) : (
                    option.id
                  )}
                </div>

                {/* Option Text with MathRenderer */}
                <div className="text-xs sm:text-sm md:text-base pt-0.5 sm:pt-0 flex-1 leading-snug sm:leading-normal break-words">
                  <MathRenderer content={option.text} />
                </div>

                {/* Study Mode Indicator Tags */}
                {isStudyMode && hasAnswered && isCorrectOption && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md shrink-0">
                    Correct
                  </span>
                )}
                {isStudyMode &&
                  hasAnswered &&
                  isSelected &&
                  !isCorrectOption && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-900/60 px-2 py-0.5 rounded-md shrink-0">
                      Your Choice
                    </span>
                  )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card in Study Mode */}
        {isStudyMode && selectedOption && (
          <div className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-indigo-100/80 dark:border-indigo-900/40">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-200">
                  Step-by-Step Solution &amp; Concept
                </span>
              </div>
              <div>
                {selectedOption === question.correctAnswer ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Correct (+{question.marks}.0)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Incorrect</span>
                  </span>
                )}
              </div>
            </div>

            {/* Solution text */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              <MathRenderer content={question.explanation} />
            </div>

            {question.source && (
              <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  Curriculum Source:
                </span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                  {question.source}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-5 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        {/* Left helpers: Clear & Mark for Review */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onToggleReview}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg border transition-colors ${
              isMarkedForReview
                ? "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Flag
              className={`w-3.5 h-3.5 ${isMarkedForReview ? "fill-current" : ""}`}
            />
            <span>{isMarkedForReview ? "Marked" : "Mark for Review"}</span>
          </button>

          {selectedOption && (
            <button
              type="button"
              onClick={onClearOption}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Right Nav buttons: Previous & Next */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={onPrev}
            className={`flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors ${
              hasPrev
                ? "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                : "border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={onNext}
            className={`flex items-center gap-1 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              hasNext
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
