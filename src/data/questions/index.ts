import { Question } from '../../types/question';
import { physicsQuestions } from './physicsQuestions';
import { chemistryQuestions } from './chemistryQuestions';
import { biologyQuestions } from './biologyQuestions';
import { additionalQuestions } from './additionalQuestions';
import { mathQuestions } from './mathQuestions';
import { englishQuestions } from './englishQuestions';
import { nepaliQuestions } from './nepaliQuestions';
import { computerScienceQuestions } from './computerScienceQuestions';

export const allQuestions: Question[] = [
  ...physicsQuestions,
  ...chemistryQuestions,
  ...biologyQuestions,
  ...additionalQuestions,
  ...mathQuestions,
  ...englishQuestions,
  ...nepaliQuestions,
  ...computerScienceQuestions,
];
