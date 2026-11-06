import { QuizResult } from '../types/results';
import { SubjectName, GradeLevel } from '../types/question';
import {
  Badge,
  LeaderboardStudent,
  SchoolStanding,
  StudentProfile,
  TimeframeFilter,
} from '../types/leaderboard';

const PROFILE_STORAGE_KEY = 'nepalmcq_user_profile';

export const DEFAULT_USER_PROFILE: StudentProfile = {
  id: 'current_user',
  name: 'Student',
  school: 'Secondary School',
  city: 'Nepal',
  grade: 12,
  avatarBg: 'bg-indigo-600',
  joinDate: new Date().toISOString(),
};

export const getStoredUserProfile = (): StudentProfile => {
  try {
    const data = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load user profile from storage', e);
  }
  return DEFAULT_USER_PROFILE;
};

export const saveStoredUserProfile = (profile: StudentProfile): void => {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile to storage', e);
  }
};

/**
 * Calculates XP earned from an individual exam attempt
 */
export const calculateExamXp = (exam: QuizResult): number => {
  let xp = 100; // Base completion bonus
  xp += exam.correctAnswers * 25; // 25 XP per correct answer

  if (exam.accuracy >= 95) {
    xp += 200; // Flawless bonus
  } else if (exam.accuracy >= 90) {
    xp += 150; // Elite accuracy
  } else if (exam.accuracy >= 80) {
    xp += 75; // Strong performance
  }

  return xp;
};

/**
 * Calculate study streak in consecutive calendar days
 */
