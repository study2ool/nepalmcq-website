import { QuizSession } from '../types/quiz';
import { QuizResult, QuestionResult, SubjectBreakdown, TopicBreakdown } from '../types/results';
import { SubjectName } from '../types/question';

export function calculateQuizResult(
  session: QuizSession,
  markingScheme: { correctMarks: number; incorrectPenalty: number } = { correctMarks: 1, incorrectPenalty: 0 }
): QuizResult {
  const { questions, selectedAnswers, questionTimeRemaining, config, startTime } = session;

  const totalQuestions = questions.length;
  let attemptedQuestions = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let totalMarksObtained = 0;

  const questionResults: QuestionResult[] = [];

  // Subject and topic map trackers
  const subjectMap = new Map<SubjectName, { total: number; attempted: number; correct: number; score: number }>();
  const topicMap = new Map<string, { subject: SubjectName; total: number; attempted: number; correct: number }>();

  questions.forEach((q) => {
    const selected = selectedAnswers[q.id];
    const isAttempted = !!selected;
    const isCorrect = isAttempted && selected === q.correctAnswer;

    // Time spent: 60 - remaining (or default 60 if expired or not tracked)
    const remaining = questionTimeRemaining[q.id] ?? 60;
    const timeSpent = Math.max(0, 60 - remaining);

    if (isAttempted) {
      attemptedQuestions += 1;
      if (isCorrect) {
        correctAnswers += 1;
        totalMarksObtained += markingScheme.correctMarks;
      } else {
        incorrectAnswers += 1;
        totalMarksObtained -= markingScheme.incorrectPenalty;
      }
    }

    const status = !isAttempted ? 'unattempted' : isCorrect ? 'correct' : 'incorrect';

    questionResults.push({
      question: q,
      selectedAnswer: selected,
      isCorrect,
      status,
      timeSpentSeconds: timeSpent,
    });

    // Subject stats
    if (!subjectMap.has(q.subject)) {
      subjectMap.set(q.subject, { total: 0, attempted: 0, correct: 0, score: 0 });
    }
    const subStat = subjectMap.get(q.subject)!;
    subStat.total += 1;
    if (isAttempted) {
      subStat.attempted += 1;
      if (isCorrect) {
        subStat.correct += 1;
        subStat.score += markingScheme.correctMarks;
      } else {
        subStat.score -= markingScheme.incorrectPenalty;
      }
    }

    // Topic stats
    if (!topicMap.has(q.topic)) {
      topicMap.set(q.topic, { subject: q.subject, total: 0, attempted: 0, correct: 0 });
    }
    const topStat = topicMap.get(q.topic)!;
    topStat.total += 1;
    if (isAttempted) {
      topStat.attempted += 1;
      if (isCorrect) {
        topStat.correct += 1;
      }
    }
  });

  const unattemptedQuestions = totalQuestions - attemptedQuestions;
  const accuracy = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100 * 10) / 10 : 0;
  const totalPossibleMarks = totalQuestions * markingScheme.correctMarks;

  const now = Date.now();
  const timeTakenSeconds = Math.max(1, Math.round((now - startTime) / 1000));
  const averageTimePerQuestionSeconds = Math.round(timeTakenSeconds / totalQuestions);

  const subjectBreakdown: SubjectBreakdown[] = Array.from(subjectMap.entries()).map(([subject, stats]) => ({
    subject,
    total: stats.total,
    attempted: stats.attempted,
    correct: stats.correct,
    accuracy: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
    score: stats.score,
  }));

  const topicBreakdown: TopicBreakdown[] = Array.from(topicMap.entries()).map(([topic, stats]) => ({
    topic,
    subject: stats.subject,
    total: stats.total,
    attempted: stats.attempted,
    correct: stats.correct,
    accuracy: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
  }));

  return {
    id: session.quizId,
    config,
    completedAt: now,
    totalQuestions,
    attemptedQuestions,
    unattemptedQuestions,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    totalMarksObtained: Math.max(0, totalMarksObtained),
    totalPossibleMarks,
    timeTakenSeconds,
    averageTimePerQuestionSeconds,
    questionResults,
    subjectBreakdown,
    topicBreakdown,
  };
}
