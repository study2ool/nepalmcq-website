import { Question } from "../../types/question";
import { physicsQuestions } from "./physicsQuestions";
import { chemistryQuestions } from "./chemistryQuestions";
import { biologyQuestions } from "./biologyQuestions";
import { additionalQuestions } from "./additionalQuestions";
import { mathQuestions } from "./mathQuestions";
import { englishQuestions } from "./englishQuestions";
import { nepaliQuestions } from "./nepaliQuestions";
import { computerScienceQuestions } from "./computerScienceQuestions";
import { accountingQuestions } from "./accountingQuestions";
import { economicsQuestions } from "./economicsQuestions";
import { businessStudiesQuestions } from "./businessStudiesQuestions";
import { hotelManagementQuestions } from "./hotelManagementQuestions";
import { businessMathQuestions } from "./businessMathQuestions";

export const allQuestions: Question[] = [
  ...physicsQuestions,
  ...chemistryQuestions,
  ...biologyQuestions,
  ...additionalQuestions,
  ...mathQuestions,
  ...englishQuestions,
  ...nepaliQuestions,
  ...computerScienceQuestions,
  ...accountingQuestions,
  ...economicsQuestions,
  ...businessStudiesQuestions,
  ...hotelManagementQuestions,
  ...businessMathQuestions,
];
