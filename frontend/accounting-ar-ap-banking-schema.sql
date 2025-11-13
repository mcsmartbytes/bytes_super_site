-- ============================================================================
-- ACCOUNTS RECEIVABLE, ACCOUNTS PAYABLE, AND BANKING MODULE
-- Complete AR/AP and Banking System for MC Smart Bytes Accounting
-- ============================================================================

-- ============================================================================
-- CUSTOMERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  payment_terms TEXT DEFAULT 'Net 30' CHECK (payment_terms IN ('Due on Receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60')),
  credit_limit NUMERIC(15, 2) DEFAULT 0,
  tax_exempt BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_customers_client ON customers(client_id);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);

-- ============================================================================
-- VENDORS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  vendor_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  payment_terms TEXT DEFAULT 'Net 30' CHECK (payment_terms IN ('Due on Receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60')),
  account_number TEXT, -- Their account number with this vendor
  tax_id TEXT, -- Vendor's EIN/SSN for 1099s
  vendor_1099 BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vendors_client ON vendors(client_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);

-- ============================================================================
-- INVOICES TABLE (Accounts Receivable)
-- ============================================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5, 2) DEFAULT 0, -- percentage
  tax_amount NUMERIC(15, 2) DEFAULT 0,
  total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
  amount_paid NUMERIC(15, 2) DEFAULT 0,
  balance_due NUMERIC(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'partial', 'paid', 'overdue', 'void')),
  payment_terms TEXT,
  notes TEXT,
  memo TEXT,
  journal_entry_id UUID REFERENCES journal_entries(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(client_id, invoice_number)
);

CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_date ON invoices(invoice_date);

-- ============================================================================
-- INVOICE LINE ITEMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  item_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(15, 2) NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  account_id UUID REFERENCES chart_of_accounts(id), -- Revenue account
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON invoice_items(invoice_id);

