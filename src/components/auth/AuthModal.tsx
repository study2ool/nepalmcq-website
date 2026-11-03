import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeAuthModal } from '../../store/api/authApi';
import { GoogleSignInButton } from './GoogleSignInButton';
import { BookOpen, X, CheckCircle, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-md mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Welcome to Nepal <span className="text-indigo-600 dark:text-indigo-400">MCQ</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sign in to access personalized practice, save test history, and track CDC grid mastery.
          </p>
        </div>

        {/* Benefits list */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 space-y-2.5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Track chapter-wise performance across Grade 11 & 12</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Compete with peers on the Nepal national leaderboard</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Sync quiz history and diagnostics across devices</span>
          </div>
        </div>

        {/* Primary Action: Continue with Google */}
        <div className="space-y-4">
          <GoogleSignInButton onSuccess={() => dispatch(closeAuthModal())} />

          <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400 dark:text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fast, one-click authentication powered by Google OAuth</span>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

