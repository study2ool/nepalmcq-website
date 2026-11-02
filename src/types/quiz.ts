import { GradeLevel, SubjectName, DifficultyLevel, Question } from './question';

export type QuestionStatus = 
  | 'not-attempted'
  | 'attempted'
  | 'marked-for-review'
  | 'attempted-and-marked'
  | 'time-expired';

export interface QuizConfig {
  grade: GradeLevel;
  subject: SubjectName | 'All Subjects';
  topic: string; // 'All Topics' or specific topic
  questionCount: number; // 20, 30, 45, 60
  durationMinutes: number; // calculated 1 min per question by default
  difficulty: DifficultyLevel | 'All Levels';
  questionMode: 'random' | 'sequential';
}

export interface QuizSession {
  quizId: string;
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>; // questionId -> optionId
  markedForReview: Record<string, boolean>; // questionId -> boolean
  questionTimeRemaining: Record<string, number>; // questionId -> seconds remaining (max 60)
  overallTimeRemaining: number; // seconds
  startTime: number; // timestamp ms
  lastActiveTimestamp: number; // for drift compensation
  isSubmitted: boolean;
  submittedAt?: number;
  isPaused?: boolean;
}
