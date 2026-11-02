import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizResult } from '../../types/results';
import { storage } from '../../utils/storage';

interface ResultsState {
  currentResult: QuizResult | null;
  history: QuizResult[];
}

const initialState: ResultsState = {
  currentResult: null,
  history: storage.getResultsHistory(),
};

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
});

export const { setLatestResult, loadResultById, clearCurrentResult, clearHistory } =
  resultsSlice.actions;

export default resultsSlice.reducer;
