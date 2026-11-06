import { Question } from "../../types/question";

export const additionalQuestions: Question[] = [
  // --- PHYSICS EXTRA ---
  {
    id: "phy-11-09",
    grade: 11,
    subject: "Physics",
    topic: "Circular Motion",
    difficulty: "Medium",
    question:
      "A cyclist rounds an unbanked circular curve of radius $20\\text{ m}$ at a steady speed of $10\\text{ m/s}$. To prevent slipping, the minimum coefficient of static friction $\\mu_s$ must be ($g = 10\\text{ m/s}^2$):",
    options: [
      { id: "A", text: "$0.25$" },
      { id: "B", text: "$0.50$" },
      { id: "C", text: "$0.75$" },
      { id: "D", text: "$1.00$" },
    ],
    correctAnswer: "B",
    explanation:
      "For unbanked safe turning, $v \\le \\sqrt{\\mu_s r g} \\implies \\mu_s \\ge \\frac{v^2}{rg} = \\frac{10^2}{20 \\times 10} = \\frac{100}{200} = 0.50$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-11-10",
    grade: 11,
    subject: "Physics",
    topic: "Waves",
    difficulty: "Easy",
    question:
      "The speed of sound in an ideal gas depends primarily on its temperature. If absolute temperature of the gas is quadrupled ($4T$), the speed of sound:",
    options: [
      { id: "A", text: "Remains unchanged" },
      { id: "B", text: "Is doubled ($2v$)" },
      { id: "C", text: "Is quadrupled ($4v$)" },
      { id: "D", text: "Is halved ($v/2$)" },
    ],
    correctAnswer: "B",
    explanation:
      "Laplace's speed of sound equation is $v = \\sqrt{\\frac{\\gamma R T}{M}}$. Since $v \\propto \\sqrt{T}$, increasing temperature to $4T$ gives $v' = \\sqrt{4}v = 2v$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-12-09",
    grade: 12,
    subject: "Physics",
    topic: "Capacitors",
    difficulty: "Medium",
    question:
      "A parallel plate capacitor is charged and then disconnected from the battery. If a dielectric slab of dielectric constant $K = 4$ is now inserted between the plates, the stored energy:",
    options: [
      { id: "A", text: "Increases by 4 times" },
      { id: "B", text: "Decreases by 4 times ($U/4$)" },
      { id: "C", text: "Remains strictly unchanged" },
      { id: "D", text: "Becomes zero" },
    ],
    correctAnswer: "B",
    explanation:
      "Since the battery was disconnected, the charge $Q$ remains constant. Capacitance increases to $C' = K C = 4C$. Stored electrostatic energy $U' = \\frac{Q^2}{2C'} = \\frac{Q^2}{2(4C)} = \\frac{U}{4}$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "phy-12-10",
    grade: 12,
    subject: "Physics",
    topic: "Alternating Current",
    difficulty: "Hard",
    question:
      "In a series $LCR$ circuit with $R = 10\\,\\Omega$, $L = 0.1\\text{ H}$, and $C = 10\\,\\mu\\text{F}$, the resonant angular frequency $\\omega_0$ is:",
    options: [
      { id: "A", text: "$100\\text{ rad/s}$" },
      { id: "B", text: "$1000\\text{ rad/s}$" },
      { id: "C", text: "$500\\text{ rad/s}$" },
      { id: "D", text: "$10000\\text{ rad/s}$" },
    ],
    correctAnswer: "B",
    explanation:
      "Resonant angular frequency is $\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{0.1 \\times 10 \\times 10^{-6}}} = \\frac{1}{\\sqrt{10^{-6}}} = \\frac{1}{10^{-3}} = 1000\\text{ rad/s}$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "phy-12-11",
    grade: 12,
    subject: "Physics",
    topic: "Fluid Statics",
    difficulty: "Easy",
    question:
      "According to Bernoulli's principle for steady streamline fluid flow, along any streamline:",
    options: [
      {
        id: "A",
        text: "$P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}$",
      },
      { id: "B", text: "$P v = \\text{constant}$" },
      { id: "C", text: "$\\frac{P}{\\rho} + v^2 = \\text{constant}$" },
      { id: "D", text: "$P + \\rho g h = 0$" },
    ],
    correctAnswer: "A",
    explanation:
      "Bernoulli's theorem expresses the conservation of mechanical energy in ideal non-viscous incompressible fluid flow: $P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}$.",
    marks: 1,
    source: "NEB Model",
  },

  // --- CHEMISTRY EXTRA ---
  {
    id: "chem-11-07",
    grade: 11,
    subject: "Chemistry",
    topic: "Periodic Table",
    difficulty: "Easy",
    question:
      "Which of the following elements possesses the highest first ionization energy across the second period?",
    options: [
      { id: "A", text: "Lithium (Li)" },
      { id: "B", text: "Carbon (C)" },
      { id: "C", text: "Fluorine (F)" },
      { id: "D", text: "Neon (Ne)" },
    ],
    correctAnswer: "D",
    explanation:
      "Neon has a completely filled octet valence shell configuration ($1s^2 2s^2 2p^6$), offering maximum electrostatic stability and the highest first ionization enthalpy in period 2.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-11-08",
    grade: 11,
    subject: "Chemistry",
    topic: "Acids and Bases",
    difficulty: "Medium",
    question:
      "What is the pH of a $10^{-8}\\text{ M}$ aqueous hydrochloric acid ($\\text{HCl}$) solution at $25^\\circ\\text{C}$?",
    options: [
      { id: "A", text: "$8.00$" },
      { id: "B", text: "$6.96$" },
      { id: "C", text: "$7.00$" },
      { id: "D", text: "$6.00$" },
    ],
    correctAnswer: "B",
    explanation:
      "In dilute acid solutions, water dissociation cannot be neglected: $[\\text{H}^+] = [\\text{H}^+]_{\\text{acid}} + [\\text{H}^+]_{\\text{water}} = 10^{-8} + 10^{-7} = 1.1 \\times 10^{-7}\\text{ M}$. $\\text{pH} = -\\log_{10}(1.1 \\times 10^{-7}) \\approx 6.96$. An acid can never have $\\text{pH} > 7$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "chem-12-07",
    grade: 12,
    subject: "Chemistry",
    topic: "Haloalkanes",
    difficulty: "Medium",
    question:
      "When chlorobenzene is heated with chloromethane in the presence of anhydrous $\\text{AlCl}_3$, which electrophilic substitution product is formed predominantly?",
    options: [
      { id: "A", text: "o-Chlorotoluene" },
      { id: "B", text: "p-Chlorotoluene" },
      { id: "C", text: "m-Chlorotoluene" },
      { id: "D", text: "Toluene" },
    ],
    correctAnswer: "B",
    explanation:
      "The chlorine substituent is ortho-para directing through $+M$ resonance. The para-isomer (p-chlorotoluene) is the major product because of reduced steric hindrance compared to the ortho position.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-12-08",
    grade: 12,
    subject: "Chemistry",
    topic: "Transition Metals",
    difficulty: "Easy",
    question:
      "Which of the following first-row transition metal ions is diamagnetic (has zero unpaired d-electrons)?",
    options: [
      { id: "A", text: "$\\text{Fe}^{3+}$" },
      { id: "B", text: "$\\text{Cu}^{2+}$" },
      { id: "C", text: "$\\text{Zn}^{2+}$" },
      { id: "D", text: "$\\text{Mn}^{2+}$" },
    ],
    correctAnswer: "C",
    explanation:
      "Zinc has ground state $[\\text{Ar}] 3d^{10} 4s^2$. When ionized to $\\text{Zn}^{2+}$, it has electronic configuration $[\\text{Ar}] 3d^{10}$. All five $3d$ orbitals are completely paired, so it has no unpaired electrons and is diamagnetic.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "chem-12-09",
    grade: 12,
    subject: "Chemistry",
    topic: "Alcohols and Phenols",
    difficulty: "Hard",
    question:
      "In the Lucas test, an unknown alcohol reacts immediately with Lucas reagent (conc. $\\text{HCl} + \\text{anhydrous ZnCl}_2$) to produce turbidity at room temperature. The alcohol is:",
    options: [
      { id: "A", text: "Primary alcohol ($1^\\circ$)" },
      { id: "B", text: "Secondary alcohol ($2^\\circ$)" },
      { id: "C", text: "Tertiary alcohol ($3^\\circ$)" },
      { id: "D", text: "Methanol" },
    ],
    correctAnswer: "C",
    explanation:
      "Lucas reagent differentiates alcohols based on carbocation stability ($3^\\circ > 2^\\circ > 1^\\circ$). Tertiary alcohols form stable tertiary carbocations and precipitate insoluble alkyl chlorides immediately.",
    marks: 1,
    source: "NEB Model",
  },

  // --- BIOLOGY EXTRA ---
  {
    id: "bio-11-06",
    grade: 11,
    subject: "Biology",
    topic: "Biodiversity",
    difficulty: "Easy",
    question:
      "In the five-kingdom classification proposed by R.H. Whittaker, unicellular eukaryotic organisms (such as Amoeba and Euglena) are placed in:",
    options: [
      { id: "A", text: "Monera" },
      { id: "B", text: "Protista" },
      { id: "C", text: "Fungi" },
      { id: "D", text: "Plantae" },
    ],
    correctAnswer: "B",
    explanation:
      "Whittaker classified all unicellular eukaryotic microorganisms within Kingdom Protista, whereas unicellular prokaryotes are placed in Kingdom Monera.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-11-07",
    grade: 11,
    subject: "Biology",
    topic: "Plant Anatomy",
    difficulty: "Medium",
    question:
      "Casparian strips containing hydrophobic suberin deposits are characteristic structural features found in the cell walls of the:",
    options: [
      { id: "A", text: "Root epidermis" },
      { id: "B", text: "Root endodermis" },
      { id: "C", text: "Stem xylem parenchyma" },
      { id: "D", text: "Leaf mesophyll" },
    ],
    correctAnswer: "B",
    explanation:
      "Casparian strips are band-like suberin thickenings in the radial and transverse walls of root endodermal cells, forcing water from the apoplastic route into symplastic transport into the vascular cylinder.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-07",
    grade: 12,
    subject: "Biology",
    topic: "Plant Physiology",
    difficulty: "Medium",
    question:
      "Which plant growth phytohormone is primarily responsible for promoting apical dominance by suppressing the growth of lateral axillary buds?",
    options: [
      { id: "A", text: "Auxin (Indole-3-acetic acid)" },
      { id: "B", text: "Cytokinin" },
      { id: "C", text: "Gibberellin" },
      { id: "D", text: "Ethylene" },
    ],
    correctAnswer: "A",
    explanation:
      "Auxin synthesized in the apical shoot tip diffuses downward and suppresses the outgrowth of lateral axillary buds (apical dominance). Removal of the shoot tip relieves this inhibition.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-08",
    grade: 12,
    subject: "Biology",
    topic: "Animal Physiology",
    difficulty: "Medium",
    question:
      "In the human nephron, the primary site for mandatory reabsorption of approximately $65-70\\%$ of water, electrolytes, and all glucose and amino acids is the:",
    options: [
      { id: "A", text: "Glomerulus" },
      { id: "B", text: "Proximal Convoluted Tubule (PCT)" },
      { id: "C", text: "Loop of Henle" },
      { id: "D", text: "Distal Convoluted Tubule (DCT)" },
    ],
    correctAnswer: "B",
    explanation:
      "The PCT possesses a brush-border cuboidal epithelium that massively increases surface area for active and secondary active transport, reabsorbing nearly all nutrients and the majority of water and sodium.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-09",
    grade: 12,
    subject: "Biology",
    topic: "Biotechnology",
    difficulty: "Hard",
    question:
      "In the Polymerase Chain Reaction (PCR), the thermostable Taq DNA polymerase isolated from the thermophilic bacterium Thermus aquaticus is added because it:",
    options: [
      { id: "A", text: "Can cleave foreign viral DNA" },
      {
        id: "B",
        text: "Remains enzymatically active during high-temperature denaturation ($94-96^\\circ\\text{C}$)",
      },
      { id: "C", text: "Synthesizes RNA primers de novo" },
      { id: "D", text: "Prevents DNA renaturation during annealing" },
    ],
    correctAnswer: "B",
    explanation:
      "PCR requires repetitive heating to $94-96^\\circ\\text{C}$ to denature double-stranded DNA into single strands. Taq polymerase does not denature at this temperature, enabling continuous automated amplification.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "bio-12-10",
    grade: 12,
    subject: "Biology",
    topic: "Human Health and Diseases",
    difficulty: "Easy",
    question:
      "The infectious malarial parasite Plasmodium falciparum is transmitted to humans via the saliva of an infected female mosquito in which infective stage?",
    options: [
      { id: "A", text: "Sporozoite" },
      { id: "B", text: "Merozoite" },
      { id: "C", text: "Trophozoite" },
      { id: "D", text: "Gametocyte" },
    ],
    correctAnswer: "A",
    explanation:
      "Infective sporozoites migrate to the salivary glands of the female Anopheles mosquito and are injected into the human bloodstream during a blood meal, quickly targeting hepatic liver cells.",
    marks: 1,
    source: "NEB Model",
  },
];
