import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Info,
} from 'lucide-react';
import { SubjectFormulaSheet } from '../../data/syllabus/formulaSheets';
import MathRenderer from '../common/MathRenderer';

interface FormulaSheetModalProps {
  formulaSheet: SubjectFormulaSheet;
  isOpen: boolean;
  onClose: () => void;
  initialUnit?: string;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({
  formulaSheet,
  isOpen,
  onClose,
  initialUnit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>(initialUnit || 'all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyFormula = (id: string, text: string) => {
    // Strip KaTeX delimiters for plain text copying if needed, or copy raw formula
    const cleanText = text.replace(/\$\$/g, '').replace(/\$/g, '').trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter formulas based on unit tab and search query
  const filteredUnits = useMemo(() => {
    return formulaSheet.units
      .map((unit) => {
        if (selectedUnit !== 'all' && unit.unitName !== selectedUnit) {
          return null;
        }

        const matchingFormulas = unit.formulas.filter((f) => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          return (
            f.name.toLowerCase().includes(q) ||
            (f.description && f.description.toLowerCase().includes(q)) ||
            (f.keyApplication && f.keyApplication.toLowerCase().includes(q)) ||
            (unit.chapterNames && unit.chapterNames.some((c) => c.toLowerCase().includes(q)))
          );
        });

        if (matchingFormulas.length === 0) return null;

        return {
          ...unit,
          formulas: matchingFormulas,
        };
      })
      .filter((u): u is typeof formulaSheet.units[number] => u !== null);
  }, [formulaSheet, selectedUnit, searchQuery]);

  const totalFormulaCount = useMemo(() => {
    return formulaSheet.units.reduce((acc, u) => acc + u.formulas.length, 0);
  }, [formulaSheet]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="formula-sheet-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Grade {formulaSheet.grade} {formulaSheet.subject}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {totalFormulaCount} High-Yield Formulas
                </span>
              </div>
              <h2
                id="formula-sheet-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate mt-0.5"
              >
                {formulaSheet.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close formula sheet modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in formulas, equations, concepts (e.g. projectile, ratio, integral, nernst)...`}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Unit Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedUnit('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedUnit === 'all'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Units ({totalFormulaCount})
            </button>
            {formulaSheet.units.map((unit) => (
              <button
                key={unit.unitName}
                type="button"
                onClick={() => setSelectedUnit(unit.unitName)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedUnit === unit.unitName
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {unit.unitName} ({unit.formulas.length})
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredUnits.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">No formulas matched your search</p>
              <p className="text-xs text-slate-500 mt-1">Try searching another keyword or clear the filter.</p>
            </div>
          ) : (
            filteredUnits.map((unit) => (
              <div key={unit.unitName} className="space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200 dark:border-slate-800">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {unit.unitName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {unit.formulas.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700/70 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {item.name}
                          </h4>
                          {item.description && (
                            <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                              <MathRenderer content={item.description} />
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyFormula(item.id, item.formula)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors shrink-0"
                          title="Copy formula text"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Display Formula Box */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800 text-center overflow-x-auto text-sm sm:text-base font-mono">
                        <MathRenderer content={item.formula} />
                      </div>

                      {/* Application Note */}
                      {item.keyApplication && (
                        <div className="flex items-start gap-2 text-xs bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 p-2.5 rounded-xl text-indigo-900 dark:text-indigo-200">
                          <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-indigo-950 dark:text-indigo-300">
                              NEB Application:
                            </span>{' '}
                            <span>{item.keyApplication}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500">
          <span>Official NEB Syllabus Curriculum Verified</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Close Cheatsheet
          </button>
        </div>
      </div>
    </div>
  );
};
