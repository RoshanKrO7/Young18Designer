import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: Error | null, user: User | null }>;
}

const ADMIN_EMAILS = [
  'admin1@young18designer.com',
  'admin2@example.com',
  'admin3@example.com',
  'admin4@example.com',
  'admin5@example.com',
];

// Create a context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => { /* This is a placeholder that will be implemented by the provider */ },
  signUp: async () => ({ error: null, user: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check if user has admin role
  const checkUserRole = (user: User | null): boolean => {
    if (!user || !user.email) {
      console.warn('User or email is undefined, cannot check role');
      return false;
    }

    const isUserAdmin = ADMIN_EMAILS.includes(user.email);
    console.log('Admin Check:', {
      userEmail: user.email,
      isAdmin: isUserAdmin,
      adminEmails: ADMIN_EMAILS,
      includes: ADMIN_EMAILS.includes(user.email)
    });
    return isUserAdmin;
  };

  // Effect to handle auth state changes
  useEffect(() => {
    // Update admin status whenever user changes
    if (user) {
      const adminStatus = checkUserRole(user);
      setIsAdmin(adminStatus);
      console.log('Updated admin status:', { email: user.email, isAdmin: adminStatus });
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in with:', email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(`Login failed: ${error.message}`);
        return { error };
      }

      const { data, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return { error: sessionError };
      }

      if (!data?.session?.user) {
        console.error('No user found in session data');
        return { error: new Error('No user found') };
      }

      const newUser = data.session.user;
      const adminStatus = checkUserRole(newUser);

      console.log('Sign in successful:', {
        userEmail: newUser.email,
        isAdmin: adminStatus
      });

      setUser(newUser);
      setSession(data.session);
      setIsAdmin(adminStatus);

      return { error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      return { error, user: data.user };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error, user: null };
    }
  };

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider; 