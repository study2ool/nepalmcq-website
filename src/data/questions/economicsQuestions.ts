import { Question } from "../../types/question";

export const economicsQuestions: Question[] = [
  // --- GRADE 11 ECONOMICS ---
  {
    id: "eco-11-01",
    grade: 11,
    subject: "Economics",
    topic: "Basic Concepts of Economics",
    difficulty: "Easy",
    question:
      "According to Lionel Robbins' definition of economics, economic problems arise primarily due to:",
    options: [
      { id: "A", text: "Abundant resources and limited human desires" },
      {
        id: "B",
        text: "Unlimited wants, scarce resources with alternative uses",
      },
      { id: "C", text: "Lack of government intervention and market failures" },
      { id: "D", text: "Inequality in national wealth distribution" },
    ],
    correctAnswer: "B",
    explanation:
      "In 1932, Lionel Robbins defined economics as the study of human behavior as a relationship between ends (unlimited wants) and scarce means which have alternative uses. This establishes scarcity and choice as the foundational economic problem.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "eco-11-02",
    grade: 11,
    subject: "Economics",
    topic: "Demand and Elasticity of Demand",
    difficulty: "Medium",
    question:
      "When the price of a commodity decreases by 10%, the quantity demanded increases by 25%. What is the price elasticity of demand ($E_p$), and how is it classified?",
    options: [
      { id: "A", text: "$0.40$ (Inelastic demand)" },
      { id: "B", text: "$2.50$ (Elastic demand)" },
      { id: "C", text: "$1.00$ (Unitary elastic demand)" },
      { id: "D", text: "$15.0$ (Perfect elastic demand)" },
    ],
    correctAnswer: "B",
    explanation:
      "Price elasticity of demand is calculated as $E_p = \\left| \\frac{\\% \\Delta Q}{\\% \\Delta P} \\right| = \\frac{25\\%}{10\\%} = 2.5$. Since $E_p > 1$, demand is relatively price elastic.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
  {
    id: "eco-11-03",
    grade: 11,
    subject: "Economics",
    topic: "Theory of Consumer Behavior",
    difficulty: "Medium",
    question:
      "An indifference curve is downward sloping and convex to the origin primarily because of the:",
    options: [
      { id: "A", text: "Law of diminishing marginal utility" },
      { id: "B", text: "Diminishing Marginal Rate of Substitution (MRS)" },
      { id: "C", text: "Increasing returns to scale" },
      { id: "D", text: "Constant opportunity costs between goods" },
    ],
    correctAnswer: "B",
    explanation:
      "An indifference curve is convex to the origin because of the Diminishing Marginal Rate of Substitution ($MRS_{xy}$). As a consumer substitutes more units of good X for good Y, the willingness to surrender additional units of Y decreases.",
    marks: 1,
    source: "CDC Model Set",
    year: "CDC Model Set",
    sourceType: "model_question",
  },
  {
    id: "eco-11-04",
    grade: 11,
    subject: "Economics",
    topic: "Theory of Production",
    difficulty: "Medium",
    question:
      "In the short-run production function, at what point does the Total Product (TP) curve achieve its maximum point?",
    options: [
      { id: "A", text: "When Marginal Product ($MP = 0$)" },
      { id: "B", text: "When Average Product ($AP = MP$)" },
      { id: "C", text: "When Marginal Product ($MP$) is at its peak" },
      { id: "D", text: "When Average Product ($AP$) is zero" },
    ],
    correctAnswer: "A",
    explanation:
      "Under the Law of Variable Proportions, since Marginal Product represents the slope of the Total Product curve ($MP = \\frac{dTP}{dL}$), Total Product is maximized when the addition to total output becomes zero, i.e., $MP = 0$. After this, $MP < 0$ and TP declines.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "past_paper",
  },

  // --- GRADE 12 ECONOMICS ---
  {
    id: "eco-12-01",
    grade: 12,
    subject: "Economics",
    topic: "National Income Accounting",
    difficulty: "Medium",
    question:
      "Gross Domestic Product at market price ($GDP_{mp}$) differs from Gross National Product at market price ($GNP_{mp}$) by:",
    options: [
      { id: "A", text: "Depreciation (Consumption of Fixed Capital)" },
      { id: "B", text: "Net Indirect Taxes ($NIT$)" },
      { id: "C", text: "Net Factor Income from Abroad ($NFIA$)" },
      { id: "D", text: "Government transfer payments" },
    ],
    correctAnswer: "C",
    explanation:
      "The difference between national product and domestic product is Net Factor Income from Abroad ($NFIA$). Hence, $GNP_{mp} = GDP_{mp} + NFIA$, where $NFIA$ is factor income earned by domestic residents abroad minus factor income paid to foreigners locally.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "eco-12-02",
    grade: 12,
    subject: "Economics",
    topic: "Money and Banking",
    difficulty: "Easy",
    question:
      "Which of the following functions is performed exclusively by the Central Bank (Nepal Rastra Bank) and NOT by commercial banks?",
    options: [
      { id: "A", text: "Accepting demand and fixed deposits" },
      { id: "B", text: "Issuing currency notes and coins" },
      { id: "C", text: "Advancing short and long-term loans" },
      { id: "D", text: "Providing letter of credit (LC) services" },
    ],
    correctAnswer: "B",
    explanation:
      "Monopoly of note issuance is a sovereign central banking function. In Nepal, Nepal Rastra Bank (NRB) established under the NRB Act 2058 is the sole authority empowered to issue legal tender currency notes and coins.",
    marks: 1,
    source: "CDC Model Set",
    year: "CDC Model Set",
    sourceType: "model_question",
  },
  {
    id: "eco-12-03",
    grade: 12,
    subject: "Economics",
    topic: "Monetary Policy and Fiscal Policy",
    difficulty: "Medium",
    question:
      "To control surging inflation in an economy, the Central Bank should adopt which of the following contractionary monetary policy measures?",
    options: [
      { id: "A", text: "Decrease the Cash Reserve Ratio (CRR)" },
      { id: "B", text: "Increase the Bank Rate and Repo Rate" },
      {
        id: "C",
        text: "Purchase government securities in open market operations",
      },
      { id: "D", text: "Decrease Statutory Liquidity Ratio (SLR)" },
    ],
    correctAnswer: "B",
    explanation:
      "Raising the policy repo rate or bank rate increases commercial borrowing costs, tightening credit growth and reducing the money supply in circulation, which cools aggregate demand and curtails demand-pull inflationary pressures.",
    marks: 1,
    source: "NEB Model",
    year: "2080 NEB",
    sourceType: "past_paper",
  },
  {
    id: "eco-12-04",
    grade: 12,
    subject: "Economics",
    topic: "Nepalese Economy",
    difficulty: "Medium",
    question:
      "In the macroeconomic structure of Nepal, the single largest contributor to foreign exchange earnings and household consumption support is:",
    options: [
      { id: "A", text: "Tea and coffee merchandise exports" },
      { id: "B", text: "Workers' remittance inflows from foreign employment" },
      { id: "C", text: "Raw mineral exports" },
      { id: "D", text: "Foreign direct investment in manufacturing" },
    ],
    correctAnswer: "B",
    explanation:
      "Worker remittances contribute approximately 25% to 30% of Nepal's Gross Domestic Product (GDP), representing the largest source of foreign exchange reserves and providing critical income support for domestic household consumption and poverty reduction.",
    marks: 1,
    source: "NEB Past Paper",
    year: "2079 NEB",
    sourceType: "past_paper",
  },
];
