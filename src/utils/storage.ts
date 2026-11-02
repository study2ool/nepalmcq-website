import { QuizSession } from '../types/quiz';
import { QuizResult } from '../types/results';

const ACTIVE_QUIZ_KEY = 'nepal_mcq_active_session_v1';
const QUIZ_HISTORY_KEY = 'nepal_mcq_quiz_history_v1';
const BOOKMARKS_KEY = 'nepal_mcq_bookmarks_v1';
const THEME_KEY = 'nepal_mcq_theme_v1';

export const storage = {
  // Active session
  saveActiveSession: (session: QuizSession): void => {
    try {
      localStorage.setItem(ACTIVE_QUIZ_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save active quiz session', e);
    }
  },

  getActiveSession: (): QuizSession | null => {
    try {
      const data = localStorage.getItem(ACTIVE_QUIZ_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearActiveSession: (): void => {
    try {
      localStorage.removeItem(ACTIVE_QUIZ_KEY);
    } catch (e) {
      console.warn('Failed to clear active session', e);
    }
  },

  // Results history
  getResultsHistory: (): QuizResult[] => {
    try {
      const data = localStorage.getItem(QUIZ_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveResult: (result: QuizResult): void => {
    try {
      const current = storage.getResultsHistory();
      const updated = [result, ...current.filter((r) => r.id !== result.id)];
      localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(updated.slice(0, 50))); // Keep last 50
    } catch (e) {
      console.warn('Failed to save quiz result', e);
    }
  },

  getResultById: (resultId: string): QuizResult | null => {
    const list = storage.getResultsHistory();
    return list.find((r) => r.id === resultId) || null;
  },

  // Bookmarks
  getBookmarks: (): string[] => {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark: (questionId: string): string[] => {
    try {
      const current = storage.getBookmarks();
      const updated = current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    try {
      const val = localStorage.getItem(THEME_KEY);
      if (val === 'light' || val === 'dark') return val;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme', e);
    }
  },
};
