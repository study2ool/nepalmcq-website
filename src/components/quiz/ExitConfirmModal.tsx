import React from "react";
import { AlertTriangle, LogOut, CheckCircle2 } from "lucide-react";
import { QuizSession } from "../../types/quiz";

interface ExitConfirmModalProps {
  session: QuizSession;
  isOpen: boolean;
  onCancel: () => void;
  onConfirmExit: () => void;
  onSubmitInstead: () => void;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  session,
  isOpen,
  onCancel,
  onConfirmExit,
  onSubmitInstead,
}) => {
  if (!isOpen) return null;

  const total = session.questions.length;
  const attempted = Object.keys(session.selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Exit Active Examination?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your test is currently in progress ({attempted}/{total} attempted).
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 leading-relaxed">
          If you discard, your answers and test progress will not be saved. You can submit your answers now to record your score, or continue testing.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors order-2 sm:order-1"
          >
            Continue Exam
          </button>
          <button
            type="button"
            onClick={onSubmitInstead}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg transition-colors flex items-center justify-center gap-1.5 order-1 sm:order-2"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit Now</span>
          </button>
          <button
            type="button"
            onClick={onConfirmExit}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 order-3 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Discard &amp; Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmModal;

