import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, isOwner, OWNER_EMAIL, logInWithEmail, registerWithEmail, signInWithGoogle, logOut } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isOwnerAdmin: boolean;
  loading: boolean;
  ownerEmail: string;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setAuthError(null);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign in failed';
      setAuthError(msg);
      throw err;
    }
  };

  const handleLoginWithEmail = async (email: string, pass: string) => {
    try {
      setAuthError(null);
      await logInWithEmail(email, pass);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setAuthError(msg);
      throw err;
    }
  };

  const handleRegisterWithEmail = async (email: string, pass: string) => {
    try {
      setAuthError(null);
      await registerWithEmail(email, pass);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setAuthError(msg);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setAuthError(null);
    } catch (err: unknown) {
      console.error('Logout error:', err);
    }
  };

  const isOwnerAdmin = Boolean(user && isOwner(user.email));

  return (
    <AuthContext.Provider
      value={{
        user,
        isOwnerAdmin,
        loading,
        ownerEmail: OWNER_EMAIL,
        loginWithGoogle,
        loginWithEmail: handleLoginWithEmail,
        registerWithEmail: handleRegisterWithEmail,
        logout: handleLogout,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
