import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizConfig } from '../../types/quiz';
import { GradeLevel, SubjectName, DifficultyLevel } from '../../types/question';

const initialState: QuizConfig = {
  grade: 12,
  subject: 'All Subjects',
  topic: 'All Topics',
  questionCount: 60,
  durationMinutes: 60,
  difficulty: 'All Levels',
  questionMode: 'random',
  mode: 'study',
  sourceFilter: 'all',
  year: 'All',
  negativeMarking: false,
  markingScheme: { correctMarks: 1, incorrectPenalty: 0 },
  examPreset: 'custom',
};

export const quizConfigSlice = createSlice({
  name: 'quizConfig',
  initialState,
  reducers: {
    setGrade: (state, action: PayloadAction<GradeLevel>) => {
      state.grade = action.payload;
      state.topic = 'All Topics';
    },
    setSubject: (state, action: PayloadAction<SubjectName | 'All Subjects'>) => {
      state.subject = action.payload;
      state.topic = 'All Topics';
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setQuestionCount: (state, action: PayloadAction<number>) => {
      state.questionCount = action.payload;
      state.durationMinutes = action.payload;
    },
    setDurationMinutes: (state, action: PayloadAction<number>) => {
      state.durationMinutes = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<DifficultyLevel | 'All Levels'>) => {
      state.difficulty = action.payload;
    },
    setQuestionMode: (state, action: PayloadAction<'random' | 'sequential'>) => {
      state.questionMode = action.payload;
    },
    setPracticeMode: (state, action: PayloadAction<'exam' | 'study'>) => {
      state.mode = action.payload;
    },
    setSourceFilter: (
      state,
      action: PayloadAction<'all' | 'past_papers' | 'model_questions'>,
    ) => {
      state.sourceFilter = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setNegativeMarking: (state, action: PayloadAction<boolean>) => {
      state.negativeMarking = action.payload;
      state.markingScheme = {
        correctMarks: 1,
        incorrectPenalty: action.payload ? 0.25 : 0,
      };
    },
    setExamPreset: (
      state,
      action: PayloadAction<'custom' | 'neb_board' | 'cee_medical' | 'ioe_engineering'>,
    ) => {
      state.examPreset = action.payload;
    },
    resetConfig: () => initialState,
    loadConfig: (_state, action: PayloadAction<QuizConfig>) => action.payload,
  },
});

export const {
  setGrade,
  setSubject,
  setTopic,
  setQuestionCount,
  setDurationMinutes,
  setDifficulty,
  setQuestionMode,
  setPracticeMode,
  setSourceFilter,
  setYear,
  setNegativeMarking,
  setExamPreset,
  resetConfig,
  loadConfig,
} = quizConfigSlice.actions;

export const quizConfigReducer = quizConfigSlice.reducer;
export default quizConfigReducer;

