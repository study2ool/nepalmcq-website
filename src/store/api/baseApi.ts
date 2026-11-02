import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token =
        state.auth?.token ||
        (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'User',
    'Colleges',
    'Leaderboard',
    'Dashboard',
    'History',
    'QuizSubjects',
    'AdminStats',
    'AdminUsers',
    'AdminSchools',
    'AccountDeletions',
    'Bookmarks',
    'Syllabus',
  ],
  endpoints: () => ({}),
});
