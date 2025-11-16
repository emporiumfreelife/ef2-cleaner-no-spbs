import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  name: string;
  tier: 'free' | 'premium' | 'professional' | 'elite';
  loyalty_points: number;
  profile_image?: string;
  account_type: 'creator' | 'member';
  role: 'creator' | 'member';
  is_verified: boolean;
  joined_date: string;
}

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

  const getProfile = async (id: string, email: string): Promise<AppUser | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return null;
      }

      if (profile) {
        return {
          ...profile,
          email: email,
        };
      }
      return null;
    } catch (err) {
      console.error('Error in getProfile:', err);
      return null;
    }
  };

  const handleAuthEvent = async (event: AuthChangeEvent, session: Session | null) => {
    console.log('Auth event:', event);

    if (event === 'SIGNED_IN' && session?.user) {
      const appUser = await getProfile(session.user.id, session.user.email!);
      setUser(appUser);
    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      const appUser = await getProfile(session.user.id, session.user.email!);
      setUser(appUser);
    } else if (event === 'USER_UPDATED' && session?.user) {
      const appUser = await getProfile(session.user.id, session.user.email!);
      setUser(appUser);
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (isMounted) {
          if (session?.user) {
            const appUser = await getProfile(session.user.id, session.user.email!);
            if (isMounted) {
              setUser(appUser);
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        await handleAuthEvent(event, session);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
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
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error during sign out:', error.message);
      }

      setUser(null);
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      console.error('Error in signOut:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<Profile>) => {
    if (!user) {
      console.error('No user found for update');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user profile:', error.message);
        throw error;
      }

      const updatedUser = await getProfile(user.id, user.email);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  };

  const switchRole = async () => {
    if (!user) {
      console.error('No user found for role switch');
      return;
    }

    try {
      const newRole = user.role === 'creator' ? 'member' : 'creator';
      const newAccountType = user.account_type === 'creator' ? 'member' : 'creator';
      await updateUser({ role: newRole, account_type: newAccountType });
    } catch (error) {
      console.error('Error switching role:', error);
      throw error;
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
