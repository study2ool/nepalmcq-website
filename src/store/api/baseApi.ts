import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBase = import.meta.env.VITE_API_BASE_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const API_BASE = (() => {
  // 1. If VITE_API_BASE_URL is an absolute URL (e.g. https://.../api/v1), use it directly
  if (rawBase && /^https?:\/\//i.test(rawBase)) {
    return rawBase.replace(/\/+$/, '');
  }
  // 2. If VITE_BACKEND_URL is provided (e.g. https://nepalmcq-backend.onrender.com),
  // combine backend domain with relative API prefix (/api/v1)
  if (backendUrl && /^https?:\/\//i.test(backendUrl)) {
    const cleanBackend = backendUrl.replace(/\/+$/, '');
    const cleanPrefix = (rawBase || '/api/v1').replace(/^\/+/, '');
    return `${cleanBackend}/${cleanPrefix}`;
  }
  // 3. Fallback to relative path (for local Vite dev proxy or Cloudflare Pages _redirects proxy)
  return rawBase || '/api/v1';
})();

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token =
        state.auth?.token ||
        (typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Colleges",
    "Leaderboard",
    "Dashboard",
    "History",
    "QuizSubjects",
    "AdminStats",
    "AdminUsers",
    "AdminSchools",
    "AccountDeletions",
    "ContactInquiries",
    "Bookmarks",
    "Syllabus",
  ],
  endpoints: () => ({}),
});
