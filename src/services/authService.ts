import { supabase } from "@/integrations/supabase/client";
import { User, UserInsert, UserUpdate } from "@/types/database";

export const authService = {
  async signUp(email: string, password: string, username: string): Promise<void> {
    // 1. Register with Supabase Auth
    const { data: auth, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!auth.user?.id) throw new Error("Failed to create user account");

    // 2. Create user profile in the public.users table - THIS IS WHERE THE RLS ERROR OCCURS
    // Instead of directly inserting to the users table, we should let Supabase handle
    // this via a database trigger that runs with proper privileges
    // We'll just update with some metadata in case we need it later
    await supabase.auth.updateUser({
      data: {
        username,
      }
    });
    
    // Note: We're removing the direct insert to users table as this is causing the RLS error
    // The user record should be created by a database trigger when a new auth user is created
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Update last_login in users table
    if (data.user) {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);
    }
    
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async getUser(): Promise<User | null> {
    const { data: authUser } = await supabase.auth.getUser();
    
    if (!authUser.user) return null;
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.user.id)
      .single();
      
    if (error || !user) return null;
    
    return user;
  },
  
  async updateUser(id: string, updates: UserUpdate): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};