-- ============================================================================
-- BILLS TABLE (Accounts Payable)
-- ============================================================================
CREATE TABLE IF NOT EXISTS bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  bill_number TEXT NOT NULL,
  bill_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal NUMERIC(15, 2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(15, 2) DEFAULT 0,
  total_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
  amount_paid NUMERIC(15, 2) DEFAULT 0,
  balance_due NUMERIC(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'unpaid' CHECK (status IN ('draft', 'unpaid', 'partial', 'paid', 'void')),
  payment_terms TEXT,
  reference_number TEXT, -- Vendor's invoice number
  notes TEXT,
  journal_entry_id UUID REFERENCES journal_entries(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(client_id, bill_number)
);

CREATE INDEX IF NOT EXISTS idx_bills_client ON bills(client_id);
CREATE INDEX IF NOT EXISTS idx_bills_vendor ON bills(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bills_status ON bills(status);
CREATE INDEX IF NOT EXISTS idx_bills_date ON bills(bill_date);

-- ============================================================================
-- BILL LINE ITEMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS bill_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  item_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(15, 2) NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  account_id UUID REFERENCES chart_of_accounts(id), -- Expense account
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bill_items_bill ON bill_items(bill_id);

-- ============================================================================
-- PAYMENTS TABLE (for both AR and AP)
-- ============================================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('invoice_payment', 'bill_payment')),
  invoice_id UUID REFERENCES invoices(id) ON DELETE RESTRICT,
  bill_id UUID REFERENCES bills(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES customers(id),
  vendor_id UUID REFERENCES vendors(id),
  payment_date DATE NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('Cash', 'Check', 'Credit Card', 'ACH', 'Wire Transfer', 'Other')),
  reference_number TEXT, -- Check number, transaction ID, etc.
  amount NUMERIC(15, 2) NOT NULL,
  memo TEXT,
  bank_account_id UUID, -- Will add when we create bank accounts table
  journal_entry_id UUID REFERENCES journal_entries(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_bill ON payments(bill_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

-- ============================================================================
-- BANK ACCOUNTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('Checking', 'Savings', 'Credit Card', 'Line of Credit', 'Money Market')),
  bank_name TEXT,
  account_number TEXT, -- Last 4 digits for security
  routing_number TEXT,
  opening_balance NUMERIC(15, 2) DEFAULT 0,
  current_balance NUMERIC(15, 2) DEFAULT 0,
  gl_account_id UUID REFERENCES chart_of_accounts(id), -- Link to Chart of Accounts
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'closed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bank_accounts_client ON bank_accounts(client_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_status ON bank_accounts(status);

-- ============================================================================
-- BANK TRANSACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS bank_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  bank_account_id UUID NOT NULL REFERENCES bank_accounts(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Deposit', 'Withdrawal', 'Transfer', 'Fee', 'Interest', 'Check', 'Debit Card', 'ATM', 'Other')),
  description TEXT NOT NULL,
  payee TEXT,
  check_number TEXT,
  debit_amount NUMERIC(15, 2) DEFAULT 0,
  credit_amount NUMERIC(15, 2) DEFAULT 0,
  balance NUMERIC(15, 2),
  category TEXT, -- Optional categorization
  account_id UUID REFERENCES chart_of_accounts(id), -- GL account mapping
  reconciled BOOLEAN DEFAULT FALSE,
  reconciliation_id UUID, -- Link to reconciliation session
  journal_entry_id UUID REFERENCES journal_entries(id),
  imported BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bank_transactions_client ON bank_transactions(client_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_account ON bank_transactions(bank_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_date ON bank_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_reconciled ON bank_transactions(reconciled);

-- ============================================================================
-- BANK RECONCILIATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS bank_reconciliations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  bank_account_id UUID NOT NULL REFERENCES bank_accounts(id) ON DELETE CASCADE,
  statement_date DATE NOT NULL,
  statement_ending_balance NUMERIC(15, 2) NOT NULL,
  gl_ending_balance NUMERIC(15, 2) NOT NULL,
  reconciled_balance NUMERIC(15, 2),
  difference NUMERIC(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'locked')),
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bank_reconciliations_client ON bank_reconciliations(client_id);
CREATE INDEX IF NOT EXISTS idx_bank_reconciliations_account ON bank_reconciliations(bank_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_reconciliations_status ON bank_reconciliations(status);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bills_updated_at ON bills;
CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON bills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bank_accounts_updated_at ON bank_accounts;
CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bank_transactions_updated_at ON bank_transactions;
CREATE TRIGGER update_bank_transactions_updated_at BEFORE UPDATE ON bank_transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bank_reconciliations_updated_at ON bank_reconciliations;
CREATE TRIGGER update_bank_reconciliations_updated_at BEFORE UPDATE ON bank_reconciliations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- HELPFUL VIEWS
-- ============================================================================

-- View for outstanding invoices
CREATE OR REPLACE VIEW outstanding_invoices AS
SELECT
  i.*,
  c.customer_name,
  c.company_name,
  cl.company_name as client_name,
  CASE
    WHEN i.due_date < CURRENT_DATE AND i.status NOT IN ('paid', 'void') THEN 'overdue'
    ELSE i.status
  END as current_status,
  CURRENT_DATE - i.due_date as days_overdue
FROM invoices i
JOIN customers c ON i.customer_id = c.id
JOIN clients cl ON i.client_id = cl.id
WHERE i.status NOT IN ('paid', 'void')
ORDER BY i.due_date ASC;

-- View for unpaid bills
CREATE OR REPLACE VIEW unpaid_bills AS
SELECT
  b.*,
  v.vendor_name,
  v.company_name,
  cl.company_name as client_name,
  CASE
    WHEN b.due_date < CURRENT_DATE AND b.status NOT IN ('paid', 'void') THEN 'overdue'
    ELSE b.status
  END as current_status,
  CURRENT_DATE - b.due_date as days_overdue
FROM bills b
JOIN vendors v ON b.vendor_id = v.id
JOIN clients cl ON b.client_id = cl.id
WHERE b.status NOT IN ('paid', 'void')
ORDER BY b.due_date ASC;

-- View for AR aging
CREATE OR REPLACE VIEW ar_aging_summary AS
SELECT
  i.client_id,
  COUNT(*) as invoice_count,
  SUM(i.balance_due) as total_outstanding,
  SUM(CASE WHEN CURRENT_DATE - i.due_date <= 0 THEN i.balance_due ELSE 0 END) as current_amount,
  SUM(CASE WHEN CURRENT_DATE - i.due_date BETWEEN 1 AND 30 THEN i.balance_due ELSE 0 END) as days_1_30,
  SUM(CASE WHEN CURRENT_DATE - i.due_date BETWEEN 31 AND 60 THEN i.balance_due ELSE 0 END) as days_31_60,
  SUM(CASE WHEN CURRENT_DATE - i.due_date BETWEEN 61 AND 90 THEN i.balance_due ELSE 0 END) as days_61_90,
  SUM(CASE WHEN CURRENT_DATE - i.due_date > 90 THEN i.balance_due ELSE 0 END) as days_over_90
FROM invoices i
WHERE i.status NOT IN ('paid', 'void')
GROUP BY i.client_id;

-- View for AP aging
CREATE OR REPLACE VIEW ap_aging_summary AS
SELECT
  b.client_id,
  COUNT(*) as bill_count,
  SUM(b.balance_due) as total_outstanding,
  SUM(CASE WHEN CURRENT_DATE - b.due_date <= 0 THEN b.balance_due ELSE 0 END) as current_amount,
  SUM(CASE WHEN CURRENT_DATE - b.due_date BETWEEN 1 AND 30 THEN b.balance_due ELSE 0 END) as days_1_30,
  SUM(CASE WHEN CURRENT_DATE - b.due_date BETWEEN 31 AND 60 THEN b.balance_due ELSE 0 END) as days_31_60,
  SUM(CASE WHEN CURRENT_DATE - b.due_date BETWEEN 61 AND 90 THEN b.balance_due ELSE 0 END) as days_61_90,
  SUM(CASE WHEN CURRENT_DATE - b.due_date > 90 THEN b.balance_due ELSE 0 END) as days_over_90
FROM bills b
WHERE b.status NOT IN ('paid', 'void')
GROUP BY b.client_id;

COMMENT ON TABLE customers IS 'Customer information for accounts receivable';
COMMENT ON TABLE vendors IS 'Vendor information for accounts payable';
COMMENT ON TABLE invoices IS 'Customer invoices (AR)';
COMMENT ON TABLE bills IS 'Vendor bills (AP)';
COMMENT ON TABLE payments IS 'Payment records for both AR and AP';
COMMENT ON TABLE bank_accounts IS 'Bank and credit card accounts';
COMMENT ON TABLE bank_transactions IS 'Individual bank transactions';
COMMENT ON TABLE bank_reconciliations IS 'Bank reconciliation sessions';
