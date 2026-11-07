import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Award,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { SubjectSubjectiveBank } from "../../data/syllabus/subjectiveQuestions";
import MathRenderer from "../common/MathRenderer";

interface SubjectiveBankModalProps {
  bank: SubjectSubjectiveBank;
  isOpen: boolean;
  onClose: () => void;
  initialChapter?: string;
}

export const SubjectiveBankModal: React.FC<SubjectiveBankModalProps> = ({
  bank,
  isOpen,
  onClose,
  initialChapter,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<"all" | "B" | "C">("all");
  const [expandedSolutions, setExpandedSolutions] = useState<
    Record<string, boolean>
  >({});

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredQuestions = useMemo(() => {
    return bank.questions.filter((q) => {
      if (groupFilter !== "all" && q.group !== groupFilter) {
        return false;
      }

      if (initialChapter && !searchQuery) {
        const matchesInitial =
          q.chapterName.toLowerCase().includes(initialChapter.toLowerCase()) ||
          initialChapter.toLowerCase().includes(q.chapterName.toLowerCase());
        if (!matchesInitial && groupFilter === "all") {
          // If filtering initially by chapter, let search override
        }
      }

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(query) ||
        q.chapterName.toLowerCase().includes(query) ||
        q.unitName.toLowerCase().includes(query) ||
        (q.subparts &&
          q.subparts.some((s) => s.toLowerCase().includes(query))) ||
        (q.examSource && q.examSource.toLowerCase().includes(query))
      );
    });
  }, [bank, groupFilter, searchQuery, initialChapter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subjective-bank-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Grade {bank.grade} {bank.subject}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Group B (5M) &amp; Group C (8M) Questions
                </span>
              </div>
              <h2
                id="subjective-bank-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate mt-0.5"
              >
                Subjective Model Papers &amp; Derivations Archive
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search derivations, theorems, topics (e.g. projectile, lens, carnot)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setGroupFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                groupFilter === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Groups ({bank.questions.length})
            </button>
            <button
              type="button"
              onClick={() => setGroupFilter("B")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                groupFilter === "B"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Group B (5 Marks)
            </button>
            <button
              type="button"
              onClick={() => setGroupFilter("C")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                groupFilter === "C"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Group C (8 Marks)
            </button>
          </div>
        </div>

        {/* Content Questions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {filteredQuestions.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">
                No questions matched your search filter
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching another term or switch question group.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isExpanded = Boolean(expandedSolutions[q.id]);
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-600 transition-all space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                          q.group === "C"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        }`}
                      >
                        Group {q.group} · {q.marks} Marks
                      </span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {q.unitName} · {q.chapterName}
                      </span>
                    </div>

                    {q.examSource && (
                      <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                        {q.examSource}
                      </span>
                    )}
                  </div>

                  {/* Main Question Statement */}
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                    <MathRenderer content={q.question} />
                  </div>

                  {/* Subparts list if available */}
                  {q.subparts && q.subparts.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      {q.subparts.map((sub, sIdx) => (
                        <div key={sIdx} className="leading-relaxed">
                          <MathRenderer content={sub} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Marking Scheme Preview */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        NEB Board Official Marking Rubric ({q.marks}M Total):
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.markingScheme.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40 text-slate-700 dark:text-slate-300"
                        >
                          <span className="truncate pr-2">
                            {step.component}
                          </span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                            +{step.marks}M
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Model Solution Outline */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toggleSolution(q.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>
                          {isExpanded
                            ? "Hide Model Solution Outline & Derivations"
                            : "View Step-by-Step Model Solution & Derivation Outline"}
                        </span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-2.5 animate-fadeIn">
                        {q.modelSolutionOutline.map((step, stepIdx) => (
                          <div
                            key={stepIdx}
                            className="flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                              {stepIdx + 1}
                            </span>
                            <div className="flex-1">
                              <MathRenderer content={step} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500">
          <span>
            Curriculum Development Centre (CDC) &amp; NEB Specification Grid
            Standard
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Close Archive
          </button>
        </div>
      </div>
    </div>
  );
};
