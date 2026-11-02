import { Question, SubjectName } from './question';
import { QuizConfig } from './quiz';

export interface QuestionResult {
  question: Question;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  status: 'correct' | 'incorrect' | 'unattempted';
  timeSpentSeconds: number;
}

export interface SubjectBreakdown {
  subject: SubjectName;
  total: number;
  attempted: number;
  correct: number;
  accuracy: number;
  score: number;
}

export interface TopicBreakdown {
  topic: string;
  subject: SubjectName;
  total: number;
  attempted: number;
  correct: number;
  accuracy: number;
}

export interface QuizResult {
  id: string;
  config: QuizConfig;
  completedAt: number; // timestamp
  totalQuestions: number;
  attemptedQuestions: number;
  unattemptedQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number; // percentage 0-100
  totalMarksObtained: number;
  totalPossibleMarks: number;
  timeTakenSeconds: number;
  averageTimePerQuestionSeconds: number;
  questionResults: QuestionResult[];
  subjectBreakdown: SubjectBreakdown[];
  topicBreakdown: TopicBreakdown[];
}
