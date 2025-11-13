-- Quick verification query to check if accounting tables exist
-- Run this in Supabase SQL Editor to verify the schema was created

-- Check if tables exist
SELECT
  'chart_of_accounts' as table_name,
  COUNT(*) as row_count
FROM chart_of_accounts
UNION ALL
SELECT
  'journal_entries' as table_name,
  COUNT(*) as row_count
FROM journal_entries
UNION ALL
SELECT
  'ledger_entries' as table_name,
  COUNT(*) as row_count
FROM ledger_entries
UNION ALL
SELECT
  'industry_account_templates' as table_name,
  COUNT(*) as row_count
FROM industry_account_templates;

-- Check industry templates
SELECT
  industry,
  COUNT(*) as account_count
FROM industry_account_templates
GROUP BY industry
ORDER BY industry;
