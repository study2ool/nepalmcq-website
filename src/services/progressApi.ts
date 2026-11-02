import { store } from '../store';
import {
  apiSlice,
  UserStatsSummary,
  SubmitAttemptResponse,
  mapBackendAttemptToQuizResult,
} from '../store/api/apiSlice';
import { QuizResult } from '../types/results';
import { LeaderboardStudent, SchoolStanding } from '../types/leaderboard';

export type { UserStatsSummary, SubmitAttemptResponse };
export { mapBackendAttemptToQuizResult };

export const progressApi = {
  /**
   * Submits a completed exam result to the backend via RTK Query
   */
  async submitAttempt(result: QuizResult): Promise<SubmitAttemptResponse | null> {
    try {
      return await store.dispatch(apiSlice.endpoints.submitAttempt.initiate(result)).unwrap();
    } catch (err) {
      console.warn('Backend attempt submission fallback to local storage:', err);
      return null;
    }
  },

  /**
   * Fetches user's aggregated dashboard statistics in 1 read via RTK Query
   */
  async getDashboardSummary(): Promise<UserStatsSummary | null> {
    try {
      return await store.dispatch(apiSlice.endpoints.getDashboardSummary.initiate()).unwrap();
    } catch (err) {
      console.warn('Failed to load dashboard summary:', err);
      return null;
    }
  },

  /**
   * Fetches paginated past attempts for the current user via RTK Query
   */
  async getUserHistory(limit = 50): Promise<QuizResult[]> {
    try {
      return await store.dispatch(apiSlice.endpoints.getUserHistory.initiate(limit)).unwrap();
    } catch (err) {
      console.warn('Failed to load user history from backend:', err);
      return [];
    }
  },

  /**
   * Fetches real-time leaderboard rankings with filters via RTK Query
   */
  async getLeaderboard(params: {
    timeframe?: 'all-time' | 'weekly';
    grade?: string;
    subject?: string;
  }): Promise<{
    students: LeaderboardStudent[];
    schools: SchoolStanding[];
    currentUserRank?: number;
  }> {
    try {
      return await store.dispatch(apiSlice.endpoints.getLeaderboard.initiate(params)).unwrap();
    } catch (err) {
      console.warn('Leaderboard fetch notice:', err);
      return { students: [], schools: [] };
    }
  },
};
