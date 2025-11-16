import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

type StoredUser = {
  id: string;
  email: string;
  role: 'admin' | 'tenant';
};

const STORAGE_KEY = 'hms.currentUser';

const isBrowser = () => typeof window !== 'undefined';

const persistUser = (user: StoredUser) => {
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
};

const clearStoredUser = () => {
  if (isBrowser()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};

const readStoredUser = (): StoredUser | null => {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch (err) {
    console.warn('Failed to parse stored user session', err);
    return null;
  }
};

type AuthResult = {
  user: StoredUser | null;
  error: { message: string } | PostgrestError | null;
};

export async function signUpWithEmail(
  email: string,
  password: string,
  role: 'admin' | 'tenant' = 'tenant',
): Promise<AuthResult> {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, role }])
    .select('id, email, role')
    .single();

  if (error || !data) {
    return { user: null, error };
  }

  const user: StoredUser = {
    id: data.id,
    email: data.email,
    role: data.role,
  };

  return { user, error: null };
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, password, role')
    .eq('email', email)
    .single();

  if (error || !data) {
    return { user: null, error: error ?? { message: 'Invalid email or password' } };
  }

  if (data.password !== password) {
    return { user: null, error: { message: 'Invalid email or password' } };
  }

  const user: StoredUser = {
    id: data.id,
    email: data.email,
    role: data.role,
  };

  persistUser(user);
  return { user, error: null };
}

export async function signOut() {
  clearStoredUser();
}

export async function getCurrentUser() {
  return { user: readStoredUser(), error: null };
}

export async function getCurrentSession() {
  const user = readStoredUser();
  return {
    session: user ? { user } : null,
    error: null,
  };
}

export async function checkUserRole(userId: string) {
  const stored = readStoredUser();
  if (stored && stored.id === userId) {
    return { role: stored.role, data: stored };
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return { role: null, data: null, error };
  }

  return { role: data.role as 'admin' | 'tenant', data };
}
 