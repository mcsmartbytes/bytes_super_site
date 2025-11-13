import { createClient } from "@supabase/supabase-js";

// Accounting Database (main)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Expenses Database (mobile app)
export const expensesSupabase = createClient(
  process.env.NEXT_PUBLIC_EXPENSES_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_EXPENSES_SUPABASE_ANON_KEY!
);

