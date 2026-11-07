import { QuizSession } from "../types/quiz";
import { QuizResult } from "../types/results";

const ACTIVE_QUIZ_KEY = "nepal_mcq_active_session_v1";
const QUIZ_HISTORY_KEY = "nepal_mcq_quiz_history_v1";
const BOOKMARKS_KEY = "nepal_mcq_bookmarks_v1";
const THEME_KEY = "nepal_mcq_theme_v1";
const USER_REACTIONS_KEY = "nepal_mcq_user_reactions_v1";
const REACTION_COUNTS_KEY = "nepal_mcq_reaction_counts_v1";
const GUEST_ID_KEY = "nepal_mcq_guest_id_v1";

export const storage = {
  // Active session
  saveActiveSession: (session: QuizSession): void => {
    try {
      localStorage.setItem(ACTIVE_QUIZ_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn("Failed to save active quiz session", e);
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
      console.warn("Failed to clear active session", e);
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
      localStorage.setItem(
        QUIZ_HISTORY_KEY,
        JSON.stringify(updated.slice(0, 50)),
      ); // Keep last 50
    } catch (e) {
      console.warn("Failed to save quiz result", e);
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
  getTheme: (): "light" | "dark" => {
    try {
      const val = localStorage.getItem(THEME_KEY);
      if (val === "light" || val === "dark") return val;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  },

  setTheme: (theme: "light" | "dark"): void => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn("Failed to save theme", e);
    }
  },

  // Question Reactions (Like / Dislike)
  getGuestId: (): string => {
    try {
      let guestId = localStorage.getItem(GUEST_ID_KEY);
      if (!guestId) {
        guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem(GUEST_ID_KEY, guestId);
      }
      return guestId;
    } catch {
      return "guest_fallback_anon";
    }
  },

  getUserReactions: (): Record<string, "like" | "dislike"> => {
    try {
      const data = localStorage.getItem(USER_REACTIONS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  setUserReaction: (
    questionId: string,
    reaction: "like" | "dislike" | null,
  ): Record<string, "like" | "dislike"> => {
    try {
      const reactions = storage.getUserReactions();
      if (reaction === null) {
        delete reactions[questionId];
      } else {
        reactions[questionId] = reaction;
      }
      localStorage.setItem(USER_REACTIONS_KEY, JSON.stringify(reactions));
      return reactions;
    } catch {
      return {};
    }
  },

  getReactionCounts: (): Record<
    string,
    { likesCount: number; dislikesCount: number }
  > => {
    try {
      const data = localStorage.getItem(REACTION_COUNTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveReactionCount: (
    questionId: string,
    counts: { likesCount: number; dislikesCount: number },
  ): void => {
    try {
      const allCounts = storage.getReactionCounts();
      allCounts[questionId] = {
        likesCount: Math.max(0, counts.likesCount),
        dislikesCount: Math.max(0, counts.dislikesCount),
      };
      localStorage.setItem(REACTION_COUNTS_KEY, JSON.stringify(allCounts));
    } catch (e) {
      console.warn("Failed to save reaction counts", e);
    }
  },

  saveBatchReactionCounts: (
    batch: Record<string, { likesCount: number; dislikesCount: number }>,
  ): void => {
    try {
      const allCounts = storage.getReactionCounts();
      Object.entries(batch).forEach(([qId, counts]) => {
        allCounts[qId] = {
          likesCount: Math.max(0, counts.likesCount),
          dislikesCount: Math.max(0, counts.dislikesCount),
        };
      });
      localStorage.setItem(REACTION_COUNTS_KEY, JSON.stringify(allCounts));
    } catch (e) {
      console.warn("Failed to save batch reaction counts", e);
    }
  },
};
