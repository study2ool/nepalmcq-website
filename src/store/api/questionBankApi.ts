import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./baseApi";
import { storage } from "../../utils/storage";

export const questionBankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query<string[], void>({
      query: () => "/bookmarks",
      transformResponse: (res: any) => res.data || [],
      providesTags: ["Bookmarks"],
    }),

    addBookmark: builder.mutation<string[], string>({
      query: (questionId) => ({
        url: `/bookmarks/${encodeURIComponent(questionId)}`,
        method: "POST",
      }),
      transformResponse: (res: any) => res.data || [],
      invalidatesTags: ["Bookmarks"],
    }),

    removeBookmark: builder.mutation<string[], string>({
      query: (questionId) => ({
        url: `/bookmarks/${encodeURIComponent(questionId)}`,
        method: "DELETE",
      }),
      transformResponse: (res: any) => res.data || [],
      invalidatesTags: ["Bookmarks"],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = questionBankApiSlice;

export interface QuestionBankState {
  bookmarks: string[];
  isLoading: boolean;
}

const initialState: QuestionBankState = {
  bookmarks: storage.getBookmarks(),
  isLoading: false,
};

export const fetchBookmarks = createAsyncThunk(
  "questionBank/fetchBookmarks",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const serverBookmarks = await dispatch(
        questionBankApiSlice.endpoints.getBookmarks.initiate(),
      ).unwrap();
      return serverBookmarks;
    } catch (err: any) {
      return rejectWithValue(
        err?.data?.error || err?.message || "Failed to fetch bookmarks",
      );
    }
  },
);

export const toggleBookmarkThunk = createAsyncThunk(
  "questionBank/toggleBookmarkThunk",
  async (questionId: string, { getState, dispatch }) => {
    const state = getState() as any;
    const currentBookmarks: string[] = state.questionBank?.bookmarks || [];
    const isCurrentlyBookmarked = currentBookmarks.includes(questionId);

    // Optimistically update local state & storage
    dispatch(toggleBookmarkAction(questionId));

    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      try {
        if (isCurrentlyBookmarked) {
          await dispatch(
            questionBankApiSlice.endpoints.removeBookmark.initiate(questionId),
          ).unwrap();
        } else {
          await dispatch(
            questionBankApiSlice.endpoints.addBookmark.initiate(questionId),
          ).unwrap();
        }
      } catch (err) {
        console.warn("Bookmark sync failed:", err);
      }
    }

    return questionId;
  },
);

export const questionBankSlice = createSlice({
  name: "questionBank",
  initialState,
  reducers: {
    toggleBookmarkAction: (state, action: PayloadAction<string>) => {
      const qId = action.payload;
      const updated = storage.toggleBookmark(qId);
      state.bookmarks = updated;
    },
    setBookmarks: (state, action: PayloadAction<string[]>) => {
      state.bookmarks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.length > 0) {
          state.bookmarks = Array.from(
            new Set([...state.bookmarks, ...action.payload]),
          );
        }
      })
      .addCase(fetchBookmarks.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleBookmarkAction, setBookmarks } = questionBankSlice.actions;
export const questionBankReducer = questionBankSlice.reducer;
export default questionBankReducer;
