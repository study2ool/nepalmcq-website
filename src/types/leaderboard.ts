import { SubjectName, GradeLevel } from './question';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'trophy' | 'target' | 'flame' | 'zap' | 'award' | 'star' | 'book' | 'cpu';
  category: 'accuracy' | 'volume' | 'streak' | 'subject';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
  criteria: string;
}

export interface LeaderboardStudent {
  id: string;
  name: string;
  school: string;
  city: string;
  grade: GradeLevel;
  avatarInitials: string;
  avatarBg: string;
  totalXp: number;
  weeklyXp: number;
  examsCompleted: number;
  overallAccuracy: number;
  subjectXp: Record<SubjectName, number>;
  subjectAccuracy: Record<SubjectName, number>;
  streakDays: number;
  topSubject: SubjectName;
  isCurrentUser?: boolean;
  badgesCount: number;
}

export interface SchoolStanding {
  id: string;
  name: string;
  city: string;
  studentCount: number;
  totalXp: number;
  averageAccuracy: number;
  topSubject: SubjectName;
  nationalRank?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  school: string;
  city: string;
  grade: GradeLevel;
  avatarBg: string;
  joinDate: string;
}

export type LeaderboardScope = 'students' | 'schools';
export type TimeframeFilter = 'all-time' | 'weekly';
