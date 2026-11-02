import {
  signInWithPopup,
  signInWithCustomToken,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseClientConfigured } from '../config/firebase';

export interface FirebaseSignInResult {
  firebaseUser: FirebaseUser;
  idToken: string;
}

export const firebaseAuthService = {
  /**
   * Signs in user with Google popup using Firebase Authentication
   */
  async signInWithGoogle(): Promise<FirebaseSignInResult> {
    if (!isFirebaseClientConfigured() || !auth) {
      throw new Error(
        'Firebase Client Auth is not configured. Missing VITE_FIREBASE_API_KEY in .env',
      );
    }

    const credential = await signInWithPopup(auth, googleProvider);
    const idToken = await credential.user.getIdToken();

    return {
      firebaseUser: credential.user,
      idToken,
    };
  },

  /**
   * Signs in user with a Firebase custom token returned by the backend.
   * Firebase Client SDK automatically persists this session across page refreshes.
   */
  async signInWithCustomToken(customToken: string): Promise<FirebaseUser | null> {
    if (isFirebaseClientConfigured() && auth) {
      try {
        const credential = await signInWithCustomToken(auth, customToken);
        return credential.user;
      } catch (error) {
        console.warn('Firebase signInWithCustomToken notice:', error);
      }
    }
    return null;
  },

  /**
   * Signs out from Firebase Client Auth
   */
  async signOut(): Promise<void> {
    if (auth) {
      await fbSignOut(auth);
    }
  },

  /**
   * Listens to Firebase auth state changes
   */
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    if (!auth) return () => {};
    return onAuthStateChanged(auth, callback);
  },
};

