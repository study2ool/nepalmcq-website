import React from 'react';
import { Clock, LayoutGrid, CheckCircle2, X } from 'lucide-react';
import { QuizSession } from '../../types/quiz';
import { formatTimeHHMMSS, formatTimeMMSS } from '../../utils/timer';

interface ExamHeaderProps {
  session: QuizSession;
  onOpenPalette: () => void;
  onRequestSubmit: () => void;
  onExit?: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  session,
  onOpenPalette,
  onRequestSubmit,
  onExit,
}) => {
  const currentQ = session.questions[session.currentQuestionIndex];
  const totalQuestions = session.questions.length;
  const currentQNum = session.currentQuestionIndex + 1;

  // Individual question time remaining
  const questionSeconds = session.questionTimeRemaining[currentQ?.id] ?? 60;
  // Overall exam time remaining
  const overallSeconds = session.overallTimeRemaining;

  // Progress
  const attemptedCount = Object.keys(session.selectedAnswers).length;
  const progressPercent = Math.round((attemptedCount / totalQuestions) * 100);

  const isLowQuestionTime = questionSeconds <= 10;
  const isCriticalQuestionTime = questionSeconds <= 5;
  const isLowOverallTime = overallSeconds <= 300; // <= 5 mins

  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Metadata info */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white">
              Grade {session.config.grade}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[120px] sm:max-w-none">
              {session.config.subject}
            </span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="hidden sm:inline font-mono text-slate-500 dark:text-slate-400">
              Q {currentQNum} / {totalQuestions}
            </span>
          </div>

          {/* Center: Dual Timers */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Question countdown (60s) */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-colors ${
                isCriticalQuestionTime
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 animate-pulse'
                  : isLowQuestionTime
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              title="Time remaining for this specific question"
            >
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline text-[11px] font-sans text-slate-500 dark:text-slate-400">
                Question:
              </span>
              <span className="tabular-nums font-semibold">{formatTimeMMSS(questionSeconds)}</span>
            </div>

            {/* Overall examination timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium border transition-colors ${
                isLowOverallTime
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
              }`}
              title="Total examination time remaining"
            >
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline text-[11px] font-sans text-slate-500 dark:text-slate-400">
                Overall:
              </span>
              <span className="tabular-nums font-bold tracking-tight">
                {formatTimeHHMMSS(overallSeconds)}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile palette trigger */}
            <button
              type="button"
              onClick={onOpenPalette}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Palette</span>
            </button>

            {/* Submit button */}
            <button
              type="button"
              onClick={onRequestSubmit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>

            {/* Exit / Close button for Dialog */}
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                title="Exit Examination"
                aria-label="Exit Examination"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar line */}
        <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
