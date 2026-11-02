import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ShieldCheck, Mail, MapPin, Activity } from 'lucide-react';
import { useGetHealthQuery } from '../../store/api/apiSlice';

export const Footer: React.FC = () => {
  const { data: health, isLoading: isChecking } = useGetHealthQuery();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span>Nepal MCQ</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Specialized computer-based science practice and examination platform for NEB Grade 11 &amp; 12 students in Nepal. Preparing for board exams and engineering/medical entrance tests.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Examination
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/practice" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Practice Center &amp; Mock Exams
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Subject Syllabi &amp; Topics
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Past Examination Attempts
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-indigo-600 dark:text-indigo-400">
                  National &amp; College Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Curriculum Subjects
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Physics &amp; Chemistry</span>
                <span className="text-[11px] text-slate-400 block">Mechanics, Modern Physics, Physical &amp; Organic</span>
              </li>
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Biology &amp; Mathematics</span>
                <span className="text-[11px] text-slate-400 block">Botany, Zoology, Calculus, Vectors &amp; Algebra</span>
              </li>
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Computer Science (CS01)</span>
                <span className="text-[11px] text-slate-400 block">Architecture, C Programming, DBMS, OOP &amp; Networks</span>
              </li>
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">English &amp; नेपाली (Nepali)</span>
                <span className="text-[11px] text-slate-400 block">Grammar, Literature, व्याकरण, समास र शब्दवर्ग</span>
              </li>
            </ul>
          </div>

          {/* Standards & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Academic Support
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <span>Aligned with National Examinations Board (NEB) Class 11 &amp; 12 specifications.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>Real-time per-question &amp; overall countdown timers with anti-drift precision.</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">contact@nepalmcq.edu.np</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} Nepal MCQ. All educational materials designed for student learning.</p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  health
                    ? 'bg-emerald-500 animate-pulse'
                    : isChecking
                    ? 'bg-amber-400'
                    : 'bg-rose-400'
                }`}
              />
              <span className="text-slate-600 dark:text-slate-300">
                {health
                  ? `API Online (v${health.version})`
                  : isChecking
                  ? 'Connecting to API...'
                  : 'Offline Mode'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
