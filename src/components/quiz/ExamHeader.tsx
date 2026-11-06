import React from 'react';
import { Clock, LayoutGrid, CheckCircle2, X, BookOpen } from 'lucide-react';
import { QuizSession } from '../../types/quiz';
import { formatTimeHHMMSS, formatTimeMMSS } from '../../utils/timer';

interface ExamHeaderProps {
  session: QuizSession;
  onOpenPalette: () => void;
  onRequestSubmit: () => void;
  onExit?: () => void;
  className?: string;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  session,
  onOpenPalette,
  onRequestSubmit,
  onExit,
  className = "",
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
  const isStudyMode = session.config.mode === 'study';

  return (
    <header className={`shrink-0 z-30 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Metadata info */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white">
              Grade {session.config.grade}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[90px] sm:max-w-none">
              {session.config.subject}
            </span>
            {session.config.negativeMarking && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-mono">
                -0.25 Neg
              </span>
            )}
            <span className="text-slate-400">·</span>
            <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs">
              Q {currentQNum}/{totalQuestions}
            </span>
          </div>

          {/* Center: Mode Indicator & Timers */}
          {isStudyMode ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Study &amp; Learn Mode</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Elapsed: {formatTimeMMSS(Math.max(0, Math.floor((Date.now() - session.startTime) / 1000)))}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-4">
              {/* Question countdown (60s) */}
              <div
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium border transition-colors ${
                  isCriticalQuestionTime
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 animate-pulse'
                    : isLowQuestionTime
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
                title="Time remaining for this specific question"
              >
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden md:inline text-[11px] font-sans text-slate-500 dark:text-slate-400">
                  Question:
                </span>
                <span className="tabular-nums font-semibold">{formatTimeMMSS(questionSeconds)}</span>
              </div>

              {/* Overall examination timer */}
              <div
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium border transition-colors ${
                  isLowOverallTime
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                }`}
                title="Total examination time remaining"
              >
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden md:inline text-[11px] font-sans text-slate-500 dark:text-slate-400">
                  Overall:
                </span>
                <span className="tabular-nums font-bold tracking-tight">
                  {formatTimeHHMMSS(overallSeconds)}
                </span>
              </div>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile palette trigger */}
            <button
              type="button"
              onClick={onOpenPalette}
              className="lg:hidden flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Open Questions Palette"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Palette</span>
            </button>

            {/* Submit button */}
            <button
              type="button"
              onClick={onRequestSubmit}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Submit Exam</span>
              <span className="sm:hidden">Submit</span>
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
    </header>
  );
};

export default ExamHeader;
