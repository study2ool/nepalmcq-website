import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizSession, QuizConfig } from '../../types/quiz';
import { selectQuestionsForQuiz } from '../../utils/questionSelection';
import { storage } from '../../utils/storage';

interface QuizState {
  session: QuizSession | null;
  hasActiveSession: boolean;
}

const savedSession = storage.getActiveSession();
const initialState: QuizState = {
  session: savedSession && !savedSession.isSubmitted ? savedSession : null,
  hasActiveSession: !!(savedSession && !savedSession.isSubmitted),
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action: PayloadAction<QuizConfig>) => {
      const config = action.payload;
      const questions = selectQuestionsForQuiz(config);
      const quizId = `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const totalSeconds = (config.durationMinutes || config.questionCount) * 60;

      // Initialize question remaining times with 60 seconds each
      const timeRemaining: Record<string, number> = {};
      questions.forEach((q) => {
        timeRemaining[q.id] = 60;
      });

      const newSession: QuizSession = {
        quizId,
        config,
        questions,
        currentQuestionIndex: 0,
        selectedAnswers: {},
        markedForReview: {},
        questionTimeRemaining: timeRemaining,
        overallTimeRemaining: totalSeconds,
        startTime: Date.now(),
        lastActiveTimestamp: Date.now(),
        isSubmitted: false,
      };

      state.session = newSession;
      state.hasActiveSession = true;
      storage.saveActiveSession(newSession);
    },

    resumeExistingSession: (state, action: PayloadAction<QuizSession>) => {
      state.session = action.payload;
      state.hasActiveSession = true;
      storage.saveActiveSession(action.payload);
    },

    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      if (!state.session || state.session.isSubmitted) return;
      const targetIndex = action.payload;
      if (targetIndex >= 0 && targetIndex < state.session.questions.length) {
        state.session.currentQuestionIndex = targetIndex;
        state.session.lastActiveTimestamp = Date.now();
        storage.saveActiveSession(state.session);
      }
    },

    selectAnswer: (
      state,
      action: PayloadAction<{ questionId: string; optionId: 'A' | 'B' | 'C' | 'D' }>
    ) => {
      if (!state.session || state.session.isSubmitted) return;
      const { questionId, optionId } = action.payload;
      state.session.selectedAnswers[questionId] = optionId;
      storage.saveActiveSession(state.session);
    },

    clearAnswer: (state, action: PayloadAction<string>) => {
      if (!state.session || state.session.isSubmitted) return;
      const questionId = action.payload;
      delete state.session.selectedAnswers[questionId];
      storage.saveActiveSession(state.session);
    },

    toggleMarkForReview: (state, action: PayloadAction<string>) => {
      if (!state.session || state.session.isSubmitted) return;
      const questionId = action.payload;
      state.session.markedForReview[questionId] = !state.session.markedForReview[questionId];
      storage.saveActiveSession(state.session);
    },

    /**
     * Decrement timers based on actual elapsed deltaSeconds.
     * Prevents clock drift while strictly decrementing active question's timer.
     */
    updateTimers: (
      state,
      action: PayloadAction<{ deltaSeconds: number; activeQuestionId: string }>
    ) => {
      if (!state.session || state.session.isSubmitted) return;
      const { deltaSeconds, activeQuestionId } = action.payload;

      // 1. Overall examination timer
      state.session.overallTimeRemaining = Math.max(
        0,
        state.session.overallTimeRemaining - deltaSeconds
      );

      // 2. Active question timer
      const currentQuestionTime = state.session.questionTimeRemaining[activeQuestionId] ?? 60;
      const newQuestionTime = Math.max(0, currentQuestionTime - deltaSeconds);
      state.session.questionTimeRemaining[activeQuestionId] = newQuestionTime;

      state.session.lastActiveTimestamp = Date.now();

      // Don't write to localStorage every single second, but keep memory fresh
      // Periodic save happens or on question changes/submits
    },

    autoAdvanceQuestion: (state) => {
      if (!state.session || state.session.isSubmitted) return;
      if (state.session.currentQuestionIndex < state.session.questions.length - 1) {
        state.session.currentQuestionIndex += 1;
        state.session.lastActiveTimestamp = Date.now();
        storage.saveActiveSession(state.session);
      }
    },

    submitQuiz: (state) => {
      if (!state.session) return;
      state.session.isSubmitted = true;
      state.session.submittedAt = Date.now();
      state.hasActiveSession = false;
      storage.clearActiveSession();
    },

    discardCurrentQuiz: (state) => {
      state.session = null;
      state.hasActiveSession = false;
      storage.clearActiveSession();
    },
  },
});

export const {
  startQuiz,
  resumeExistingSession,
  setCurrentQuestionIndex,
  selectAnswer,
  clearAnswer,
  toggleMarkForReview,
  updateTimers,
  autoAdvanceQuestion,
  submitQuiz,
  discardCurrentQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
