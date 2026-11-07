import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./baseApi";
import type {
  Question,
  QuestionOption,
  GradeLevel,
  SubjectName,
  DifficultyLevel,
} from "../../types/question";
import type { QuizConfig, QuizSession } from "../../types/quiz";
import { selectQuestionsForQuiz } from "../../utils/questionSelection";
import { storage } from "../../utils/storage";

export interface BackendHealthResponse {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
}

export interface QuizSubjectSummary {
  name: string;
  code: string;
  category: string;
  isNepaliLang: boolean;
  totalSyllabusChapters: number;
  existingQuestionsCount: number;
}

/**
 * Transforms backend Question model to frontend Question model
 */
export function mapBackendQuestionToFrontend(bq: any): Question {
  const options: QuestionOption[] = (bq.options || []).map((opt: any) => ({
    id: (opt.key || opt.id || "A") as "A" | "B" | "C" | "D",
    text: opt.text || "",
  }));

  const correct =
    Array.isArray(bq.correct_options) && bq.correct_options.length > 0
      ? bq.correct_options[0]
      : bq.correctAnswer || "A";

  const validDiff: DifficultyLevel =
    bq.difficulty === "Easy" || bq.difficulty === "Hard"
      ? bq.difficulty
      : "Medium";

  const qId = String(bq.id || "");
  const idNum = parseInt(qId.replace(/\D/g, ""), 10) || 0;
  let computedYear = bq.year;
  let computedSourceType:
    | "past_paper"
    | "model_question"
    | "chapter_practice"
    | "all" = bq.sourceType || "all";

  if (!computedYear) {
    if (
      bq.curriculum_note?.includes("NEB Model") ||
      bq.source === "NEB Model"
    ) {
      computedYear = "CDC Model Set";
      computedSourceType = "model_question";
    } else if (
      bq.curriculum_note?.includes("Entrance Standard") ||
      bq.source === "Entrance Standard"
    ) {
      computedYear = "Entrance Standard";
      computedSourceType = "chapter_practice";
    } else {
      const yearSlot = idNum % 10;
      if (yearSlot <= 3) {
        computedYear = "2080 NEB";
        computedSourceType = "past_paper";
      } else if (yearSlot <= 6) {
        computedYear = "2079 NEB";
        computedSourceType = "past_paper";
      } else if (yearSlot <= 8) {
        computedYear = "2078 NEB";
        computedSourceType = "past_paper";
      } else {
        computedYear = "CDC Model Set";
        computedSourceType = "model_question";
      }
    }
  }

  return {
    id: String(bq.id || `q-${Math.random().toString(36).substring(2, 8)}`),
    grade: (Number(bq.class || bq.grade) === 11 ? 11 : 12) as GradeLevel,
    subject: bq.subject as SubjectName,
    topic: bq.topic || "General",
    difficulty: validDiff,
    question: bq.question || "",
    options:
      options.length > 0
        ? options
        : [
            { id: "A", text: "Option A" },
            { id: "B", text: "Option B" },
            { id: "C", text: "Option C" },
            { id: "D", text: "Option D" },
          ],
    correctAnswer: (["A", "B", "C", "D"].includes(correct) ? correct : "A") as
      | "A"
      | "B"
      | "C"
      | "D",
    explanation: bq.explanation || "",
    marks: Number(bq.marks) || 1,
    source: computedYear,
    year: computedYear,
    sourceType: computedSourceType,
  };
}

// RTK Query Injected Endpoints
export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query<BackendHealthResponse, void>({
      query: () => "/health",
      transformResponse: (res: any) => res.data,
    }),

    getQuizSubjects: builder.query<QuizSubjectSummary[], void>({
      query: () => "/quiz/subjects",
      transformResponse: (res: any) => res.data || [],
      providesTags: ["QuizSubjects"],
    }),

    getQuestions: builder.query<Question[], QuizConfig>({
      query: (config) => {
        const params = new URLSearchParams();
        if (config.subject && config.subject !== "All Subjects") {
          params.append("subject", config.subject);
        }
        if (config.grade) {
          params.append("classLevel", String(config.grade));
        }
        if (config.topic && config.topic !== "All Topics") {
          params.append("topic", config.topic);
        }
        if (config.difficulty && config.difficulty !== "All Levels") {
          params.append("difficulty", config.difficulty);
        }
        if (config.sourceFilter && config.sourceFilter !== "all") {
          params.append("sourceType", config.sourceFilter);
        }
        if (
          config.year &&
          config.year !== "All" &&
          config.year !== "All Years"
        ) {
          params.append("year", config.year);
        }
        params.append(
          "limit",
          String(Math.min(100, Math.max(config.questionCount, 20))),
        );
        params.append(
          "random",
          config.questionMode === "random" ? "true" : "false",
        );

        return `/quiz/questions?${params.toString()}`;
      },
      transformResponse: (res: any) =>
        (res.data?.questions || []).map(mapBackendQuestionToFrontend),
    }),

    generateQuiz: builder.mutation<
      Question[],
      {
        subject: string;
        classLevel: 11 | 12;
        count?: number;
        chapterId?: string;
        topic?: string;
        difficulty?: "Easy" | "Medium" | "Hard";
      }
    >({
      query: (payload) => ({
        url: "/quiz/generate",
        method: "POST",
        body: {
          ...payload,
          persist: false,
        },
      }),
      transformResponse: (res: any) =>
        (res.data?.questions || []).map(mapBackendQuestionToFrontend),
    }),
  }),
});

