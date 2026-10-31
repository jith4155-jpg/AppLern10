import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInAnonymously,
  GoogleAuthProvider, 
  signOut,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const savedEmail = localStorage.getItem('applern10_custom_email');
        const savedName = localStorage.getItem('applern10_custom_name');

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || savedEmail || 'student@gmail.com',
          displayName: firebaseUser.displayName || savedName || 'Learner',
          photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`
        });
      } else {
        const savedEmail = localStorage.getItem('applern10_custom_email');
        const savedName = localStorage.getItem('applern10_custom_name');
        if (savedEmail) {
          const virtualUid = 'user_' + btoa(savedEmail).replace(/=/g, '').slice(0, 16);
          setUser({
            uid: virtualUid,
            email: savedEmail,
            displayName: savedName || savedEmail.split('@')[0],
            photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${savedEmail}`
          });
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email) {
        localStorage.setItem('applern10_custom_email', result.user.email);
        if (result.user.displayName) {
          localStorage.setItem('applern10_custom_name', result.user.displayName);
        }
      }
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      throw error;
    }
  };

  const loginWithEmail = async (inputEmail: string, name?: string) => {
    const cleanEmail = inputEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error("Please enter a valid Gmail or Email address.");
    }

    localStorage.setItem('applern10_custom_email', cleanEmail);
    if (name) {
      localStorage.setItem('applern10_custom_name', name);
    } else {
      localStorage.setItem('applern10_custom_name', cleanEmail.split('@')[0]);
    }

    try {
      // Authenticate with Firebase Auth via anonymous session
      const cred = await signInAnonymously(auth);
      setUser({
        uid: cred.user.uid,
        email: cleanEmail,
        displayName: name || cleanEmail.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cred.user.uid}`
      });
    } catch (err) {
      console.warn("Firebase Auth fallback to persistent session state:", err);
      const virtualUid = 'user_' + btoa(cleanEmail).replace(/=/g, '').slice(0, 16);
      setUser({
        uid: virtualUid,
        email: cleanEmail,
        displayName: name || cleanEmail.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${virtualUid}`
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('applern10_custom_email');
    localStorage.removeItem('applern10_custom_name');
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

