-- ============================================================================
-- INTEGRATION STATUS VERIFICATION SCRIPT
-- ============================================================================
-- Run this script in BOTH Supabase instances to verify setup status
--
-- Instance 1 (Accounting): https://kktxfbmlmajmbmwxocvn.supabase.co
-- Instance 2 (Expenses): https://vckynnyputrvwjhosryl.supabase.co
-- ============================================================================

-- ============================================================================
-- PART 1: CHECK CORE ACCOUNTING TABLES (Run on Accounting Supabase)
-- ============================================================================

SELECT 'Step 1: Checking core accounting tables...' as status;

-- Check if accounting tables exist
SELECT
  tablename,
  CASE
    WHEN tablename IN ('clients', 'chart_of_accounts', 'journal_entries', 'ledger_entries', 'industry_account_templates')
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('clients', 'chart_of_accounts', 'journal_entries', 'ledger_entries', 'industry_account_templates')
ORDER BY tablename;

-- ============================================================================
-- PART 2: CHECK INTEGRATION TABLES (Run on Expenses Supabase)
-- ============================================================================

SELECT 'Step 2: Checking integration tables...' as status;

-- Check if integration tables exist
SELECT
  tablename,
  CASE
    WHEN tablename IN ('category_account_mapping', 'client_bookkeeper_access', 'expense_sync_history', 'expenses')
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('category_account_mapping', 'client_bookkeeper_access', 'expense_sync_history', 'expenses');

-- ============================================================================
-- PART 3: CHECK SYNC COLUMNS ON EXPENSES TABLE (Run on Expenses Supabase)
-- ============================================================================

SELECT 'Step 3: Checking sync columns on expenses table...' as status;

-- Check if expenses table has sync columns
SELECT
  column_name,
  data_type,
  CASE
    WHEN column_name IN ('synced_to_accounting', 'sync_error', 'accounting_journal_entry_id', 'synced_at')
    THEN '✅ EXISTS'
    ELSE 'ℹ️  Regular column'
  END as sync_column_status
FROM information_schema.columns
WHERE table_name = 'expenses'
  AND table_schema = 'public'
  AND column_name IN ('synced_to_accounting', 'sync_error', 'accounting_journal_entry_id', 'synced_at', 'id', 'amount', 'category', 'profile')
ORDER BY
  CASE column_name
    WHEN 'synced_to_accounting' THEN 1
    WHEN 'sync_error' THEN 2
    WHEN 'accounting_journal_entry_id' THEN 3
    WHEN 'synced_at' THEN 4
    ELSE 5
  END;

-- ============================================================================
-- PART 4: CHECK JOURNAL ENTRY SOURCE COLUMNS (Run on Accounting Supabase)
-- ============================================================================

SELECT 'Step 4: Checking journal entry mobile tracking columns...' as status;

-- Check if journal_entries has mobile tracking columns
SELECT
  column_name,
  data_type,
  CASE
    WHEN column_name IN ('source', 'mobile_expense_id', 'mobile_user_id')
    THEN '✅ EXISTS (Mobile Integration Ready)'
    ELSE 'ℹ️  Regular column'
  END as mobile_integration_status
FROM information_schema.columns
WHERE table_name = 'journal_entries'
  AND table_schema = 'public'
  AND column_name IN ('source', 'mobile_expense_id', 'mobile_user_id', 'id', 'client_id', 'entry_number')
ORDER BY
  CASE column_name
    WHEN 'source' THEN 1
    WHEN 'mobile_expense_id' THEN 2
    WHEN 'mobile_user_id' THEN 3
    ELSE 5
  END;

-- ============================================================================
-- PART 5: CHECK HELPER VIEWS (Run on Expenses Supabase)
-- ============================================================================

SELECT 'Step 5: Checking helper views...' as status;

-- Check if views exist
SELECT
  table_name as view_name,
  CASE
    WHEN table_name IN ('unsynced_expenses', 'recent_syncs')
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name IN ('unsynced_expenses', 'recent_syncs')
ORDER BY table_name;

-- ============================================================================
-- PART 6: DATA CHECKS
-- ============================================================================

-- ============================================================================
-- 6A: Check Clients (Run on Accounting Supabase)
-- ============================================================================
SELECT 'Step 6A: Checking if clients exist...' as status;

SELECT
  COUNT(*) as client_count,
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Clients exist'
    ELSE '⚠️  No clients yet - need to create one'
  END as client_status
