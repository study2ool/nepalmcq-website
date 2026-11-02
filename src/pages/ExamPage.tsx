import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import {
  setCurrentQuestionIndex,
  selectAnswer,
  clearAnswer,
  toggleMarkForReview,
  updateTimers,
  autoAdvanceQuestion,
  submitQuiz,
} from '../store/api/quizApi';
import { toggleBookmarkThunk } from '../store/api/questionBankApi';
import { setLatestResult } from '../store/api/resultsApi';
import { openAuthModal } from '../store/api/authApi';
import { calculateQuizResult } from '../utils/scoring';
import { useSubmitAttemptMutation } from '../store/api/apiSlice';
import ExamHeader from '../components/quiz/ExamHeader';
import QuestionCard from '../components/quiz/QuestionCard';
import QuestionPalette from '../components/quiz/QuestionPalette';
import SubmitModal from '../components/quiz/SubmitModal';
import TimeWarningModal from '../components/quiz/TimeWarningModal';
import { X } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const ExamPage: React.FC = () => {
  useSEO({
    title: 'Active Computer-Based Examination Session',
    description: 'Timed NEB simulation test with independent question countdown, anti-drift exam clock, and question palette.',
    canonicalPath: '/exam',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.quiz.session);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const bookmarks = useAppSelector((state) => state.questionBank.bookmarks);
  const [submitAttemptMutation] = useSubmitAttemptMutation();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaletteDrawerOpen, setIsPaletteDrawerOpen] = useState(false);
  const [hasShown5MinWarning, setHasShown5MinWarning] = useState(false);
  const [is5MinWarningOpen, setIs5MinWarningOpen] = useState(false);

  const lastTickTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // If student is not logged in, block exam access and open auth modal
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      navigate('/practice', { replace: true });
      return;
    }

    if (!session || session.isSubmitted) {
      navigate('/practice', { replace: true });
    }
  }, [isAuthenticated, session, navigate, dispatch]);

  // Window beforeunload confirmation while active exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (session && !session.isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [session]);

  const activeQuestion = session?.questions[session?.currentQuestionIndex ?? 0];

  // Final submission handler
  const handleFinalSubmit = useCallback(() => {
    if (!session) return;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const calculatedResult = calculateQuizResult(session);
    dispatch(setLatestResult(calculatedResult));
    dispatch(submitQuiz());

    // Asynchronously sync attempt to backend database and update user stats & leaderboard via RTK Query
    submitAttemptMutation(calculatedResult).unwrap().catch((err) => {
      console.warn('Syncing attempt to backend failed:', err);
    });

    navigate(`/result/${session.quizId}`, { replace: true });
  }, [session, dispatch, navigate, submitAttemptMutation]);

  // Unified anti-drift Timer loop
  useEffect(() => {
    if (!session || session.isSubmitted) return;

    lastTickTimeRef.current = Date.now();

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.max(0, Math.floor((now - lastTickTimeRef.current) / 1000));

      if (elapsedSeconds >= 1 && activeQuestion) {
        lastTickTimeRef.current = now;

        // Check if overall timer expired
        if (session.overallTimeRemaining - elapsedSeconds <= 0) {
          handleFinalSubmit();
          return;
        }

        // Check 5-minute warning trigger
        if (
          !hasShown5MinWarning &&
          session.overallTimeRemaining <= 300 &&
          session.overallTimeRemaining > 0
        ) {
          setHasShown5MinWarning(true);
          setIs5MinWarningOpen(true);
        }

        // Active question remaining check
        const currentQRemaining = session.questionTimeRemaining[activeQuestion.id] ?? 60;
        if (currentQRemaining - elapsedSeconds <= 0) {
          // Question timer expired! Auto advance to next question
          dispatch(
            updateTimers({
              deltaSeconds: elapsedSeconds,
              activeQuestionId: activeQuestion.id,
            })
          );
          dispatch(autoAdvanceQuestion());
        } else {
          // Normal countdown update
          dispatch(
            updateTimers({
              deltaSeconds: elapsedSeconds,
              activeQuestionId: activeQuestion.id,
            })
          );
        }
      }
    }, 500);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [
    session,
    activeQuestion,
    hasShown5MinWarning,
    handleFinalSubmit,
    dispatch,
  ]);

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if an input/textarea is focused or if modal is open
      if (
        isSubmitModalOpen ||
        is5MinWarningOpen ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        if (e.key === 'Escape') {
          setIsSubmitModalOpen(false);
          setIs5MinWarningOpen(false);
          setIsPaletteDrawerOpen(false);
        }
        return;
      }

      if (!session || !activeQuestion) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (session.currentQuestionIndex < session.questions.length - 1) {
          dispatch(setCurrentQuestionIndex(session.currentQuestionIndex + 1));
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (session.currentQuestionIndex > 0) {
          dispatch(setCurrentQuestionIndex(session.currentQuestionIndex - 1));
        }
      } else if (['a', 'A'].includes(e.key)) {
        dispatch(selectAnswer({ questionId: activeQuestion.id, optionId: 'A' }));
      } else if (['b', 'B'].includes(e.key)) {
        dispatch(selectAnswer({ questionId: activeQuestion.id, optionId: 'B' }));
      } else if (['c', 'C'].includes(e.key)) {
        dispatch(selectAnswer({ questionId: activeQuestion.id, optionId: 'C' }));
      } else if (['d', 'D'].includes(e.key)) {
        dispatch(selectAnswer({ questionId: activeQuestion.id, optionId: 'D' }));
      } else if (['r', 'R'].includes(e.key)) {
        dispatch(toggleMarkForReview(activeQuestion.id));
      } else if (e.key === 'Escape') {
        setIsPaletteDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, activeQuestion, isSubmitModalOpen, is5MinWarningOpen, dispatch]);

  if (!session || !activeQuestion) {
    return null;
  }

  const currentIndex = session.currentQuestionIndex;
  const totalQuestions = session.questions.length;
  const selectedOption = session.selectedAnswers[activeQuestion.id];
  const isMarked = !!session.markedForReview[activeQuestion.id];
  const isBookmarked = bookmarks.includes(activeQuestion.id);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 pb-12">
      {/* Sticky Dual-Timer Header */}
      <ExamHeader
        session={session}
        onOpenPalette={() => setIsPaletteDrawerOpen(true)}
        onRequestSubmit={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Examination Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Panel on Left */}
          <div className="lg:col-span-8">
            <QuestionCard
              question={activeQuestion}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              selectedOption={selectedOption}
              isMarkedForReview={isMarked}
              isBookmarked={isBookmarked}
              onSelectOption={(optionId) =>
                dispatch(selectAnswer({ questionId: activeQuestion.id, optionId }))
              }
              onClearOption={() => dispatch(clearAnswer(activeQuestion.id))}
              onToggleReview={() => dispatch(toggleMarkForReview(activeQuestion.id))}
              onToggleBookmark={() => dispatch(toggleBookmarkThunk(activeQuestion.id))}
              onNext={() => dispatch(setCurrentQuestionIndex(currentIndex + 1))}
              onPrev={() => dispatch(setCurrentQuestionIndex(currentIndex - 1))}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < totalQuestions - 1}
            />

            {/* Keyboard shortcuts helper bar */}
            <div className="mt-3 hidden sm:flex items-center justify-between text-[11px] text-slate-400 px-2 font-mono">
              <div className="flex items-center gap-3">
                <span>[A/B/C/D] Select Option</span>
                <span>·</span>
                <span>[← / →] Prev/Next</span>
                <span>·</span>
                <span>[R] Mark Review</span>
              </div>
              <span>Anti-drift precision active</span>
            </div>
          </div>

          {/* Desktop Question Navigation Sidebar on Right */}
          <div className="hidden lg:block lg:col-span-4 sticky top-36">
            <QuestionPalette
              session={session}
              onSelectQuestion={(idx) => dispatch(setCurrentQuestionIndex(idx))}
            />
          </div>
        </div>
      </div>

      {/* Mobile Question Palette Drawer */}
      {isPaletteDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  Questions Navigator
                </span>
                <button
                  type="button"
                  onClick={() => setIsPaletteDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <QuestionPalette
                session={session}
                onSelectQuestion={(idx) => {
                  dispatch(setCurrentQuestionIndex(idx));
                  setIsPaletteDrawerOpen(false);
                }}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsPaletteDrawerOpen(false);
                  setIsSubmitModalOpen(true);
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Submit Examination Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <SubmitModal
        session={session}
        isOpen={isSubmitModalOpen}
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleFinalSubmit}
      />

      <TimeWarningModal
        isOpen={is5MinWarningOpen}
        onDismiss={() => setIs5MinWarningOpen(false)}
        remainingMinutes={5}
      />
    </div>
  );
};

export default ExamPage;
