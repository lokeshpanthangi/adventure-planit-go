
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

    // 2. Update user metadata
    await supabase.auth.updateUser({
      data: {
        username,
      }
    });
  },

  async login(email: string, password: string) {
    try {
      console.log("Attempting login with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Handle specific error cases
        if (error.message === "Email not confirmed") {
          // This is actually common, we'll handle this specifically in the UI
          console.log("Email not confirmed, but proceeding with login attempt");
        }
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Login error in authService:", error);
      throw error;
    }
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
    
    // Check if we have a user record in our users table
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.user.id)
        .single();
        
      if (error || !user) {
        // Return basic user information from auth even if we don't have a profile
        // Make sure we return an object that matches the User type completely
        return {
          id: authUser.user.id,
          email: authUser.user.email || '',
          username: authUser.user.user_metadata?.username || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          bio: null,
          avatar_url: null,
          last_login: null,
          password_hash: '',
          preferences: {}
        };
      }
      
      return user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
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
