import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kqdegchyedhjokwraxyv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZGVnY2h5ZWRoam9rd3JheHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDk0MzgsImV4cCI6MjA3NDAyNTQzOH0.Qf4OtDlpR4u8Pbu4t9sLVcvng40IWnzyAqvk_GSjAD8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
