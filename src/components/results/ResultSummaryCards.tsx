import React from 'react';
import { CheckCircle2, XCircle, HelpCircle, Target, Award, Clock } from 'lucide-react';
import { QuizResult } from '../../types/results';
import { formatTimeMMSS } from '../../utils/timer';

interface ResultSummaryCardsProps {
  result: QuizResult;
}

export const ResultSummaryCards: React.FC<ResultSummaryCardsProps> = ({ result }) => {
  const isPass = result.accuracy >= 50;
  const isNegativeMarking = !!result.config.negativeMarking;
  const penaltyDeduction = isNegativeMarking
    ? Math.round(result.incorrectAnswers * 0.25 * 100) / 100
    : 0;
  const formattedMarks = Number(
    (Math.round(result.totalMarksObtained * 100) / 100).toFixed(2)
  );

  return (
    <div className="space-y-4">
      {/* Top Banner Scorecard */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Grade {result.config.grade}</span>
            <span>·</span>
            <span>{result.config.subject}</span>
            <span>·</span>
            <span>{new Date(result.completedAt).toLocaleDateString()}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Examination Complete
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isPass
              ? 'Great performance! Your score indicates strong mastery of core concepts.'
              : 'Review your incorrect and unattempted questions below to reinforce weak areas.'}
          </p>
        </div>

        {/* Primary Score Dial */}
        <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Total Score
            </span>
            <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
              {formattedMarks}
              <span className="text-sm font-normal text-slate-400">/{result.totalPossibleMarks}</span>
            </div>
            {isNegativeMarking && (
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block mt-0.5">
                -0.25 Neg. Marking
              </span>
            )}
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Accuracy
            </span>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {result.accuracy}%
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Questions */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Questions</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            {result.totalQuestions}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">Total Exam Set</span>
        </div>

        {/* Attempted */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>Attempted</span>
          </div>
          <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {result.attemptedQuestions}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {Math.round((result.attemptedQuestions / result.totalQuestions) * 100)}% coverage
          </span>
        </div>

        {/* Correct */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Correct</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {result.correctAnswers}
          </div>
          <span className="text-[11px] text-emerald-600/80 block mt-0.5">
            +{result.correctAnswers} marks
          </span>
        </div>

        {/* Incorrect */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs mb-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Incorrect</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">
            {result.incorrectAnswers}
          </div>
          <span className="text-[11px] text-rose-500/80 block mt-0.5">
            {isNegativeMarking && penaltyDeduction > 0
              ? `-${penaltyDeduction} penalty (-0.25/Q)`
              : 'Review solutions'}
          </span>
        </div>

        {/* Unattempted */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Skipped</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-700 dark:text-slate-300">
            {result.unattemptedQuestions}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">No negative deduction</span>
        </div>

        {/* Total Time & Speed */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Taken</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            {formatTimeMMSS(result.timeTakenSeconds)}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Avg {result.averageTimePerQuestionSeconds}s / Q
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultSummaryCards;
