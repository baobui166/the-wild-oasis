import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vppzlkchkmbnywfqmdxn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwcHpsa2Noa21ibnl3ZnFtZHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNDczMTIsImV4cCI6MjAxODgyMzMxMn0._VWPvVNormCoH4UGDDggcd4lc_1pUfT1fmgkfZDf1Pg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
