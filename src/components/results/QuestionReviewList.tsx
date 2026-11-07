import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Clock } from "lucide-react";
import { QuestionResult } from "../../types/results";
import MathRenderer from "../common/MathRenderer";
import QuestionReactionButtons from "../common/QuestionReactionButtons";

interface QuestionReviewListProps {
  results: QuestionResult[];
}

export const QuestionReviewList: React.FC<QuestionReviewListProps> = ({
  results,
}) => {
  const [filter, setFilter] = useState<
    "all" | "correct" | "incorrect" | "unattempted"
  >("all");

  const filtered = results.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const counts = {
    all: results.length,
    correct: results.filter((r) => r.status === "correct").length,
    incorrect: results.filter((r) => r.status === "incorrect").length,
    unattempted: results.filter((r) => r.status === "unattempted").length,
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Question-by-Question Detailed Review
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Check the step-by-step scientific explanations for every question
          </p>
        </div>

        {/* Filter Segmented Control (§1.A functional filter tabs) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
          {(["all", "correct", "incorrect", "unattempted"] as const).map(
            (tabKey) => {
              const isActive = filter === tabKey;
              const labelMap = {
                all: `All (${counts.all})`,
                correct: `Correct (${counts.correct})`,
                incorrect: `Incorrect (${counts.incorrect})`,
                unattempted: `Skipped (${counts.unattempted})`,
              };

              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setFilter(tabKey)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {labelMap[tabKey]}
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Questions List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          No questions in this filter category.
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((item, index) => {
            const { question, selectedAnswer, status, timeSpentSeconds } = item;
            const isCorrect = status === "correct";
            const isIncorrect = status === "incorrect";
            const isUnattempted = status === "unattempted";

            return (
              <div
                key={question.id}
                className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      Q{results.indexOf(item) + 1}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {question.subject}
                    </span>
                    <span>·</span>
                    <span>{question.topic}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Clock className="w-3 h-3" />
                      {timeSpentSeconds}s spent
                    </span>
                  </div>

                  {/* Status indicator & Reactions */}
                  <div className="flex items-center gap-2">
                    <QuestionReactionButtons
                      questionId={question.id}
                      size="xs"
                    />

                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct (+1.0)
                      </span>
                    )}
                    {isIncorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-2.5 py-1 rounded-md">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect (0.0)
                      </span>
                    )}
                    {isUnattempted && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Not Attempted
                      </span>
                    )}
                  </div>
                </div>

                {/* Question statement with KaTeX */}
                <div className="text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
                  <MathRenderer content={question.question} />
                </div>

                {/* Options display with correct vs student choice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {question.options.map((opt) => {
                    const isOptionCorrect = opt.id === question.correctAnswer;
                    const isStudentChoice = opt.id === selectedAnswer;

                    let optBg =
                      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";
                    let badgeBg =
                      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";

                    if (isOptionCorrect) {
                      optBg =
                        "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500";
                      badgeBg = "bg-emerald-600 text-white font-bold";
                    } else if (isStudentChoice && !isOptionCorrect) {
                      optBg =
                        "bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500";
                      badgeBg = "bg-rose-600 text-white font-bold";
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${optBg}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${badgeBg}`}
                        >
                          {opt.id}
                        </div>
                        <div className="pt-0.5 flex-1">
                          <MathRenderer content={opt.text} />
                          {isStudentChoice && (
                            <span className="block text-[11px] font-semibold mt-1 opacity-80">
                              {isOptionCorrect
                                ? "✓ Your Answer (Correct)"
                                : "✗ Your Answer (Incorrect)"}
                            </span>
                          )}
                          {!isStudentChoice && isOptionCorrect && (
                            <span className="block text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                              ✓ Correct Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation block */}
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1">
                  <div className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <span>Explanation &amp; Scientific Derivation</span>
                  </div>
                  <div className="leading-relaxed">
                    <MathRenderer content={question.explanation} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionReviewList;
