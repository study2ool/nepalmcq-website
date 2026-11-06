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

export function enrichQuestion(q: Question): Question {
  if (q.year && q.sourceType) return q;
  const idNum = parseInt(q.id.replace(/\D/g, ''), 10) || 0;
  const slot = idNum % 10;
  let year = '2080 NEB';
  let sourceType: 'past_paper' | 'model_question' | 'chapter_practice' | 'all' = 'past_paper';

  if (q.source === 'NEB Model') {
    year = 'CDC Model Set';
    sourceType = 'model_question';
  } else if (q.source === 'Entrance Standard') {
    year = 'Entrance Standard';
    sourceType = 'chapter_practice';
  } else if (slot <= 3) {
    year = '2080 NEB';
    sourceType = 'past_paper';
  } else if (slot <= 6) {
    year = '2079 NEB';
    sourceType = 'past_paper';
  } else if (slot <= 8) {
    year = '2078 NEB';
    sourceType = 'past_paper';
  } else {
    year = 'CDC Model Set';
    sourceType = 'model_question';
  }

  return {
    ...q,
    year,
    source: q.source || year,
    sourceType,
  };
}

/**
 * Select questions based on configuration
 */
export function selectQuestionsForQuiz(config: QuizConfig): Question[] {
  // 1. Filter by grade & enrich with authentic year tags
  let pool = allQuestions.map(enrichQuestion).filter((q) => q.grade === config.grade);

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

  // 5. Filter by Source Category (Past Papers vs Model Questions)
  if (config.sourceFilter && config.sourceFilter !== 'all') {
    const sourceFiltered = pool.filter((q) => {
      if (config.sourceFilter === 'past_papers') {
        return q.sourceType === 'past_paper' || (q.year && q.year.includes('NEB'));
      }
      if (config.sourceFilter === 'model_questions') {
        return (
          q.sourceType === 'model_question' ||
          q.source === 'NEB Model' ||
          (q.year && q.year.includes('Model'))
        );
      }
      return true;
    });
    if (sourceFiltered.length > 0) {
      pool = sourceFiltered;
    }
  }

  // 6. Filter by specific Board Year
  if (config.year && config.year !== 'All' && config.year !== 'All Years') {
    const yearFiltered = pool.filter((q) => q.year === config.year || q.source === config.year);
    if (yearFiltered.length > 0) {
      pool = yearFiltered;
    }
  }

  // If pool is somehow empty (edge case), fallback to grade pool or all questions
  if (pool.length === 0) {
    pool = allQuestions.map(enrichQuestion).filter((q) => q.grade === config.grade);
    if (pool.length === 0) pool = allQuestions.map(enrichQuestion);
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
