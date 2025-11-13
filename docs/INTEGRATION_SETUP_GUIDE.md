# Integration Setup Guide
## Connecting Expenses Made Easy Mobile App with MC Smart Bytes Accounting

---

## 🎯 Overview

This guide walks you through connecting your mobile expense tracking app with your accounting system so expenses automatically sync to create proper double-entry journal entries.

**What You'll Accomplish:**
- ✅ Link mobile app users to accounting clients
- ✅ Map expense categories to chart of accounts
- ✅ Sync business expenses to create journal entries automatically
- ✅ Maintain proper double-entry bookkeeping

**Prerequisites:**
- Both apps use same Supabase instance: `https://vckynnyputrvwjhosryl.supabase.co` ✅
- Expenses Made Easy mobile app is running
- MC Smart Bytes accounting system is deployed

---

## 📋 Step-by-Step Setup

### **Step 1: Run Integration SQL Schema** (15 minutes)

The integration requires several new database tables and columns. You need to run TWO SQL scripts:

#### 1A. Run Accounting Integration Setup

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/vckynnyputrvwjhosryl/sql
2. Click "New Query"
3. Copy the entire contents from:
   - **Expense Tracker:** `/expenses_made_easy/ACCOUNTING_INTEGRATION_SETUP.sql`
4. Click "Run" (bottom right)
5. Verify output shows "Success" messages

**What this creates:**
- Adds sync tracking columns to `expenses` table
- Creates `client_bookkeeper_access` table (links users to clients)
- Creates `category_account_mapping` table (maps categories to accounts)
- Creates `expense_sync_history` table (audit log)
- Creates helper views: `unsynced_expenses` and `recent_syncs`

#### 1B. Update Journal Entries Schema

The accounting system's `journal_entries` table needs additional columns to track mobile expenses:

1. In the same Supabase SQL Editor
2. Run this SQL:

```sql
-- Add mobile expense tracking columns to journal_entries
ALTER TABLE journal_entries
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS mobile_expense_id UUID,
ADD COLUMN IF NOT EXISTS mobile_user_id UUID;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_journal_entries_mobile_expense
  ON journal_entries(mobile_expense_id);

-- Add comments
COMMENT ON COLUMN journal_entries.source IS 'Source: manual, mobile_app, import, recurring';
COMMENT ON COLUMN journal_entries.mobile_expense_id IS 'Reference to expenses.id from mobile app';
COMMENT ON COLUMN journal_entries.mobile_user_id IS 'User who created expense in mobile app';
```

3. Click "Run"

---

### **Step 2: Set Up Chart of Accounts** (10 minutes)

Before syncing expenses, you need accounts to post them to.

1. Open accounting system: http://your-accounting-url.vercel.app/admin/accounting/chart-of-accounts
2. Select a client (or create one)
3. Click **"Import Industry Template"**
4. Choose the industry that matches your mobile app user's industry
5. Click "Import"

**Result:** Your client now has a full chart of accounts with expense accounts ready.

**Example Accounts Created:**
```
1000 - Cash
1010 - Credit Card
5000 - Fuel Expense
5100 - Office Supplies
5200 - Meals & Entertainment
5300 - Travel Expense
... (varies by industry)
```

---

### **Step 3: Create Category Mappings** (20 minutes)

This is the KEY step that tells the system which expense categories map to which accounts.

#### Option A: Manual Setup (Recommended for first time)

1. Open Supabase SQL Editor
2. Find the `chart_of_accounts` entries you just created:

```sql
-- View your client's accounts
SELECT id, account_number, account_name, account_type
FROM chart_of_accounts
WHERE client_id = 'YOUR_CLIENT_ID_HERE'
ORDER BY account_number;
```

3. Note the IDs for:
   - Cash account (usually 1000)
   - Expense accounts (5000, 5100, 5200, etc.)

4. Create category mappings:

