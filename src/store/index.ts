import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import themeReducer from './slices/themeSlice';
import quizConfigReducer from './slices/quizConfigSlice';
import quizReducer from './slices/quizSlice';
import questionBankReducer from './slices/questionBankSlice';
import resultsReducer from './slices/resultsSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import authReducer from './slices/authSlice';
import syllabusReducer from './slices/syllabusSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    syllabus: syllabusReducer,
    theme: themeReducer,
    quizConfig: quizConfigReducer,
    quiz: quizReducer,
    questionBank: questionBankReducer,
    results: resultsReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