FROM clients
WHERE status = 'active';

-- ============================================================================
-- 6B: Check Chart of Accounts (Run on Accounting Supabase)
-- ============================================================================
SELECT 'Step 6B: Checking chart of accounts...' as status;

SELECT
  COUNT(*) as account_count,
  COUNT(DISTINCT client_id) as clients_with_accounts,
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Chart of accounts exists'
    ELSE '⚠️  No accounts yet - need to import industry template'
  END as coa_status
FROM chart_of_accounts;

-- Show accounts by type if any exist
SELECT
  account_type,
  COUNT(*) as account_count
FROM chart_of_accounts
GROUP BY account_type
ORDER BY account_type;

-- ============================================================================
-- 6C: Check Category Mappings (Run on Expenses Supabase)
-- ============================================================================
SELECT 'Step 6C: Checking category mappings...' as status;

SELECT
  COUNT(*) as mapping_count,
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Category mappings exist'
    ELSE '⚠️  No category mappings yet - need to create them'
  END as mapping_status
FROM category_account_mapping;

-- Show existing mappings if any
SELECT
  mobile_category,
  account_name,
  account_number,
  CASE WHEN is_default THEN '✅ Default' ELSE '' END as default_mapping
FROM category_account_mapping
ORDER BY mobile_category;

-- ============================================================================
-- 6D: Check Unsynced Expenses (Run on Expenses Supabase)
-- ============================================================================
SELECT 'Step 6D: Checking for business expenses to sync...' as status;

SELECT
  COUNT(*) as unsynced_count,
  CASE
    WHEN COUNT(*) > 0 THEN CONCAT('✅ Found ', COUNT(*), ' business expenses ready to sync')
    ELSE 'ℹ️  No unsynced business expenses (all caught up or no expenses yet)'
  END as expense_status
FROM expenses
WHERE profile = 'business'
  AND synced_to_accounting = false;

-- Show categories of unsynced expenses
SELECT
  category,
  COUNT(*) as count,
  SUM(amount) as total_amount
FROM expenses
WHERE profile = 'business'
  AND synced_to_accounting = false
GROUP BY category
ORDER BY count DESC;

-- ============================================================================
-- 6E: Check Client-Bookkeeper Access Links (Run on Expenses Supabase)
-- ============================================================================
SELECT 'Step 6E: Checking client-bookkeeper access links...' as status;

SELECT
  COUNT(*) as access_link_count,
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Access links exist'
    ELSE '⚠️  No access links yet - need to link mobile users to accounting clients'
  END as access_status
FROM client_bookkeeper_access
WHERE is_active = true;

-- ============================================================================
-- PART 7: FINAL STATUS SUMMARY
-- ============================================================================

SELECT 'Step 7: Final Integration Status Summary' as status;

SELECT
  '===============================================' as summary,
  'INTEGRATION SETUP STATUS' as title,
  '===============================================' as separator;

-- This would need to be customized based on actual results from above queries
-- But provides a template for what to check

SELECT
  'Run all sections above to see detailed status' as instruction,
  'Look for ✅ (ready), ⚠️ (needs action), ❌ (missing)' as legend;

-- ============================================================================
-- TROUBLESHOOTING QUERIES
-- ============================================================================

-- If you see missing tables, check which SQL scripts need to be run:

/*
❌ Missing accounting tables (clients, chart_of_accounts, etc.)?
   → Run: accounting-schema.sql in ACCOUNTING Supabase
   → Location: frontend/accounting-schema.sql

❌ Missing integration tables (category_account_mapping, etc.)?
   → Run: ACCOUNTING_INTEGRATION_SETUP.sql in EXPENSES Supabase
   → Location: /expenses_made_easy/ACCOUNTING_INTEGRATION_SETUP.sql

⚠️  No clients?
   → Create a client in the accounting system at:
   → http://localhost:3000/admin/clients

⚠️  No chart of accounts?
   → Import industry template at:
   → http://localhost:3000/admin/accounting/chart-of-accounts

⚠️  No category mappings?
   → Create mappings using SQL (see INTEGRATION_SETUP_GUIDE.md Step 3)
   → Or build a UI for managing mappings

⚠️  No access links?
   → Link mobile user to accounting client using SQL
   → See INTEGRATION_SETUP_GUIDE.md Step 4
*/
