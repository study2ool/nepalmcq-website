import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Bookmark, BookmarkCheck, Flag } from 'lucide-react';
import { Question } from '../../types/question';
import MathRenderer from '../common/MathRenderer';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  isMarkedForReview: boolean;
  isBookmarked: boolean;
  onSelectOption: (optionId: 'A' | 'B' | 'C' | 'D') => void;
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
  onSelectOption,
  onClearOption,
  onToggleReview,
  onToggleBookmark,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs flex flex-col justify-between min-h-[520px]">
      {/* Top Question Meta */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>·</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{question.subject}</span>
            <span>·</span>
            <span>{question.topic}</span>
            <span>·</span>
            <span className="font-mono text-slate-500">+{question.marks}.0 Mark</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Difficulty badge */}
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                question.difficulty === 'Easy'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                  : question.difficulty === 'Medium'
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
              }`}
            >
              {question.difficulty}
            </span>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this question'}
              className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
        <div className="py-6 text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
          <MathRenderer content={question.question} />
        </div>

        {/* Options Grid */}
        <div className="space-y-3 pt-2">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 ring-1 ring-indigo-600 dark:ring-indigo-500 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200'
                }`}
              >
                {/* Option Identifier Badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  }`}
                >
                  {option.id}
                </div>

                {/* Option Text with MathRenderer */}
                <div className="text-sm sm:text-base pt-0.5 flex-1">
                  <MathRenderer content={option.text} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Left helpers: Clear & Mark for Review */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleReview}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              isMarkedForReview
                ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isMarkedForReview ? 'fill-current' : ''}`} />
            <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>

          {selectedOption && (
            <button
              type="button"
              onClick={onClearOption}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Choice</span>
            </button>
          )}
        </div>

        {/* Right Nav buttons: Previous & Next */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={onPrev}
            className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              hasPrev
                ? 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                : 'border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={onNext}
            className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              hasNext
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
