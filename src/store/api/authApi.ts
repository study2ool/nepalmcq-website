import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./baseApi";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  googleId: string;
  role: "student" | "teacher" | "admin";
  collegeId?: string;
  collegeName?: string;
  collegeCity?: string;
  gender?: "male" | "female" | "other";
  grade?: 11 | 12;
  isOnboarded?: boolean;
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

export interface AuthResponseData {
  user: User;
  token: string;
}

// RTK Query Injected Endpoints
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<{ user: User }, void>({
      query: () => "/auth/me",
      transformResponse: (res: any) => res.data,
      providesTags: ["User"],
    }),

    continueWithGoogle: builder.mutation<
      AuthResponseData,
      { credential?: string; code?: string; accessToken?: string }
    >({
      query: (payload) => ({
        url: "/auth/google",
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["User"],
    }),

    updateProfile: builder.mutation<
      { user: User; profile: any },
      {
        name?: string;
        school?: string;
        city?: string;
        grade?: number;
        avatarBg?: string;
      }
    >({
      query: (updates) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: updates,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["User", "Leaderboard", "Dashboard"],
    }),

    logout: builder.mutation<{ loggedOut: boolean }, string | void>({
      query: (tokenParam) => ({
        url: "/auth/logout",
        method: "POST",
        body: tokenParam ? { token: tokenParam } : {},
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["User", "Dashboard", "History"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useContinueWithGoogleMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApiSlice;

// Auth State Management
const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
const savedUser: User | null =
  typeof window !== "undefined"
    ? (() => {
        try {
          const stored = localStorage.getItem("auth_user");
          return stored ? (JSON.parse(stored) as User) : null;
        } catch {
          return null;
        }
      })()
    : null;

const initialState: AuthState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedToken && !!savedUser,
  isLoading: !!savedToken && !savedUser,
  error: null,
  isAuthModalOpen: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await dispatch(
        authApiSlice.endpoints.getMe.initiate(),
      ).unwrap();
      return data.user;
    } catch (err: any) {
      return rejectWithValue(
        err?.data?.error || err?.message || "Authentication error",
      );
    }
  },
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (
    payload: { credential?: string; code?: string; accessToken?: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const data = await dispatch(
        authApiSlice.endpoints.continueWithGoogle.initiate(payload),
      ).unwrap();
      return data;
    } catch (err: any) {
      if (err?.status === 405 || err?.originalStatus === 405) {
        return rejectWithValue(
          "Backend API unreachable (405 Method Not Allowed). Please ensure VITE_API_BASE_URL is configured in your Cloudflare Pages deployment settings.",
        );
      }
      return rejectWithValue(
        err?.data?.error || err?.message || "Google login failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, getState }) => {
    const state = getState() as any;
    const activeToken =
      state.auth?.token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("auth_token")
        : null);
    if (activeToken) {
      try {
        await dispatch(
          authApiSlice.endpoints.logout.initiate(activeToken),
        ).unwrap();
      } catch (e) {
        // ignore logout errors
      }
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<string | { token: string; user?: User }>,
    ) {
      const token =
        typeof action.payload === "string"
          ? action.payload
          : action.payload.token;
      const user =
        typeof action.payload === "object" ? action.payload.user : undefined;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("auth_token", token);
      if (user) {
        state.user = user;
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
    openAuthModal(state) {
      state.isAuthModalOpen = true;
      state.error = null;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
      state.error = null;
    },
    updateUserLocal(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        localStorage.setItem("auth_user", JSON.stringify(state.user));
      }
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        if (!state.user) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = { ...action.payload };
        if (user.email.toLowerCase() === "study2ool.nepal@gmail.com") {
          user.role = "admin";
        }
        state.user = user;
        state.isAuthenticated = true;
        localStorage.setItem("auth_user", JSON.stringify(user));
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        const errMsg = String(action.payload || "");
        if (
          errMsg.includes("401") ||
          errMsg.includes("expired") ||
          errMsg.includes("revoked") ||
          errMsg.includes("No auth token")
        ) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
        state.error = action.payload as string;
      });

    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = { ...action.payload.user };
        if (user.email.toLowerCase() === "study2ool.nepal@gmail.com") {
          user.role = "admin";
        }
        state.user = user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAuthModalOpen = false;
        state.error = null;
        localStorage.setItem("auth_token", action.payload.token);
        localStorage.setItem("auth_user", JSON.stringify(user));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setToken,
  logout,
  openAuthModal,
  closeAuthModal,
  clearAuthError,
  updateUserLocal,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export default authReducer;
