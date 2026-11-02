const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const bookmarkApi = {
  /**
   * Fetches the user's bookmarked question IDs from the backend
   */
  async getBookmarks(): Promise<string[]> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) return [];

      const res = await fetch(`${API_BASE}/bookmarks`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return [];

      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  /**
   * Adds a question ID to bookmarks in the database
   */
  async addBookmark(questionId: string): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE}/bookmarks/${encodeURIComponent(questionId)}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },

  /**
   * Removes a question ID from bookmarks in the database
   */
  async removeBookmark(questionId: string): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE}/bookmarks/${encodeURIComponent(questionId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      return json.data || [];
    } catch {
      return [];
    }
  },
};

