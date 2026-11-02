import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from './baseApi';
import type { QuizResult } from '../../types/results';
import { storage } from '../../utils/storage';
import { progressApi } from '../../services/progressApi';

export interface ResultsState {
  currentResult: QuizResult | null;
  history: QuizResult[];
  isLoading: boolean;
}

const initialState: ResultsState = {
  currentResult: null,
  history: storage.getResultsHistory(),
  isLoading: false,
};

export const fetchResultsHistory = createAsyncThunk(
  'results/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const backendHistory = await progressApi.getUserHistory();
      return backendHistory;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch history');
    }
  }
);

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLatestResult: (state, action: PayloadAction<QuizResult>) => {
      state.currentResult = action.payload;
      storage.saveResult(action.payload);
      state.history = storage.getResultsHistory();
    },
    loadResultById: (state, action: PayloadAction<string>) => {
      const found = storage.getResultById(action.payload);
      state.currentResult = found;
    },
    clearCurrentResult: (state) => {
      state.currentResult = null;
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem('nepal_mcq_quiz_history_v1');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultsHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchResultsHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.length > 0) {
          state.history = action.payload;
        }
      })
      .addCase(fetchResultsHistory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setLatestResult,
  loadResultById,
  clearCurrentResult,
  clearHistory,
} = resultsSlice.actions;

export const resultsReducer = resultsSlice.reducer;
export default resultsReducer;

