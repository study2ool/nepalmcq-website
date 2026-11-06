import { Question } from "../../types/question";

export const chemistryQuestions: Question[] = [
  // --- GRADE 11 CHEMISTRY ---
  {
    id: "chem-11-01",
    grade: 11,
    subject: "Chemistry",
    topic: "Atomic Structure",
    difficulty: "Easy",
    question:
      "According to Heisenberg's Uncertainty Principle, if the uncertainty in position of an electron is zero ($\\Delta x = 0$), what is the uncertainty in its momentum ($\\Delta p$)?",
    options: [
      { id: "A", text: "Zero" },
      { id: "B", text: "$\\frac{h}{4\\pi}$" },
      { id: "C", text: "Infinite" },
      { id: "D", text: "$1.05 \\times 10^{-34}\\text{ J s}$" },
    ],
    correctAnswer: "C",
    explanation:
      "By the Heisenberg Uncertainty relation $\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$. If $\\Delta x = 0$, then $\\Delta p \\ge \\frac{h}{4\\pi \\times 0} = \\infty$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-11-02",
    grade: 11,
    subject: "Chemistry",
    topic: "Chemical Bonding",
    difficulty: "Medium",
    question:
      "What is the hybridization of the central sulfur atom and the molecular geometry of sulfur tetrafluoride ($\\text{SF}_4$)?",
    options: [
      { id: "A", text: "$sp^3$, Tetrahedral" },
      { id: "B", text: "$sp^3d$, See-saw" },
      { id: "C", text: "$sp^3d^2$, Square planar" },
      { id: "D", text: "$dsp^2$, T-shaped" },
    ],
    correctAnswer: "B",
    explanation:
      "Sulfur has 6 valence electrons. In $\\text{SF}_4$, sulfur forms 4 single $\\sigma$-bonds with fluorine and retains 1 lone pair. Total steric number $= 4 + 1 = 5$, indicating $sp^3d$ hybridization with a see-saw molecular geometry.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-11-03",
    grade: 11,
    subject: "Chemistry",
    topic: "Oxidation and Reduction",
    difficulty: "Medium",
    question:
      "In the redox reaction $\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\to \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}$, the equivalent weight of $\\text{KMnO}_4$ in acidic medium is (where $M$ is molar mass):",
    options: [
      { id: "A", text: "$M / 1$" },
      { id: "B", text: "$M / 3$" },
      { id: "C", text: "$M / 5$" },
      { id: "D", text: "$M / 6$" },
    ],
    correctAnswer: "C",
    explanation:
      "In acidic solution, $\\text{Mn}^{7+}$ is reduced to $\\text{Mn}^{2+}$, undergoing a change in oxidation state of $\\Delta = 7 - 2 = 5$. Equivalent weight $= \\frac{\\text{Molar Mass}}{\\text{Valence factor}} = \\frac{M}{5}$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "chem-11-04",
    grade: 11,
    subject: "Chemistry",
    topic: "States of Matter",
    difficulty: "Medium",
    question:
      "Under Graham's Law of Effusion, if methane gas ($\\text{CH}_4$, $M = 16$) diffuses at a rate of $20\\text{ mL/s}$, at what rate will sulfur dioxide ($\\text{SO}_2$, $M = 64$) diffuse under identical conditions?",
    options: [
      { id: "A", text: "$5\\text{ mL/s}$" },
      { id: "B", text: "$10\\text{ mL/s}$" },
      { id: "C", text: "$40\\text{ mL/s}$" },
      { id: "D", text: "$80\\text{ mL/s}$" },
    ],
    correctAnswer: "B",
    explanation:
      "$\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}} \\implies \\frac{20}{r_{\\text{SO}_2}} = \\sqrt{\\frac{64}{16}} = \\sqrt{4} = 2 \\implies r_{\\text{SO}_2} = \\frac{20}{2} = 10\\text{ mL/s}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-11-05",
    grade: 11,
    subject: "Chemistry",
    topic: "Chemical Equilibrium",
    difficulty: "Hard",
    question:
      "For the reversible gas reaction $\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g)$, what is the mathematical relationship between $K_p$ and $K_c$?",
    options: [
      { id: "A", text: "$K_p = K_c (RT)^2$" },
      { id: "B", text: "$K_p = K_c (RT)^{-2}$" },
      { id: "C", text: "$K_p = K_c$" },
      { id: "D", text: "$K_p = K_c (RT)^{-1}$" },
    ],
    correctAnswer: "B",
    explanation:
      "The relation is $K_p = K_c(RT)^{\\Delta n_g}$. Here, moles of gaseous products $= 2$ and reactants $= 1 + 3 = 4$. Thus $\\Delta n_g = 2 - 4 = -2$. Hence $K_p = K_c (RT)^{-2}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-11-06",
    grade: 11,
    subject: "Chemistry",
    topic: "Basic Organic Chemistry",
    difficulty: "Easy",
    question:
      "What is the correct IUPAC name for the organic compound $\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{CHO}$?",
    options: [
      { id: "A", text: "3-Methylbutanal" },
      { id: "B", text: "2-Methylbutanal" },
      { id: "C", text: "Isovalerone" },
      { id: "D", text: "1-Formyl-2-methylpropane" },
    ],
    correctAnswer: "A",
    explanation:
      "The longest carbon chain with the principal functional group $(-\\text{CHO})$ contains 4 carbons (butanal). Numbering begins at the carbonyl carbon $(C1)$. The methyl branch is at carbon-3. Thus, 3-methylbutanal.",
    marks: 1,
    source: "Entrance Standard",
  },

  // --- GRADE 12 CHEMISTRY ---
  {
    id: "chem-12-01",
    grade: 12,
    subject: "Chemistry",
    topic: "Volumetric Analysis",
    difficulty: "Easy",
    question:
      "How many grams of pure sodium hydroxide ($\\text{NaOH}$, molar mass $= 40\\text{ g/mol}$) are required to prepare $250\\text{ mL}$ of a $0.2\\text{ M}$ solution?",
    options: [
      { id: "A", text: "$1.0\\text{ g}$" },
      { id: "B", text: "$2.0\\text{ g}$" },
      { id: "C", text: "$4.0\\text{ g}$" },
      { id: "D", text: "$8.0\\text{ g}$" },
    ],
    correctAnswer: "B",
    explanation:
      "$\\text{Mass } (w) = \\frac{M \\times V_{\\text{mL}} \\times \\text{Molar Mass}}{1000} = \\frac{0.2 \\times 250 \\times 40}{1000} = \\frac{2000}{1000} = 2.0\\text{ g}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-12-02",
    grade: 12,
    subject: "Chemistry",
    topic: "Electrochemistry",
    difficulty: "Medium",
    question:
      "Given the standard reduction potentials $E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = -0.76\\text{ V}$ and $E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = +0.34\\text{ V}$, the standard EMF of the galvanic Daniel cell is:",
    options: [
      { id: "A", text: "$+0.42\\text{ V}$" },
      { id: "B", text: "$-0.42\\text{ V}$" },
      { id: "C", text: "$+1.10\\text{ V}$" },
      { id: "D", text: "$-1.10\\text{ V}$" },
    ],
    correctAnswer: "C",
    explanation:
      "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = (+0.34) - (-0.76) = +1.10\\text{ V}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-12-03",
    grade: 12,
    subject: "Chemistry",
    topic: "Chemical Kinetics",
    difficulty: "Medium",
    question:
      "A first-order chemical reaction has a rate constant $k = 6.93 \\times 10^{-3}\\text{ s}^{-1}$. What is the half-life period ($t_{1/2}$) of this reaction?",
    options: [
      { id: "A", text: "$10\\text{ s}$" },
      { id: "B", text: "$100\\text{ s}$" },
      { id: "C", text: "$693\\text{ s}$" },
      { id: "D", text: "$50\\text{ s}$" },
    ],
    correctAnswer: "B",
    explanation:
      "For a first order reaction, $t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{6.93 \\times 10^{-3}} = 100\\text{ seconds}$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "chem-12-04",
    grade: 12,
    subject: "Chemistry",
    topic: "Aldehydes and Ketones",
    difficulty: "Hard",
    question:
      "Which of the following organic carbonyl compounds will NOT undergo the Cannizzaro reaction when treated with concentrated alkali ($50\\%\\text{ NaOH}$)?",
    options: [
      { id: "A", text: "Formaldehyde ($\\text{HCHO}$)" },
      { id: "B", text: "Benzaldehyde ($\\text{C}_6\\text{H}_5\\text{CHO}$)" },
      { id: "C", text: "Acetaldehyde ($\\text{CH}_3\\text{CHO}$)" },
      {
        id: "D",
        text: "Trimethylacetaldehyde ($(\\text{CH}_3)_3\\text{C-CHO}$)",
      },
    ],
    correctAnswer: "C",
    explanation:
      "The Cannizzaro reaction is given only by aldehydes lacking an $\\alpha$-hydrogen atom. Acetaldehyde contains three acidic $\\alpha$-hydrogens, so it undergoes Aldol condensation instead of the Cannizzaro reaction.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-12-05",
    grade: 12,
    subject: "Chemistry",
    topic: "Coordination Compounds",
    difficulty: "Medium",
    question:
      "According to Werner's coordination theory, which of the following cobalt complexes will precipitate 3 moles of $\\text{AgCl}$ when treated with excess silver nitrate solution?",
    options: [
      { id: "A", text: "$[\\text{Co}(\\text{NH}_3)_6]\\text{Cl}_3$" },
      { id: "B", text: "$[\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2$" },
      { id: "C", text: "$[\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]\\text{Cl}$" },
      { id: "D", text: "$[\\text{Co}(\\text{NH}_3)_3\\text{Cl}_3]$" },
    ],
    correctAnswer: "A",
    explanation:
      "Only chlorine atoms present in the outer ionization sphere precipitate as $\\text{AgCl}$. In $[\\text{Co}(\\text{NH}_3)_6]\\text{Cl}_3$, all 3 chloride ions are outside the brackets in the ionization sphere, yielding $3\\text{ moles of AgCl}$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "chem-12-06",
    grade: 12,
    subject: "Chemistry",
    topic: "Biomolecules",
    difficulty: "Easy",
    question:
      "In proteins, the primary structure is maintained exclusively by which type of chemical bond connecting amino acid residues?",
    options: [
      { id: "A", text: "Hydrogen bonds" },
      { id: "B", text: "Peptide bonds (amide linkage)" },
      { id: "C", text: "Disulfide bridges" },
      { id: "D", text: "Van der Waals forces" },
    ],
    correctAnswer: "B",
    explanation:
      "Primary protein structure is the specific linear sequence of amino acids joined together covalently by peptide bonds ($-CO-NH-$) formed through dehydration synthesis.",
    marks: 1,
    source: "NEB Model",
  },
];
