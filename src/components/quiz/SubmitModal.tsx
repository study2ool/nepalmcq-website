import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, Flag } from 'lucide-react';
import { QuizSession } from '../../types/quiz';

interface SubmitModalProps {
  session: QuizSession;
  isOpen: boolean;
  onCancel: () => void;
  onConfirmSubmit: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  session,
  isOpen,
  onCancel,
  onConfirmSubmit,
}) => {
  if (!isOpen) return null;

  const total = session.questions.length;
  const attempted = Object.keys(session.selectedAnswers).length;
  const unattempted = total - attempted;
  const reviewCount = Object.values(session.markedForReview).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Submit Examination?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Are you sure you want to finish? You cannot modify answers after submission.
            </p>
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-3 gap-2.5 py-2">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-center">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block font-medium">
              Attempted
            </span>
            <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">
              {attempted}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
            <HelpCircle className="w-4 h-4 text-slate-500 mx-auto mb-1" />
            <span className="text-[11px] text-slate-600 dark:text-slate-400 block font-medium">
              Unattempted
            </span>
            <span className="text-lg font-bold font-mono text-slate-700 dark:text-slate-300">
              {unattempted}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-center">
            <Flag className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <span className="text-[11px] text-purple-700 dark:text-purple-400 block font-medium">
              Marked
            </span>
            <span className="text-lg font-bold font-mono text-purple-700 dark:text-purple-300">
              {reviewCount}
            </span>
          </div>
        </div>

        {unattempted > 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/40">
            Note: You still have {unattempted} unanswered question{unattempted > 1 ? 's' : ''}. Unanswered questions will receive 0 marks.
          </p>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Continue Examination
          </button>
          <button
            type="button"
            onClick={onConfirmSubmit}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
          >
            Submit Final Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
