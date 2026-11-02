import type { User } from '../store/slices/authSlice';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const authApi = {
  /**
   * Sends Google ID Token or OAuth code to backend
   */
  async continueWithGoogle(payload: {
    credential?: string;
    code?: string;
    accessToken?: string;
  }): Promise<ApiResponse<AuthResponseData>> {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to authenticate with Google');
    }
    return data;
  },

  /**
   * Fetches current authenticated user profile
   */
  async getMe(): Promise<ApiResponse<{ user: User }>> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No auth token found in localStorage');
    }

    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Session expired or invalid');
    }
    return data;
  },

  /**
   * Logs out from backend
   */
  async logout(): Promise<ApiResponse<{ loggedOut: boolean }>> {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.json();
  },

  /**
   * Returns backend Google OAuth redirect URL
   */
  getGoogleRedirectUrl(): string {
    return `${API_BASE}/auth/google`;
  },
};

