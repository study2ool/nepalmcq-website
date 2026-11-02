import { store } from '../store';
import { apiSlice, AuthResponseData } from '../store/api/apiSlice';
import type { User } from '../store/api/authApi';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export type { AuthResponseData };

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const authApi = {
  /**
   * Sends Google ID Token or OAuth code to backend via RTK Query
   */
  async continueWithGoogle(payload: {
    credential?: string;
    code?: string;
    accessToken?: string;
  }): Promise<ApiResponse<AuthResponseData>> {
    try {
      const data = await store.dispatch(apiSlice.endpoints.continueWithGoogle.initiate(payload)).unwrap();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.data?.error || err?.message || 'Google authentication failed',
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Fetches current authenticated user profile via RTK Query
   */
  async getMe(): Promise<ApiResponse<{ user: User }>> {
    try {
      const data = await store.dispatch(apiSlice.endpoints.getMe.initiate()).unwrap();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.data?.error || err?.message || 'Failed to fetch user profile',
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Updates student profile details via RTK Query
   */
  async updateProfile(updates: {
    name?: string;
    school?: string;
    city?: string;
    grade?: number;
    avatarBg?: string;
  }): Promise<ApiResponse<{ user: User; profile: any }>> {
    try {
      const data = await store.dispatch(apiSlice.endpoints.updateProfile.initiate(updates)).unwrap();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.data?.error || err?.message || 'Failed to update student profile',
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Logs out from backend and expires active token via RTK Query
   */
  async logout(tokenParam?: string): Promise<ApiResponse<{ loggedOut: boolean }>> {
    try {
      const data = await store.dispatch(apiSlice.endpoints.logout.initiate(tokenParam)).unwrap();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        success: true,
        data: { loggedOut: true },
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Returns backend Google OAuth redirect URL
   */
  getGoogleRedirectUrl(): string {
    return `${API_BASE}/auth/google`;
  },
};
