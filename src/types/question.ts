export type GradeLevel = 11 | 12;
export type SubjectName =
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Mathematics'
  | 'English'
  | 'Nepali'
  | 'Computer Science';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  grade: GradeLevel;
  subject: SubjectName;
  topic: string;
  difficulty: DifficultyLevel;
  question: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  marks: number;
  source?: 'NEB Model' | 'Entrance Standard' | 'Conceptual Practice';
}

export interface QuestionFilter {
  grade?: GradeLevel;
  subject?: SubjectName | 'All';
  topic?: string;
  difficulty?: DifficultyLevel | 'All';
  count?: number;
  mode?: 'random' | 'sequential';
}