```sql
-- Replace with YOUR actual client_id and account IDs from step 2
INSERT INTO category_account_mapping (
  client_id,
  industry,
  mobile_category,
  debit_account_id,
  credit_account_id,
  account_number,
  account_name,
  is_default
) VALUES
-- Fuel mapping
(
  'YOUR_CLIENT_ID',
  'Construction',  -- Match mobile user's industry
  'Fuel',          -- Exact category name from mobile app
  'FUEL_EXPENSE_ACCOUNT_ID',  -- From chart_of_accounts for account 5000
  'CASH_ACCOUNT_ID',          -- From chart_of_accounts for account 1000
  '5000',
  'Fuel Expense',
  true
),
-- Office Supplies mapping
(
  'YOUR_CLIENT_ID',
  'Construction',
  'Office Supplies',
  'OFFICE_SUPPLIES_ACCOUNT_ID',  -- Account 5100
  'CASH_ACCOUNT_ID',
  '5100',
  'Office Supplies Expense',
  true
),
-- Add more mappings for each category your mobile app uses...
;
```

#### Common Mobile App Categories to Map:

Map these to appropriate expense accounts in your chart:

- **Fuel** → 5000 Fuel Expense
- **Office Supplies** → 5100 Office Supplies
- **Meals & Entertainment** → 5200 Meals & Entertainment
- **Travel** → 5300 Travel Expense
- **Equipment** → 1500 Equipment (Asset account)
- **Materials** → 5400 Direct Materials
- **Utilities** → 5500 Utilities
- **Insurance** → 5600 Insurance Expense
- **Rent** → 5700 Rent Expense

**Pro Tip:** Use the same category names in both apps for easier mapping!

---

### **Step 4: Link Mobile User to Accounting Client** (5 minutes)

Grant the bookkeeper access to view and sync the mobile user's expenses:

```sql
-- Create access link
INSERT INTO client_bookkeeper_access (
  mobile_user_id,        -- User ID from Expenses Made Easy app
  bookkeeper_user_id,    -- Your bookkeeper user ID in accounting system
  client_id,             -- The accounting client ID
  access_level,          -- 'view', 'sync', or 'full'
  is_active
) VALUES (
  'MOBILE_USER_UUID',    -- Find this: SELECT user_id FROM user_profiles WHERE business_name = 'Their Business';
  'BOOKKEEPER_UUID',     -- Your accounting system user ID
  'CLIENT_UUID',         -- The client in accounting system
  'sync',                -- Allows syncing expenses
  true
);
```

**How to find user IDs:**

```sql
-- Find mobile user ID
SELECT user_id, full_name, business_name
FROM user_profiles
WHERE business_name LIKE '%Business Name%';

-- Find bookkeeper user ID (logged-in accounting user)
SELECT id, email
FROM auth.users
WHERE email = 'bookkeeper@example.com';
```

---

### **Step 5: Test the Integration** (10 minutes)

Now let's test if everything works!

#### 5A. Create a Test Expense in Mobile App

1. Open **Expenses Made Easy** mobile app
2. Add a new expense:
   - Amount: $25.00
   - Category: "Fuel"
   - Description: "Test expense for accounting sync"
   - Profile: **Business** (must be business!)
   - Date: Today
3. Save the expense

#### 5B. Verify Unsynced Expense Appears

1. Open Supabase SQL Editor
2. Run:

```sql
SELECT * FROM unsynced_expenses
WHERE description LIKE '%Test expense%';
```

You should see your test expense with `synced_to_accounting = false`.

#### 5C. Sync the Expense

1. Open accounting system: http://your-url.vercel.app/admin/accounting/expense-sync
2. You should see your test expense in the "Pending Sync" tab
3. Check the checkbox next to it
4. Click **"Sync Selected"**
5. Enter your client ID when prompted
6. Click OK

**Expected Result:** ✅ Success message!

#### 5D. Verify Journal Entry Created

```sql
-- Check journal entry was created
SELECT * FROM journal_entries
WHERE source = 'mobile_app'
ORDER BY created_at DESC
LIMIT 1;

-- Check ledger entries (should be 2: debit and credit)
SELECT
  le.*,
  coa.account_name,
  coa.account_number
FROM ledger_entries le
JOIN chart_of_accounts coa ON le.account_id = coa.id
WHERE le.journal_entry_id = 'JOURNAL_ENTRY_ID_FROM_ABOVE'
ORDER BY le.debit_amount DESC;
```

**Expected Result:**
```
Ledger Entry 1:
  account: 5000 (Fuel Expense)
  debit_amount: 25.00
  credit_amount: 0.00

Ledger Entry 2:
  account: 1000 (Cash)
  debit_amount: 0.00
  credit_amount: 25.00
```

