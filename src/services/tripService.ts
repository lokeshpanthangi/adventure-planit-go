
import { supabase } from "@/integrations/supabase/client";
import { 
  Trip, 
  TripInsert, 
  TripUpdate, 
  Activity, 
  ActivityInsert, 
  ActivityVote, 
  TripMember 
} from "@/types/database";

export const tripService = {
  // Trip methods
  async getTrips(): Promise<Trip[]> {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getTripById(id: string): Promise<Trip | null> {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  async createTrip(trip: TripInsert): Promise<Trip> {
    // If trip_code is not provided, we'll generate one on the server via the trigger
    if (!trip.trip_code) {
      trip.trip_code = await this.generateTripCode();
    }

    const { data, error } = await supabase
      .from('trips')
      .insert(trip)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTrip(id: string, updates: TripUpdate): Promise<Trip> {
    const { data, error } = await supabase
      .from('trips')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTrip(id: string): Promise<void> {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async generateTripCode(): Promise<string> {
    const { data, error } = await supabase
      .rpc('generate_trip_code');

    if (error) throw error;
    return data;
  },

  // Trip members methods
  async getTripMembers(tripId: string): Promise<TripMember[]> {
    const { data, error } = await supabase
      .from('trip_members')
      .select('*, user_id(*)') // Join with users
      .eq('trip_id', tripId);

    if (error) throw error;
    return data || [];
  },

  async addTripMember(tripId: string, userId: string, role = 'member'): Promise<void> {
    const { error } = await supabase
      .from('trip_members')
      .insert({
        trip_id: tripId,
        user_id: userId,
        role
      });

    if (error) throw error;
  },

  // Activities methods
  async getActivities(tripId: string): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('trip_id', tripId)
      .order('start_datetime', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createActivity(activity: ActivityInsert): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .insert(activity)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteActivity(id: string): Promise<void> {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Activity votes methods
  async voteForActivity(activityId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('activity_votes')
      .insert({
        activity_id: activityId,
        user_id: userId
      });

    if (error) throw error;
  },

  async removeActivityVote(activityId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('activity_votes')
      .delete()
      .match({
        activity_id: activityId,
        user_id: userId
      });

    if (error) throw error;
  },

  async getActivityVotes(activityId: string): Promise<ActivityVote[]> {
    const { data, error } = await supabase
      .from('activity_votes')
      .select('*')
      .eq('activity_id', activityId);

    if (error) throw error;
    return data || [];
  },

  // Budget utilities
  async calculateTripBudgetUsage(tripId: string): Promise<number> {
    const { data, error } = await supabase
      .rpc('calculate_trip_budget_usage', { p_trip_id: tripId });

    if (error) throw error;
    return data || 0;
  }
};