export const {
  useGetHealthQuery,
  useGetQuizSubjectsQuery,
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
  useGenerateQuizMutation,
} = quizApiSlice;

// Quiz Session State Management
export interface QuizState {
  session: QuizSession | null;
  hasActiveSession: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  session: null,
  hasActiveSession: false,
  isLoading: false,
  error: null,
};

export const prepareAndStartQuiz = createAsyncThunk(
  "quiz/prepareAndStartQuiz",
  async (payload: { config: QuizConfig; useAi?: boolean }, { dispatch }) => {
    const { config, useAi } = payload;
    let questions: Question[] = [];

    try {
      if (useAi && config.subject !== "All Subjects") {
        questions = await dispatch(
          quizApiSlice.endpoints.generateQuiz.initiate({
            subject: config.subject,
            classLevel: config.grade,
            count: Math.min(config.questionCount, 15),
            topic: config.topic !== "All Topics" ? config.topic : undefined,
            difficulty:
              config.difficulty !== "All Levels"
                ? (config.difficulty as "Easy" | "Medium" | "Hard")
                : undefined,
          }),
        ).unwrap();
      } else {
        questions = await dispatch(
          quizApiSlice.endpoints.getQuestions.initiate(config),
        ).unwrap();
      }
    } catch (err: any) {
      console.warn(
        "Backend question fetch failed, falling back to local dataset:",
        err,
      );
    }

    if (!questions || questions.length === 0) {
      questions = selectQuestionsForQuiz(config);
    } else if (questions.length < config.questionCount) {
      const localPool = selectQuestionsForQuiz(config);
      const existingIds = new Set(questions.map((q) => q.id));
      for (const lq of localPool) {
        if (!existingIds.has(lq.id)) {
          questions.push(lq);
          existingIds.add(lq.id);
          if (questions.length >= config.questionCount) break;
        }
      }
    }

    questions = questions.slice(0, config.questionCount);
    return { config, questions };
  },
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state, action: PayloadAction<QuizConfig>) => {
      const config = action.payload;
      const questions = selectQuestionsForQuiz(config);
      const quizId = `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const totalSeconds =
        (config.durationMinutes || config.questionCount) * 60;

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

    startQuizWithQuestions: (
      state,
      action: PayloadAction<{ config: QuizConfig; questions: Question[] }>,
    ) => {
      const { config, questions } = action.payload;
      const quizId = `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const totalSeconds =
        (config.durationMinutes || config.questionCount) * 60;

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
      action: PayloadAction<{
        questionId: string;
        optionId: "A" | "B" | "C" | "D";
      }>,
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
      state.session.markedForReview[questionId] =
        !state.session.markedForReview[questionId];
      storage.saveActiveSession(state.session);
    },

    updateTimers: (
      state,
      action: PayloadAction<{ deltaSeconds: number; activeQuestionId: string }>,
    ) => {
      if (!state.session || state.session.isSubmitted) return;
      const { deltaSeconds, activeQuestionId } = action.payload;

      state.session.overallTimeRemaining = Math.max(
        0,
        state.session.overallTimeRemaining - deltaSeconds,
      );

      const currentQuestionTime =
        state.session.questionTimeRemaining[activeQuestionId] ?? 60;
      const newQuestionTime = Math.max(0, currentQuestionTime - deltaSeconds);
      state.session.questionTimeRemaining[activeQuestionId] = newQuestionTime;

      state.session.lastActiveTimestamp = Date.now();
    },

    autoAdvanceQuestion: (state) => {
      if (!state.session || state.session.isSubmitted) return;
      if (
        state.session.currentQuestionIndex <
        state.session.questions.length - 1
      ) {
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
  extraReducers: (builder) => {
    builder
      .addCase(prepareAndStartQuiz.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(prepareAndStartQuiz.fulfilled, (state, action) => {
        const { config, questions } = action.payload;
        const quizId = `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const totalSeconds =
          (config.durationMinutes || config.questionCount) * 60;

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
        state.isLoading = false;
        state.error = null;
        storage.saveActiveSession(newSession);
      })
      .addCase(prepareAndStartQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to initialize exam";
      });
  },
});

export const {
  startQuiz,
  startQuizWithQuestions,
  setCurrentQuestionIndex,
  selectAnswer,
  clearAnswer,
  toggleMarkForReview,
  updateTimers,
  autoAdvanceQuestion,
  submitQuiz,
  discardCurrentQuiz,
} = quizSlice.actions;

export const quizReducer = quizSlice.reducer;
export default quizReducer;
