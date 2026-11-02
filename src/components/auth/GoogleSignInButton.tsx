import React, { useEffect, useRef, useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginWithGoogle } from '../../store/api/authApi';
import { authApi } from '../../services/authApi';
import { isFirebaseClientConfigured } from '../../config/firebase';
import { firebaseAuthService } from '../../services/firebaseAuth';
import { Loader2 } from 'lucide-react';

interface GoogleSignInButtonProps {
  className?: string;
  variant?: 'primary' | 'outline';
  text?: string;
  onSuccess?: () => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  className = '',
  variant = 'primary',
  text = 'Continue with Google',
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const hiddenBtnRef = useRef<HTMLDivElement>(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const hasFirebase = isFirebaseClientConfigured();

  useEffect(() => {
    // If Firebase is configured, Firebase handles Google Auth popups natively
    if (hasFirebase || !googleClientId) return;

    if (window.google?.accounts?.id) {
      initGis();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initGis();
    };
    document.body.appendChild(script);

    function initGis() {
      try {
        window.google?.accounts?.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            if (response.credential) {
              const res = await dispatch(
                loginWithGoogle({ credential: response.credential }),
              );
              if (loginWithGoogle.fulfilled.match(res)) {
                onSuccess?.();
              }
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        setGisLoaded(true);

        if (hiddenBtnRef.current) {
          window.google?.accounts?.id.renderButton(hiddenBtnRef.current, {
            theme: 'outline',
            size: 'large',
            width: '100%',
          });
        }
      } catch (err) {
        console.warn('Google Identity Services init error:', err);
      }
    }
  }, [googleClientId, hasFirebase, dispatch, onSuccess]);

  const handleSignInClick = async () => {
    // 1. Firebase Google Auth Popup Flow
    if (hasFirebase) {
      try {
        setLocalLoading(true);
        const { idToken } = await firebaseAuthService.signInWithGoogle();
        const res = await dispatch(loginWithGoogle({ credential: idToken }));
        if (loginWithGoogle.fulfilled.match(res)) {
          onSuccess?.();
        }
      } catch (err: any) {
        console.error('Firebase Google sign-in failed:', err);
      } finally {
        setLocalLoading(false);
      }
      return;
    }

    // 2. Google OAuth2 Token Client Popup (Instant browser popup, no redirect URI issues)
    if (window.google?.accounts?.oauth2 && googleClientId) {
      try {
        setLocalLoading(true);
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'openid email profile',
          callback: async (tokenResponse: any) => {
            if (tokenResponse.error) {
              setLocalLoading(false);
              return;
            }
            if (tokenResponse.access_token) {
              const res = await dispatch(
                loginWithGoogle({ accessToken: tokenResponse.access_token }),
              );
              if (loginWithGoogle.fulfilled.match(res)) {
                onSuccess?.();
              }
            }
            setLocalLoading(false);
          },
          error_callback: () => {
            setLocalLoading(false);
          },
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        console.warn('Google OAuth tokenClient error:', err);
      }
    }

    // 3. Google Identity Services Flow (In-browser button)
    if (gisLoaded && window.google?.accounts?.id) {
      const googleBtn = hiddenBtnRef.current?.querySelector(
        'div[role="button"], button',
      ) as HTMLElement | null;

      if (googleBtn) {
        googleBtn.click();
        return;
      }

      window.google.accounts.id.prompt();
      return;
    }

    // 4. Fallback: Backend OAuth consent redirect
    window.location.href = authApi.getGoogleRedirectUrl();
  };

  const isBusy = isLoading || localLoading;

  const baseStyle =
    'relative flex items-center justify-center gap-3 w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const variantStyles =
    variant === 'primary'
      ? 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-600'
      : 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800';

  return (
    <div className="w-full flex flex-col items-center">
      <button
        type="button"
        onClick={handleSignInClick}
        disabled={isBusy}
        className={`${baseStyle} ${variantStyles} ${className}`}
        aria-label="Continue with Google"
      >
        {isBusy ? (
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />
        ) : (
          <GoogleIcon className="w-5 h-5 shrink-0" />
        )}
        <span className="font-semibold text-slate-900 dark:text-white">
          {isBusy ? 'Signing in...' : text}
        </span>
      </button>

      {/* Hidden container for Google GIS auto-rendered button if client ID is set */}
      <div ref={hiddenBtnRef} className="hidden" aria-hidden="true" />

      {error && (
        <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 text-center font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
