import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice } from "./baseApi";
import type {
  SubjectSummary,
  SyllabusFile,
  SyllabusGrade,
  SyllabusBranch,
  SyllabusChapter,
  SyllabusTopic,
} from "../../types/syllabus";

export type {
  SubjectSummary,
  SyllabusFile,
  SyllabusGrade,
  SyllabusBranch,
  SyllabusChapter,
  SyllabusTopic,
};

export interface SyllabusOverviewData {
  subjects: SubjectSummary[];
  topicsByGrade: Record<number, Record<string, string[]>>;
}

export const syllabusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<SubjectSummary[], string | void>({
      query: (category = "science") =>
        `/subjects?category=${category || "science"}`,
      transformResponse: (res: any) => res.data || [],
      providesTags: ["Syllabus"],
    }),

    getTopicsByGrade: builder.query<
      Record<number, Record<string, string[]>>,
      void
    >({
      query: () => "/syllabus/topics",
      transformResponse: (res: any) => res.data || { 11: {}, 12: {} },
      providesTags: ["Syllabus"],
    }),

    getSyllabusOverview: builder.query<SyllabusOverviewData, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const [subRes, topRes] = await Promise.all([
          fetchWithBQ("/subjects?category=science"),
          fetchWithBQ("/syllabus/topics"),
        ]);

        if (subRes.error) return { error: subRes.error };
        if (topRes.error) return { error: topRes.error };

        const subjects: SubjectSummary[] = (subRes.data as any)?.data || [];
        const topics: Record<number, Record<string, string[]>> = (
          topRes.data as any
        )?.data || {};

        const scienceSubjectNames = new Set(subjects.map((s) => s.name));
        const filteredTopics: Record<number, Record<string, string[]>> = {
          11: {},
          12: {},
        };

        for (const grade of [11, 12] as const) {
          filteredTopics[grade] = {};
          for (const [subj, chList] of Object.entries(topics[grade] || {})) {
            if (scienceSubjectNames.has(subj)) {
              filteredTopics[grade][subj] = chList;
            }
          }
        }

        return { data: { subjects, topicsByGrade: filteredTopics } };
      },
      providesTags: ["Syllabus"],
    }),

    getSyllabusBySubject: builder.query<SyllabusFile, string>({
      query: (subject) => `/syllabus/${encodeURIComponent(subject)}`,
      transformResponse: (res: any) => res.data,
      providesTags: (_res, _err, subject) => [
        { type: "Syllabus", id: subject },
      ],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetTopicsByGradeQuery,
  useGetSyllabusOverviewQuery,
  useGetSyllabusBySubjectQuery,
} = syllabusApiSlice;

export interface SyllabusState {
  subjects: SubjectSummary[];
  topicsByGrade: Record<number, Record<string, string[]>>;
  syllabusBySubject: Record<string, SyllabusFile>;
  isLoading: boolean;
  error: string | null;
}

const initialState: SyllabusState = {
  subjects: [],
  topicsByGrade: {
    11: {},
    12: {},
  },
  syllabusBySubject: {},
  isLoading: false,
  error: null,
};

export const fetchSyllabusOverview = createAsyncThunk(
  "syllabus/fetchOverview",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await dispatch(
        syllabusApiSlice.endpoints.getSyllabusOverview.initiate(),
      ).unwrap();
      return { subjects: data.subjects, topics: data.topicsByGrade };
    } catch (err: any) {
      return rejectWithValue(
        err?.message || "Failed to fetch science syllabus data",
      );
    }
  },
);

export const fetchSubjectDetails = createAsyncThunk(
  "syllabus/fetchSubjectDetails",
  async (subject: string, { dispatch, rejectWithValue }) => {
    try {
      const syllabus = await dispatch(
        syllabusApiSlice.endpoints.getSyllabusBySubject.initiate(subject),
      ).unwrap();
      return { subject, syllabus };
    } catch (err: any) {
      return rejectWithValue(
        err?.message || `Failed to fetch syllabus details for ${subject}`,
      );
    }
  },
);

export const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSyllabusOverview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSyllabusOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = action.payload.subjects;
        state.topicsByGrade = action.payload.topics;
      })
      .addCase(fetchSyllabusOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchSubjectDetails.fulfilled, (state, action) => {
      state.syllabusBySubject[action.payload.subject] = action.payload.syllabus;
    });
  },
});

export const syllabusReducer = syllabusSlice.reducer;
export default syllabusReducer;
