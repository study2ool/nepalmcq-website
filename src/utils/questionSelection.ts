import { Question, QuestionOption } from '../types/question';
import { QuizConfig } from '../types/quiz';
import { allQuestions } from '../data/questions';

/**
 * Shuffles array elements in-place using Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Randomize options of a question while preserving correct answer mapping
 */
export function randomizeQuestionOptions(q: Question): Question {
  const originalCorrectText = q.options.find((opt) => opt.id === q.correctAnswer)?.text;
  const shuffledTexts = shuffleArray(q.options.map((opt) => opt.text));

  const optionKeys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const newOptions: QuestionOption[] = optionKeys.map((key, idx) => ({
    id: key,
    text: shuffledTexts[idx],
  }));

  const newCorrectAnswer = newOptions.find((opt) => opt.text === originalCorrectText)?.id || 'A';

  return {
    ...q,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

/**
 * Select questions based on configuration
 */
export function selectQuestionsForQuiz(config: QuizConfig): Question[] {
  // 1. Filter by grade
  let pool = allQuestions.filter((q) => q.grade === config.grade);

  // 2. Filter by subject
  if (config.subject !== 'All Subjects') {
    pool = pool.filter((q) => q.subject === config.subject);
  }

  // 3. Filter by topic
  if (config.topic !== 'All Topics' && config.topic) {
    const topicFiltered = pool.filter((q) => q.topic.toLowerCase() === config.topic.toLowerCase());
    if (topicFiltered.length > 0) {
      pool = topicFiltered;
    }
  }

  // 4. Filter by difficulty
  if (config.difficulty !== 'All Levels') {
    const diffFiltered = pool.filter((q) => q.difficulty === config.difficulty);
    if (diffFiltered.length > 0) {
      pool = diffFiltered;
    }
  }

  // If pool is somehow empty (edge case), fallback to grade pool or all questions
  if (pool.length === 0) {
    pool = allQuestions.filter((q) => q.grade === config.grade);
    if (pool.length === 0) pool = [...allQuestions];
  }

  // Shuffle pool if random mode
  let selected: Question[] = [];
  if (config.questionMode === 'random') {
    selected = shuffleArray(pool);
  } else {
    selected = [...pool];
  }

  // Ensure requested count is reached:
  // If requested count > available in pool, we can cyclically take with distinct ID suffixes
  const targetCount = config.questionCount;
  const result: Question[] = [];

  for (let i = 0; i < targetCount; i++) {
    const baseQuestion = selected[i % selected.length];
    if (i < selected.length) {
      // First round: use question directly (optionally shuffle options in random mode)
      result.push(config.questionMode === 'random' ? randomizeQuestionOptions(baseQuestion) : baseQuestion);
    } else {
      // Variation: distinct ID so selection state won't clash
      const variation: Question = {
        ...baseQuestion,
        id: `${baseQuestion.id}-var${Math.floor(i / selected.length)}`,
      };
      result.push(randomizeQuestionOptions(variation));
    }
  }

  return result;
}
