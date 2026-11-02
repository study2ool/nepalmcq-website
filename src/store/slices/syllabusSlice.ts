import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  syllabusApi,
  type SubjectSummary,
  type SyllabusFile,
} from '../../services/syllabusApi';

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
  'syllabus/fetchOverview',
  async (_, { rejectWithValue }) => {
    try {
      const [subjects, topics] = await Promise.all([
        syllabusApi.getSubjects('science'),
        syllabusApi.getTopicsByGrade(),
      ]);

      // Keep only science subjects in topicsByGrade
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

      return { subjects, topics: filteredTopics };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch science syllabus data');
    }
  }
);

export const fetchSubjectDetails = createAsyncThunk(
  'syllabus/fetchSubjectDetails',
  async (subject: string, { rejectWithValue }) => {
    try {
      const syllabus = await syllabusApi.getSyllabus(subject);
      return { subject, syllabus };
    } catch (err: any) {
      return rejectWithValue(
        err.message || `Failed to fetch syllabus details for ${subject}`
      );
    }
  }
);

const syllabusSlice = createSlice({
  name: 'syllabus',
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

export default syllabusSlice.reducer;
