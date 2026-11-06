import React from 'react';
import {
  X,
  Award,
  Clock,
  BookOpen,
  BarChart3,
  CheckCircle2,
  BrainCircuit,
  FileSpreadsheet,
} from 'lucide-react';
import { NebSpecificationGrid } from '../../types/syllabus';

interface SpecificationGridModalProps {
  grid: NebSpecificationGrid | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SpecificationGridModal: React.FC<SpecificationGridModalProps> = ({
  grid,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !grid) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Award className="w-4 h-4" />
              <span>Official NEB CDC Specification Grid (विशिष्टीकरण तालिका)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Grade {grid.grade} {grid.subject} – Examination Structure &amp; Marks Distribution
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 text-xs">
          {/* Key Exam Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Theory Exam</span>
              <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                {grid.theoryMarks} Marks
              </p>
              <span className="text-[10px] text-slate-400">Board Written Paper</span>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Practical / Internal</span>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {grid.practicalMarks} Marks
              </p>
              <span className="text-[10px] text-slate-400">Lab Experiments &amp; Viva</span>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-100 dark:border-amber-950/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Exam Duration</span>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
                {grid.examDurationMinutes} Mins
              </p>
              <span className="text-[10px] text-slate-400">3.0 Hours Time Limit</span>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-950/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Curriculum Load</span>
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {grid.creditHours} Credits
              </p>
              <span className="text-[10px] text-slate-400">{grid.teachingHours} Working Hours</span>
            </div>
          </div>

          {/* Question Format Pattern Table */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-500" />
              <span>Board Paper Question Pattern (CDC Model Format)</span>
            </h3>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3">Section</th>
                    <th className="p-3">Question Type</th>
                    <th className="p-3 text-center">Questions</th>
                    <th className="p-3 text-center">Marks Each</th>
                    <th className="p-3 text-right">Total Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">Group A</td>
                    <td className="p-3 font-medium">{grid.questionFormat.groupA.type}</td>
                    <td className="p-3 text-center font-mono">{grid.questionFormat.groupA.count} Qs</td>
                    <td className="p-3 text-center font-mono">1 Mark</td>
                    <td className="p-3 text-right font-bold font-mono">{grid.questionFormat.groupA.totalMarks} Marks</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">Group B</td>
                    <td className="p-3 font-medium">{grid.questionFormat.groupB.type}</td>
                    <td className="p-3 text-center font-mono">{grid.questionFormat.groupB.count} Qs</td>
                    <td className="p-3 text-center font-mono">5 Marks</td>
                    <td className="p-3 text-right font-bold font-mono">{grid.questionFormat.groupB.totalMarks} Marks</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">Group C</td>
                    <td className="p-3 font-medium">{grid.questionFormat.groupC.type}</td>
                    <td className="p-3 text-center font-mono">{grid.questionFormat.groupC.count} Qs</td>
                    <td className="p-3 text-center font-mono">8 Marks</td>
                    <td className="p-3 text-right font-bold font-mono">{grid.questionFormat.groupC.totalMarks} Marks</td>
                  </tr>
                  <tr className="bg-indigo-50/30 dark:bg-indigo-950/20 font-bold">
                    <td colSpan={4} className="p-3 text-slate-900 dark:text-white">
                      Total Theory Examination Marks
                    </td>
                    <td className="p-3 text-right text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                      {grid.theoryMarks} Marks
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cognitive Level Distribution (Bloom's Taxonomy) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" />
              <span>Cognitive Ability Weightage (Bloom&apos;s Taxonomy CDC Standard)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-600 dark:text-slate-400">
                  <span>Knowledge (K)</span>
                  <span className="font-bold text-slate-900 dark:text-white">{grid.bloomTaxonomy.knowledgePercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${grid.bloomTaxonomy.knowledgePercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400">Definitions &amp; Facts</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-600 dark:text-slate-400">
                  <span>Understanding (U)</span>
                  <span className="font-bold text-slate-900 dark:text-white">{grid.bloomTaxonomy.understandingPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${grid.bloomTaxonomy.understandingPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400">Explanations &amp; Concepts</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-600 dark:text-slate-400">
                  <span>Application (A)</span>
                  <span className="font-bold text-slate-900 dark:text-white">{grid.bloomTaxonomy.applicationPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${grid.bloomTaxonomy.applicationPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400">Numericals &amp; Solutions</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-600 dark:text-slate-400">
                  <span>Higher Ability (HA)</span>
                  <span className="font-bold text-slate-900 dark:text-white">{grid.bloomTaxonomy.higherAbilityPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${grid.bloomTaxonomy.higherAbilityPercent}%` }} />
                </div>
                <span className="text-[10px] text-slate-400">Derivations &amp; Synthesis</span>
              </div>
            </div>
          </div>

          {/* Unit-wise Marks Weightage Table */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Unit-wise Board Exam Marks Weightage &amp; Teaching Hours</span>
            </h3>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3">Curriculum Unit</th>
                    <th className="p-3 text-center">Teaching Hours</th>
                    <th className="p-3 text-center">Est. MCQs</th>
                    <th className="p-3 text-right">Board Marks Weightage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {grid.units.map((unit) => (
                    <tr key={unit.unitName} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">
                        {unit.unitName}
                      </td>
                      <td className="p-3 text-center font-mono text-slate-500">
                        {unit.teachingHours} hrs
                      </td>
                      <td className="p-3 text-center font-mono">
                        {unit.mcqMarks !== undefined ? `${unit.mcqMarks} Qs` : '—'}
                      </td>
                      <td className="p-3 text-right font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        {unit.weightageMarks} Marks
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Source: Nepal National Examinations Board (CDC) Curriculum Framework
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificationGridModal;
