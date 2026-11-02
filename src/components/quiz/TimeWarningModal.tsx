import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimeWarningModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  remainingMinutes: number;
}

export const TimeWarningModal: React.FC<TimeWarningModalProps> = ({
  isOpen,
  onDismiss,
  remainingMinutes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-300 dark:border-amber-800 max-w-sm w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Time Warning
            </h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              Only {remainingMinutes} minutes remaining!
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          The overall examination timer is nearing completion. Please review your answered questions and ensure your responses are marked before the system auto-submits.
        </p>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onDismiss}
            className="w-full px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs"
          >
            I Understand, Continue Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeWarningModal;