✅ **Perfect!** The expense has been synced using proper double-entry bookkeeping!

---

## 🔄 Daily Workflow

Once set up, here's the routine:

### For Mobile App Users (Business Owners, Contractors):
1. Track expenses as usual in Expenses Made Easy
2. Mark expenses as "Business" profile
3. That's it! ✅

### For Bookkeepers (Accounting System):
1. Open: `/admin/accounting/expense-sync`
2. Review unsynced expenses
3. Select expenses to sync
4. Click "Sync Selected"
5. Review journal entries created
6. Run reports as needed

**Frequency:** Daily, weekly, or before month-end close.

---

## 🎯 Troubleshooting

### Error: "No category mapping found"

**Cause:** The expense category doesn't have a mapping to a chart of accounts.

**Fix:**
1. Check the category name: `SELECT DISTINCT category FROM expenses WHERE profile = 'business';`
2. Create mapping in Step 3 for that category

---

### Error: "Missing tables: category_account_mapping"

**Cause:** Integration SQL not run yet.

**Fix:** Go back to Step 1 and run `ACCOUNTING_INTEGRATION_SETUP.sql`

---

### Error: "Client ID not found"

**Cause:** Client doesn't exist or wasn't linked properly.

**Fix:**
1. Verify client exists: `SELECT * FROM clients WHERE id = 'YOUR_CLIENT_ID';`
2. Create client if needed in accounting system UI
3. Run Step 4 to link mobile user to client

---

### Expense appears but won't sync

**Check:**
1. Is it marked as "Business" profile? (Personal expenses don't sync)
2. Is there a category mapping for that category?
3. Does the bookkeeper have access? (Check `client_bookkeeper_access`)

```sql
-- Debug query
SELECT
  e.id,
  e.description,
  e.category,
  e.profile,
  e.synced_to_accounting,
  cam.id AS mapping_exists,
  cba.id AS access_granted
FROM expenses e
LEFT JOIN category_account_mapping cam
  ON cam.mobile_category = e.category
LEFT JOIN client_bookkeeper_access cba
  ON cba.mobile_user_id = e.user_id
WHERE e.id = 'EXPENSE_ID_HERE';
```

---

## 📊 Advanced: Industry-Specific Mappings

Different industries need different account mappings. Here are examples:

### Construction
```
Materials → 5100 (Direct Materials)
Equipment Rental → 5300 (Equipment Rental)
Subcontractors → 5200 (Subcontractor Costs)
Fuel → 5400 (Vehicle Fuel)
```

### Real Estate
```
Property Showings → 5100 (Marketing Expense)
MLS Fees → 5200 (Professional Fees)
Staging → 5300 (Staging Costs)
Fuel → 5500 (Vehicle Expenses)
```

### Technology
```
Cloud Infrastructure → 5100 (Cloud/Hosting)
Software → 5200 (Software Expense)
Equipment → 1500 (Fixed Asset - capitalized)
Marketing → 5400 (Customer Acquisition)
```

Adjust your mappings in Step 3 based on your industry.

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Integration SQL scripts run successfully
- [ ] Chart of accounts imported for client
- [ ] Category mappings created (at least 5 common categories)
- [ ] Mobile user linked to accounting client
- [ ] Test expense synced successfully
- [ ] Journal entry created with correct debits/credits
- [ ] Sync history shows "success" status
- [ ] Unsynced expenses view is empty after sync

---

## 🚀 Next Steps

Once integration is working:

1. **Train bookkeepers** on the sync workflow
2. **Create mappings for all categories** your mobile users track
3. **Set up regular sync schedule** (daily or weekly)
4. **Monitor sync history** for errors
5. **Run financial reports** with synced data

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review sync history: `SELECT * FROM expense_sync_history ORDER BY synced_at DESC LIMIT 20;`
3. Check error messages in the accounting system UI
4. Verify all setup steps were completed

---

## 🎉 Success!

Your mobile expense tracker and accounting system are now integrated! Business expenses flow seamlessly from mobile app → accounting system → financial reports.

**Data Flow:**
```
Mobile App Expense
  ↓
Business Expense Saved
  ↓
Bookkeeper Reviews & Syncs
  ↓
Journal Entry Created (Double-Entry)
  ↓
Ledger Updated
  ↓
Financial Reports Reflect Expense
```

Happy tracking! 📱💰📊
