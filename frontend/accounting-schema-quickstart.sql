-- MC Smart Bytes - Full Accounting System Schema
-- Chart of Accounts, Journal Entries, and Industry-Specific Templates

-- Chart of Accounts Table
CREATE TABLE IF NOT EXISTS chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('Asset', 'Liability', 'Equity', 'Revenue', 'Expense')),
  account_subtype TEXT NOT NULL, -- e.g., 'Current Asset', 'Fixed Asset', 'Operating Expense'
  parent_account_id UUID REFERENCES chart_of_accounts(id),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_system_account BOOLEAN DEFAULT FALSE,
  normal_balance TEXT CHECK (normal_balance IN ('Debit', 'Credit')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(client_id, account_number)
);

-- Journal Entries Table (Double-Entry Bookkeeping)
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  entry_number TEXT NOT NULL,
  entry_date DATE NOT NULL,
  description TEXT NOT NULL,
  reference TEXT, -- Invoice #, Check #, etc.
  status TEXT DEFAULT 'Posted' CHECK (status IN ('Draft', 'Posted', 'Void')),
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(client_id, entry_number)
);

-- Ledger Entries (Individual debits and credits)
CREATE TABLE IF NOT EXISTS ledger_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
  debit_amount NUMERIC(15, 2) DEFAULT 0,
  credit_amount NUMERIC(15, 2) DEFAULT 0,
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  CHECK (debit_amount >= 0 AND credit_amount >= 0),
  CHECK (NOT (debit_amount > 0 AND credit_amount > 0)) -- Can't be both debit and credit
);

-- Industry Account Templates
CREATE TABLE IF NOT EXISTS industry_account_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  industry TEXT NOT NULL CHECK (industry IN ('Logistics', 'Construction', 'Healthcare', 'Retail', 'Professional Services', 'Social Media', 'E-commerce', 'Technology', 'General')),
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  account_subtype TEXT NOT NULL,
  description TEXT,
  normal_balance TEXT,
  is_required BOOLEAN DEFAULT FALSE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(industry, account_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chart_of_accounts_client ON chart_of_accounts(client_id);
CREATE INDEX IF NOT EXISTS idx_chart_of_accounts_type ON chart_of_accounts(account_type);
CREATE INDEX IF NOT EXISTS idx_journal_entries_client ON journal_entries(client_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_journal ON ledger_entries(journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_ledger_entries_account ON ledger_entries(account_id);

-- Trigger for updated_at
CREATE TRIGGER update_chart_of_accounts_updated_at BEFORE UPDATE ON chart_of_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

