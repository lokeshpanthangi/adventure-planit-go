// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ukayzlefrphstkgpwoeo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrYXl6bGVmcnBoc3RrZ3B3b2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDMzMzYsImV4cCI6MjA2Mjg3OTMzNn0.WqjFxb4SOhVWfZSpLuSLlx5Hmw9UYK-fvu4Yl41b2Ic";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);