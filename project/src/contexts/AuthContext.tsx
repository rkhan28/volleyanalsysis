// project/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Fetch initial session
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) console.error('getSession error', error);
        setUser(data.session?.user ?? null);
        setLoading(false);
      });

    // 2) Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // 3) Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up with email & password
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error('signUp error', error);
    setLoading(false);
  };

  // Sign in with email & password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error('signIn error', error);
    setLoading(false);
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) console.error('signOut error', error);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
