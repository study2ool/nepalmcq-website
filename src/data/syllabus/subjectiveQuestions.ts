export interface MarkingSchemeStep {
  component: string;
  marks: number;
}

export interface SubjectiveQuestion {
  id: string;
  group: "B" | "C"; // B = Short Answer (5 Marks), C = Long Answer (8 Marks)
  marks: number;
  question: string;
  subparts?: string[];
  chapterName: string;
  unitName: string;
  examSource?: string; // e.g. 'NEB 2080 Board Model', 'NEB 2079 Past Paper'
  markingScheme: MarkingSchemeStep[];
  modelSolutionOutline: string[];
}

export interface SubjectSubjectiveBank {
  subject: string;
  grade: 11 | 12;
  questions: SubjectiveQuestion[];
}

export const subjectiveQuestionBanks: Record<string, SubjectSubjectiveBank> = {
  // ==========================================
  // PHYSICS GRADE 11
  // ==========================================
  Physics_11: {
    subject: "Physics",
    grade: 11,
    questions: [
      {
        id: "p11_sub_1",
        group: "C",
        marks: 8,
        unitName: "Mechanics",
        chapterName: "Kinematics",
        examSource: "NEB 2080 Model Question",
        question:
          "Derive the trajectory equation of a projectile projected with velocity $u$ at an angle $\\theta$ with horizontal, and calculate the maximum height and horizontal range.",
        subparts: [
          "(a) Show that the path of a projectile is parabolic. [3 Marks]",
          "(b) Derive expressions for time of flight $T$ and maximum height $H$. [2 Marks]",
          "(c) A ball is thrown with $20\\text{ m/s}$ at $30^\\circ$ to the horizontal. Calculate its range and time of flight ($g = 9.8\\text{ m/s}^2$). [3 Marks]",
        ],
        markingScheme: [
          {
            component:
              "Resolving velocity into horizontal & vertical components",
            marks: 1,
          },
          {
            component:
              "Deriving $y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}$",
            marks: 2,
          },
          {
            component:
              "Derivations for $T = \\frac{2u\\sin\\theta}{g}$ and $H = \\frac{u^2\\sin^2\\theta}{2g}$",
            marks: 2,
          },
          {
            component:
              "Numerical range $R = \\frac{u^2\\sin 2\\theta}{g} = 35.35\\text{ m}$",
            marks: 1.5,
          },
          {
            component: "Numerical flight time $T = 2.04\\text{ s}$",
            marks: 1.5,
          },
        ],
        modelSolutionOutline: [
          "Initial components: $u_x = u\\cos\\theta$, $u_y = u\\sin\\theta$.",
          "Horizontal displacement: $x = u_x t \\implies t = \\frac{x}{u\\cos\\theta}$.",
          "Vertical displacement: $y = u_y t - \\frac{1}{2}gt^2 = x\\tan\\theta - \\frac{g x^2}{2u^2\\cos^2\\theta}$. Since this is quadratic in $x$, path is a parabola.",
          "Flight time occurs when $y = 0 \\implies T = \\frac{2u\\sin\\theta}{g}$.",
          "Maximum height occurs when $v_y = 0 \\implies H = \\frac{u^2\\sin^2\\theta}{2g}$.",
          "Numerical substitution: $u = 20, \\theta = 30^\\circ, g = 9.8$. $R = \\frac{400\\sin 60^\\circ}{9.8} \\approx 35.35\\text{ m}, T = \\frac{40\\sin 30^\\circ}{9.8} \\approx 2.04\\text{ s}$.",
        ],
      },
      {
        id: "p11_sub_2",
        group: "B",
        marks: 5,
        unitName: "Mechanics",
        chapterName: "Work, Energy and Power",
        examSource: "NEB 2079 Board Examination",
        question:
          "State the work-energy theorem. Prove it for a variable force acting on a body in one dimension.",
        subparts: [
          "(a) Statement of Work-Energy theorem. [1 Mark]",
          "(b) Analytical proof for variable force $W = \\Delta KE$. [4 Marks]",
        ],
        markingScheme: [
          { component: "Correct statement of work-energy theorem", marks: 1 },
          { component: "Expressing work as $dW = F dx = m a dx$", marks: 1 },
          {
            component: "Using $a = \\frac{vdv}{dx}$ to write $dW = mv dv$",
            marks: 1.5,
          },
          {
            component:
              "Integrating from $u$ to $v$ to obtain $\\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$",
            marks: 1.5,
          },
        ],
        modelSolutionOutline: [
          "Statement: The work done by the net force acting on a particle equals the change in its kinetic energy: $W = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$.",
          "Proof: $dW = F dx$. By Newton’s second law, $F = ma = m \\frac{dv}{dt}$.",
          "Chain rule: $\\frac{dv}{dt} = \\frac{dv}{dx}\\frac{dx}{dt} = v\\frac{dv}{dx}$.",
          "Substitute: $dW = m \\left(v\\frac{dv}{dx}\\right) dx = m v dv$.",
          "Integrate both sides: $W = \\int_u^v m v dv = \\left[\\frac{1}{2}mv^2\\right]_u^v = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$. Hence proved.",
        ],
      },
      {
        id: "p11_sub_3",
        group: "B",
        marks: 5,
        unitName: "Heat & Thermodynamics",
        chapterName: "First Law of Thermodynamics",
        examSource: "NEB 2080 Board Model",
        question:
          "State Mayer's relation $C_p - C_v = R$ for an ideal gas and derive it using the first law of thermodynamics.",
        markingScheme: [
          {
            component:
              "Defining molar heat capacities at constant pressure and constant volume",
            marks: 1,
          },
          {
            component:
              "Applying First Law at constant volume: $dQ_v = dU = n C_v dT$",
            marks: 1.5,
          },
          {
            component:
              "Applying First Law at constant pressure: $dQ_p = dU + P dV = n C_p dT$",
            marks: 1.5,
          },
          {
            component:
              "Using ideal gas relation $P dV = n R dT$ to yield $C_p - C_v = R$",
            marks: 1,
          },
        ],
        modelSolutionOutline: [
          "At constant volume, $dV = 0 \\implies dW = 0$. By First Law: $dQ_v = dU + 0 \\implies dU = n C_v dT$.",
          "At constant pressure, $dQ_p = n C_p dT = dU + P dV$.",
          "From ideal gas equation $PV = nRT$, differentiating at constant pressure gives $P dV = n R dT$.",
          "Substitute $dU$ and $P dV$: $n C_p dT = n C_v dT + n R dT \\implies C_p = C_v + R \\implies C_p - C_v = R$.",
        ],
      },
      {
        id: "p11_sub_4",
        group: "C",
        marks: 8,
        unitName: "Wave & Optics",
        chapterName: "Lenses",
        examSource: "NEB 2078 Board Examination",
        question:
          "Derive the Lens Maker's formula $\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$ for a thin convex lens placed in air.",
        subparts: [
          "(a) Ray diagram showing refraction at both spherical surfaces. [2 Marks]",
          "(b) Derivation combining single surface refraction equations. [4 Marks]",
          "(c) Numerical: A double convex lens has radii of curvature $20\\text{ cm}$ and $30\\text{ cm}$. Find its focal length if $\\mu = 1.5$. [2 Marks]",
        ],
        markingScheme: [
          { component: "Neat labelled optical ray diagram", marks: 2 },
          {
            component:
              "Refraction at first surface: $\\frac{\\mu}{v_1} - \\frac{1}{u} = \\frac{\\mu - 1}{R_1}$",
            marks: 1.5,
          },
          {
            component:
              "Refraction at second surface: $\\frac{1}{v} - \\frac{\\mu}{v_1} = \\frac{1 - \\mu}{R_2}$",
            marks: 1.5,
          },
          {
            component:
              "Adding equations and setting $\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$",
            marks: 1,
          },
          { component: "Numerical focal length $f = 24\\text{ cm}$", marks: 2 },
        ],
        modelSolutionOutline: [
          "Draw thin convex lens with centers of curvature $C_1, C_2$ and radii $R_1, R_2$.",
          "First surface: $\\frac{\\mu}{v_1} - \\frac{1}{u} = \\frac{\\mu - 1}{R_1}$ (Eq. 1).",
          "Second surface: The virtual image at $v_1$ acts as virtual object: $\\frac{1}{v} - \\frac{\\mu}{v_1} = \\frac{1 - \\mu}{R_2} = -\\frac{\\mu - 1}{R_2}$ (Eq. 2).",
          "Sum Eq. 1 & 2: $\\frac{1}{v} - \\frac{1}{u} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.",
          "Since $\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$, we obtain $\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.",
          "Numerical: $R_1 = +20\\text{ cm}, R_2 = -30\\text{ cm}, \\mu = 1.5$. $\\frac{1}{f} = (1.5 - 1)\\left(\\frac{1}{20} - \\left(-\\frac{1}{30}\\right)\\right) = 0.5 \\times \\frac{5}{60} = \\frac{1}{24} \\implies f = 24\\text{ cm}$.",
        ],
      },
    ],
  },

  // ==========================================
  // PHYSICS GRADE 12
  // ==========================================
  Physics_12: {
    subject: "Physics",
    grade: 12,
    questions: [
      {
        id: "p12_sub_1",
        group: "C",
        marks: 8,
        unitName: "Wave & Optics",
        chapterName: "Interference",
        examSource: "NEB 2080 Board Model",
        question:
          "Describe Young's double slit experiment. Derive an expression for fringe width $\\beta = \\frac{\\lambda D}{d}$ and prove that dark and bright fringes have equal widths.",
        subparts: [
          "(a) Experimental schematic with coherent source conditions. [2 Marks]",
          "(b) Path difference derivation $\\Delta x = \\frac{y d}{D}$. [3 Marks]",
          "(c) Condition for constructive & destructive fringes and fringe width. [3 Marks]",
        ],
        markingScheme: [
          {
            component:
              "Experimental diagram showing two slits $S_1, S_2$ and screen",
            marks: 2,
          },
          {
            component:
              "Geometrical path difference proof $\\Delta x = S_2 P - S_1 P \\approx \\frac{y d}{D}$",
            marks: 2,
          },
          {
            component:
              "Bright fringe position $y_n = n \\frac{\\lambda D}{d}$ and dark fringe $y_n' = (2n-1)\\frac{\\lambda D}{2d}$",
            marks: 2,
          },
          {
            component:
              "Fringe width $\\beta = y_{n+1} - y_n = \\frac{\\lambda D}{d}$",
            marks: 2,
          },
        ],
        modelSolutionOutline: [
          "Draw coherent monochromatic source illuminating parallel slits $S_1, S_2$ separated by distance $d$, with screen placed at distance $D$.",
          "Path difference: $S_2 P^2 - S_1 P^2 = [D^2 + (y + d/2)^2] - [D^2 + (y - d/2)^2] = 2yd$.",
          "Approximating $(S_2 P + S_1 P) \\approx 2D$, we get $\\Delta x = S_2 P - S_1 P = \\frac{yd}{D}$.",
          "Constructive interference (bright fringe): $\\Delta x = n\\lambda \\implies y_n = n\\frac{\\lambda D}{d}$.",
          "Destructive interference (dark fringe): $\\Delta x = (2n - 1)\\frac{\\lambda}{2} \\implies y_n' = (2n - 1)\\frac{\\lambda D}{2d}$.",
          "Bright fringe width: $\\beta = y_{n+1} - y_n = \\frac{\\lambda D}{d}$. Dark fringe width: $\\beta' = y_{n+1}' - y_n' = \\frac{\\lambda D}{d}$. Both are identical and equidistant.",
        ],
      },
      {
        id: "p12_sub_2",
        group: "B",
        marks: 5,
        unitName: "Electricity & Magnetism",
        chapterName: "Electromagnetic Induction",
        examSource: "NEB 2079 Board Examination",
        question:
          "State Faraday's laws of electromagnetic induction and Lenz's law. Show that Lenz's law is a consequence of conservation of energy.",
        markingScheme: [
          {
            component:
              "Statement of Faraday's first and second laws ($\\mathcal{E} = -N\\frac{d\\Phi_B}{dt}$)",
            marks: 2,
          },
          { component: "Statement of Lenz's law", marks: 1 },
          {
            component:
              "Explanation of mechanical work converted into electrical energy without violation",
            marks: 2,
          },
        ],
        modelSolutionOutline: [
          "Faraday's Law 1: Whenever magnetic flux linked with a closed circuit changes, an EMF is induced in the circuit.",
          "Faraday's Law 2: The magnitude of induced EMF is directly proportional to the time rate of change of magnetic flux: $\\mathcal{E} = -\\frac{d\\Phi}{dt}$.",
          "Lenz's Law: The polarity of the induced EMF always opposes the change in magnetic flux that produces it.",
          "Energy Conservation: When a magnet's north pole approaches a coil, induced current produces a north pole repelling the magnet. Mechanical work against this magnetic repulsion provides the electrical energy. If it attracted instead, energy would be created from nothing, violating the First Law of Thermodynamics.",
        ],
      },
      {
        id: "p12_sub_3",
        group: "C",
        marks: 8,
        unitName: "Modern Physics",
        chapterName: "Electrons and Photons",
        examSource: "NEB 2080 Model Question",
        question:
          "State Einstein's photoelectric equation. Explain the laws of photoelectric emission on its basis. A metal has work function $2.2\\text{ eV}$. Find its threshold wavelength and maximum kinetic energy when illuminated by light of $\\lambda = 4000\\text{ \\AA}$.",
        subparts: [
          "(a) Einstein equation formulation and physical meaning of terms. [2 Marks]",
          "(b) Explanation of threshold frequency, instantaneous emission, and saturation current. [3 Marks]",
          "(c) Numerical calculations: threshold wavelength $\\lambda_0$ and $KE_{\\max}$. [3 Marks]",
        ],
        markingScheme: [
          {
            component:
              "Statement $hf = \\Phi + KE_{\\max}$ with $KE_{\\max} = h(f - f_0)$",
            marks: 2,
          },
          {
            component:
              "Proof of threshold frequency $f_0 = \\Phi/h$ (no emission if $f < f_0$)",
            marks: 1.5,
          },
          {
            component:
              "Explanation of one-photon one-electron collision and intensity relation",
            marks: 1.5,
          },
          {
            component:
              "Numerical $\\lambda_0 = \\frac{hc}{\\Phi} = 5645\\text{ \\AA}$",
            marks: 1.5,
          },
          {
            component:
              "Numerical $KE_{\\max} = E - \\Phi = 3.10 - 2.2 = 0.90\\text{ eV}$",
            marks: 1.5,
          },
        ],
        modelSolutionOutline: [
          "Equation: $hf = \\Phi + \\frac{1}{2}mv_{\\max}^2$, where $hf$ is incident photon energy, $\\Phi = hf_0$ is work function, and $KE_{\\max}$ is maximum kinetic energy of emitted photoelectron.",
          "Laws explained: (1) If $f < f_0$, energy is insufficient to liberate electron, explaining existence of threshold frequency. (2) $KE_{\\max} = h(f - f_0)$ depends solely on frequency, not intensity. (3) Intensity is photon arrival rate, so photo-current $\\propto$ intensity. (4) Elastic collision ensures instantaneous emission without time lag.",
          "Numerical: $\\Phi = 2.2\\text{ eV} = 2.2 \\times 1.6 \\times 10^{-19}\\text{ J} = 3.52 \\times 10^{-19}\\text{ J}$.",
          "$\\lambda_0 = \\frac{hc}{\\Phi} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{3.52 \\times 10^{-19}} = 5.65 \\times 10^{-7}\\text{ m} = 5650\\text{ \\AA}$.",
          "Incident photon energy: $E = \\frac{12400}{4000} = 3.10\\text{ eV}$. $KE_{\\max} = E - \\Phi = 3.10 - 2.2 = 0.90\\text{ eV} = 1.44 \\times 10^{-19}\\text{ J}$.",
        ],
      },
    ],
  },

  // ==========================================
  // MATHEMATICS GRADE 12
  // ==========================================
  Mathematics_12: {
    subject: "Mathematics",
    grade: 12,
    questions: [
      {
        id: "m12_sub_1",
        group: "C",
        marks: 8,
        unitName: "Calculus",
        chapterName: "Definite Integrals",
        examSource: "NEB 2080 Model Question",
        question:
          "Evaluate the definite integral $\\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$ using the reflection property of definite integrals, and find the area enclosed between the parabola $y^2 = 4ax$ and line $y = mx$.",
        subparts: [
          "(a) Prove property $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$ and evaluate the trigonometric integral. [4 Marks]",
          "(b) Calculate the bounded area between $y^2 = 4ax$ and $y = mx$. [4 Marks]",
        ],
        markingScheme: [
          {
            component:
              "Proof of definite integral property $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$",
            marks: 1.5,
          },
          {
            component:
              "Adding $I + I$ to obtain $2I = \\int_0^{\\pi/2} 1 dx \\implies I = \\frac{\\pi}{4}$",
            marks: 2.5,
          },
          {
            component:
              "Finding points of intersection $(0,0)$ and $\\left(\\frac{4a}{m^2}, \\frac{4a}{m}\\right)$",
            marks: 1,
          },
          {
            component:
              "Integrating $\\int_0^{4a/m^2} [2\\sqrt{a}\\sqrt{x} - mx] dx = \\frac{8a^2}{3m^3}$",
            marks: 3,
          },
        ],
        modelSolutionOutline: [
          "Let $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$ (Eq. 1).",
          "Apply $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$: $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin(\\pi/2 - x)}}{\\sqrt{\\sin(\\pi/2 - x)} + \\sqrt{\\cos(\\pi/2 - x)}} dx = \\int_0^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}} dx$ (Eq. 2).",
          "Add Eq. 1 & 2: $2I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x} + \\sqrt{\\cos x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx = \\int_0^{\\pi/2} 1 dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$.",
          "Area intersection: $y = mx \\implies (mx)^2 = 4ax \\implies x(m^2 x - 4a) = 0 \\implies x_1 = 0, x_2 = \\frac{4a}{m^2}$.",
          "Area $A = \\int_0^{4a/m^2} (\\sqrt{4ax} - mx) dx = \\left[ 2\\sqrt{a} \\frac{x^{3/2}}{3/2} - \\frac{m x^2}{2} \\right]_0^{4a/m^2} = \\frac{4}{3}\\sqrt{a}\\left(\\frac{4a}{m^2}\\right)^{3/2} - \\frac{m}{2}\\left(\\frac{4a}{m^2}\\right)^2 = \\frac{8a^2}{3m^3}\\text{ sq units}$.",
        ],
      },
      {
        id: "m12_sub_2",
        group: "B",
        marks: 5,
        unitName: "Vectors",
        chapterName: "Vectors in 3D",
        examSource: "NEB 2079 Board Examination",
        question:
          "Prove by vector method that the perpendicular bisectors of the sides of a triangle are concurrent.",
        markingScheme: [
          {
            component:
              "Setting origin at circumcenter $O$ with position vectors $\\vec{a}, \\vec{b}, \\vec{c}$",
            marks: 1.5,
          },
          {
            component:
              "Writing condition $|\\vec{a}| = |\\vec{b}| = |\\vec{c}| = R$",
            marks: 1.5,
          },
          {
            component:
              "Demonstrating third bisector orthogonality $(\\vec{c} - \\vec{b})\\cdot \\frac{\\vec{b}+\\vec{c}}{2} = 0$",
            marks: 2,
          },
        ],
        modelSolutionOutline: [
          "Let $O$ be intersection of perpendicular bisectors of sides $AB$ and $AC$. Set $O$ as origin.",
          "Let position vectors of vertices $A, B, C$ be $\\vec{a}, \\vec{b}, \\vec{c}$.",
          "Since $O$ lies on perpendicular bisector of $AB$, $OA = OB \\implies |\\vec{a}|^2 = |\\vec{b}|^2$.",
          "Since $O$ lies on perpendicular bisector of $AC$, $OA = OC \\implies |\\vec{a}|^2 = |\\vec{c}|^2$.",
          "Therefore, $|\\vec{b}|^2 = |\\vec{c}|^2 \\implies |\\vec{b}|^2 - |\\vec{c}|^2 = 0 \\implies (\\vec{b} - \\vec{c})\\cdot(\\vec{b} + \\vec{c}) = 0$.",
          "This implies $(\\vec{b} - \\vec{c})\\cdot \\left(\\frac{\\vec{b} + \\vec{c}}{2} - \\vec{0}\\right) = 0$, meaning the line from $O$ to midpoint of $BC$ is perpendicular to $BC$. Thus all three perpendicular bisectors are concurrent at $O$ (circumcentre).",
        ],
      },
    ],
  },

  // ==========================================
  // ACCOUNTING GRADE 12
  // ==========================================
  Accounting_12: {
    subject: "Accounting",
    grade: 12,
    questions: [
      {
        id: "acc12_sub_1",
        group: "C",
        marks: 8,
        unitName: "Financial Statement Analysis",
        chapterName: "Cash Flow Statement",
        examSource: "NEB 2080 Model Question",
        question:
          "Prepare a Cash Flow Statement according to Nepal Accounting Standards (NAS 07 / Indirect Method) from the comparative balance sheet and income statement of Himalayan Traders Ltd.",
        markingScheme: [
          {
            component:
              "Cash Flow from Operating Activities (CFO) including working capital changes",
            marks: 4,
          },
          {
            component:
              "Cash Flow from Investing Activities (CFI) fixed asset purchases/sales",
            marks: 2,
          },
          {
            component:
              "Cash Flow from Financing Activities (CFF) share issue/dividend",
            marks: 1,
          },
          {
            component:
              "Reconciliation of Net Increase with Opening & Closing Cash balance",
            marks: 1,
          },
        ],
        modelSolutionOutline: [
          "Part A: Cash Flows from Operating Activities: Start with Net Profit Before Tax $\\to$ Add non-cash expenses (Depreciation) $\\to$ Adjust Working Capital (Add decrease in Current Assets, Add increase in Current Liabilities; Deduct increase in CA, Deduct decrease in CL) $\\to$ Less Tax Paid.",
          "Part B: Cash Flows from Investing Activities: Outflow for Purchase of Plant & Machinery $\\to$ Inflow from Sale of Old Equipment / Investment.",
          "Part C: Cash Flows from Financing Activities: Inflow from Issue of Equity Shares / Debentures $\\to$ Outflow for Repayment of Loans and Dividend Paid.",
          "Net Cash Flow = (A + B + C). Add Opening Cash and Bank Balance to verify exact match with Closing Balance on Balance Sheet.",
        ],
      },
    ],
  },
};

/**
 * Retrieve subjective question bank for a given subject and grade.
 */
export function getSubjectiveBank(
  subject: string,
  grade: number,
): SubjectSubjectiveBank | null {
  const key = `${subject}_${grade}`;
  return subjectiveQuestionBanks[key] || null;
}

/**
 * Check if subjective questions exist for a subject and grade.
 */
export function hasSubjectiveQuestions(
  subject: string,
  grade: number,
): boolean {
  return Boolean(getSubjectiveBank(subject, grade));
}
