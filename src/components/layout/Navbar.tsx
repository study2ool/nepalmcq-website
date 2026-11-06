import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, ArrowRight, LogIn } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAppDispatch, useAppSelector } from '../../store';
import { openAuthModal } from '../../store/api/authApi';
import { UserDropdown } from '../auth/UserDropdown';
import { GoogleIcon } from '../auth/GoogleIcon';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const isAdmin =
    isAuthenticated &&
    user &&
    (user.role === 'admin' || user.email.toLowerCase() === 'study2ool.nepal@gmail.com');

  const navLinks = [
    { label: 'Practice', path: '/practice' },
    { label: 'Subjects', path: '/subjects' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Saved', path: '/saved' },
    ...(isAuthenticated ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
    ...(isAuthenticated ? [{ label: 'History', path: '/history' }] : []),
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand title */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-extrabold shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-bold">
            Nepal <span className="text-indigo-600 dark:text-indigo-400">MCQ</span>
          </span>
        </Link>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                isActive(link.path)
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme toggle, Continue with Google/User, Start Practicing) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          {/* Auth State Button */}
          {isAuthenticated && user ? (
            <UserDropdown />
          ) : (
            <button
              type="button"
              onClick={() => dispatch(openAuthModal())}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-all whitespace-nowrap shrink-0"
              aria-label="Continue with Google"
            >
              <GoogleIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Continue with Google</span>
              <span className="sm:hidden">Sign In</span>
            </button>
          )}

          <Link
            to="/practice"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <span>Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drop-down */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/contact')
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Contact &amp; Support
          </Link>

          {!isAuthenticated && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  dispatch(openAuthModal());
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700"
              >
                <GoogleIcon className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
