import { apiSlice } from './baseApi';
import type { QuizResult } from '../../types/results';
import type { LeaderboardStudent, SchoolStanding } from '../../types/leaderboard';

export interface UserStatsSummary {
  userId: string;
  displayName: string;
  email: string;
  picture?: string;
  school?: string;
  city?: string;
  grade: 11 | 12;
  lifetime: {
    totalExams: number;
    totalQuestionsAttempted: number;
    totalCorrect: number;
    totalTimeSpentSeconds: number;
    totalXp: number;
    overallAccuracy: number;
    bestScore: number;
    bestAccuracy: number;
  };
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
  };
  subjectMastery: Record<
    string,
    {
      exams: number;
      attempted: number;
      correct: number;
      accuracy: number;
      xp: number;
    }
  >;
  weakTopics: Array<{
    topic: string;
    subject: string;
    accuracy: number;
    attempted: number;
    correct: number;
    total: number;
  }>;
  recentTrend: Array<{
    attemptId: string;
    examNumber: string;
    date: string;
    subject: string;
    accuracy: number;
    score: number;
  }>;
  updatedAt: string;
}

export interface SubmitAttemptResponse {
  attempt: any;
  stats: UserStatsSummary;
  earnedXp: number;
}

/**
 * Transforms backend AttemptRecord to frontend QuizResult
 */
export function mapBackendAttemptToQuizResult(a: any): QuizResult {
  return {
    id: a.id,
    config: {
      subject: a.subject || 'All Subjects',
      grade: a.grade || 11,
      topic: a.config?.topic || 'All Topics',
      questionCount: a.config?.totalQuestions || a.metrics?.totalPossible || 10,
      durationMinutes: a.config?.timeLimitMinutes || 20,
      difficulty: a.config?.difficulty || 'All Levels',
      questionMode: a.config?.questionMode || 'random',
    },
    completedAt: new Date(a.completedAt).getTime(),
    totalQuestions: a.metrics?.totalPossible || 10,
    attemptedQuestions: a.metrics?.attemptedQuestions || 0,
    unattemptedQuestions: a.metrics?.unattemptedQuestions || 0,
    correctAnswers: a.metrics?.correctAnswers || 0,
    incorrectAnswers: a.metrics?.incorrectAnswers || 0,
    accuracy: a.metrics?.accuracy || 0,
    totalMarksObtained: a.metrics?.score || 0,
    totalPossibleMarks: a.metrics?.totalPossible || 10,
    timeTakenSeconds: a.metrics?.timeSpentSeconds || 60,
    averageTimePerQuestionSeconds: a.metrics?.avgTimePerQuestion || 6,
    questionResults: (a.questionResponses || []).map((qr: any) => ({
      question: {
        id: qr.questionId,
        class: a.grade,
        subject: qr.subject || a.subject,
        topic: qr.topic || '',
        question: '',
        options: [],
        correct_options: [qr.correctAnswer || 'A'],
        is_multi_select: false,
        explanation: '',
        difficulty: 'Medium',
        question_type: 'MCQ',
        marks: 1,
        curriculum_note: '',
      },
      selectedAnswer: qr.selectedKey,
      isCorrect: qr.isCorrect,
      status: qr.status,
      timeSpentSeconds: qr.timeSpentSeconds,
    })),
    subjectBreakdown: a.subjectBreakdown || [],
    topicBreakdown: a.topicBreakdown || [],
  };
}

export const progressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<UserStatsSummary | null, void>({
      query: () => '/dashboard/me',
      transformResponse: (res: any) => (res.data as UserStatsSummary) || null,
      providesTags: ['Dashboard'],
    }),

    getUserHistory: builder.query<QuizResult[], number | void>({
      query: (limit = 50) => `/attempts/history?limit=${limit}`,
      transformResponse: (res: any) => (res.data || []).map(mapBackendAttemptToQuizResult),
      providesTags: ['History'],
    }),

    getLeaderboard: builder.query<
      {
        students: LeaderboardStudent[];
        schools: SchoolStanding[];
        currentUserRank?: number;
      },
      { timeframe?: 'all-time' | 'weekly'; grade?: string; subject?: string } | void
    >({
      query: (params) => {
        const q = new URLSearchParams();
        if (params?.timeframe) q.set('timeframe', params.timeframe);
        if (params?.grade) q.set('grade', params.grade);
        if (params?.subject) q.set('subject', params.subject);
        return `/leaderboard?${q.toString()}`;
      },
      transformResponse: (res: any) => res.data || { students: [], schools: [] },
      providesTags: ['Leaderboard'],
    }),

    submitAttempt: builder.mutation<SubmitAttemptResponse, QuizResult>({
      query: (result) => ({
        url: '/attempts',
        method: 'POST',
        body: result,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ['Dashboard', 'History', 'Leaderboard', 'AdminStats'],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useLazyGetDashboardSummaryQuery,
  useGetUserHistoryQuery,
  useLazyGetUserHistoryQuery,
  useGetLeaderboardQuery,
  useLazyGetLeaderboardQuery,
  useSubmitAttemptMutation,
} = progressApiSlice;

