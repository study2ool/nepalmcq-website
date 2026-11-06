import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  apiSlice,
  authReducer,
  syllabusReducer,
  themeReducer,
  quizConfigReducer,
  quizReducer,
  questionBankReducer,
  resultsReducer,
  leaderboardReducer,
  questionReactionReducer,
} from './api';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    syllabus: syllabusReducer,
    theme: themeReducer,
    quizConfig: quizConfigReducer,
    quiz: quizReducer,
    questionBank: questionBankReducer,
    results: resultsReducer,
    leaderboard: leaderboardReducer,
    questionReactions: questionReactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
