import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "./baseApi";
import { storage } from "../../utils/storage";
import type { QuestionReactionStats, ReactionType } from "../../types/reaction";

export const questionReactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionReaction: builder.query<QuestionReactionStats, string>({
      query: (questionId) =>
        `/questions/reactions/${encodeURIComponent(questionId)}`,
      transformResponse: (res: any) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Reactions", id }],
    }),

    getBatchReactions: builder.query<
      Record<string, QuestionReactionStats>,
      string[]
    >({
      query: (questionIds) => ({
        url: "/questions/reactions/batch",
        method: "POST",
        body: { questionIds },
      }),
      transformResponse: (res: any) => res.data || {},
      providesTags: ["Reactions"],
    }),

    setReaction: builder.mutation<
      QuestionReactionStats,
      { questionId: string; reaction: ReactionType }
    >({
      query: ({ questionId, reaction }) => ({
        url: `/questions/reactions/${encodeURIComponent(questionId)}`,
        method: "POST",
        body: { reaction },
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: (_result, _err, { questionId }) => [
        { type: "Reactions", id: questionId },
      ],
    }),
  }),
});

export const {
  useGetQuestionReactionQuery,
  useGetBatchReactionsQuery,
  useSetReactionMutation,
} = questionReactionApiSlice;

export interface QuestionReactionState {
  reactions: Record<string, QuestionReactionStats>;
}

const loadInitialState = (): QuestionReactionState => {
  const localReactions = storage.getUserReactions();
  const localCounts = storage.getReactionCounts();
  const initialMap: Record<string, QuestionReactionStats> = {};

  // Hydrate counts
  Object.entries(localCounts).forEach(([qId, counts]) => {
    initialMap[qId] = {
      questionId: qId,
      likesCount: counts.likesCount,
      dislikesCount: counts.dislikesCount,
      userReaction: localReactions[qId] || null,
    };
  });

  // Ensure any question with a user reaction has an entry
  Object.entries(localReactions).forEach(([qId, reaction]) => {
    if (!initialMap[qId]) {
      initialMap[qId] = {
        questionId: qId,
        likesCount: reaction === "like" ? 1 : 0,
        dislikesCount: reaction === "dislike" ? 1 : 0,
        userReaction: reaction,
      };
    } else {
      initialMap[qId].userReaction = reaction;
    }
  });

  return { reactions: initialMap };
};

const initialState: QuestionReactionState = loadInitialState();

export const questionReactionSlice = createSlice({
  name: "questionReactions",
  initialState,
  reducers: {
    optimisticReact: (
      state,
      action: PayloadAction<{ questionId: string; reaction: ReactionType }>,
    ) => {
      const { questionId, reaction } = action.payload;
      const current = state.reactions[questionId] || {
        questionId,
        likesCount: 0,
        dislikesCount: 0,
        userReaction: null,
      };

      let likes = current.likesCount;
      let dislikes = current.dislikesCount;
      const prev = current.userReaction;
      let next: "like" | "dislike" | null = null;

      if (reaction === "like") {
        if (prev === "like") {
          // Toggle off
          next = null;
          likes = Math.max(0, likes - 1);
        } else if (prev === "dislike") {
          // Switch to like
          next = "like";
          dislikes = Math.max(0, dislikes - 1);
          likes += 1;
        } else {
          // First time like
          next = "like";
          likes += 1;
        }
      } else if (reaction === "dislike") {
        if (prev === "dislike") {
          // Toggle off
          next = null;
          dislikes = Math.max(0, dislikes - 1);
        } else if (prev === "like") {
          // Switch to dislike
          next = "dislike";
          likes = Math.max(0, likes - 1);
          dislikes += 1;
        } else {
          // First time dislike
          next = "dislike";
          dislikes += 1;
        }
      } else {
        // 'none'
        if (prev === "like") likes = Math.max(0, likes - 1);
        if (prev === "dislike") dislikes = Math.max(0, dislikes - 1);
        next = null;
      }

      const updatedStats: QuestionReactionStats = {
        questionId,
        likesCount: likes,
        dislikesCount: dislikes,
        userReaction: next,
      };

      state.reactions[questionId] = updatedStats;

      // Sync to local storage
      storage.setUserReaction(questionId, next);
      storage.saveReactionCount(questionId, {
        likesCount: likes,
        dislikesCount: dislikes,
      });
    },

    syncBatchStats: (
      state,
      action: PayloadAction<Record<string, QuestionReactionStats>>,
    ) => {
      Object.entries(action.payload).forEach(([qId, serverStats]) => {
        const local = state.reactions[qId];
        // Retain local user reaction if present and server userReaction is empty (e.g. for guest)
        const userReaction =
          serverStats.userReaction !== undefined &&
          serverStats.userReaction !== null
            ? serverStats.userReaction
            : local?.userReaction || null;

        state.reactions[qId] = {
          questionId: qId,
          likesCount: serverStats.likesCount,
          dislikesCount: serverStats.dislikesCount,
          userReaction,
        };
      });
    },
  },
});

export const { optimisticReact, syncBatchStats } =
  questionReactionSlice.actions;

/**
 * Async thunk to optimistically apply the reaction and trigger backend sync
 */
export const toggleReactionThunk = createAsyncThunk(
  "questionReactions/toggle",
  async (
    { questionId, target }: { questionId: string; target: "like" | "dislike" },
    { dispatch },
  ) => {
    // 1. Instant optimistic update
    dispatch(optimisticReact({ questionId, reaction: target }));

    // 2. Dispatch API mutation in background
    try {
      await dispatch(
        questionReactionApiSlice.endpoints.setReaction.initiate({
          questionId,
          reaction: target,
        }),
      ).unwrap();
    } catch {
      // Offline or network error: optimistic state and localStorage remain intact
    }
  },
);

export default questionReactionSlice.reducer;
