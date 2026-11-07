import React from "react";
import { QuizSession } from "../../types/quiz";

interface QuestionPaletteProps {
  session: QuizSession;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  session,
  onSelectQuestion,
}) => {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    markedForReview,
    questionTimeRemaining,
  } = session;

  const total = questions.length;
  let attempted = 0;
  let marked = 0;
  let attemptedAndMarked = 0;

  questions.forEach((q) => {
    const hasAnswer = !!selectedAnswers[q.id];
    const isMarked = !!markedForReview[q.id];
    if (hasAnswer && isMarked) {
      attemptedAndMarked += 1;
    } else if (hasAnswer) {
      attempted += 1;
    } else if (isMarked) {
      marked += 1;
    }
  });

  const totalAttempted = attempted + attemptedAndMarked;
  const notAttempted = total - totalAttempted;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      {/* Top Counts */}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        Question Palette
      </h3>

      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 block text-[11px]">Total</span>
          <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
            {total}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-emerald-700 dark:text-emerald-400 block text-[11px]">
            Attempted
          </span>
          <span className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-300">
            {totalAttempted}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-500 block text-[11px]">Unattempted</span>
          <span className="text-base font-bold font-mono text-slate-700 dark:text-slate-300">
            {notAttempted}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
          <span className="text-purple-700 dark:text-purple-400 block text-[11px]">
            Review
          </span>
          <span className="text-base font-bold font-mono text-purple-700 dark:text-purple-300">
            {marked + attemptedAndMarked}
          </span>
        </div>
      </div>

      {/* Grid of Numbers */}
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1 py-1">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const hasAnswer = !!selectedAnswers[q.id];
          const isMarked = !!markedForReview[q.id];
          const isTimeExpired = (questionTimeRemaining[q.id] ?? 60) <= 0;

          // Compute style
          let buttonStyle =
            "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";

          if (hasAnswer && isMarked) {
            buttonStyle =
              "bg-amber-500 text-white border-amber-600 font-semibold";
          } else if (hasAnswer) {
            buttonStyle =
              "bg-emerald-600 text-white border-emerald-700 font-semibold";
          } else if (isMarked) {
            buttonStyle =
              "bg-purple-600 text-white border-purple-700 font-semibold";
          } else if (isTimeExpired) {
            buttonStyle =
              "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800";
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center relative border cursor-pointer hover:opacity-90 ${buttonStyle} ${
                isCurrent
                  ? "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2 dark:ring-offset-slate-900 font-bold scale-105 z-10"
                  : ""
              }`}
              title={`Question ${idx + 1}: ${hasAnswer ? "Answered" : "Not answered"}${isMarked ? " (Marked for review)" : ""}${isTimeExpired ? " (Time expired)" : ""}`}
            >
              {idx + 1}
              {isTimeExpired && !hasAnswer && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <div className="w-3.5 h-3.5 rounded bg-emerald-600 shrink-0" />
          <span>Attempted</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <div className="w-3.5 h-3.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shrink-0" />
          <span>Not Attempted</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <div className="w-3.5 h-3.5 rounded bg-purple-600 shrink-0" />
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <div className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0" />
          <span>Attempted &amp; Marked</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <div className="w-3.5 h-3.5 rounded border-2 border-indigo-500 shrink-0" />
          <span>Current Question</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
