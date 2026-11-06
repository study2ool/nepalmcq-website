import { Question } from "../../types/question";

export const businessMathQuestions: Question[] = [
  // --- GRADE 11 BUSINESS MATH ---
  {
    id: "bm-11-01",
    grade: 11,
    subject: "Business Math",
    topic: "Financial Mathematics",
    difficulty: "Medium",
    question:
      "A sum of money Rs. 10,000 is deposited in a commercial bank at 10% per annum compounded semi-annually. What is the compound amount at the end of 2 years?",
    options: [
      { id: "A", text: "Rs. 12,100" },
      { id: "B", text: "Rs. 12,155.06" },
      { id: "C", text: "Rs. 12,000" },
      { id: "D", text: "Rs. 11,500" },
    ],
    correctAnswer: "B",
    explanation:
      "Using the semi-annual compounding formula: $A = P\\left(1 + \\frac{R}{200}\\right)^{2T} = 10000\\left(1 + \\frac{10}{200}\\right)^{4} = 10000(1.05)^4 \\approx \\text{Rs. } 12,155.06$.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },
  {
    id: "bm-11-02",
    grade: 11,
    subject: "Business Math",
    topic: "Matrices and Determinants",
    difficulty: "Medium",
    question:
      "If a system of linear equations is solved by Cramer’s rule and the determinant of coefficients $D = 0$ while at least one of $D_x, D_y \\ne 0$, then the system has:",
    options: [
      { id: "A", text: "A unique solution" },
      { id: "B", text: "Infinitely many solutions" },
      { id: "C", text: "No solution (Inconsistent)" },
      { id: "D", text: "Trivial solution only" },
    ],
    correctAnswer: "C",
    explanation:
      "In Cramer’s rule, if the coefficient determinant $D = 0$ and any numerator determinant ($D_x, D_y, D_z$) is non-zero, the system is inconsistent and has no solution.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
  {
    id: "bm-11-03",
    grade: 11,
    subject: "Business Math",
    topic: "Linear Programming",
    difficulty: "Easy",
    question:
      "In a linear programming problem (LPP), the optimal value (maximum or minimum) of an objective function always occurs at:",
    options: [
      { id: "A", text: "The center of the feasible region" },
      {
        id: "B",
        text: "At least one of the corner (vertex) points of the feasible region",
      },
      { id: "C", text: "Any point strictly outside the feasible boundary" },
      { id: "D", text: "The origin only" },
    ],
    correctAnswer: "B",
    explanation:
      "By the Fundamental Theorem of Linear Programming, an optimal solution to a bounded feasible region always occurs at one or more corner (vertex) points.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },

  // --- GRADE 12 BUSINESS MATH ---
  {
    id: "bm-12-01",
    grade: 12,
    subject: "Business Math",
    topic: "Differential Calculus in Business",
    difficulty: "Medium",
    question:
      "The total cost function of producing $x$ units is $C(x) = 500 + 20x + 0.1x^2$. What is the marginal cost ($MC$) when output $x = 50$ units?",
    options: [
      { id: "A", text: "Rs. 20" },
      { id: "B", text: "Rs. 30" },
      { id: "C", text: "Rs. 25" },
      { id: "D", text: "Rs. 35" },
    ],
    correctAnswer: "B",
    explanation:
      "Marginal cost is the derivative of total cost: $MC = \\frac{dC}{dx} = 20 + 0.2x$. At $x = 50$, $MC = 20 + 0.2(50) = 20 + 10 = \\text{Rs. } 30$.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "bm-12-02",
    grade: 12,
    subject: "Business Math",
    topic: "Integral Calculus in Business",
    difficulty: "Hard",
    question:
      "If the marginal revenue function is given by $MR = 40 - 2x$, what is the total revenue ($TR$) function assuming $TR = 0$ when $x = 0$?",
    options: [
      { id: "A", text: "$TR = 40x - x^2$" },
      { id: "B", text: "$TR = 40 - 2x$" },
      { id: "C", text: "$TR = 20x - 2x^2$" },
      { id: "D", text: "$TR = 40x - 2x^2$" },
    ],
    correctAnswer: "A",
    explanation:
      "Total revenue is obtained by integrating marginal revenue: $TR = \\int MR \\, dx = \\int (40 - 2x)\\, dx = 40x - x^2 + C$. Since $TR(0) = 0$, $C = 0 \\implies TR = 40x - x^2$.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },
  {
    id: "bm-12-03",
    grade: 12,
    subject: "Business Math",
    topic: "Time Series and Index Numbers",
    difficulty: "Easy",
    question:
      'Which index number formula is termed the "Ideal Index Number" because it satisfies both the Time Reversal Test and the Factor Reversal Test?',
    options: [
      { id: "A", text: "Laspeyres' Index" },
      { id: "B", text: "Paasche's Index" },
      { id: "C", text: "Fisher's Ideal Index" },
      { id: "D", text: "Marshall-Edgeworth Index" },
    ],
    correctAnswer: "C",
    explanation:
      "Fisher's index number is the geometric mean of Laspeyres' and Paasche's index numbers ($F = \\sqrt{L \\times P}$), satisfying both the Time Reversal and Factor Reversal tests.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
];
