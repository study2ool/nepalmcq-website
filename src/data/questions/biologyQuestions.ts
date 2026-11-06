import { Question } from "../../types/question";

export const biologyQuestions: Question[] = [
  // --- GRADE 11 BIOLOGY ---
  {
    id: "bio-11-01",
    grade: 11,
    subject: "Biology",
    topic: "Cell Biology",
    difficulty: "Easy",
    question:
      'Which organelle is known as the "powerhouse of the cell" and contains its own circular DNA and $70S$ ribosomes?',
    options: [
      { id: "A", text: "Golgi apparatus" },
      { id: "B", text: "Mitochondrion" },
      { id: "C", text: "Lysosome" },
      { id: "D", text: "Endoplasmic reticulum" },
    ],
    correctAnswer: "B",
    explanation:
      "Mitochondria generate cellular ATP via oxidative phosphorylation and the Krebs cycle. They possess semiautonomous circular DNA and bacterial-like $70S$ ribosomes according to the endosymbiotic theory.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-11-02",
    grade: 11,
    subject: "Biology",
    topic: "Cell Biology",
    difficulty: "Medium",
    question:
      "During which phase of meiotic prophase I does crossing over (genetic recombination) occur between non-sister chromatids?",
    options: [
      { id: "A", text: "Leptotene" },
      { id: "B", text: "Zygotene" },
      { id: "C", text: "Pachytene" },
      { id: "D", text: "Diplotene" },
    ],
    correctAnswer: "C",
    explanation:
      "In the pachytene stage of Prophase I, the recombinase enzyme complex mediates crossing over between non-sister chromatids of homologous chromosomes, producing genetic variation.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-11-03",
    grade: 11,
    subject: "Biology",
    topic: "Plant Physiology",
    difficulty: "Medium",
    question:
      "In $C_3$ photosynthetic plants, the primary $\\text{CO}_2$ acceptor enzyme RuBisCO catalyzes the carboxylation of which 5-carbon sugar?",
    options: [
      { id: "A", text: "Phosphoenolpyruvate (PEP)" },
      { id: "B", text: "Ribulose-1,5-bisphosphate (RuBP)" },
      { id: "C", text: "Oxaloacetic acid (OAA)" },
      { id: "D", text: "3-Phosphoglyceric acid (PGA)" },
    ],
    correctAnswer: "B",
    explanation:
      "RuBisCO carboxylates Ribulose-1,5-bisphosphate (RuBP, 5C) to yield an unstable 6-carbon intermediate that immediately cleaves into two molecules of 3-phosphoglycerate (3-PGA, 3C).",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "bio-11-04",
    grade: 11,
    subject: "Biology",
    topic: "Animal Tissues",
    difficulty: "Easy",
    question:
      "Which type of epithelial tissue lines the inner lumen of the fallopian tubes and bronchioles to propel fluids and mucus?",
    options: [
      { id: "A", text: "Simple squamous epithelium" },
      { id: "B", text: "Ciliated columnar epithelium" },
      { id: "C", text: "Stratified keratinized epithelium" },
      { id: "D", text: "Transitional epithelium" },
    ],
    correctAnswer: "B",
    explanation:
      "Ciliated columnar epithelium possesses apical micro-cilia that beat rhythmically in coordinated waves to propel the ovum through the oviduct and clear inhaled dust particles from the airways.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-11-05",
    grade: 11,
    subject: "Biology",
    topic: "Human Biology",
    difficulty: "Medium",
    question:
      "In the human digestive system, the acidic chime entering the duodenum stimulates enteroendocrine cells to release secretin, which triggers the pancreas to secrete:",
    options: [
      { id: "A", text: "Pepsinogen and hydrochloric acid" },
      { id: "B", text: "Bicarbonate-rich alkaline fluid" },
      { id: "C", text: "Enterokinase and bile pigments" },
      { id: "D", text: "Insulin and glucagon into blood" },
    ],
    correctAnswer: "B",
    explanation:
      "Secretin acts on pancreatic duct cells to stimulate copious secretion of watery bicarbonate ($\\text{HCO}_3^-$) fluid that neutralizes gastric hydrochloric acid to optimize duodenal enzyme pH.",
    marks: 1,
    source: "Entrance Standard",
  },

  // --- GRADE 12 BIOLOGY ---
  {
    id: "bio-12-01",
    grade: 12,
    subject: "Biology",
    topic: "Genetics and Evolution",
    difficulty: "Easy",
    question:
      "In a classic Mendelian dihybrid cross between two heterozygous individuals ($RrYy \\times RrYy$), what is the expected phenotypic ratio in the $F_2$ generation?",
    options: [
      { id: "A", text: "$9:3:3:1$" },
      { id: "B", text: "$1:2:1$" },
      { id: "C", text: "$3:1$" },
      { id: "D", text: "$9:7$" },
    ],
    correctAnswer: "A",
    explanation:
      "By Mendel's Law of Independent Assortment, a dihybrid cross of two heterozygous individuals ($RrYy$) yields 16 combinations resulting in a $9:3:3:1$ phenotypic ratio.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-02",
    grade: 12,
    subject: "Biology",
    topic: "Genetics and Evolution",
    difficulty: "Medium",
    question:
      "The presence of vestigial organs like the vermiform appendix, nictitating membrane, and wisdom teeth in humans provides direct evolutionary anatomical evidence of:",
    options: [
      { id: "A", text: "Analogous convergence" },
      { id: "B", text: "Common ancestry and divergent evolution" },
      { id: "C", text: "Lamarckian acquired inheritance" },
      { id: "D", text: "Saltational mutation" },
    ],
    correctAnswer: "B",
    explanation:
      "Vestigial organs are rudimentary homologous structures that were fully functional in ancestral species but lost primary function due to gradual divergent evolution and common ancestry.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-03",
    grade: 12,
    subject: "Biology",
    topic: "Biotechnology",
    difficulty: "Medium",
    question:
      'In recombinant DNA technology, the enzyme commonly known as "molecular scissors" that cleaves DNA at specific palindromic recognition sequences is:',
    options: [
      { id: "A", text: "DNA Ligase" },
      { id: "B", text: "Restriction Endonuclease" },
      { id: "C", text: "Taq Polymerase" },
      { id: "D", text: "Reverse Transcriptase" },
    ],
    correctAnswer: "B",
    explanation:
      "Restriction endonucleases (e.g. EcoRI, HindIII) recognize specific symmetrical palindromic DNA sequences and cleave phosphodiester bonds, generating sticky or blunt ends for gene cloning.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-04",
    grade: 12,
    subject: "Biology",
    topic: "Human Health and Diseases",
    difficulty: "Medium",
    question:
      "Which diagnostic enzyme-linked assay is standardly utilized for initial screening detection of antibodies against the Human Immunodeficiency Virus (HIV)?",
    options: [
      { id: "A", text: "Widal test" },
      { id: "B", text: "ELISA (Enzyme-Linked Immunosorbent Assay)" },
      { id: "C", text: "Mantoux test" },
      { id: "D", text: "Western blot (confirmatory)" },
    ],
    correctAnswer: "B",
    explanation:
      "ELISA is the primary screening immunoassay for detecting HIV antibodies. The Western blot or PCR assay is subsequently performed for definitive clinical confirmation.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "bio-12-05",
    grade: 12,
    subject: "Biology",
    topic: "Ecology",
    difficulty: "Hard",
    question:
      "According to Lindeman's 10% trophic efficiency rule, if primary producers fix $10,000\\text{ J}$ of solar energy into net primary productivity, how much energy is transferred to secondary carnivores (tertiary consumers)?",
    options: [
      { id: "A", text: "$1,000\\text{ J}$" },
      { id: "B", text: "$100\\text{ J}$" },
      { id: "C", text: "$10\\text{ J}$" },
      { id: "D", text: "$1\\text{ J}$" },
    ],
    correctAnswer: "C",
    explanation:
      "Trophic level 1 (Producers): $10,000\\text{ J}$ $\\to$ Trophic level 2 (Primary consumers/Herbivores): $1,000\\text{ J}$ (10%) $\\to$ Trophic level 3 (Secondary consumers/Carnivores): $100\\text{ J}$ (10%) $\\to$ Trophic level 4 (Tertiary consumers): $10\\text{ J}$ (10%).",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "bio-12-06",
    grade: 12,
    subject: "Biology",
    topic: "Reproduction",
    difficulty: "Medium",
    question:
      "In human females, the surge of which anterior pituitary gonadotropin hormone directly triggers ovulation from the mature Graafian follicle?",
    options: [
      { id: "A", text: "Luteinizing Hormone (LH)" },
      { id: "B", text: "Follicle-Stimulating Hormone (FSH)" },
      { id: "C", text: "Progesterone" },
      { id: "D", text: "Prolactin" },
    ],
    correctAnswer: "A",
    explanation:
      'Around day 14 of the ovarian cycle, high circulating estrogen triggers a positive feedback peak release of Luteinizing Hormone ("LH Surge"), which induces rupture of the Graafian follicle and release of the secondary oocyte.',
    marks: 1,
    source: "Entrance Standard",
  },
];
