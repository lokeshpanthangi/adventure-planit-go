
import { Database } from "@/integrations/supabase/types";

// Export the base types from Supabase
export type { Database } from "@/integrations/supabase/types";

// Type aliases for common database tables
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Trip = Database["public"]["Tables"]["trips"]["Row"];
export type TripMember = Database["public"]["Tables"]["trip_members"]["Row"];
export type Activity = Database["public"]["Tables"]["activities"]["Row"];
export type ActivityVote = Database["public"]["Tables"]["activity_votes"]["Row"];
export type Invitation = Database["public"]["Tables"]["invitations"]["Row"];

// Insertion types
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type TripInsert = Database["public"]["Tables"]["trips"]["Insert"];
export type TripMemberInsert = Database["public"]["Tables"]["trip_members"]["Insert"];
export type ActivityInsert = Database["public"]["Tables"]["activities"]["Insert"];
export type ActivityVoteInsert = Database["public"]["Tables"]["activity_votes"]["Insert"];
export type InvitationInsert = Database["public"]["Tables"]["invitations"]["Insert"];

// Update types
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type TripUpdate = Database["public"]["Tables"]["trips"]["Update"];
export type TripMemberUpdate = Database["public"]["Tables"]["trip_members"]["Update"];
export type ActivityUpdate = Database["public"]["Tables"]["activities"]["Update"];
export type ActivityVoteUpdate = Database["public"]["Tables"]["activity_votes"]["Update"];
export type InvitationUpdate = Database["public"]["Tables"]["invitations"]["Update"];

// Extended types with additional frontend properties
export interface TripWithDetails extends Trip {
  creator?: User;
  members?: User[];
  activities?: Activity[];
  memberCount?: number;
}

export interface ActivityWithDetails extends Activity {
  creator?: User;
  votes?: ActivityVote[];
  voteCount?: number;
}
