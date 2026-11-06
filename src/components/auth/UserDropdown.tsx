import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/api/authApi';
import {
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  History,
  BookOpen,
  ChevronDown,
  School,
  Sparkles,
  ShieldCheck,
  BookmarkCheck,
} from 'lucide-react';

const ADMIN_EMAIL = 'study2ool.nepal@gmail.com';

export const UserDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {initials}
          </div>
        )}
        <span className="hidden lg:inline text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden lg:block" />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-scaleIn">
          {/* User info banner */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>

            {user.collegeName && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                <School className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate font-medium">{user.collegeName}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                  user.role === 'admin' || user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                }`}
              >
                {user.role === 'admin' || user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
                  ? 'Administrator'
                  : user.role}
              </span>
              {user.grade && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                  Grade {user.grade}
                </span>
              )}
              {user.gender && (
                <span className="px-2 py-0.5 text-[10px] font-medium capitalize bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                  {user.gender}
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="py-1">
            {(user.role === 'admin' || user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>Admin Command Center</span>
              </Link>
            )}

            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard & Analytics</span>
            </Link>

            <Link
              to="/practice"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Practice Tests</span>
            </Link>

            <Link
              to="/history"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>Exam History</span>
            </Link>

            <Link
              to="/saved"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-500" />
              <span>Saved Questions</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                dispatch(logout());
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


