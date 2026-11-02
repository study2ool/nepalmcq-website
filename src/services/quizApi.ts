import { store } from '../store';
import {
  apiSlice,
  BackendHealthResponse,
  QuizSubjectSummary,
  mapBackendQuestionToFrontend,
} from '../store/api/apiSlice';
import { Question } from '../types/question';
import { QuizConfig } from '../types/quiz';

export type { BackendHealthResponse, QuizSubjectSummary };
export { mapBackendQuestionToFrontend };

export const quizApi = {
  /**
   * Checks backend availability and health via RTK Query
   */
  async getHealth(): Promise<BackendHealthResponse> {
    return await store.dispatch(apiSlice.endpoints.getHealth.initiate()).unwrap();
  },

  /**
   * Retrieves subjects with question bank statistics via RTK Query
   */
  async getQuizSubjects(): Promise<QuizSubjectSummary[]> {
    return await store.dispatch(apiSlice.endpoints.getQuizSubjects.initiate()).unwrap();
  },

  /**
   * Queries practice questions with filters from backend question repository via RTK Query
   */
  async getQuestions(config: QuizConfig): Promise<Question[]> {
    return await store.dispatch(apiSlice.endpoints.getQuestions.initiate(config)).unwrap();
  },

  /**
   * On-demand curriculum / AI quiz generation via RTK Query
   */
  async generateQuiz(payload: {
    subject: string;
    classLevel: 11 | 12;
    count?: number;
    chapterId?: string;
    topic?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
  }): Promise<Question[]> {
    return await store.dispatch(apiSlice.endpoints.generateQuiz.initiate(payload)).unwrap();
  },
};
