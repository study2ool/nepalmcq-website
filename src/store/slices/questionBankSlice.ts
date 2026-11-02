import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

interface QuestionBankState {
  bookmarks: string[];
}

const initialState: QuestionBankState = {
  bookmarks: storage.getBookmarks(),
};

export const questionBankSlice = createSlice({
  name: 'questionBank',
  initialState,
  reducers: {
    toggleBookmarkAction: (state, action: PayloadAction<string>) => {
      const qId = action.payload;
      const updated = storage.toggleBookmark(qId);
      state.bookmarks = updated;
    },
  },
});

export const { toggleBookmarkAction } = questionBankSlice.actions;
export default questionBankSlice.reducer;
