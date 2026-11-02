import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';
import { firebaseAuthService } from '../../services/firebaseAuth';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  googleId: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
}

const savedToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

const initialState: AuthState = {
  user: null,
  token: savedToken,
  isAuthenticated: !!savedToken,
  isLoading: !!savedToken,
  error: null,
  isAuthModalOpen: false,
};

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getMe();
      if (!response.success || !response.data?.user) {
        return rejectWithValue(response.error || 'Failed to fetch user profile');
      }
      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Authentication error');
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (
    payload: { credential?: string; code?: string; accessToken?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.continueWithGoogle(payload);
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Google login failed');
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to login with Google');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('auth_token', action.payload);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('auth_token');
      authApi.logout().catch(() => {});
      firebaseAuthService.signOut().catch(() => {});
    },
    openAuthModal(state) {
      state.isAuthModalOpen = true;
      state.error = null;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Current User
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('auth_token');
        state.error = action.payload as string;
      });

    // Login with Google
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAuthModalOpen = false;
        state.error = null;
        localStorage.setItem('auth_token', action.payload.token);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout, openAuthModal, closeAuthModal, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

