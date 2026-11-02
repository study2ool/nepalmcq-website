import {
  signInWithPopup,
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

