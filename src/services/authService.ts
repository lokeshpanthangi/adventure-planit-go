
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

    // 2. Create user profile in the public.users table
    const userProfile: UserInsert = {
      id: auth.user.id,
      email,
      username,
      password_hash: '**********', // We don't store actual passwords, auth handles this
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase
      .from('users')
      .insert(userProfile);

    if (profileError) {
      // If profile creation fails, we should clean up the auth user
      // This is a best effort and might fail if the user is already confirmed
      await supabase.auth.admin.deleteUser(auth.user.id);
      throw profileError;
    }
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
