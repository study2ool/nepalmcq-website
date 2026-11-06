import { Question } from "../../types/question";

export const businessStudiesQuestions: Question[] = [
  // --- GRADE 11 BUSINESS STUDIES ---
  {
    id: "bst-11-01",
    grade: 11,
    subject: "Business Studies",
    topic: "Nature and Purpose of Business",
    difficulty: "Easy",
    question:
      "Which of the following is considered the primary economic objective of any commercial business enterprise?",
    options: [
      { id: "A", text: "Social community service" },
      { id: "B", text: "Earning profit through customer satisfaction" },
      { id: "C", text: "Payment of corporate taxes" },
      { id: "D", text: "Providing employee recreational amenities" },
    ],
    correctAnswer: "B",
    explanation:
      "While businesses have social, human, and national objectives, their primary economic objective is profit earning through creating customers and delivering value.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },
  {
    id: "bst-11-02",
    grade: 11,
    subject: "Business Studies",
    topic: "Forms of Business Organization",
    difficulty: "Medium",
    question:
      "In a partnership business in Nepal, what is the legal liability of the partners unless otherwise registered as limited partners?",
    options: [
      { id: "A", text: "Limited to their invested capital only" },
      { id: "B", text: "Unlimited, joint, and several liability" },
      { id: "C", text: "Limited to the market value of company assets" },
      { id: "D", text: "Zero personal financial obligation" },
    ],
    correctAnswer: "B",
    explanation:
      "Under traditional general partnership law in Nepal, all partners bear unlimited, joint, and individual (several) liability for business debts, meaning personal assets can be attached.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
  {
    id: "bst-11-03",
    grade: 11,
    subject: "Business Studies",
    topic: "Business Support Services & Banking",
    difficulty: "Medium",
    question:
      "Which instrument issued by commercial banks acts as a financial guarantee that a buyer will pay a seller on time and for the correct amount?",
    options: [
      { id: "A", text: "Promissory Note" },
      { id: "B", text: "Letter of Credit (L/C)" },
      { id: "C", text: "Demand Draft" },
      { id: "D", text: "Bearer Cheque" },
    ],
    correctAnswer: "B",
    explanation:
      "A Letter of Credit (L/C) is a formal document issued by a financial institution assuring the payment of goods or services upon presentation of specified shipping documents.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },

  // --- GRADE 12 BUSINESS STUDIES ---
  {
    id: "bst-12-01",
    grade: 12,
    subject: "Business Studies",
    topic: "Principles of Management",
    difficulty: "Easy",
    question:
      'Who is widely recognized as the "Father of Scientific Management" for introducing time and motion studies, differential piece-rate systems, and standardization?',
    options: [
      { id: "A", text: "Henri Fayol" },
      { id: "B", text: "Frederick Winslow Taylor (F.W. Taylor)" },
      { id: "C", text: "Peter F. Drucker" },
      { id: "D", text: "Elton Mayo" },
    ],
    correctAnswer: "B",
    explanation:
      "F.W. Taylor is revered as the Father of Scientific Management, while Henri Fayol is regarded as the Father of Administrative/General Management.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "bst-12-02",
    grade: 12,
    subject: "Business Studies",
    topic: "Functions of Management",
    difficulty: "Medium",
    question:
      'The management principle "Unity of Command" stated by Henri Fayol means that:',
    options: [
      {
        id: "A",
        text: "All organizational departments should head towards one common goal",
      },
      {
        id: "B",
        text: "An employee should receive orders from only one superior at any given time",
      },
      {
        id: "C",
        text: "Top managers should delegate all decision-making authority",
      },
      { id: "D", text: "Wages should be strictly identical for all employees" },
    ],
    correctAnswer: "B",
    explanation:
      "Unity of Command dictates that each subordinate should have only one direct boss from whom they receive orders and to whom they are directly answerable.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "model_question",
  },
  {
    id: "bst-12-03",
    grade: 12,
    subject: "Business Studies",
    topic: "Marketing Management",
    difficulty: "Medium",
    question:
      'Which of the following elements comprise the traditional "4 Ps" of the marketing mix introduced by E. Jerome McCarthy?',
    options: [
      { id: "A", text: "People, Process, Physical Evidence, Profit" },
      { id: "B", text: "Product, Price, Place, Promotion" },
      { id: "C", text: "Planning, Positioning, Packaging, Publicity" },
      { id: "D", text: "Production, Purchasing, Pricing, Prospecting" },
    ],
    correctAnswer: "B",
    explanation:
      "The classic 4 Ps of the marketing mix are Product, Price, Place (distribution), and Promotion.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
];
