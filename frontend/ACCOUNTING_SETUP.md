# Accounting System Setup Guide

## Step 1: Run the SQL Schema in Supabase

The accounting system requires database tables to be created in your Supabase project.

### Instructions:

1. **Open Supabase Dashboard**
   - Go to: https://kktxfbmlmajmbmwxocvn.supabase.co
   - Log in to your account

2. **Open SQL Editor**
   - Click on **SQL Editor** in the left sidebar
   - Click **New Query** button

3. **Copy the Schema File**
   - Open the file: `accounting-schema.sql` (in this directory)
   - Copy ALL the contents (Ctrl+A, Ctrl+C)

4. **Run the Schema**
   - Paste into the Supabase SQL Editor (Ctrl+V)
   - Click **Run** button (or press Ctrl+Enter)
   - Wait for "Success. No rows returned" message

## Step 2: Verify Tables Were Created

After running the schema, verify the tables exist:

1. In Supabase, click **Table Editor** in the left sidebar
2. You should see these new tables:
   - `chart_of_accounts`
   - `journal_entries`
   - `ledger_entries`
   - `industry_account_templates`

## Step 3: Use the Accounting System

Once the tables are created, you can:

### Access the Accounting Dashboard
- Navigate to: http://localhost:3000/admin/accounting
- View 8 accounting modules

### Import Industry Templates
1. Go to: http://localhost:3000/admin/accounting/chart-of-accounts
2. Select a client from the dropdown
3. Click "Import Industry Template"
4. Choose from 8 industries:
   - **Logistics & Delivery** - 27 accounts
   - **Construction & Contracting** - 24 accounts
   - **Healthcare & Medical** - 26 accounts
   - **Retail** - 25 accounts
   - **Professional Services** - 21 accounts (NEW!)
   - **Social Media** - 19 accounts (NEW!)
   - **E-commerce** - 21 accounts (NEW!)
   - **Technology/SaaS** - 21 accounts (NEW!)

5. Click "Import" to add all accounts for that industry

### Add Custom Accounts
- Click "Add New Account" button
- Fill in account details
- Accounts are grouped by type (Asset, Liability, Equity, Revenue, Expense)

## What's Included in Each Industry Template

### Professional Services
Perfect for accounting firms, consultants, lawyers, etc.
- Service Revenue & Consulting Fees
- Professional Liability Insurance
- Continuing Education expenses
- Software & Subscriptions

### Social Media
For content creators, influencers, marketing agencies
- Sponsored Content Revenue
- Ad Revenue & Affiliate Commissions
- Content Production Equipment
- Platform Advertising costs

### E-commerce
For online stores, dropshipping, digital goods
- Product Sales & Inventory management
- Shipping & Fulfillment expenses
- Payment Processing Fees
- Platform Fees (Shopify, Amazon)

### Technology/SaaS
For software companies, IT services, developers
- Subscription Revenue (MRR/ARR)
- Cloud Infrastructure costs (AWS, Azure)
- Research & Development
- Customer Acquisition & Support

## Troubleshooting

### Error: "table does not exist"
- You need to run the SQL schema first (Step 1 above)
- Make sure the entire schema file was copied and executed

### Error: "already exists"
- Tables are already created, you're good to go
- Just refresh the page and start using the system

### No templates appearing
- Check that the `industry_account_templates` table has data
- Run this query in Supabase SQL Editor to verify:
  ```sql
  SELECT industry, COUNT(*) FROM industry_account_templates GROUP BY industry;
  ```

## Next Steps

After setting up the Chart of Accounts:

1. Create Journal Entries (coming soon)
2. Generate Financial Reports (P&L, Balance Sheet, Cash Flow)
3. View General Ledger
4. Run Trial Balance

## Need Help?

The accounting system uses double-entry bookkeeping principles:
- Every transaction has equal debits and credits
- Accounts have a "normal balance" (Debit or Credit)
- Financial statements are generated from account balances
