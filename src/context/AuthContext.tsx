import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client instance
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

// Define the structure of a row in your 'profiles' table
interface Profile {
  id: string; // Must match the Supabase Auth User ID
  name: string;
  tier: 'free' | 'premium' | 'professional' | 'elite';
  loyalty_points: number; // Snake case for database column
  profile_image?: string;
  account_type: 'creator' | 'member';
  role: 'creator' | 'member';
  is_verified: boolean;
  joined_date: string; // Stored as string/timestamp in DB
}

// Combine Supabase user data with the custom profile data
interface AppUser extends Profile {
  email: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<Profile>) => Promise<void>;
  switchRole: () => Promise<void>;
}

// ... (TIER_POINTS constant remains the same)
// Add the TIER_POINTS constant and export it
export const TIER_POINTS = {
  free: 0,
  premium: 1000,
  professional: 5000,
  elite: 20000,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to fetch the full user profile data
  const getProfile = async (id: string, email: string): Promise<AppUser | null> => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return null;
    }

    if (profile) {
      return {
        ...profile,
        email: email, // Add email which is not in the profiles table
      };
    }
    return null;
  };


  useEffect(() => {
    // Listen for auth state changes (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const appUser = await getProfile(session.user.id, session.user.email!);
          setUser(appUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Initial check for session
    const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const appUser = await getProfile(session.user.id, session.user.email!);
            setUser(appUser);
        }
        setLoading(false);
    }
    getInitialSession();

    // Cleanup the listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message); // Use better UI notification in production
    }
    setLoading(false);
  };

  const signUp = async (userData: any) => {
    setLoading(true);
    const { email, password, name, accountType } = userData;
    // Sign up the user in auth.users
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name, accountType: accountType },
      }
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Profile will be created automatically by a database trigger
      // Wait a moment for the trigger to execute
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = async (userData: Partial<Profile>) => {
    if (user) {
      // Update the profiles table
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user profile:', error.message);
      } else {
        // Re-fetch or locally update state after successful update
        const updatedUser = await getProfile(user.id, user.email);
        setUser(updatedUser);
      }
    }
  };

  const switchRole = async () => {
    if (user) {
        const newRole = user.role === 'creator' ? 'member' : 'creator';
        const newAccountType = user.account_type === 'creator' ? 'member' : 'creator';
        await updateUser({ role: newRole, account_type: newAccountType });
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUser, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
