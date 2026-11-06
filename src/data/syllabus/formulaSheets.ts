export interface FormulaItem {
  id: string;
  name: string;
  formula: string; // KaTeX formatted string ($$...$$ or $...$)
  description?: string;
  keyApplication?: string;
}

export interface FormulaUnitGroup {
  unitName: string;
  chapterNames?: string[];
  formulas: FormulaItem[];
}

export interface SubjectFormulaSheet {
  subject: string;
  grade: 11 | 12;
  title: string;
  description: string;
  units: FormulaUnitGroup[];
}

export const formulaSheets: Record<string, SubjectFormulaSheet> = {
  // ==========================================
  // PHYSICS GRADE 11
  // ==========================================
  Physics_11: {
    subject: "Physics",
    grade: 11,
    title: "Grade 11 Physics Formula Cheatsheet",
    description:
      "Core formulas, kinematic laws, thermodynamic relations, and optics identities for NEB Grade 11.",
    units: [
      {
        unitName: "Mechanics - Kinematics & Dynamics",
        chapterNames: [
          "Physical Quantities",
          "Vectors",
          "Kinematics",
          "Laws of Motion",
          "Work, Energy and Power",
          "Circular Motion",
        ],
        formulas: [
          {
            id: "p11_kin_1",
            name: "Equations of Motion (Constant Acceleration)",
            formula:
              "$$v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as, \\quad s_n = u + \\frac{a}{2}(2n - 1)$$",
            description:
              "Relates initial velocity $u$, final velocity $v$, acceleration $a$, displacement $s$, and displacement in $n$-th second $s_n$.",
            keyApplication: "1D motion with uniform acceleration.",
          },
          {
            id: "p11_proj_1",
            name: "Projectile Motion",
            formula:
              "$$T = \\frac{2u\\sin\\theta}{g}, \\quad H_{\\max} = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}$$",
            description:
              "Total flight time $T$, maximum height $H_{\\max}$, and horizontal range $R$ launched at angle $\\theta$. Maximum range occurs at $\\theta = 45^\\circ$ ($R_{\\max} = \\frac{u^2}{g}$).",
            keyApplication:
              "2D parabolic trajectories under gravity without air drag.",
          },
          {
            id: "p11_fric_1",
            name: "Friction & Circular Banking",
            formula:
              "$$f_s \\le \\mu_s N, \\quad f_k = \\mu_k N, \\quad \\tan\\theta = \\frac{v^2}{rg}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\mu + \\tan\\theta}{1 - \\mu\\tan\\theta}\\right)}$$",
            description:
              "Static and kinetic friction laws; optimum banking angle $\\theta$ and safe maximum turn speed $v_{\\max}$ on curved roadway.",
            keyApplication: "Road and railway track design, vehicle cornering.",
          },
          {
            id: "p11_grav_1",
            name: "Gravitation & Escape Velocity",
            formula:
              "$$F = G\\frac{M m}{r^2}, \\quad g_h \\approx g\\left(1 - \\frac{2h}{R}\\right), \\quad g_d = g\\left(1 - \\frac{d}{R}\\right), \\quad v_e = \\sqrt{2gR} = \\sqrt{\\frac{2GM}{R}}$$",
            description:
              "Newton's law of universal gravitation, variation of $g$ with height $h$ and depth $d$, and Earth escape speed ($v_e \\approx 11.2\\text{ km/s}$).",
            keyApplication:
              "Planetary motion, satellite orbits, orbital mechanics.",
          },
          {
            id: "p11_elast_1",
            name: "Elasticity & Moduli",
            formula:
              "$$Y = \\frac{F L}{A \\Delta L}, \\quad B = -V\\frac{\\Delta P}{\\Delta V}, \\quad \\eta = \\frac{F / A}{\\theta}, \\quad \\text{Energy Density} = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain}$$",
            description:
              "Young's modulus $Y$, Bulk modulus $B$, Shear modulus $\\eta$, and elastic potential energy per unit volume.",
            keyApplication:
              "Tensile load calculations, wire elongation, compressibility.",
          },
          {
            id: "p11_fluid_1",
            name: "Surface Tension & Bernoulli's Theorem",
            formula:
              "$$\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4T}{R}, \\quad F = 6\\pi\\eta r v_t, \\quad P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}$$",
            description:
              "Excess pressure across curved liquid surfaces, Stokes' law for terminal velocity, and Bernoulli's conservation theorem for streamline fluids.",
            keyApplication:
              "Viscous drag, capillary rise, airplane lift, venturimeter.",
          },
        ],
      },
      {
        unitName: "Heat & Thermodynamics",
        chapterNames: [
          "Thermal Expansion",
          "Calorimetry",
          "Thermal Conduction",
          "First Law of Thermodynamics",
          "Second Law of Thermodynamics",
        ],
        formulas: [
          {
            id: "p11_therm_1",
            name: "Thermal Expansion & Calorimetry",
            formula:
              "$$L_t = L_0(1 + \\alpha \\Delta\\theta), \\quad \\gamma = 3\\alpha, \\quad \\beta = 2\\alpha, \\quad Q = m s \\Delta\\theta, \\quad Q = m L_f \\text{ (or } m L_v)$$",
            description:
              "Linear, superficial, and volumetric expansion coefficients; heat transfer with specific heat capacity $s$ and latent heat $L$.",
            keyApplication: "Bimetallic strips, heat exchange in calorimeters.",
          },
          {
            id: "p11_firstlaw_1",
            name: "First Law of Thermodynamics",
            formula:
              "$$dQ = dU + dW, \\quad dW = P dV, \\quad dU = n C_v dT, \\quad C_p - C_v = R$$",
            description:
              "Conservation of energy in thermodynamic processes; Mayer's relation for ideal gases with gas constant $R$.",
            keyApplication:
              "Isobaric, isochoric, isothermal, and adiabatic systems.",
          },
          {
            id: "p11_gaswork_1",
            name: "Isothermal vs. Adiabatic Work",
            formula:
              "$$W_{\\text{iso}} = nRT \\ln\\left(\\frac{V_2}{V_1}\\right), \\quad PV^\\gamma = \\text{const}, \\quad W_{\\text{adi}} = \\frac{nR(T_1 - T_2)}{\\gamma - 1} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1}$$",
            description:
              "Work done during reversible isothermal expansion and reversible adiabatic process ($\\gamma = C_p / C_v$).",
            keyApplication:
              "Gas cycles, compressors, internal combustion engines.",
          },
          {
            id: "p11_carnot_1",
            name: "Carnot Heat Engine & Refrigerator",
            formula:
              "$$\\eta = 1 - \\frac{Q_2}{Q_1} = 1 - \\frac{T_2}{T_1}, \\quad \\beta_{\\text{cop}} = \\frac{Q_2}{W} = \\frac{T_2}{T_1 - T_2}$$",
            description:
              "Maximum theoretical thermal efficiency $\\eta$ and coefficient of performance $\\beta_{\\text{cop}}$ operating between temperatures $T_1$ (source) and $T_2$ (sink).",
            keyApplication:
              "Second law limits, thermodynamic cycle optimization.",
          },
        ],
      },
      {
        unitName: "Wave & Optics",
        chapterNames: [
          "Reflection at Curved Mirrors",
          "Refraction at Plane Surfaces",
          "Refraction through Prisms",
          "Lenses",
        ],
        formulas: [
          {
            id: "p11_optics_1",
            name: "Snell's Law & Critical Angle",
            formula:
              "$$\\frac{\\sin i}{\\sin r} = \\frac{\\mu_2}{\\mu_1} = \\frac{v_1}{v_2}, \\quad \\sin C = \\frac{1}{\\mu}, \\quad \\text{Lateral Shift} = \\frac{t \\sin(i - r)}{\\cos r}$$",
            description:
              "Law of refraction, total internal reflection condition with critical angle $C$, and shift through a glass slab of thickness $t$.",
            keyApplication:
              "Optical fibers, total internal reflection, prism instruments.",
          },
          {
            id: "p11_prism_1",
            name: "Prism Refractive Index",
            formula:
              "$$\\mu = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}, \\quad \\delta \\approx (\\mu - 1)A \\text{ (small angle)}$$",
            description:
              "Minimum deviation angle $\\delta_m$ through a prism of refracting angle $A$.",
            keyApplication: "Spectrometers, chromatic dispersion analysis.",
          },
          {
            id: "p11_lens_1",
            name: "Lens Maker's Formula & Thin Lens Equation",
            formula:
              "$$\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\quad P = \\frac{1}{f(\\text{m})} \\text{ (Diopters)}$$",
            description:
              "Relates focal length $f$ to refractive index $\\mu$, radii of curvature $R_1, R_2$, and image/object distances $v, u$.",
            keyApplication:
              "Eyeglass prescriptions, camera lenses, microscopes.",
          },
        ],
      },
      {
        unitName: "Electricity & DC Circuits",
        chapterNames: [
          "Electric Current",
          "Ohmic Resistances",
          "DC Circuits and Instruments",
        ],
        formulas: [
          {
            id: "p11_circuits_1",
            name: "Ohm's Law, Resistivity & Wheatstone Bridge",
            formula:
              "$$V = IR, \\quad R = \\frac{\\rho l}{A}, \\quad R_t = R_0(1 + \\alpha \\Delta t), \\quad \\frac{P}{Q} = \\frac{R}{S} \\text{ (Balanced Bridge)}$$",
            description:
              "Relationship of resistance to geometry and temperature coefficient $\\alpha$; null-deflection condition for Wheatstone bridge.",
            keyApplication: "Resistance measurement, meter bridge experiments.",
          },
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
    title: "Grade 12 Physics Formula Cheatsheet",
    description:
      "Rotational mechanics, wave optics, electromagnetism, and modern nuclear physics for NEB Grade 12.",
    units: [
      {
        unitName: "Rotational Dynamics & SHM",
        chapterNames: ["Rotational Dynamics", "Periodic Motion"],
        formulas: [
          {
            id: "p12_rot_1",
            name: "Rotational Motion & Moment of Inertia",
            formula:
              "$$\\tau = I\\alpha, \\quad L = I\\omega, \\quad KE_{\\text{rot}} = \\frac{1}{2}I\\omega^2, \\quad I_{\\text{total}} = I_{cm} + M d^2 \\text{ (Parallel Axis)}$$",
            description:
              "Torque $\\tau$, angular momentum $L$, rotational kinetic energy, and Steiner parallel axis theorem.",
            keyApplication:
              "Flywheels, rolling without slipping on inclined plane ($a = \\frac{g\\sin\\theta}{1 + I/MR^2}$).",
          },
          {
            id: "p12_shm_1",
            name: "Simple Harmonic Motion (SHM)",
            formula:
              "$$x = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x, \\quad T_{\\text{spring}} = 2\\pi\\sqrt{\\frac{m}{k}}, \\quad T_{\\text{pendulum}} = 2\\pi\\sqrt{\\frac{l}{g}}$$",
            description:
              "Displacement, velocity, acceleration, and oscillation period of ideal mass-spring and simple pendulum systems.",
            keyApplication:
              "Vibrational analysis, clock mechanisms, resonance.",
          },
        ],
      },
      {
        unitName: "Wave Optics & Interference",
        chapterNames: [
          "Wave Motion",
          "Interference",
          "Diffraction",
          "Polarization",
        ],
        formulas: [
          {
            id: "p12_doppler_1",
            name: "Doppler Effect for Sound",
            formula:
              "$$f' = f \\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right), \\quad v_{\\text{sound}} = \\sqrt{\\frac{\\gamma P}{\\rho}} = \\sqrt{\\frac{\\gamma R T}{M}}$$",
            description:
              "Observed frequency $f'$ when source and observer are in relative motion through medium of sound speed $v$ (Laplace formula).",
            keyApplication: "Acoustic sirens, radar speed guns, red-shift.",
          },
          {
            id: "p12_interf_1",
            name: "Young's Double Slit & Brewster's Law",
            formula:
              "$$\\beta = \\frac{\\lambda D}{d}, \\quad y_n = n\\frac{\\lambda D}{d} \\text{ (Bright)}, \\quad a\\sin\\theta = n\\lambda \\text{ (Diffraction min)}, \\quad \\mu = \\tan i_p$$",
            description:
              "Fringe separation $\\beta$ with slit spacing $d$ and screen distance $D$; Brewster polarizing angle $i_p$.",
            keyApplication:
              "Wavelength calibration, anti-reflective coatings, glare reduction.",
          },
        ],
      },
      {
        unitName: "Electricity & Magnetism",
        chapterNames: [
          "Coulombs Law and Capacitance",
          "Electromagnetic Induction",
          "Alternating Currents",
        ],
        formulas: [
          {
            id: "p12_cap_1",
            name: "Capacitors & Energy Storage",
            formula:
              "$$C = \\frac{\\varepsilon_0 A}{d}, \\quad C_k = k\\frac{\\varepsilon_0 A}{d}, \\quad U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV, \\quad u_E = \\frac{1}{2}\\varepsilon_0 E^2$$",
            description:
              "Parallel plate capacitance with dielectric constant $k$, electrostatic energy $U$, and electric energy density $u_E$.",
            keyApplication: "Filter circuits, flash lamps, power decoupling.",
          },
          {
            id: "p12_emi_1",
            name: "Faraday's Law, Biot-Savart & Lorentz Force",
            formula:
              "$$\\mathcal{E} = -N\\frac{d\\Phi_B}{dt}, \\quad e = -L\\frac{dI}{dt}, \\quad dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}, \\quad \\vec{F} = q(\\vec{v} \\times \\vec{B})$$",
            description:
              "Induced EMF in coils with self-inductance $L$, magnetic flux $\\Phi_B$, Biot-Savart magnetic field, and magnetic Lorentz force.",
            keyApplication: "Transformers, dynamos, galvanometers, cyclotrons.",
          },
          {
            id: "p12_lcr_1",
            name: "LCR Series AC Circuit",
            formula:
              "$$Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad X_L = 2\\pi f L, \\quad X_C = \\frac{1}{2\\pi f C}, \\quad f_r = \\frac{1}{2\\pi\\sqrt{LC}}, \\quad \\cos\\phi = \\frac{R}{Z}$$",
            description:
              "Impedance $Z$, inductive reactance $X_L$, capacitive reactance $X_C$, resonant frequency $f_r$, and power factor $\\cos\\phi$.",
            keyApplication:
              "Radio tuning, impedance matching, power grid transmission.",
          },
        ],
      },
      {
        unitName: "Modern Physics & Nuclear Physics",
        chapterNames: [
          "Electrons and Photons",
          "Atomic Structure",
          "Nuclear Physics",
          "Semiconductors",
        ],
        formulas: [
          {
            id: "p12_pe_1",
            name: "Einstein's Photoelectric Equation",
            formula:
              "$$hf = \\Phi + KE_{\\max} = hf_0 + eV_s, \\quad \\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2m e V}}$$",
            description:
              "Photoelectric emission with work function $\\Phi$, threshold frequency $f_0$, stopping potential $V_s$, and de Broglie matter wavelength $\\lambda$.",
            keyApplication:
              "Photocells, electron microscopy, quantum mechanics.",
          },
          {
            id: "p12_bohr_1",
            name: "Bohr Hydrogen Atom & Rydberg Formula",
            formula:
              "$$r_n = 0.529 \\frac{n^2}{Z} \\text{ \\AA}, \\quad E_n = -13.6 \\frac{Z^2}{n^2} \\text{ eV}, \\quad \\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$$",
            description:
              "Quantized radii, total orbital energy levels, and emission spectral lines (Lyman, Balmer, Paschen).",
            keyApplication:
              "Hydrogen emission spectroscopy, stellar composition.",
          },
          {
            id: "p12_radio_1",
            name: "Radioactive Decay Law",
            formula:
              "$$N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}, \\quad \\tau = \\frac{1}{\\lambda}, \\quad E = \\Delta m c^2$$",
            description:
              "Exponential decay with decay constant $\\lambda$, half-life $T_{1/2}$, mean lifetime $\\tau$, and nuclear mass defect energy conversion.",
            keyApplication:
              "Carbon-14 dating, nuclear fission/fusion, medical radiotherapy.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // MATHEMATICS GRADE 11
  // ==========================================
  Mathematics_11: {
    subject: "Mathematics",
    grade: 11,
    title: "Grade 11 Mathematics Formula Cheatsheet",
    description:
      "Trigonometric identities, coordinates, calculus foundations, and algebra theorems for NEB Grade 11.",
    units: [
      {
        unitName: "Trigonometry & Identities",
        chapterNames: [
          "Compound Angles",
          "Multiple & Submultiple Angles",
          "Transformation of Formulas",
          "Trigonometric Equations",
        ],
        formulas: [
          {
            id: "m11_trig_1",
            name: "Compound & Multiple Angle Formulas",
            formula:
              "$$\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B, \\quad \\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}$$",
            description:
              "Core addition and subtraction theorems for trigonometric functions.",
            keyApplication:
              "Expansion and evaluation of non-standard angle ratios.",
          },
          {
            id: "m11_trig_2",
            name: "Double Angle & Half Angle Forms",
            formula:
              "$$\\sin 2A = 2\\sin A\\cos A = \\frac{2\\tan A}{1 + \\tan^2 A}, \\quad \\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A = \\frac{1 - \\tan^2 A}{1 + \\tan^2 A}$$",
            description:
              "Double angle identities in terms of sine, cosine, and tangent.",
            keyApplication:
              "Calculus integration substitutions and simplification.",
          },
          {
            id: "m11_trig_3",
            name: "Product-to-Sum Transformations",
            formula:
              "$$2\\sin A\\cos B = \\sin(A+B) + \\sin(A-B), \\quad 2\\cos A\\cos B = \\cos(A+B) + \\cos(A-B), \\quad 2\\sin A\\sin B = \\cos(A-B) - \\cos(A+B)$$",
            description:
              "Converts products of sinusoidal functions into sums and differences.",
            keyApplication:
              "Integrating products of sine and cosine in calculus.",
          },
        ],
      },
      {
        unitName: "Coordinate Geometry & Lines",
        chapterNames: ["Straight Lines", "Pair of Straight Lines", "Circle"],
        formulas: [
          {
            id: "m11_lines_1",
            name: "Straight Lines & Distance Formulas",
            formula:
              "$$d = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right|, \\quad m_1 m_2 = -1 \\text{ (Perpendicular)}$$",
            description:
              "Perpendicular distance from $(x_1, y_1)$ to $ax+by+c=0$ and angle $\\theta$ between two lines.",
            keyApplication:
              "Analytical geometry proofs and coordinate transformations.",
          },
          {
            id: "m11_circle_1",
            name: "General Equation of Circle",
            formula:
              "$$x^2 + y^2 + 2gx + 2fy + c = 0 \\implies \\text{Centre} = (-g, -f), \\quad r = \\sqrt{g^2 + f^2 - c}$$",
            description:
              "Standard Cartesian circle equation with centre and radius condition $g^2+f^2 \\ge c$.",
            keyApplication:
              "Tangents, normals, and intersections with secants.",
          },
        ],
      },
      {
        unitName: "Differential & Integral Calculus",
        chapterNames: [
          "Limits and Continuity",
          "Derivatives",
          "Indefinite Integrals",
        ],
        formulas: [
          {
            id: "m11_calc_diff",
            name: "Fundamental Derivative Rules",
            formula:
              "$$\\frac{d}{dx}(x^n) = n x^{n-1}, \\quad \\frac{d}{dx}(uv) = u'v + uv', \\quad \\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{u'v - uv'}{v^2}, \\quad \\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}$$",
            description:
              "Power rule, product rule, quotient rule, and chain rule for differentiable functions.",
            keyApplication:
              "Instantaneous rate of change, tangents, optimization.",
          },
          {
            id: "m11_calc_int",
            name: "Standard Indefinite Integrals",
            formula:
              "$$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C, \\quad \\int \\frac{1}{x}dx = \\ln|x| + C, \\quad \\int e^{kx}dx = \\frac{e^{kx}}{k} + C, \\quad \\int \\sin x dx = -\\cos x + C, \\quad \\int \\sec^2 x dx = \\tan x + C$$",
            description:
              "Elementary anti-derivatives and basic integration forms.",
            keyApplication: "Area summation, velocity-displacement conversion.",
          },
        ],
      },
      {
        unitName: "Algebra & Series",
        chapterNames: [
          "Sequence and Series",
          "Quadratic Equations",
          "Complex Numbers",
          "Binomial Theorem",
        ],
        formulas: [
          {
            id: "m11_alg_1",
            name: "Arithmetic & Geometric Progressions",
            formula:
              "$$S_n^{(AP)} = \\frac{n}{2}[2a + (n-1)d], \\quad S_n^{(GP)} = \\frac{a(r^n - 1)}{r - 1}, \\quad S_\\infty^{(GP)} = \\frac{a}{1 - r} \\; (|r| < 1)$$",
            description:
              "Sum of $n$ terms in AP and GP, and infinite sum of convergent geometric series.",
            keyApplication: "Compounding finance, series summation, limits.",
          },
          {
            id: "m11_alg_2",
            name: "Binomial Expansion & General Term",
            formula:
              "$$(a + b)^n = \\sum_{r=0}^n \\binom{n}{r} a^{n-r} b^r, \\quad T_{r+1} = \\binom{n}{r} a^{n-r} b^r, \\quad \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$",
            description:
              "Expansion of positive integer powers and formula for the $(r+1)$-th term.",
            keyApplication:
              "Coefficient extraction, term independent of $x$, approximations.",
          },
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
    title: "Grade 12 Mathematics Formula Cheatsheet",
    description:
      "Integral calculus techniques, differential equations, 3D vectors, and probability for NEB Grade 12.",
    units: [
      {
        unitName: "Advanced Calculus & Integrals",
        chapterNames: [
          "Methods of Integration",
          "Definite Integrals",
          "Differential Equations",
        ],
        formulas: [
          {
            id: "m12_int_parts",
            name: "Integration by Parts (ILATE Rule)",
            formula:
              "$$\\int u v \\, dx = u \\int v\\, dx - \\int \\left(u' \\int v\\, dx\\right) dx, \\quad \\int e^x [f(x) + f'(x)]\\, dx = e^x f(x) + C$$",
            description:
              "Standard product integration choosing $u$ by Inverse, Logarithmic, Algebraic, Trigonometric, Exponential priority.",
            keyApplication: "Solving products of mixed function families.",
          },
          {
            id: "m12_int_standard",
            name: "Standard Special Integrals",
            formula:
              "$$\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right) + C, \\quad \\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\arcsin\\left(\\frac{x}{a}\\right) + C, \\quad \\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln|x + \\sqrt{x^2 \\pm a^2}| + C$$",
            description:
              "Inverse trigonometric and logarithmic anti-derivatives.",
            keyApplication:
              "Rational algebraic and quadratic radical integrations.",
          },
          {
            id: "m12_diff_eq",
            name: "First Order Linear Differential Equation",
            formula:
              "$$\\frac{dy}{dx} + P(x)y = Q(x) \\implies \\text{I.F.} = e^{\\int P(x)dx}, \\quad y \\cdot (\\text{I.F.}) = \\int Q(x) \\cdot (\\text{I.F.}) \\, dx + C$$",
            description:
              "Integrating Factor (I.F.) method for solving non-homogeneous linear first-order differential equations.",
            keyApplication:
              "Population growth models, radioactive decay, Newton cooling law.",
          },
        ],
      },
      {
        unitName: "Vectors & 3D Geometry",
        chapterNames: [
          "Vectors in 3D",
          "Three Dimensional Coordinates",
          "The Plane",
        ],
        formulas: [
          {
            id: "m12_vec_1",
            name: "Dot & Cross Products in Components",
            formula:
              "$$\\vec{a}\\cdot\\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3, \\quad \\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}, \\quad \\text{Area}_{\\Delta} = \\frac{1}{2}|\\vec{a}\\times\\vec{b}|$$",
            description:
              "Scalar product for angles ($\\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$) and vector product for normal directions and areas.",
            keyApplication:
              "Work done, torque, normal vector to planes, area of parallelograms.",
          },
          {
            id: "m12_plane_1",
            name: "Line & Plane Equations in 3D",
            formula:
              "$$\\text{Line: } \\frac{x - x_1}{l} = \\frac{y - y_1}{m} = \\frac{z - z_1}{n}, \\quad \\text{Plane: } a(x-x_1) + b(y-y_1) + c(z-z_1) = 0, \\quad d = \\frac{|a x_0 + b y_0 + c z_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$",
            description:
              "Symmetric form of 3D line, Cartesian plane equation with normal $(a, b, c)$, and perpendicular point-to-plane distance.",
            keyApplication:
              "3D spatial geometry, intersection of rays and surfaces.",
          },
        ],
      },
      {
        unitName: "Probability & Statistics",
        chapterNames: ["Probability", "Binomial Distribution"],
        formulas: [
          {
            id: "m12_prob_1",
            name: "Conditional Probability & Bayes' Theorem",
            formula:
              "$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_{k=1}^n P(E_k)P(A|E_k)}$$",
            description:
              "Updating probability priors based on observed evidence $A$ across mutually exclusive partitions $E_i$.",
            keyApplication:
              "Medical diagnostics, false positive analysis, decision trees.",
          },
          {
            id: "m12_binom_1",
            name: "Binomial Distribution Parameters",
            formula:
              "$$P(X = r) = \\binom{n}{r} p^r q^{n-r}, \\quad \\text{Mean } \\mu = n p, \\quad \\text{Variance } \\sigma^2 = n p q \\; (q = 1 - p)$$",
            description:
              "Probability mass function for $r$ successes in $n$ independent Bernoulli trials.",
            keyApplication:
              "Quality control, coin-toss modeling, reliability engineering.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // CHEMISTRY GRADE 11 & 12
  // ==========================================
  Chemistry_11: {
    subject: "Chemistry",
    grade: 11,
    title: "Grade 11 Chemistry Formula Cheatsheet",
    description:
      "Stoichiometry, gas laws, chemical bonding, and equilibrium constants for NEB Grade 11.",
    units: [
      {
        unitName: "Stoichiometry & Mole Concept",
        chapterNames: [
          "Foundation & Chemical Calculations",
          "Atomic Structure",
        ],
        formulas: [
          {
            id: "c11_mole_1",
            name: "Mole Concept & Concentrations",
            formula:
              "$$n = \\frac{w}{M} = \\frac{V(\\text{STP})}{22.4\\text{ L}} = \\frac{N}{6.022 \\times 10^{23}}, \\quad M = \\frac{n}{V(\\text{L})}, \\quad N = M \\times \\text{n-factor}$$",
            description:
              "Standard molar relationships, molarity $M$, and normality $N$ with equivalence relation $N_1 V_1 = N_2 V_2$.",
            keyApplication:
              "Titration calculations, acid-base volumetric analysis.",
          },
          {
            id: "c11_gas_1",
            name: "Ideal Gas & van der Waals Equation",
            formula:
              "$$PV = nRT = \\frac{w}{M}RT, \\quad \\left(P + \\frac{a n^2}{V^2}\\right)(V - nb) = nRT, \\quad \\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}$$",
            description:
              "Ideal gas law, real gas corrections with constants $a$ (intermolecular attraction) and $b$ (molecular volume), and Graham's diffusion law.",
            keyApplication:
              "Gas stoichiometry, molecular weight determination.",
          },
        ],
      },
      {
        unitName: "Chemical Equilibrium & Thermodynamics",
        chapterNames: ["Chemical Equilibrium", "Chemical Thermodynamics"],
        formulas: [
          {
            id: "c11_eq_1",
            name: "Equilibrium Constant Relations",
            formula:
              "$$K_p = K_c(RT)^{\\Delta n_g}, \\quad \\Delta G^\\circ = -RT\\ln K, \\quad \\text{pH} = -\\log[H^+], \\quad \\text{pH} + \\text{pOH} = 14$$",
            description:
              "Relation between partial pressure constant $K_p$ and concentration constant $K_c$, standard free energy, and auto-ionization of water ($K_w = 10^{-14}$).",
            keyApplication:
              "Equilibrium yield predictions, pH of weak acids and bases.",
          },
          {
            id: "c11_therm_1",
            name: "Hess's Law & Enthalpy Relations",
            formula:
              "$$\\Delta H = \\Delta U + \\Delta n_g RT, \\quad \\Delta H_{\\text{rxn}}^\\circ = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})$$",
            description:
              "Relation between constant pressure heat $\\Delta H$ and constant volume heat $\\Delta U$.",
            keyApplication:
              "Calorific value determination, bond enthalpy calculations.",
          },
        ],
      },
    ],
  },

  Chemistry_12: {
    subject: "Chemistry",
    grade: 12,
    title: "Grade 12 Chemistry Formula Cheatsheet",
    description:
      "Electrochemistry, chemical kinetics, organic mechanisms and functional group transformations.",
    units: [
      {
        unitName: "Electrochemistry & Solutions",
        chapterNames: ["Solid State", "Solutions", "Electrochemistry"],
        formulas: [
          {
            id: "c12_nernst_1",
            name: "Nernst Equation & Cell Potential",
            formula:
              "$$E_{\\text{cell}} = E_{\\text{cell}}^\\circ - \\frac{0.0591}{n}\\log_{10} Q \\; (\\text{at } 298\\text{ K}), \\quad \\Delta G^\\circ = -n F E_{\\text{cell}}^\\circ$$",
            description:
              "Electrode potential under non-standard concentrations with reaction quotient $Q$ and Faraday constant $F = 96500\\text{ C/mol}$.",
            keyApplication:
              "Galvanic cells, battery voltage drop, pH sensor calculations.",
          },
          {
            id: "c12_collig_1",
            name: "Colligative Properties & Raoult Law",
            formula:
              "$$\\frac{P^\\circ - P_s}{P^\\circ} = X_B = \\frac{n_B}{n_A + n_B}, \\quad \\Delta T_b = K_b \\cdot m, \\quad \\Delta T_f = K_f \\cdot m, \\quad \\pi = C R T = \\frac{n}{V}RT$$",
            description:
              "Relative lowering of vapor pressure, boiling point elevation, freezing point depression, and osmotic pressure $\\pi$.",
            keyApplication: "Molar mass determination of non-volatile solutes.",
          },
        ],
      },
      {
        unitName: "Chemical Kinetics",
        chapterNames: ["Chemical Kinetics"],
        formulas: [
          {
            id: "c12_kin_1",
            name: "Rate Laws & Arrhenius Equation",
            formula:
              "$$k = \\frac{2.303}{t}\\log_{10}\\left(\\frac{[A]_0}{[A]_t}\\right), \\quad t_{1/2} = \\frac{0.693}{k} \\text{ (1st Order)}, \\quad k = A e^{-E_a / RT}, \\quad \\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$",
            description:
              "First order integrated rate law, half-life independence of concentration, and temperature dependence of rate constant via activation energy $E_a$.",
            keyApplication:
              "Reaction rate monitoring, shelf-life prediction, catalyst comparison.",
          },
        ],
      },
      {
        unitName: "Organic Reactions & Conversions",
        chapterNames: [
          "Haloalkanes and Haloarenes",
          "Alcohols, Phenols and Ethers",
          "Aldehydes and Ketones",
          "Carboxylic Acids",
        ],
        formulas: [
          {
            id: "c12_org_1",
            name: "Key Organic Named Reactions",
            formula:
              "$$\\text{Aldol: } 2\\text{RCH}_2\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\beta\\text{-hydroxy aldehyde} \\xrightarrow{\\Delta} \\alpha,\\beta\\text{-unsaturated enal}$$ $$\\text{Cannizzaro: } 2\\text{HCHO} \\xrightarrow{\\text{50\\% NaOH}} \\text{CH}_3\\text{OH} + \\text{HCOONa}$$ $$\\text{Wurtz: } 2R-X + 2Na \\xrightarrow{\\text{dry ether}} R-R + 2NaX$$",
            description:
              "Classic condensations and cross-coupling reactions required for 5M and 8M synthesis chains in NEB Board exams.",
            keyApplication:
              "Multi-step synthesis roadmaps and identification tests.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // ACCOUNTING GRADE 11 & 12
  // ==========================================
  Accounting_11: {
    subject: "Accounting",
    grade: 11,
    title: "Grade 11 Accounting Formula Cheatsheet",
    description:
      "Fundamental accounting equations, ledger balances, trial balance, and financial statement formulas.",
    units: [
      {
        unitName: "Accounting Equation & Financial Statements",
        chapterNames: [
          "Introduction to Accounting",
          "Accounting Equation",
          "Financial Statements",
        ],
        formulas: [
          {
            id: "acc11_eq_1",
            name: "Fundamental Accounting Equation",
            formula:
              "$$\\text{Assets} = \\text{Liabilities} + \\text{Capital (Owner's Equity)}$$",
            description:
              "The foundation of the double-entry bookkeeping system: every transaction keeps this equation in balance.",
            keyApplication:
              "Balance sheet reconciliation and transaction analysis.",
          },
          {
            id: "acc11_stmt_1",
            name: "Trading & Profit/Loss Statement Formulas",
            formula:
              "$$\\text{COGS} = \\text{Opening Stock} + \\text{Net Purchases} + \\text{Direct Expenses} - \\text{Closing Stock}$$ $$\\text{Gross Profit} = \\text{Net Sales} - \\text{COGS}$$ $$\\text{Net Profit} = \\text{Gross Profit} + \\text{Indirect Incomes} - \\text{Indirect Expenses}$$",
            description:
              "Standard derivation of trading results and operational net earnings.",
            keyApplication:
              "Preparation of final accounts and income statements.",
          },
          {
            id: "acc11_depr_1",
            name: "Straight-Line & Diminishing Depreciation",
            formula:
              "$$\\text{Annual Depreciation (SLM)} = \\frac{\\text{Cost of Asset} - \\text{Scrap Value}}{\\text{Estimated Useful Life in Years}}$$ $$\\text{Depreciation (WDV)} = \\text{Book Value at Start of Year} \\times \\text{Rate \\%}$$",
            description:
              "Fixed installment method vs. reducing balance / written-down value method.",
            keyApplication:
              "Asset depreciation schedules, machinery disposal accounts.",
          },
        ],
      },
    ],
  },

  Accounting_12: {
    subject: "Accounting",
    grade: 12,
    title: "Grade 12 Accounting Formula Cheatsheet",
    description:
      "Ratio analysis, cash flow statement metrics, share capital allotment and cost accounting equations.",
    units: [
      {
        unitName: "Ratio Analysis & Financial Diagnostics",
        chapterNames: ["Financial Statement Analysis", "Ratio Analysis"],
        formulas: [
          {
            id: "acc12_ratio_liq",
            name: "Liquidity Ratios",
            formula:
              "$$\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}} \\; (\\text{Standard } 2:1)$$ $$\\text{Quick / Liquid Ratio} = \\frac{\\text{Liquid Assets}}{\\text{Current Liabilities}} \\; (\\text{Standard } 1:1)$$ $$\\text{Liquid Assets} = \\text{Current Assets} - \\text{Closing Stock} - \\text{Prepaid Expenses}$$",
            description:
              "Measures a firm's short-term solvency and ability to honor immediate debt obligations.",
            keyApplication: "Working capital management and liquidity audits.",
          },
          {
            id: "acc12_ratio_prof",
            name: "Profitability & Turnover Ratios",
            formula:
              "$$\\text{Gross Profit Ratio} = \\frac{\\text{Gross Profit}}{\\text{Net Revenue / Sales}} \\times 100\\%$$ $$\\text{Net Profit Ratio} = \\frac{\\text{Net Profit after Tax}}{\\text{Net Sales}} \\times 100\\%$$ $$\\text{Inventory Turnover} = \\frac{\\text{Cost of Goods Sold}}{\\text{Average Inventory}} \\text{ (Times)}$$",
            description:
              "Operating efficiency metrics comparing bottom-line margins and inventory velocity.",
            keyApplication: "Comparative company performance benchmarks.",
          },
          {
            id: "acc12_ratio_solv",
            name: "Solvency & Capital Structure Ratios",
            formula:
              "$$\\text{Debt-to-Equity Ratio} = \\frac{\\text{Total Long-Term Debt}}{\\text{Shareholders' Equity / Net Worth}}$$ $$\\text{Proprietary Ratio} = \\frac{\\text{Shareholders' Funds}}{\\text{Total Assets}} \\times 100\\%$$",
            description:
              "Assesses financial leverage, risk exposure, and long-term solvency cushion for creditors.",
            keyApplication: "Credit appraisal, corporate bond issuance.",
          },
        ],
      },
      {
        unitName: "Share Capital & Cost Accounting",
        chapterNames: [
          "Accounting for Shares and Debentures",
          "Cash Flow Statement",
          "Cost Accounting",
        ],
        formulas: [
          {
            id: "acc12_cfs_1",
            name: "Cash Flow Statement Formula (NAS 07 / IAS 7)",
            formula:
              "$$\\text{Net Cash Flow} = \\text{Cash Flow from Operating (CFO)} + \\text{Cash Flow from Investing (CFI)} + \\text{Cash Flow from Financing (CFF)}$$",
            description:
              "Reconciles opening cash and cash equivalents to closing balance via operational, capital expenditure, and debt/equity activities.",
            keyApplication:
              "Mandatory NEB final examination 8-mark problem solving.",
          },
          {
            id: "acc12_shares_1",
            name: "Pro-Rata Allotment & Share Forfeiture",
            formula:
              "$$\\text{Allotment Ratio} = \\frac{\\text{Shares Offered}}{\\text{Shares Applied}}, \\quad \\text{Excess Application Money} = (\\text{Applied} - \\text{Allotted}) \\times \\text{Application Rate}$$ $$\\text{Max Discount on Re-issue} \\le \\text{Amount Forfeited per Share}$$",
            description:
              "Calculation of surplus advance money transferred to allotment and legal maximum re-issue discount.",
            keyApplication:
              "Corporate share allotment accounts and journal entries.",
          },
        ],
      },
    ],
  },
};

/**
 * Retrieves the formula sheet for a subject and grade.
 */
export function getFormulaSheet(
  subject: string,
  grade: number,
): SubjectFormulaSheet | null {
  const key = `${subject}_${grade}`;
  return formulaSheets[key] || null;
}

/**
 * Checks if a subject has an available formula sheet.
 */
export function hasFormulaSheet(subject: string, grade: number): boolean {
  return Boolean(getFormulaSheet(subject, grade));
}
