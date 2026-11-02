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
  resetConfig,
  loadConfig,
} = quizConfigSlice.actions;

export const quizConfigReducer = quizConfigSlice.reducer;
export default quizConfigReducer;

