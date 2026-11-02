import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  History as HistoryIcon,
  RotateCcw,
  Trash2,
  ArrowRight,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { clearHistory, fetchResultsHistory } from '../store/api/resultsApi';
import { openAuthModal } from '../store/api/authApi';
import { startQuiz } from '../store/api/quizApi';
import { loadConfig } from '../store/api/quizConfigApi';
import { formatTimeMMSS } from '../utils/timer';
import { QuizConfig } from '../types/quiz';
import { useSEO } from '../hooks/useSEO';

export const History: React.FC = () => {
  useSEO({
    title: 'Past Examination Attempts & Performance Records',
    description: 'Review your completed computer-based tests, scores, time taken, and retake past test papers for NEB Grade 11 & 12.',
    canonicalPath: '/history',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.results.history);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchResultsHistory());
    }
  }, [dispatch, isAuthenticated]);

  const handleRetakeExam = (config: QuizConfig) => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }
    dispatch(loadConfig(config));
    dispatch(startQuiz(config));
    navigate('/exam/active');
  };

  const handleConfirmClear = () => {
    dispatch(clearHistory());
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Clear Examination History?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will permanently delete all your saved test attempts and score records from this browser. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="flex-1 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Delete Records
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Student Records</span>
            <span>·</span>
            <span>Saved Attempts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Examination History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            All your completed computer-based tests, scores, and performance breakdowns.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-200 dark:border-rose-900/40 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Examination History Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't completed any examinations yet. Start your first timed practice test to track your performance.
          </p>
          <div className="pt-2">
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
            >
              <span>Start First Practice Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Date &amp; Time</th>
                    <th className="py-3.5 px-4">Level &amp; Subject</th>
                    <th className="py-3.5 px-4">Topic Scope</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Accuracy</th>
                    <th className="py-3.5 px-4">Duration</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {history.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6 text-slate-500 font-mono">
                        {new Date(record.completedAt).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">
                          Grade {record.config.grade}
                        </span>
                        <span className="text-slate-500 text-[11px] block">{record.config.subject}</span>
                      </td>

                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300 max-w-[140px] truncate">
                        {record.config.topic}
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {record.totalMarksObtained} / {record.totalPossibleMarks}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          ({record.correctAnswers} correct)
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {record.accuracy}%
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-500">
                        {formatTimeMMSS(record.timeTakenSeconds)}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/result/${record.id}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                          >
                            Review
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleRetakeExam(record.config)}
                            title="Retake this examination configuration"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
