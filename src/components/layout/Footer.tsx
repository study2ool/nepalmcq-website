import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useGetHealthQuery } from '../../store/api/apiSlice';
import { useAppSelector } from '../../store';

export const Footer: React.FC = () => {
  const { data: health, isLoading: isChecking } = useGetHealthQuery();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-indigo-700 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>
                Nepal <span className="text-indigo-600 dark:text-indigo-400">MCQ</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Specialized computer-based science practice and examination platform for NEB Grade 11 &amp; 12 students in Nepal. Preparing for board exams and engineering/medical entrance tests.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Kathmandu, Bagmati Province, Nepal</span>
            </div>
            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Academic Support &amp; Feedback</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Examination Center</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/practice"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5"
                >
                  Practice Center &amp; Mock Exams
                </Link>
              </li>
              <li>
                <Link
                  to="/subjects"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5"
                >
                  Curriculum &amp; Syllabus Topics
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5 text-indigo-600 dark:text-indigo-400 font-medium"
                >
                  National &amp; College Leaderboard
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/saved"
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5"
                    >
                      Saved Questions Vault
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/history"
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5"
                    >
                      Past Examination Attempts
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5"
                >
                  Help Center &amp; Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Curriculum Subjects</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Physics &amp; Chemistry</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Mechanics, Modern Physics, Physical &amp; Organic</span>
              </li>
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Biology &amp; Mathematics</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Botany, Zoology, Calculus, Vectors &amp; Algebra</span>
              </li>
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Computer Science (CS01)</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Architecture, C Programming, DBMS, OOP &amp; Networks</span>
              </li>
              <li>
                <span className="font-semibold text-slate-700 dark:text-slate-300">English &amp; नेपाली (Nepali)</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Grammar, Literature, व्याकरण, समास र शब्दवर्ग</span>
              </li>
            </ul>
          </div>

          {/* Standards & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Academic Integrity</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Aligned with National Examinations Board (NEB) Class 11 &amp; 12 specifications.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Real-time per-question &amp; overall countdown timers with anti-drift precision.
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <a
                  href="mailto:contact@nepalmcq.edu.np"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-mono text-[11px] sm:text-xs">contact@nepalmcq.edu.np</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <p className="text-[11px] text-slate-400">
                  Sun &ndash; Fri: 9:00 AM &ndash; 6:00 PM NPT
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <p>© {new Date().getFullYear()} Nepal MCQ. All educational materials designed for student learning.</p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  health
                    ? 'bg-emerald-500 animate-pulse'
                    : isChecking
                    ? 'bg-amber-400 animate-pulse'
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

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <Link
              to="/contact"
              className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Contact Support
            </Link>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
              Honor Code
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;