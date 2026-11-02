import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Target,
  ArrowRight,
  LayoutDashboard,
  Award,
  AlertCircle,
  Trophy,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { loadResultById } from '../store/api/resultsApi';
import { openAuthModal } from '../store/api/authApi';
import { startQuiz } from '../store/api/quizApi';
import { loadConfig } from '../store/api/quizConfigApi';
import ResultSummaryCards from '../components/results/ResultSummaryCards';
import PerformanceCharts from '../components/results/PerformanceCharts';
import QuestionReviewList from '../components/results/QuestionReviewList';
import { QuizConfig } from '../types/quiz';
import { useSEO } from '../hooks/useSEO';

export const ResultPage: React.FC = () => {
  useSEO({
    title: 'Examination Results & Performance Review',
    description: 'Comprehensive performance scorecard, accuracy metrics, topic breakdown, and question-by-question derivations.',
    canonicalPath: '/result',
  });

  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentResult = useAppSelector((state) => state.results.currentResult);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [activeTab, setActiveTab] = useState<'overview' | 'review'>('overview');

  useEffect(() => {
    if (resultId) {
      dispatch(loadResultById(resultId));
    }
  }, [resultId, dispatch]);

  // Trigger celebration confetti for strong performance
  useEffect(() => {
    if (currentResult && currentResult.accuracy >= 70) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe failover
      }
    }
  }, [currentResult]);

  if (!currentResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Result Record Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          The requested examination result could not be located in your history.
        </p>
        <div className="pt-2">
          <Link
            to="/practice"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <span>Start a New Examination</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Action: Retake Quiz with exact same config
  const handleRetake = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }
    dispatch(loadConfig(currentResult.config));
    dispatch(startQuiz(currentResult.config));
    navigate('/exam/active');
  };

  // Action: Practice Incorrect Questions
  const handlePracticeIncorrect = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }
    const incorrectQs = currentResult.questionResults
      .filter((qr) => qr.status === 'incorrect')
      .map((qr) => qr.question);

    if (incorrectQs.length === 0) {
      alert('You have no incorrect questions from this examination!');
      return;
    }

    const customConfig: QuizConfig = {
      ...currentResult.config,
      questionCount: incorrectQs.length,
      durationMinutes: incorrectQs.length,
      questionMode: 'random',
    };

    dispatch(loadConfig(customConfig));
    dispatch(startQuiz(customConfig));
    navigate('/exam/active');
  };

  // Action: Practice Unattempted Questions
  const handlePracticeUnattempted = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }
    const unattemptedQs = currentResult.questionResults
      .filter((qr) => qr.status === 'unattempted')
      .map((qr) => qr.question);

    if (unattemptedQs.length === 0) {
      alert('You answered all questions in this examination!');
      return;
    }

    const customConfig: QuizConfig = {
      ...currentResult.config,
      questionCount: unattemptedQs.length,
      durationMinutes: unattemptedQs.length,
      questionMode: 'random',
    };

    dispatch(loadConfig(customConfig));
    dispatch(startQuiz(customConfig));
    navigate('/exam/active');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Performance Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'review'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Review All Solutions ({currentResult.totalQuestions})
          </button>
        </div>

        {/* Quick Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {currentResult.incorrectAnswers > 0 && (
            <button
              type="button"
              onClick={handlePracticeIncorrect}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Practice Incorrect ({currentResult.incorrectAnswers})</span>
            </button>
          )}

          {currentResult.unattemptedQuestions > 0 && (
            <button
              type="button"
              onClick={handlePracticeUnattempted}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <span>Practice Unattempted ({currentResult.unattemptedQuestions})</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleRetake}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>

          <Link
            to="/leaderboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-xs"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Leaderboard</span>
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'overview' ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Metric cards */}
          <ResultSummaryCards result={currentResult} />

          {/* Visual Charts */}
          <PerformanceCharts result={currentResult} />

          {/* Bottom Callout to Review Solutions */}
          <div className="p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Ready to review question solutions?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect step-by-step mathematical explanations, options comparisons, and formulas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('review')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shrink-0 cursor-pointer"
            >
              <span>Review All Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-200">
          <QuestionReviewList results={currentResult.questionResults} />
        </div>
      )}
    </div>
  );
};

export default ResultPage;
