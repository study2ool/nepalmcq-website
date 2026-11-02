import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setToken, fetchCurrentUser } from '../store/slices/authSlice';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      setErrorMessage(decodeURIComponent(error));
      return;
    }

    if (token) {
      dispatch(setToken(token));
      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => {
          navigate('/dashboard', { replace: true });
        })
        .catch((err) => {
          setErrorMessage(err || 'Failed to initialize session');
        });
    } else {
      setErrorMessage('No authentication token received from Google callback.');
    }
  }, [searchParams, dispatch, navigate]);

  if (errorMessage) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Authentication Failed
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => navigate('/practice', { replace: true })}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition-all w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Practice</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-indigo-400 mb-4" />
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
        Authenticating with Google...
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        Please wait while we securely set up your session.
      </p>
    </div>
  );
};

export default AuthCallback;

