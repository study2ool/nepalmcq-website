import { Question } from "../../types/question";

export const accountingQuestions: Question[] = [
  // --- GRADE 11 ACCOUNTING ---
  {
    id: "acc-11-01",
    grade: 11,
    subject: "Accounting",
    topic: "Accounting Equation",
    difficulty: "Easy",
    question:
      "According to the fundamental accounting equation, which of the following expressions is always true for any business entity?",
    options: [
      {
        id: "A",
        text: "$\\text{Assets} = \\text{Liabilities} - \\text{Capital}$",
      },
      {
        id: "B",
        text: "$\\text{Assets} = \\text{Liabilities} + \\text{Capital}$",
      },
      {
        id: "C",
        text: "$\\text{Capital} = \\text{Assets} + \\text{Liabilities}$",
      },
      {
        id: "D",
        text: "$\\text{Liabilities} = \\text{Assets} + \\text{Capital}$",
      },
    ],
    correctAnswer: "B",
    explanation:
      "The fundamental accounting equation is $\\text{Assets} = \\text{Liabilities} + \\text{Capital}$ (or Owner's Equity). Every debit entry has a corresponding credit, ensuring the equality of total economic resources and claims against those resources.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "acc-11-02",
    grade: 11,
    subject: "Accounting",
    topic: "Accounting Principles and Concepts",
    difficulty: "Medium",
    question:
      "The accounting convention stating that all anticipated future losses must be recorded, but unrealized anticipated gains must not be recognized, is known as:",
    options: [
      { id: "A", text: "Materiality concept" },
      { id: "B", text: "Conservatism (Prudence) convention" },
      { id: "C", text: "Going concern concept" },
      { id: "D", text: "Consistency convention" },
    ],
    correctAnswer: "B",
    explanation:
      'The Prudence (Conservatism) convention requires accountants to "anticipate no profits, but provide for all foreseeable losses and liabilities." This is the basis for creating provision for doubtful debts and valuing closing stock at cost or net realizable value (NRV), whichever is lower.',
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
  {
    id: "acc-11-03",
    grade: 11,
    subject: "Accounting",
    topic: "Journal and Ledger Accounting",
    difficulty: "Easy",
    question:
      "Goods costing NPR 15,000 are sold for cash at a 10% trade discount. What amount is credited to the Sales Account in the journal entry?",
    options: [
      { id: "A", text: "NPR 15,000" },
      { id: "B", text: "NPR 13,500" },
      { id: "C", text: "NPR 1,500" },
      { id: "D", text: "NPR 16,500" },
    ],
    correctAnswer: "B",
    explanation:
      "Trade discount is deducted directly from list price and is not separately recorded in the books of accounts. Net sales price $= 15,000 - (10\\% \\times 15,000) = 15,000 - 1,500 = \\text{NPR } 13,500$. Cash A/c is debited with NPR 13,500 and Sales A/c is credited with NPR 13,500.",
    marks: 1,
    source: "CDC Model Set",
    year: "CDC Model Set",
    sourceType: "model_question",
  },
  {
    id: "acc-11-04",
    grade: 11,
    subject: "Accounting",
    topic: "Depreciation Accounting",
    difficulty: "Medium",
    question:
      "Machinery was purchased on 1st Shrawan for NPR 200,000. Installation expenses were NPR 20,000. Scrap value after 10 years is estimated at NPR 20,000. Under the Straight Line Method (SLM), what is the annual depreciation charge?",
    options: [
      { id: "A", text: "NPR 18,000" },
      { id: "B", text: "NPR 20,000" },
      { id: "C", text: "NPR 22,000" },
      { id: "D", text: "NPR 24,000" },
    ],
    correctAnswer: "B",
    explanation:
      "Total cost of machinery $= \\text{Purchase Price} + \\text{Installation} = 200,000 + 20,000 = \\text{NPR } 220,000$. Annual depreciation $= \\frac{\\text{Cost} - \\text{Scrap Value}}{\\text{Useful Life}} = \\frac{220,000 - 20,000}{10} = \\frac{200,000}{10} = \\text{NPR } 20,000$.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "acc-11-05",
    grade: 11,
    subject: "Accounting",
    topic: "Bank Reconciliation Statement",
    difficulty: "Medium",
    question:
      "While preparing a Bank Reconciliation Statement starting with Cash Book balance, a cheque issued for NPR 12,000 but not yet presented for payment at the bank should be:",
    options: [
      { id: "A", text: "Deducted from the Cash Book balance" },
      { id: "B", text: "Added to the Cash Book balance" },
      { id: "C", text: "Ignored completely" },
      { id: "D", text: "Credited to Profit & Loss account" },
    ],
    correctAnswer: "B",
    explanation:
      "When a cheque is issued, the Cash Book is immediately credited (reduced), but the Pass Book bank balance remains unchanged because payment hasn't been cleared. To reconcile from Cash Book to Pass Book, the unpresented cheque must be added back.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
  {
    id: "acc-11-06",
    grade: 11,
    subject: "Accounting",
    topic: "Government Accounting",
    difficulty: "Hard",
    question:
      "In the Government Accounting System of Nepal (New Accounting System), which Auditing General Form (AGF) number is officially designated for the Journal Voucher (Goswara Voucher)?",
    options: [
      { id: "A", text: "AGF No. 10" },
      { id: "B", text: "AGF No. 13" },
      { id: "C", text: "AGF No. 20" },
      { id: "D", text: "AGF No. 208" },
    ],
    correctAnswer: "A",
    explanation:
      "In the New Accounting System of the Government of Nepal introduced in 2019 BS, Auditing General Form No. 10 (AGF No. 10) is the official standard form used for preparing the Goswara Voucher (Journal Voucher).",
    marks: 1,
    source: "CDC Model Set",
    year: "CDC Model Set",
    sourceType: "model_question",
  },

  // --- GRADE 12 ACCOUNTING ---
  {
    id: "acc-12-01",
    grade: 12,
    subject: "Accounting",
    topic: "Accounting for Share Capital",
    difficulty: "Medium",
    question:
      "A company forfeits 500 equity shares of NPR 100 each for non-payment of final call money of NPR 30 per share. Application and allotment money of NPR 70 per share was already received. What amount is credited to the Share Forfeiture Account?",
    options: [
      { id: "A", text: "NPR 15,000" },
      { id: "B", text: "NPR 35,000" },
      { id: "C", text: "NPR 50,000" },
      { id: "D", text: "NPR 20,000" },
    ],
    correctAnswer: "B",
    explanation:
      "Upon forfeiture of shares, the amount already collected from defaulting shareholders is transferred to the Share Forfeiture Account. Amount credited $= 500 \\text{ shares} \\times \\text{NPR } 70 = \\text{NPR } 35,000$.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "acc-12-02",
    grade: 12,
    subject: "Accounting",
    topic: "Financial Statement Analysis",
    difficulty: "Medium",
    question:
      "A firm has Current Assets of NPR 300,000, Closing Inventory of NPR 60,000, Prepaid Expenses of NPR 15,000, and Current Liabilities of NPR 150,000. What is its Quick Ratio (Liquid Ratio)?",
    options: [
      { id: "A", text: "$2.0 : 1$" },
      { id: "B", text: "$1.5 : 1$" },
      { id: "C", text: "$1.0 : 1$" },
      { id: "D", text: "$0.8 : 1$" },
    ],
    correctAnswer: "B",
    explanation:
      "Quick Assets $= \\text{Current Assets} - (\\text{Inventory} + \\text{Prepaid Expenses}) = 300,000 - (60,000 + 15,000) = 300,000 - 75,000 = \\text{NPR } 225,000$. Quick Ratio $= \\frac{\\text{Quick Assets}}{\\text{Current Liabilities}} = \\frac{225,000}{150,000} = 1.5 : 1$.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "acc-12-03",
    grade: 12,
    subject: "Accounting",
    topic: "Cash Flow Statement",
    difficulty: "Medium",
    question:
      "Under the Nepal Accounting Standard for Statement of Cash Flows (NAS 07), which of the following is classified strictly as an Investing Activity?",
    options: [
      { id: "A", text: "Cash received from issuing share capital" },
      { id: "B", text: "Cash proceeds from disposal of plant and equipment" },
      { id: "C", text: "Cash paid to suppliers for raw material purchase" },
      { id: "D", text: "Payment of dividends to shareholders" },
    ],
    correctAnswer: "B",
    explanation:
      "Cash flows from investing activities encompass the acquisition and disposal of long-term assets and investments not included in cash equivalents. Sale or purchase of property, plant, and equipment is an investing activity.",
    marks: 1,
    source: "CDC Model Set",
    year: "CDC Model Set",
    sourceType: "model_question",
  },
  {
    id: "acc-12-04",
    grade: 12,
    subject: "Accounting",
    topic: "Cost and Management Accounting",
    difficulty: "Hard",
    question:
      "Annual demand for raw material is $A = 10,000\\text{ units}$, ordering cost per order is $O = \\text{NPR } 50$, and carrying cost per unit per year is $C = \\text{NPR } 4$. What is the Economic Order Quantity (EOQ)?",
    options: [
      { id: "A", text: "354 units" },
      { id: "B", text: "500 units" },
      { id: "C", text: "1,000 units" },
      { id: "D", text: "2,500 units" },
    ],
    correctAnswer: "B",
    explanation:
      "Economic Order Quantity is given by Wilson's formula: $\\text{EOQ} = \\sqrt{\\frac{2AO}{C}} = \\sqrt{\\frac{2 \\times 10,000 \\times 50}{4}} = \\sqrt{\\frac{1,000,000}{4}} = \\sqrt{250,000} = 500\\text{ units}$.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
];