export const calculateStudyStreak = (history: QuizResult[]): number => {
  if (history.length === 0) return 0;

  // Extract distinct date strings YYYY-MM-DD
  const attemptDates = Array.from(
    new Set(
      history.map((h) => new Date(h.completedAt).toISOString().split('T')[0])
    )
  ).sort().reverse();

  if (attemptDates.length === 0) return 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Must have taken an exam today or yesterday to maintain streak
  if (attemptDates[0] !== todayStr && attemptDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(attemptDates[0]);

  for (let i = 1; i < attemptDates.length; i++) {
    const prevDate = new Date(attemptDates[i]);
    const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Evaluates gamified badges based on user examination history
 */
export const evaluateUserBadges = (history: QuizResult[]): Badge[] => {
  const totalQuestions = history.reduce((acc, h) => acc + h.attemptedQuestions, 0);
  const totalCorrect = history.reduce((acc, h) => acc + h.correctAnswers, 0);
  const totalExams = history.length;
  const maxAccuracy = history.reduce((max, h) => Math.max(max, h.accuracy), 0);
  const streak = calculateStudyStreak(history);

  // Subject specific counts
  const csExams = history.filter((h) => h.config.subject === 'Computer Science');
  const nepaliExams = history.filter((h) => h.config.subject === 'Nepali');
  const mathExams = history.filter((h) => h.config.subject === 'Mathematics');
  const scienceExams = history.filter((h) =>
    ['Physics', 'Chemistry', 'Biology'].includes(h.config.subject)
  );

  return [
    {
      id: 'first_step',
      name: 'First Step to NEB',
      description: 'Completed your first full simulation examination paper.',
      icon: 'award',
      category: 'volume',
      unlocked: totalExams >= 1,
      progress: Math.min(100, (totalExams / 1) * 100),
      criteria: 'Complete 1 examination',
    },
    {
      id: 'centurion',
      name: 'Centurion Scholar',
      description: 'Answered over 100 NEB practice questions.',
      icon: 'target',
      category: 'volume',
      unlocked: totalQuestions >= 100,
      progress: Math.min(100, Math.round((totalQuestions / 100) * 100)),
      criteria: 'Attempt 100 questions',
    },
    {
      id: 'sharpshooter',
      name: 'Exam Marksman',
      description: 'Achieved 90% or higher accuracy in a full examination.',
      icon: 'zap',
      category: 'accuracy',
      unlocked: maxAccuracy >= 90,
      progress: Math.min(100, Math.round((maxAccuracy / 90) * 100)),
      criteria: 'Score 90%+ in any exam',
    },
    {
      id: 'perfectionist',
      name: 'Century Club (100%)',
      description: 'Secured a 100% flawless score in an examination set.',
      icon: 'star',
      category: 'accuracy',
      unlocked: maxAccuracy === 100,
      progress: maxAccuracy === 100 ? 100 : Math.round(maxAccuracy),
      criteria: 'Score 100% in any exam',
    },
    {
      id: 'science_whiz',
      name: 'Science Prodigy',
      description: 'Completed 5 or more examinations in Physics, Chemistry, or Biology.',
      icon: 'trophy',
      category: 'subject',
      unlocked: scienceExams.length >= 5,
      progress: Math.min(100, Math.round((scienceExams.length / 5) * 100)),
      criteria: 'Complete 5 Science exams',
    },
    {
      id: 'math_maestro',
      name: 'Calculus & Vectors Master',
      description: 'Completed 3 or more Mathematics examination sets.',
      icon: 'book',
      category: 'subject',
      unlocked: mathExams.length >= 3,
      progress: Math.min(100, Math.round((mathExams.length / 3) * 100)),
      criteria: 'Complete 3 Math exams',
    },
    {
      id: 'cs_hacker',
      name: 'Byte & Logic Hacker',
      description: 'Tested your knowledge in NEB Computer Science and C programming.',
      icon: 'cpu',
      category: 'subject',
      unlocked: csExams.length >= 2,
      progress: Math.min(100, Math.round((csExams.length / 2) * 100)),
      criteria: 'Complete 2 CS exams',
    },
    {
      id: 'nepali_vidwan',
      name: 'नेपाली साहित्य साधक',
      description: 'Solved Nepali व्याकरण and literature comprehension practice papers.',
      icon: 'book',
      category: 'subject',
      unlocked: nepaliExams.length >= 2,
      progress: Math.min(100, Math.round((nepaliExams.length / 2) * 100)),
      criteria: 'Complete 2 Nepali exams',
    },
    {
      id: 'streaker_3',
      name: 'Relentless Grit',
      description: 'Maintained a 3-day consecutive practice streak.',
      icon: 'flame',
      category: 'streak',
      unlocked: streak >= 3,
      progress: Math.min(100, Math.round((streak / 3) * 100)),
      criteria: 'Maintain a 3-day streak',
    },
  ];
};

/**
 * Builds the current user's LeaderboardStudent entry based on profile & exam history
 */
export const buildCurrentUserLeaderboardEntry = (
  profile: StudentProfile,
  history: QuizResult[]
): LeaderboardStudent => {
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weeklyHistory = history.filter((h) => h.completedAt >= oneWeekAgo);

  const totalXp = history.reduce((sum, h) => sum + calculateExamXp(h), 0);
  const weeklyXp = weeklyHistory.reduce((sum, h) => sum + calculateExamXp(h), 0);

  const totalQuestions = history.reduce((sum, h) => sum + h.attemptedQuestions, 0);
  const totalCorrect = history.reduce((sum, h) => sum + h.correctAnswers, 0);
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 1000) / 10 : 0;

  // Compute subject breakdowns
  const subjectXp: Record<SubjectName, number> = {
    Physics: 0,
    Chemistry: 0,
    Biology: 0,
    Mathematics: 0,
    English: 0,
    Nepali: 0,
    'Computer Science': 0,
    Accounting: 0,
    Economics: 0,
    'Business Studies': 0,
    'Hotel Management': 0,
    'Business Math': 0,
  };

  const subjectStats: Record<SubjectName, { attempted: number; correct: number }> = {
    Physics: { attempted: 0, correct: 0 },
    Chemistry: { attempted: 0, correct: 0 },
    Biology: { attempted: 0, correct: 0 },
    Mathematics: { attempted: 0, correct: 0 },
    English: { attempted: 0, correct: 0 },
    Nepali: { attempted: 0, correct: 0 },
    'Computer Science': { attempted: 0, correct: 0 },
    Accounting: { attempted: 0, correct: 0 },
    Economics: { attempted: 0, correct: 0 },
    'Business Studies': { attempted: 0, correct: 0 },
    'Hotel Management': { attempted: 0, correct: 0 },
    'Business Math': { attempted: 0, correct: 0 },
  };

  history.forEach((h) => {
    const examXp = calculateExamXp(h);
    if (h.config.subject !== 'All Subjects') {
      subjectXp[h.config.subject] += examXp;
      subjectStats[h.config.subject].attempted += h.attemptedQuestions;
      subjectStats[h.config.subject].correct += h.correctAnswers;
    } else {
      // Divide across breakdowns
      h.subjectBreakdown.forEach((sb) => {
        const subXp = Math.round((sb.score / (h.totalMarksObtained || 1)) * examXp);
        subjectXp[sb.subject] += subXp;
        subjectStats[sb.subject].attempted += sb.attempted;
        subjectStats[sb.subject].correct += sb.correct;
      });
    }
  });

  const subjectAccuracy: Record<SubjectName, number> = {
    Physics: 0,
    Chemistry: 0,
    Biology: 0,
    Mathematics: 0,
    English: 0,
    Nepali: 0,
    'Computer Science': 0,
    Accounting: 0,
    Economics: 0,
    'Business Studies': 0,
    'Hotel Management': 0,
    'Business Math': 0,
  };

  let topSubject: SubjectName = 'Physics';
  let maxSubXp = -1;

  (Object.keys(subjectStats) as SubjectName[]).forEach((sub) => {
    const stat = subjectStats[sub];
    subjectAccuracy[sub] =
      stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
    if (subjectXp[sub] > maxSubXp) {
      maxSubXp = subjectXp[sub];
      topSubject = sub;
    }
  });

  const badges = evaluateUserBadges(history);
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  // Extract initials
  const parts = profile.name.trim().split(' ');
  const initials =
    parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : profile.name.slice(0, 2).toUpperCase();

  return {
    id: profile.id,
    name: profile.name,
    school: profile.school,
    city: profile.city,
    grade: profile.grade,
    avatarInitials: initials || 'ME',
    avatarBg: profile.avatarBg,
    totalXp: totalXp + 250, // Starter encouragement XP
    weeklyXp: weeklyXp + (history.length > 0 ? 100 : 0),
    examsCompleted: history.length,
    overallAccuracy: overallAccuracy || (history.length > 0 ? 75 : 0),
    subjectXp,
    subjectAccuracy,
    streakDays: calculateStudyStreak(history),
    topSubject,
    isCurrentUser: true,
    badgesCount: unlockedBadgesCount,
  };
};

/**
 * Compiles and sorts genuine student rankings based on exam attempts
 */
export const getRankedStudents = (
  currentUser: LeaderboardStudent,
  gradeFilter: 'All' | GradeLevel,
  subjectFilter: 'All' | SubjectName,
  timeframe: TimeframeFilter,
  schoolFilter?: string,
  peerStudents: LeaderboardStudent[] = []
): LeaderboardStudent[] => {
  let list = currentUser.examsCompleted > 0
    ? [currentUser, ...peerStudents.filter((s) => s.id !== currentUser.id)]
    : [...peerStudents];

  // Grade filter
  if (gradeFilter !== 'All') {
    list = list.filter((s) => s.grade === gradeFilter);
  }

  // School filter
  if (schoolFilter && schoolFilter !== 'All Schools') {
    list = list.filter((s) => s.school.toLowerCase().includes(schoolFilter.toLowerCase()));
  }

  // Sort score criteria
  list.sort((a, b) => {
    if (subjectFilter !== 'All') {
      const xpA = a.subjectXp[subjectFilter] || 0;
      const xpB = b.subjectXp[subjectFilter] || 0;
      if (xpB !== xpA) return xpB - xpA;
      return (b.subjectAccuracy[subjectFilter] || 0) - (a.subjectAccuracy[subjectFilter] || 0);
    }

    if (timeframe === 'weekly') {
      if (b.weeklyXp !== a.weeklyXp) return b.weeklyXp - a.weeklyXp;
      return b.overallAccuracy - a.overallAccuracy;
    }

    // Default: All time XP
    if (b.totalXp !== a.totalXp) return b.totalXp - a.totalXp;
    return b.overallAccuracy - a.overallAccuracy;
  });

  return list;
};

/**
 * Aggregates school standings from student records
 */
export const getRankedSchools = (
  students: LeaderboardStudent[]
): SchoolStanding[] => {
  const schoolMap: Record<
    string,
    {
      name: string;
      city: string;
      studentCount: number;
      totalXp: number;
      accuracySum: number;
      subjectXpMap: Record<SubjectName, number>;
    }
  > = {};

  students.forEach((s) => {
    if (!schoolMap[s.school]) {
      schoolMap[s.school] = {
        name: s.school,
        city: s.city,
        studentCount: 0,
        totalXp: 0,
        accuracySum: 0,
        subjectXpMap: {
          Physics: 0,
          Chemistry: 0,
          Biology: 0,
          Mathematics: 0,
          English: 0,
          Nepali: 0,
          'Computer Science': 0,
          Accounting: 0,
          Economics: 0,
          'Business Studies': 0,
          'Hotel Management': 0,
          'Business Math': 0,
        },
      };
    }

    const school = schoolMap[s.school];
    school.studentCount += 1;
    school.totalXp += s.totalXp;
    school.accuracySum += s.overallAccuracy;

    (Object.keys(s.subjectXp) as SubjectName[]).forEach((sub) => {
      school.subjectXpMap[sub] += s.subjectXp[sub] || 0;
    });
  });

  const standings: SchoolStanding[] = Object.values(schoolMap).map((sch, index) => {
    let topSubject: SubjectName = 'Physics';
    let maxSubXp = -1;

    (Object.keys(sch.subjectXpMap) as SubjectName[]).forEach((sub) => {
      if (sch.subjectXpMap[sub] > maxSubXp) {
        maxSubXp = sch.subjectXpMap[sub];
        topSubject = sub;
      }
    });

    return {
      id: `sch_${index}`,
      name: sch.name,
      city: sch.city,
      studentCount: sch.studentCount,
      totalXp: sch.totalXp,
      averageAccuracy: Math.round((sch.accuracySum / (sch.studentCount || 1)) * 10) / 10,
      topSubject,
    };
  });

  standings.sort((a, b) => {
    if (b.totalXp !== a.totalXp) return b.totalXp - a.totalXp;
    return b.averageAccuracy - a.averageAccuracy;
  });

  return standings.map((s, idx) => ({ ...s, nationalRank: idx + 1 }));
};
