import { Question } from "../../types/question";

export const physicsQuestions: Question[] = [
  // --- GRADE 11 PHYSICS ---
  {
    id: "phy-11-01",
    grade: 11,
    subject: "Physics",
    topic: "Vectors",
    difficulty: "Easy",
    question:
      "Two forces of magnitudes $6\\text{ N}$ and $8\\text{ N}$ act at right angles to each other. What is the magnitude of their resultant force?",
    options: [
      { id: "A", text: "$14\\text{ N}$" },
      { id: "B", text: "$10\\text{ N}$" },
      { id: "C", text: "$2\\text{ N}$" },
      { id: "D", text: "$48\\text{ N}$" },
    ],
    correctAnswer: "B",
    explanation:
      "For two orthogonal vectors $\\vec{A}$ and $\\vec{B}$, the resultant magnitude is $R = \\sqrt{A^2 + B^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ N}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-11-02",
    grade: 11,
    subject: "Physics",
    topic: "Kinematics",
    difficulty: "Medium",
    question:
      "A projectile is launched from ground level at an angle $\\theta = 30^\\circ$ with an initial velocity $u = 40\\text{ m/s}$. Taking $g = 10\\text{ m/s}^2$, what is the maximum height attained?",
    options: [
      { id: "A", text: "$20\\text{ m}$" },
      { id: "B", text: "$40\\text{ m}$" },
      { id: "C", text: "$60\\text{ m}$" },
      { id: "D", text: "$80\\text{ m}$" },
    ],
    correctAnswer: "A",
    explanation:
      "Maximum height of a projectile is given by $H = \\frac{u^2 \\sin^2\\theta}{2g} = \\frac{40^2 \\times (\\sin 30^\\circ)^2}{2 \\times 10} = \\frac{1600 \\times (0.5)^2}{20} = \\frac{1600 \\times 0.25}{20} = 20\\text{ m}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-11-03",
    grade: 11,
    subject: "Physics",
    topic: "Work, Energy and Power",
    difficulty: "Easy",
    question:
      "If the linear momentum of an object is doubled while keeping its mass constant, its kinetic energy increases by:",
    options: [
      { id: "A", text: "$100\\%$" },
      { id: "B", text: "$200\\%$" },
      { id: "C", text: "$300\\%$" },
      { id: "D", text: "$400\\%$" },
    ],
    correctAnswer: "C",
    explanation:
      "Kinetic energy $K = \\frac{p^2}{2m}$. If $p$ is doubled ($p' = 2p$), $K' = \\frac{(2p)^2}{2m} = 4K$. Percentage increase is $\\frac{K' - K}{K} \\times 100\\% = \\frac{4K - K}{K} \\times 100\\% = 300\\%$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "phy-11-04",
    grade: 11,
    subject: "Physics",
    topic: "Gravitation",
    difficulty: "Medium",
    question:
      "At what altitude above the surface of the Earth will the acceleration due to gravity become $\\frac{g}{4}$, where $R$ is the Earth's radius?",
    options: [
      { id: "A", text: "$h = R/2$" },
      { id: "B", text: "$h = R$" },
      { id: "C", text: "$h = 2R$" },
      { id: "D", text: "$h = 4R$" },
    ],
    correctAnswer: "B",
    explanation:
      "At altitude $h$, $g' = g \\left(\\frac{R}{R+h}\\right)^2$. Setting $g' = \\frac{g}{4}$ gives $\\left(\\frac{R}{R+h}\\right)^2 = \\frac{1}{4} \\implies \\frac{R}{R+h} = \\frac{1}{2} \\implies R+h = 2R \\implies h = R$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-11-05",
    grade: 11,
    subject: "Physics",
    topic: "Elasticity",
    difficulty: "Hard",
    question:
      "A wire of Young's modulus $Y$ and cross-sectional area $A$ is stretched by a force $F$ producing elongation $\\Delta L$. The elastic potential energy stored per unit volume in the wire is:",
    options: [
      {
        id: "A",
        text: "$\\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain}$",
      },
      { id: "B", text: "$\\text{Stress} \\times \\text{Strain}$" },
      { id: "C", text: "$\\frac{1}{2} Y \\times (\\text{Stress})^2$" },
      { id: "D", text: "$\\frac{Y}{2 \\times \\text{Strain}}$" },
    ],
    correctAnswer: "A",
    explanation:
      "The energy density (energy stored per unit volume) in a stretched elastic wire is $u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} Y (\\text{Strain})^2 = \\frac{\\text{Stress}^2}{2Y}$.",
    marks: 1,
    source: "Conceptual Practice",
  },
  {
    id: "phy-11-06",
    grade: 11,
    subject: "Physics",
    topic: "Heat and Temperature",
    difficulty: "Easy",
    question:
      "At what temperature do the Celsius and Fahrenheit temperature scales indicate the exact same numerical value?",
    options: [
      { id: "A", text: "$0^\\circ$" },
      { id: "B", text: "$-40^\\circ$" },
      { id: "C", text: "$100^\\circ$" },
      { id: "D", text: "$-273^\\circ$" },
    ],
    correctAnswer: "B",
    explanation:
      "Using $\\frac{C}{5} = \\frac{F - 32}{9}$ and setting $C = F = x$: $\\frac{x}{5} = \\frac{x - 32}{9} \\implies 9x = 5x - 160 \\implies 4x = -160 \\implies x = -40$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-11-07",
    grade: 11,
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Medium",
    question:
      "During an adiabatic expansion of an ideal gas, the thermodynamic work done by the gas is done entirely at the expense of its:",
    options: [
      { id: "A", text: "External heat reservoir" },
      { id: "B", text: "Internal energy" },
      { id: "C", text: "Surrounding atmospheric pressure" },
      { id: "D", text: "Entropy gradient" },
    ],
    correctAnswer: "B",
    explanation:
      "By the first law of thermodynamics, $dQ = dU + dW$. In an adiabatic process, $dQ = 0$, so $dW = -dU$. Therefore, work is accomplished strictly by reducing internal energy.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-11-08",
    grade: 11,
    subject: "Physics",
    topic: "Optics",
    difficulty: "Medium",
    question:
      "A convex lens of focal length $20\\text{ cm}$ is placed in contact with a concave lens of focal length $30\\text{ cm}$. What is the effective power of the combination?",
    options: [
      { id: "A", text: "$+1.67\\text{ D}$" },
      { id: "B", text: "$-1.67\\text{ D}$" },
      { id: "C", text: "$+5.0\\text{ D}$" },
      { id: "D", text: "$-5.0\\text{ D}$" },
    ],
    correctAnswer: "A",
    explanation:
      "Power $P_1 = \\frac{1}{0.20} = +5\\text{ D}$, $P_2 = -\\frac{1}{0.30} = -3.33\\text{ D}$. Total power $P = P_1 + P_2 = 5 - 3.33 = +1.67\\text{ D}$. The combination acts as a convergent lens.",
    marks: 1,
    source: "Entrance Standard",
  },

  // --- GRADE 12 PHYSICS ---
  {
    id: "phy-12-01",
    grade: 12,
    subject: "Physics",
    topic: "Rotational Dynamics",
    difficulty: "Medium",
    question:
      "A solid sphere and a hollow cylinder of equal mass $M$ and radius $R$ roll down an inclined plane without slipping. Which reaches the bottom first?",
    options: [
      { id: "A", text: "The hollow cylinder" },
      { id: "B", text: "The solid sphere" },
      { id: "C", text: "Both reach simultaneously" },
      { id: "D", text: "Depends on the angle of inclination" },
    ],
    correctAnswer: "B",
    explanation:
      "Acceleration along incline is $a = \\frac{g \\sin\\theta}{1 + I/(MR^2)}$. For solid sphere, $I = \\frac{2}{5}MR^2 \\implies k^2/R^2 = 0.4$. For hollow cylinder, $I = MR^2 \\implies k^2/R^2 = 1.0$. Smaller moment of inertia ratio produces higher linear acceleration.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-12-02",
    grade: 12,
    subject: "Physics",
    topic: "Periodic Motion",
    difficulty: "Easy",
    question:
      "In Simple Harmonic Motion (SHM), when the displacement of the particle is half of its amplitude ($y = A/2$), the ratio of its kinetic energy to potential energy is:",
    options: [
      { id: "A", text: "$1:1$" },
      { id: "B", text: "$3:1$" },
      { id: "C", text: "$1:3$" },
      { id: "D", text: "$2:1$" },
    ],
    correctAnswer: "B",
    explanation:
      "$U = \\frac{1}{2}m\\omega^2 y^2 = \\frac{1}{2}m\\omega^2 (A/2)^2 = \\frac{1}{8}m\\omega^2 A^2$. Total energy $E = \\frac{1}{2}m\\omega^2 A^2$. Thus $K = E - U = \\frac{3}{8}m\\omega^2 A^2$. The ratio $K/U = 3/1$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "phy-12-03",
    grade: 12,
    subject: "Physics",
    topic: "Current Electricity",
    difficulty: "Medium",
    question:
      "A potentiometer wire of length $10\\text{ m}$ has a resistance of $20\\text{ }\\Omega$. It is connected in series with a battery of EMF $2.5\\text{ V}$ and internal resistance $5\\text{ }\\Omega$. What is the potential gradient along the wire?",
    options: [
      { id: "A", text: "$0.2\\text{ V/m}$" },
      { id: "B", text: "$0.02\\text{ V/m}$" },
      { id: "C", text: "$0.1\\text{ V/m}$" },
      { id: "D", text: "$0.05\\text{ V/m}$" },
    ],
    correctAnswer: "A",
    explanation:
      "Current $I = \\frac{E}{R + r} = \\frac{2.5}{20 + 5} = \\frac{2.5}{25} = 0.1\\text{ A}$. Potential drop across the $10\\text{ m}$ wire is $V = I \\times R = 0.1 \\times 20 = 2.0\\text{ V}$. Potential gradient $k = \\frac{V}{L} = \\frac{2.0\\text{ V}}{10\\text{ m}} = 0.2\\text{ V/m}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-12-04",
    grade: 12,
    subject: "Physics",
    topic: "Magnetic Field",
    difficulty: "Medium",
    question:
      "A charged particle enters a uniform magnetic field perpendicularly with velocity $v$. The kinetic energy of the charged particle in the magnetic field:",
    options: [
      { id: "A", text: "Increases linearly with distance" },
      { id: "B", text: "Remains strictly constant" },
      { id: "C", text: "Decreases exponentially" },
      { id: "D", text: "Oscillates sinusoidally" },
    ],
    correctAnswer: "B",
    explanation:
      "The magnetic Lorentz force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$ is always perpendicular to the velocity vector $\\vec{v}$. Since $\\vec{F} \\cdot \\vec{v} = 0$, no mechanical work is done by the magnetic field, and the kinetic energy remains invariant.",
    marks: 1,
    source: "Conceptual Practice",
  },
  {
    id: "phy-12-05",
    grade: 12,
    subject: "Physics",
    topic: "Electromagnetic Induction",
    difficulty: "Hard",
    question:
      "When the current in an inductor of self-inductance $L = 2\\text{ H}$ decreases from $5\\text{ A}$ to $1\\text{ A}$ in $0.1\\text{ s}$, the magnitude of the induced EMF is:",
    options: [
      { id: "A", text: "$40\\text{ V}$" },
      { id: "B", text: "$80\\text{ V}$" },
      { id: "C", text: "$20\\text{ V}$" },
      { id: "D", text: "$10\\text{ V}$" },
    ],
    correctAnswer: "B",
    explanation:
      "By Faraday-Lenz law of electromagnetic induction, $|e| = L \\left|\\frac{di}{dt}\\right| = 2 \\times \\frac{|1 - 5|}{0.1} = 2 \\times \\frac{4}{0.1} = 80\\text{ V}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-12-06",
    grade: 12,
    subject: "Physics",
    topic: "Modern Physics",
    difficulty: "Easy",
    question:
      "What is the de Broglie wavelength associated with an electron accelerated through a potential difference of $100\\text{ V}$?",
    options: [
      { id: "A", text: "$0.123\\text{ nm}$" },
      { id: "B", text: "$1.227\\text{ nm}$" },
      { id: "C", text: "$12.27\\text{ nm}$" },
      { id: "D", text: "$0.012\\text{ nm}$" },
    ],
    correctAnswer: "A",
    explanation:
      "For an electron accelerated through potential difference $V$, $\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{1.227}{\\sqrt{100}}\\text{ nm} = \\frac{1.227}{10}\\text{ nm} = 0.1227\\text{ nm} \\approx 0.123\\text{ nm}$.",
    marks: 1,
    source: "NEB Model",
  },
  {
    id: "phy-12-07",
    grade: 12,
    subject: "Physics",
    topic: "Nuclear Physics",
    difficulty: "Medium",
    question:
      "The half-life of a radioactive isotope is $15\\text{ days}$. What fraction of the original sample remains undecayed after $45\\text{ days}$?",
    options: [
      { id: "A", text: "$1/4$" },
      { id: "B", text: "$1/6$" },
      { id: "C", text: "$1/8$" },
      { id: "D", text: "$1/16$" },
    ],
    correctAnswer: "C",
    explanation:
      "Number of half-lives elapsed $n = \\frac{t}{T_{1/2}} = \\frac{45}{15} = 3$. Remaining fraction is $\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^n = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$.",
    marks: 1,
    source: "Entrance Standard",
  },
  {
    id: "phy-12-08",
    grade: 12,
    subject: "Physics",
    topic: "Semiconductor Devices",
    difficulty: "Easy",
    question:
      "In an intrinsic semiconductor at room temperature, when an acceptor trivalent impurity (such as Boron or Indium) is doped into pure Silicon, it creates:",
    options: [
      {
        id: "A",
        text: "An n-type semiconductor where electrons are majority carriers",
      },
      {
        id: "B",
        text: "A p-type semiconductor where holes are majority carriers",
      },
      { id: "C", text: "An intrinsic dielectric with zero conductance" },
      { id: "D", text: "A superconductor" },
    ],
    correctAnswer: "B",
    explanation:
      "Trivalent atoms have 3 valence electrons. When sharing bonds with tetravalent Silicon, a deficiency of one electron creates a hole. Doping trivalent atoms therefore forms a p-type semiconductor with holes as majority carriers.",
    marks: 1,
    source: "NEB Model",
  },
];
