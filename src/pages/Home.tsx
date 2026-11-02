import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  BarChart3,
  CheckCircle2,
  BookOpen,
  Atom,
  Flame,
  Dna,
  Calculator,
  Languages,
  Scroll,
  Code2,
  ShieldCheck,
  Zap,
  Trophy,
  Users,
} from 'lucide-react';
import { ASSET_IMAGES } from '../assets/assetPaths';
import { useAppDispatch } from '../store';
import { setGrade, setSubject } from '../store/slices/quizConfigSlice';
import { SubjectName } from '../types/question';
import { useSEO } from '../hooks/useSEO';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useSEO({
    title: 'Nepal MCQ - Science Exam Platform',
    description:
      'Interactive NEB Grade 11 & 12 Science MCQ practice and computer-based examination platform for Physics, Chemistry, Biology, Mathematics, and Computer Science.',
    canonicalPath: '/',
  });

  const handleSelectGradeAndStart = (grade: 11 | 12) => {
    dispatch(setGrade(grade));
    navigate('/practice');
  };

  const handleSelectSubject = (subject: SubjectName) => {
    dispatch(setSubject(subject));
    navigate('/practice');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>National Examinations Board (NEB)</span>
                <span>·</span>
                <span>Grade 11 &amp; 12 Science Curriculum</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                Practice Smarter. Prepare Better. Achieve More.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Nepal’s dedicated computer-based examination and practice platform for NEB Grade 11 &amp; 12 science students. Master Physics, Chemistry, and Biology with authentic timed mocks, individual question pacing, and step-by-step scientific derivations.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl shadow-sm transition-all hover:translate-y-[-1px]"
                >
                  <span>Start Practicing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/subjects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Explore Subjects</span>
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>NEB Question Format</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Dual Countdown Timers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>Entrance Ready (IOE &amp; CEE)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-900">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Nepal MCQ Science Learning Illustration showing physics wave mechanics, chemistry molecules, and biology cell"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-16/9"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Selection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Select Your Academic Level
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose your current class to access curriculum-mapped topic banks and examinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grade 11 Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Higher Secondary · First Year
                </span>
                <span className="text-xs font-mono font-medium text-slate-400">Class XI</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Grade 11 Science
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Foundational syllabus covering Vectors, Kinematics, Atomic Structure, Chemical Bonding, Cell Biology, Biomolecules, and Plant Anatomy.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Physics (13 Topics)</span>
                <span>·</span>
                <span>Chemistry (9 Topics)</span>
                <span>·</span>
                <span>Biology (9 Topics)</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">NEB Exam Pacing</span>
              <button
                type="button"
                onClick={() => handleSelectGradeAndStart(11)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>Practice Grade 11</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grade 12 Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Higher Secondary · Board Final Year
                </span>
                <span className="text-xs font-mono font-medium text-slate-400">Class XII</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Grade 12 Science
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Advanced NEB syllabus &amp; competitive entrance preparation. Covers Rotational Dynamics, Modern Physics, Volumetric Analysis, Organic Chemistry, Genetics, and Biotechnology.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Physics (16 Topics)</span>
                <span>·</span>
                <span>Chemistry (14 Topics)</span>
                <span>·</span>
                <span>Biology (8 Topics)</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Board &amp; Entrance Standard</span>
              <button
                type="button"
                onClick={() => handleSelectGradeAndStart(12)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>Practice Grade 12</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Curriculum Subjects
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Focus your revision on specific disciplines or take a mixed multi-subject examination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Physics */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.physics}
                alt="Physics laboratory apparatus with laser optics and pendulums"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5" />
                <span>Physics</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Physics Practice Sets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Mechanics, Heat &amp; Thermodynamics, Waves &amp; Optics, Electricity &amp; Magnetism, and Modern Physics.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('Physics')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Physics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Chemistry */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.chemistry}
                alt="Chemistry laboratory titration and glassware setup"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Chemistry</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Chemistry Practice Sets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Physical Chemistry, Inorganic Reaction Equations, Organic Reaction Mechanisms, and Volumetric Calculations.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('Chemistry')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Chemistry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Biology */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.biology}
                alt="Biological plant vascular cell microscopy and DNA"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5" />
                <span>Biology</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Biology Practice Sets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Botany &amp; Zoology, Cell Division, Genetics &amp; Evolution, Human Physiology, Ecology, and Biotechnology.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('Biology')}
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Biology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mathematics */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.mathematics}
                alt="Mathematics desk with calculus integrals graph, geometric polyhedra, and compass"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Mathematics</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Mathematics Practice Sets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Calculus, Matrices, Trigonometry, 3D Vectors, Differential Equations, and Probability.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('Mathematics')}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Mathematics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* English */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.english}
                alt="English literature study workspace with classic book and vocabulary cards"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                <span>English</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  English Practice Sets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Grammar (Concord, Causative, Inversion), Reading Comprehension, Literary Analysis, and Vocabulary.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('English')}
                  className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice English</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Nepali */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.nepali}
                alt="Nepali literary Devanagari manuscripts with mountain backdrop"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5" />
                <span>नेपाली (Nepali)</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  नेपाली अभ्यास सेटहरू
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  व्याकरण (शब्दवर्ग, पदसङ्गति, काल र पक्ष, समास, कारक, वाच्य), शब्द स्रोत, र पाठ्यपुस्तक साहित्य बोध।
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('Nepali')}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>नेपाली अभ्यास गर्नुहोस्</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Computer Science */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={ASSET_IMAGES.computerScience}
                alt="Computer science workspace with neural networks and algorithm flowcharts"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Computer Science</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Computer Science Practice Sets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Basics to Intermediate (CS01): Architecture, Boolean Logic, C Programming, DBMS, Networking, OOP, and Cyber Law.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Class 11 &amp; 12</span>
                <button
                  type="button"
                  onClick={() => handleSelectSubject('Computer Science')}
                  className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Computer Science</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Examination Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Engineered for High-Stakes Exam Success
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Features mirroring real computer-based entrance tests and NEB board specifications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Dual Countdown Timers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Overall examination duration paired with an individual 60-second question timer to build speed and prevent getting stuck.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Topic-Wise &amp; Full Mocks
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select specific chapters like Rotational Dynamics or test comprehensive 60-question mixed sets simulating board conditions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant Diagnostic Analytics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Immediate scoring, donut distribution, subject-wise breakdown, and identification of specific weak chapters for revision.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Detailed Explanations
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step LaTeX formulas and scientific derivations for every single question to understand why an answer is correct.
            </p>
          </div>
        </div>
      </section>

      {/* Illustrative Platform Statistics (§1.H - clearly marked as sample/illustrative) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Curriculum Coverage Benchmarks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Representative metrics based on NEB Class 11 and 12 scientific syllabi (Illustrative Sample)
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 self-start sm:self-auto">
              Sample Data · Illustrative
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                100%
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mt-1">
                NEB Syllabus Coverage
              </span>
              <span className="text-[11px] text-slate-400">Physics, Chem &amp; Bio</span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                60s
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mt-1">
                Target Question Speed
              </span>
              <span className="text-[11px] text-slate-400">Optimized pacing</span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                72+
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mt-1">
                Syllabus Chapters
              </span>
              <span className="text-[11px] text-slate-400">Grade 11 &amp; Grade 12</span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                0 Drift
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mt-1">
                Timestamp Precision
              </span>
              <span className="text-[11px] text-slate-400">Accurate countdowns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification & Leaderboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Trophy className="w-4 h-4" />
              <span>National &amp; School Leaderboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Compete With Top Science Students Across Nepal
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Earn XP points, unlock achievement badges, and climb subject-wise leaderboards in Physics, Chemistry, Biology, Mathematics, and Computer Science. Represent your college in the inter-school championship!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-xs"
              >
                <Trophy className="w-4 h-4" />
                <span>Explore Live Leaderboard</span>
              </Link>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <span>Take Test &amp; Earn XP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-96 shrink-0">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Top Colleges
              </span>
              <div className="text-lg font-bold text-white">16+ Schools</div>
              <span className="text-[11px] text-slate-400">St. Xavier's, Prasadi, KMC, LAC</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Gamification
              </span>
              <div className="text-lg font-bold text-white">XP &amp; Badges</div>
              <span className="text-[11px] text-slate-400">Daily streaks &amp; medals</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                Subject Ranks
              </span>
              <div className="text-lg font-bold text-white">7 Disciplines</div>
              <span className="text-[11px] text-slate-400">Science, Math, CS &amp; more</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">
                Inter-School
              </span>
              <div className="text-lg font-bold text-white">National Cup</div>
              <span className="text-[11px] text-slate-400">School community score</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-600 dark:bg-indigo-700 text-white p-8 sm:p-12 text-center space-y-6 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
            Ready to test your knowledge for upcoming examinations?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Practice topic-wise drills or launch full timed mock exams with individual question pacing and instant performance analytics.
          </p>
          <div className="pt-2">
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-indigo-900 bg-white hover:bg-indigo-50 rounded-xl shadow-sm transition-transform hover:scale-105"
            >
              <span>Start Practice Examination</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
