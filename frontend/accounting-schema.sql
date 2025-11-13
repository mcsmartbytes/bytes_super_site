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
  industry TEXT NOT NULL CHECK (industry IN ('Logistics', 'Construction', 'Healthcare', 'Retail', 'Professional Services', 'Social Media', 'E-commerce', 'Technology', 'Advertising', 'Real Estate', 'Restaurant', 'Nonprofit', 'General')),
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
DROP TRIGGER IF EXISTS update_chart_of_accounts_updated_at ON chart_of_accounts;
CREATE TRIGGER update_chart_of_accounts_updated_at BEFORE UPDATE ON chart_of_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_journal_entries_updated_at ON journal_entries;
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- CLEAN UP EXISTING TEMPLATES
-- =========================================
-- Remove old templates so we can recreate them
DELETE FROM industry_account_templates WHERE industry IN ('Logistics', 'Construction', 'Healthcare', 'Retail', 'Professional Services', 'Social Media', 'E-commerce', 'Technology', 'Advertising', 'Real Estate', 'Restaurant', 'Nonprofit');

-- =========================================
-- LOGISTICS & DELIVERY INDUSTRY TEMPLATE
-- =========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Logistics', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Logistics', '1010', 'Petty Cash', 'Asset', 'Current Asset', 'Cash on hand for small expenses', 'Debit', FALSE, 2),
('Logistics', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Money owed by customers', 'Debit', TRUE, 3),
('Logistics', '1200', 'Fuel Inventory', 'Asset', 'Current Asset', 'Fuel on hand', 'Debit', FALSE, 4),
('Logistics', '1210', 'Parts Inventory', 'Asset', 'Current Asset', 'Vehicle parts and supplies', 'Debit', FALSE, 5),
('Logistics', '1500', 'Vehicles', 'Asset', 'Fixed Asset', 'Delivery trucks and vans', 'Debit', TRUE, 6),
('Logistics', '1510', 'Accumulated Depreciation - Vehicles', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 7),
('Logistics', '1600', 'Equipment', 'Asset', 'Fixed Asset', 'Loading equipment, GPS, etc.', 'Debit', FALSE, 8),
('Logistics', '1610', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 9);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Logistics', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 10),
('Logistics', '2100', 'Vehicle Loans Payable', 'Liability', 'Long-term Liability', 'Outstanding vehicle financing', 'Credit', FALSE, 11),
('Logistics', '2200', 'Payroll Liabilities', 'Liability', 'Current Liability', 'Wages and payroll taxes payable', 'Credit', TRUE, 12);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Logistics', '3000', 'Owner''s Equity', 'Equity', 'Owner''s Equity', 'Owner''s investment', 'Credit', TRUE, 13),
('Logistics', '3100', 'Retained Earnings', 'Equity', 'Retained Earnings', 'Accumulated profits', 'Credit', TRUE, 14);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Logistics', '4000', 'Delivery Revenue', 'Revenue', 'Operating Revenue', 'Income from deliveries', 'Credit', TRUE, 15),
('Logistics', '4010', 'Express Delivery Revenue', 'Revenue', 'Operating Revenue', 'Premium/express service income', 'Credit', FALSE, 16),
('Logistics', '4020', 'Fuel Surcharge Revenue', 'Revenue', 'Operating Revenue', 'Fuel cost recovery', 'Credit', FALSE, 17);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Logistics', '5000', 'Fuel Expense', 'Expense', 'Operating Expense', 'Vehicle fuel costs', 'Debit', TRUE, 18),
('Logistics', '5100', 'Vehicle Maintenance', 'Expense', 'Operating Expense', 'Repairs and maintenance', 'Debit', TRUE, 19),
('Logistics', '5200', 'Driver Wages', 'Expense', 'Operating Expense', 'Driver salaries and wages', 'Debit', TRUE, 20),
('Logistics', '5300', 'Vehicle Insurance', 'Expense', 'Operating Expense', 'Insurance premiums', 'Debit', TRUE, 21),
('Logistics', '5400', 'Depreciation Expense', 'Expense', 'Operating Expense', 'Vehicle and equipment depreciation', 'Debit', TRUE, 22),
('Logistics', '5500', 'Licensing and Permits', 'Expense', 'Operating Expense', 'DOT permits, licenses', 'Debit', FALSE, 23),
('Logistics', '5600', 'Tolls and Parking', 'Expense', 'Operating Expense', 'Road tolls and parking fees', 'Debit', FALSE, 24);

-- =======================================
-- CONSTRUCTION INDUSTRY TEMPLATE
-- =======================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Construction', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Construction', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Money owed by customers', 'Debit', TRUE, 2),
('Construction', '1150', 'Retainage Receivable', 'Asset', 'Current Asset', 'Contract retention amounts', 'Debit', FALSE, 3),
('Construction', '1200', 'Materials Inventory', 'Asset', 'Current Asset', 'Building materials on hand', 'Debit', TRUE, 4),
('Construction', '1300', 'Work in Progress', 'Asset', 'Current Asset', 'Costs of ongoing projects', 'Debit', TRUE, 5),
('Construction', '1500', 'Construction Equipment', 'Asset', 'Fixed Asset', 'Heavy machinery and tools', 'Debit', TRUE, 6),
('Construction', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 7),
('Construction', '1600', 'Vehicles', 'Asset', 'Fixed Asset', 'Work trucks and vehicles', 'Debit', FALSE, 8);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Construction', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to suppliers', 'Credit', TRUE, 9),
('Construction', '2100', 'Retainage Payable', 'Liability', 'Current Liability', 'Retention held on subcontractors', 'Credit', FALSE, 10),
('Construction', '2200', 'Equipment Loans', 'Liability', 'Long-term Liability', 'Financing for equipment', 'Credit', FALSE, 11),
('Construction', '2300', 'Payroll Liabilities', 'Liability', 'Current Liability', 'Wages and taxes payable', 'Credit', TRUE, 12);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Construction', '3000', 'Owner''s Equity', 'Equity', 'Owner''s Equity', 'Owner''s investment', 'Credit', TRUE, 13),
('Construction', '3100', 'Retained Earnings', 'Equity', 'Retained Earnings', 'Accumulated profits', 'Credit', TRUE, 14);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Construction', '4000', 'Contract Revenue', 'Revenue', 'Operating Revenue', 'Income from construction contracts', 'Credit', TRUE, 15),
('Construction', '4100', 'Change Order Revenue', 'Revenue', 'Operating Revenue', 'Additional work revenue', 'Credit', FALSE, 16);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Construction', '5000', 'Direct Labor', 'Expense', 'Cost of Goods Sold', 'Worker wages on jobs', 'Debit', TRUE, 17),
('Construction', '5100', 'Direct Materials', 'Expense', 'Cost of Goods Sold', 'Materials used on jobs', 'Debit', TRUE, 18),
('Construction', '5200', 'Subcontractor Costs', 'Expense', 'Cost of Goods Sold', 'Payments to subcontractors', 'Debit', TRUE, 19),
('Construction', '5300', 'Equipment Rental', 'Expense', 'Operating Expense', 'Rented equipment costs', 'Debit', FALSE, 20),
('Construction', '5400', 'Equipment Maintenance', 'Expense', 'Operating Expense', 'Repairs and maintenance', 'Debit', TRUE, 21),
('Construction', '5500', 'Permits and Fees', 'Expense', 'Operating Expense', 'Building permits and fees', 'Debit', TRUE, 22),
('Construction', '5600', 'Insurance - General Liability', 'Expense', 'Operating Expense', 'GL insurance premiums', 'Debit', TRUE, 23),
('Construction', '5700', 'Depreciation Expense', 'Expense', 'Operating Expense', 'Equipment depreciation', 'Debit', TRUE, 24);

-- =====================================
-- HEALTHCARE INDUSTRY TEMPLATE
-- =====================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Healthcare', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Healthcare', '1100', 'Patient Accounts Receivable', 'Asset', 'Current Asset', 'Patient billing receivables', 'Debit', TRUE, 2),
('Healthcare', '1110', 'Insurance Receivable', 'Asset', 'Current Asset', 'Insurance claims receivable', 'Debit', TRUE, 3),
('Healthcare', '1200', 'Medical Supplies Inventory', 'Asset', 'Current Asset', 'Supplies and consumables', 'Debit', TRUE, 4),
('Healthcare', '1300', 'Pharmaceutical Inventory', 'Asset', 'Current Asset', 'Medications on hand', 'Debit', FALSE, 5),
('Healthcare', '1500', 'Medical Equipment', 'Asset', 'Fixed Asset', 'Diagnostic and treatment equipment', 'Debit', TRUE, 6),
('Healthcare', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 7);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Healthcare', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to suppliers', 'Credit', TRUE, 8),
('Healthcare', '2100', 'Unearned Revenue', 'Liability', 'Current Liability', 'Prepaid patient services', 'Credit', FALSE, 9),
('Healthcare', '2200', 'Payroll Liabilities', 'Liability', 'Current Liability', 'Staff wages and benefits payable', 'Credit', TRUE, 10),
('Healthcare', '2300', 'Medical Malpractice Insurance Payable', 'Liability', 'Current Liability', 'Malpractice insurance obligations', 'Credit', FALSE, 11);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Healthcare', '3000', 'Owner''s Equity', 'Equity', 'Owner''s Equity', 'Owner''s investment', 'Credit', TRUE, 12),
('Healthcare', '3100', 'Retained Earnings', 'Equity', 'Retained Earnings', 'Accumulated profits', 'Credit', TRUE, 13);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Healthcare', '4000', 'Patient Service Revenue', 'Revenue', 'Operating Revenue', 'Direct patient care income', 'Credit', TRUE, 14),
('Healthcare', '4100', 'Insurance Reimbursements', 'Revenue', 'Operating Revenue', 'Insurance payments', 'Credit', TRUE, 15),
('Healthcare', '4200', 'Laboratory Revenue', 'Revenue', 'Operating Revenue', 'Lab test income', 'Credit', FALSE, 16),
('Healthcare', '4300', 'Pharmacy Revenue', 'Revenue', 'Operating Revenue', 'Medication sales', 'Credit', FALSE, 17);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Healthcare', '5000', 'Medical Staff Salaries', 'Expense', 'Operating Expense', 'Doctors, nurses, technicians', 'Debit', TRUE, 18),
('Healthcare', '5100', 'Administrative Salaries', 'Expense', 'Operating Expense', 'Non-medical staff wages', 'Debit', TRUE, 19),
('Healthcare', '5200', 'Medical Supplies Expense', 'Expense', 'Operating Expense', 'Consumable medical supplies', 'Debit', TRUE, 20),
('Healthcare', '5300', 'Pharmaceutical Expense', 'Expense', 'Operating Expense', 'Medication costs', 'Debit', FALSE, 21),
('Healthcare', '5400', 'Medical Equipment Maintenance', 'Expense', 'Operating Expense', 'Equipment repairs and service', 'Debit', TRUE, 22),
('Healthcare', '5500', 'Medical Malpractice Insurance', 'Expense', 'Operating Expense', 'Malpractice coverage', 'Debit', TRUE, 23),
('Healthcare', '5600', 'Licensing and Accreditation', 'Expense', 'Operating Expense', 'Professional licenses and certifications', 'Debit', TRUE, 24),
('Healthcare', '5700', 'Patient Billing Services', 'Expense', 'Operating Expense', 'Billing and coding services', 'Debit', FALSE, 25);

-- ===================================
-- RETAIL & E-COMMERCE TEMPLATE
-- ===================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Retail', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Retail', '1050', 'Payment Processor Deposits', 'Asset', 'Current Asset', 'Pending credit card deposits', 'Debit', FALSE, 2),
('Retail', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Money owed by customers', 'Debit', FALSE, 3),
('Retail', '1200', 'Merchandise Inventory', 'Asset', 'Current Asset', 'Products for sale', 'Debit', TRUE, 4),
('Retail', '1500', 'Store Fixtures and Equipment', 'Asset', 'Fixed Asset', 'Displays, POS systems, etc.', 'Debit', FALSE, 5),
('Retail', '1510', 'Accumulated Depreciation', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 6),
('Retail', '1600', 'Website and Technology', 'Asset', 'Fixed Asset', 'E-commerce platform and software', 'Debit', FALSE, 7);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Retail', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 8),
('Retail', '2100', 'Credit Card Payable', 'Liability', 'Current Liability', 'Credit card balances', 'Credit', FALSE, 9),
('Retail', '2200', 'Sales Tax Payable', 'Liability', 'Current Liability', 'Collected sales tax', 'Credit', TRUE, 10),
('Retail', '2300', 'Gift Card Liability', 'Liability', 'Current Liability', 'Outstanding gift card value', 'Credit', FALSE, 11),
('Retail', '2400', 'Payroll Liabilities', 'Liability', 'Current Liability', 'Wages and taxes payable', 'Credit', TRUE, 12);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Retail', '3000', 'Owner''s Equity', 'Equity', 'Owner''s Equity', 'Owner''s investment', 'Credit', TRUE, 13),
('Retail', '3100', 'Retained Earnings', 'Equity', 'Retained Earnings', 'Accumulated profits', 'Credit', TRUE, 14);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Retail', '4000', 'Store Sales Revenue', 'Revenue', 'Operating Revenue', 'In-store sales', 'Credit', TRUE, 15),
('Retail', '4100', 'Online Sales Revenue', 'Revenue', 'Operating Revenue', 'E-commerce sales', 'Credit', TRUE, 16),
('Retail', '4900', 'Sales Returns and Allowances', 'Revenue', 'Contra Revenue', 'Product returns', 'Debit', TRUE, 17);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Retail', '5000', 'Cost of Goods Sold', 'Expense', 'Cost of Goods Sold', 'Direct product costs', 'Debit', TRUE, 18),
('Retail', '5100', 'Freight and Shipping', 'Expense', 'Cost of Goods Sold', 'Inbound and outbound shipping', 'Debit', TRUE, 19),
('Retail', '5200', 'Employee Wages', 'Expense', 'Operating Expense', 'Staff salaries', 'Debit', TRUE, 20),
('Retail', '5300', 'Rent Expense', 'Expense', 'Operating Expense', 'Store/warehouse rent', 'Debit', TRUE, 21),
('Retail', '5400', 'Marketing and Advertising', 'Expense', 'Operating Expense', 'Advertising costs', 'Debit', TRUE, 22),
('Retail', '5500', 'Payment Processing Fees', 'Expense', 'Operating Expense', 'Credit card fees', 'Debit', TRUE, 23),
('Retail', '5600', 'Website Hosting and Maintenance', 'Expense', 'Operating Expense', 'E-commerce platform costs', 'Debit', FALSE, 24),
('Retail', '5700', 'Inventory Shrinkage', 'Expense', 'Operating Expense', 'Lost/stolen/damaged inventory', 'Debit', FALSE, 25);

-- ================================================
-- PROFESSIONAL SERVICES INDUSTRY TEMPLATE
-- (Accounting, Consulting, Legal, etc.)
-- ================================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Professional Services', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Professional Services', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Unbilled services and outstanding invoices', 'Debit', TRUE, 2),
('Professional Services', '1200', 'Prepaid Expenses', 'Asset', 'Current Asset', 'Insurance, rent, subscriptions', 'Debit', FALSE, 3),
('Professional Services', '1500', 'Office Equipment', 'Asset', 'Fixed Asset', 'Computers, furniture, technology', 'Debit', FALSE, 4),
('Professional Services', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 5);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Professional Services', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Professional Services', '2100', 'Unearned Revenue', 'Liability', 'Current Liability', 'Retainers and prepaid services', 'Credit', TRUE, 7),
('Professional Services', '2200', 'Accrued Payroll', 'Liability', 'Current Liability', 'Unpaid wages and benefits', 'Credit', FALSE, 8);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Professional Services', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 9),
('Professional Services', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 10),
('Professional Services', '3200', 'Draws', 'Equity', 'Equity', 'Owner withdrawals', 'Debit', FALSE, 11);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Professional Services', '4000', 'Service Revenue', 'Revenue', 'Operating Revenue', 'Professional services provided', 'Credit', TRUE, 12),
('Professional Services', '4100', 'Consulting Fees', 'Revenue', 'Operating Revenue', 'Consulting engagements', 'Credit', TRUE, 13),
('Professional Services', '4200', 'Retainer Fees', 'Revenue', 'Operating Revenue', 'Monthly retainer income', 'Credit', FALSE, 14);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Professional Services', '5000', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Employee compensation', 'Debit', TRUE, 15),
('Professional Services', '5100', 'Rent Expense', 'Expense', 'Operating Expense', 'Office rent', 'Debit', TRUE, 16),
('Professional Services', '5200', 'Professional Liability Insurance', 'Expense', 'Operating Expense', 'E&O and malpractice insurance', 'Debit', TRUE, 17),
('Professional Services', '5300', 'Continuing Education', 'Expense', 'Operating Expense', 'Training and certifications', 'Debit', FALSE, 18),
('Professional Services', '5400', 'Marketing and Business Development', 'Expense', 'Operating Expense', 'Client acquisition costs', 'Debit', FALSE, 19),
('Professional Services', '5500', 'Software and Subscriptions', 'Expense', 'Operating Expense', 'Professional software tools', 'Debit', TRUE, 20),
('Professional Services', '5600', 'Office Supplies', 'Expense', 'Operating Expense', 'General office expenses', 'Debit', FALSE, 21);

-- ==========================================
-- SOCIAL MEDIA INDUSTRY TEMPLATE
-- (Marketing, Content Creation, Influencers)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Social Media', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Social Media', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Outstanding brand partnerships', 'Debit', TRUE, 2),
('Social Media', '1500', 'Content Production Equipment', 'Asset', 'Fixed Asset', 'Cameras, lighting, audio gear', 'Debit', TRUE, 3),
('Social Media', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 4),
('Social Media', '1600', 'Computer Equipment', 'Asset', 'Fixed Asset', 'Editing computers and workstations', 'Debit', FALSE, 5);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Social Media', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Social Media', '2100', 'Unearned Revenue', 'Liability', 'Current Liability', 'Prepaid sponsorships', 'Credit', FALSE, 7);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Social Media', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 8),
('Social Media', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 9);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Social Media', '4000', 'Sponsored Content Revenue', 'Revenue', 'Operating Revenue', 'Brand partnerships and sponsorships', 'Credit', TRUE, 10),
('Social Media', '4100', 'Ad Revenue', 'Revenue', 'Operating Revenue', 'Platform monetization', 'Credit', TRUE, 11),
('Social Media', '4200', 'Affiliate Commissions', 'Revenue', 'Operating Revenue', 'Affiliate marketing income', 'Credit', TRUE, 12),
('Social Media', '4300', 'Course and Product Sales', 'Revenue', 'Operating Revenue', 'Digital products', 'Credit', FALSE, 13);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Social Media', '5000', 'Content Production Costs', 'Expense', 'Operating Expense', 'Props, sets, travel for shoots', 'Debit', TRUE, 14),
('Social Media', '5100', 'Freelancer and Contractor Fees', 'Expense', 'Operating Expense', 'Editors, designers, assistants', 'Debit', TRUE, 15),
('Social Media', '5200', 'Software Subscriptions', 'Expense', 'Operating Expense', 'Editing, design, and analytics tools', 'Debit', TRUE, 16),
('Social Media', '5300', 'Platform Advertising', 'Expense', 'Operating Expense', 'Paid promotion costs', 'Debit', FALSE, 17),
('Social Media', '5400', 'Internet and Hosting', 'Expense', 'Operating Expense', 'Website and cloud storage', 'Debit', FALSE, 18),
('Social Media', '5500', 'Professional Development', 'Expense', 'Operating Expense', 'Courses and training', 'Debit', FALSE, 19);

-- ==========================================
-- E-COMMERCE INDUSTRY TEMPLATE
-- (Online Retail, Dropshipping, Digital Goods)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('E-commerce', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('E-commerce', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'B2B customer receivables', 'Debit', FALSE, 2),
('E-commerce', '1200', 'Inventory', 'Asset', 'Current Asset', 'Products available for sale', 'Debit', TRUE, 3),
('E-commerce', '1300', 'Inventory in Transit', 'Asset', 'Current Asset', 'Goods being shipped to warehouse', 'Debit', FALSE, 4),
('E-commerce', '1500', 'Warehouse Equipment', 'Asset', 'Fixed Asset', 'Shelving, packing equipment', 'Debit', FALSE, 5);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('E-commerce', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to suppliers', 'Credit', TRUE, 6),
('E-commerce', '2100', 'Customer Deposits', 'Liability', 'Current Liability', 'Prepaid orders and pre-orders', 'Credit', FALSE, 7),
('E-commerce', '2200', 'Sales Tax Payable', 'Liability', 'Current Liability', 'Collected sales tax', 'Credit', TRUE, 8);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('E-commerce', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 9),
('E-commerce', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 10);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('E-commerce', '4000', 'Product Sales', 'Revenue', 'Operating Revenue', 'Online product sales', 'Credit', TRUE, 11),
('E-commerce', '4100', 'Shipping Revenue', 'Revenue', 'Operating Revenue', 'Shipping fees collected', 'Credit', FALSE, 12),
('E-commerce', '4900', 'Sales Returns and Allowances', 'Revenue', 'Operating Revenue', 'Refunds and discounts (contra-revenue)', 'Debit', TRUE, 13);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('E-commerce', '5000', 'Cost of Goods Sold', 'Expense', 'Cost of Sales', 'Product acquisition costs', 'Debit', TRUE, 14),
('E-commerce', '5100', 'Shipping and Fulfillment', 'Expense', 'Operating Expense', 'Outbound shipping costs', 'Debit', TRUE, 15),
('E-commerce', '5200', 'Payment Processing Fees', 'Expense', 'Operating Expense', 'Credit card and PayPal fees', 'Debit', TRUE, 16),
('E-commerce', '5300', 'Platform Fees', 'Expense', 'Operating Expense', 'Shopify, Amazon, marketplace fees', 'Debit', TRUE, 17),
('E-commerce', '5400', 'Digital Marketing', 'Expense', 'Operating Expense', 'Facebook, Google ads', 'Debit', TRUE, 18),
('E-commerce', '5500', 'Packaging Supplies', 'Expense', 'Operating Expense', 'Boxes, tape, labels', 'Debit', FALSE, 19),
('E-commerce', '5600', 'Warehouse and Storage', 'Expense', 'Operating Expense', 'Third-party fulfillment', 'Debit', FALSE, 20),
('E-commerce', '5700', 'Returns and Refunds', 'Expense', 'Operating Expense', 'Processing costs for returns', 'Debit', FALSE, 21);

-- ==========================================
-- TECHNOLOGY/SOFTWARE INDUSTRY TEMPLATE
-- (SaaS, Software Development, IT Services)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Technology', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Technology', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Outstanding customer invoices', 'Debit', TRUE, 2),
('Technology', '1200', 'Prepaid Expenses', 'Asset', 'Current Asset', 'Prepaid cloud services', 'Debit', FALSE, 3),
('Technology', '1500', 'Computer Equipment', 'Asset', 'Fixed Asset', 'Development workstations', 'Debit', TRUE, 4),
('Technology', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 5),
('Technology', '1600', 'Software Licenses', 'Asset', 'Intangible Asset', 'Development tools and platforms', 'Debit', FALSE, 6);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Technology', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 7),
('Technology', '2100', 'Deferred Revenue', 'Liability', 'Current Liability', 'Prepaid subscriptions', 'Credit', TRUE, 8),
('Technology', '2200', 'Accrued Expenses', 'Liability', 'Current Liability', 'Unpaid server and operational costs', 'Credit', FALSE, 9);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Technology', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 10),
('Technology', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 11);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Technology', '4000', 'Subscription Revenue', 'Revenue', 'Operating Revenue', 'Monthly/annual SaaS fees', 'Credit', TRUE, 12),
('Technology', '4100', 'Professional Services', 'Revenue', 'Operating Revenue', 'Custom development and consulting', 'Credit', FALSE, 13),
('Technology', '4200', 'License Fees', 'Revenue', 'Operating Revenue', 'Software licensing income', 'Credit', FALSE, 14);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Technology', '5000', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Developer and staff compensation', 'Debit', TRUE, 15),
('Technology', '5100', 'Cloud Infrastructure', 'Expense', 'Operating Expense', 'AWS, Azure, hosting costs', 'Debit', TRUE, 16),
('Technology', '5200', 'Software and Tools', 'Expense', 'Operating Expense', 'Development tools and services', 'Debit', TRUE, 17),
('Technology', '5300', 'Research and Development', 'Expense', 'Operating Expense', 'Product development costs', 'Debit', FALSE, 18),
('Technology', '5400', 'Customer Acquisition', 'Expense', 'Operating Expense', 'Marketing and sales expenses', 'Debit', TRUE, 19),
('Technology', '5500', 'Customer Support', 'Expense', 'Operating Expense', 'Support staff and tools', 'Debit', FALSE, 20),
('Technology', '5600', 'Security and Compliance', 'Expense', 'Operating Expense', 'Security audits and certifications', 'Debit', FALSE, 21);

-- ==========================================
-- ADVERTISING/MARKETING INDUSTRY TEMPLATE
-- (Ad Agencies, Marketing Firms, Media Buyers)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Advertising', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Advertising', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Client billings and outstanding invoices', 'Debit', TRUE, 2),
('Advertising', '1200', 'Prepaid Media Buys', 'Asset', 'Current Asset', 'Prepaid advertising placements', 'Debit', FALSE, 3),
('Advertising', '1500', 'Office Equipment', 'Asset', 'Fixed Asset', 'Computers, cameras, production equipment', 'Debit', FALSE, 4),
('Advertising', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 5);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Advertising', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Advertising', '2100', 'Client Retainers', 'Liability', 'Current Liability', 'Prepaid client fees', 'Credit', TRUE, 7),
('Advertising', '2200', 'Media Vendor Payables', 'Liability', 'Current Liability', 'Amounts owed to media platforms', 'Credit', TRUE, 8);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Advertising', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 9),
('Advertising', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 10);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Advertising', '4000', 'Agency Fees', 'Revenue', 'Operating Revenue', 'Client service fees and retainers', 'Credit', TRUE, 11),
('Advertising', '4100', 'Media Commission', 'Revenue', 'Operating Revenue', 'Commission on media placements', 'Credit', TRUE, 12),
('Advertising', '4200', 'Creative Services', 'Revenue', 'Operating Revenue', 'Design, copywriting, production', 'Credit', TRUE, 13),
('Advertising', '4300', 'Strategy and Consulting', 'Revenue', 'Operating Revenue', 'Marketing strategy services', 'Credit', FALSE, 14);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Advertising', '5000', 'Media Costs', 'Expense', 'Cost of Sales', 'Direct media buying costs', 'Debit', TRUE, 15),
('Advertising', '5100', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Employee compensation', 'Debit', TRUE, 16),
('Advertising', '5200', 'Freelancer and Contractor Fees', 'Expense', 'Operating Expense', 'Outsourced creative work', 'Debit', TRUE, 17),
('Advertising', '5300', 'Production Costs', 'Expense', 'Operating Expense', 'Video, photo, content production', 'Debit', TRUE, 18),
('Advertising', '5400', 'Software and Tools', 'Expense', 'Operating Expense', 'Adobe, analytics, social tools', 'Debit', TRUE, 19),
('Advertising', '5500', 'Client Entertainment', 'Expense', 'Operating Expense', 'Client meetings and events', 'Debit', FALSE, 20);

-- ==========================================
-- REAL ESTATE INDUSTRY TEMPLATE
-- (Agencies, Property Management, Brokers)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Real Estate', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Real Estate', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Commission receivables', 'Debit', TRUE, 2),
('Real Estate', '1200', 'Escrow Deposits', 'Asset', 'Current Asset', 'Client funds held in escrow', 'Debit', FALSE, 3),
('Real Estate', '1500', 'Office Equipment', 'Asset', 'Fixed Asset', 'Furniture, computers, signs', 'Debit', FALSE, 4);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Real Estate', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 5),
('Real Estate', '2100', 'Commission Payable', 'Liability', 'Current Liability', 'Agent commission splits', 'Credit', TRUE, 6),
('Real Estate', '2200', 'Client Deposits Held', 'Liability', 'Current Liability', 'Escrow liabilities', 'Credit', FALSE, 7);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Real Estate', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 8),
('Real Estate', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 9);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Real Estate', '4000', 'Sales Commission', 'Revenue', 'Operating Revenue', 'Property sales commissions', 'Credit', TRUE, 10),
('Real Estate', '4100', 'Property Management Fees', 'Revenue', 'Operating Revenue', 'Monthly management income', 'Credit', TRUE, 11),
('Real Estate', '4200', 'Lease Commissions', 'Revenue', 'Operating Revenue', 'Rental placement fees', 'Credit', FALSE, 12),
('Real Estate', '4300', 'Referral Fees', 'Revenue', 'Operating Revenue', 'Agent referral income', 'Credit', FALSE, 13);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Real Estate', '5000', 'Agent Commissions', 'Expense', 'Cost of Sales', 'Commission splits to agents', 'Debit', TRUE, 14),
('Real Estate', '5100', 'Marketing and Advertising', 'Expense', 'Operating Expense', 'Listings, signs, digital ads', 'Debit', TRUE, 15),
('Real Estate', '5200', 'MLS and Association Fees', 'Expense', 'Operating Expense', 'Multiple listing services', 'Debit', TRUE, 16),
('Real Estate', '5300', 'Office Rent', 'Expense', 'Operating Expense', 'Office space rental', 'Debit', TRUE, 17),
('Real Estate', '5400', 'Professional Fees', 'Expense', 'Operating Expense', 'Legal, accounting, licensing', 'Debit', FALSE, 18),
('Real Estate', '5500', 'Vehicle Expenses', 'Expense', 'Operating Expense', 'Gas, maintenance for showings', 'Debit', FALSE, 19);

-- ==========================================
-- RESTAURANT/FOOD SERVICE TEMPLATE
-- (Restaurants, Cafes, Food Trucks, Catering)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Restaurant', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Restaurant', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Catering and corporate accounts', 'Debit', FALSE, 2),
('Restaurant', '1200', 'Food Inventory', 'Asset', 'Current Asset', 'Raw ingredients and supplies', 'Debit', TRUE, 3),
('Restaurant', '1210', 'Beverage Inventory', 'Asset', 'Current Asset', 'Drinks, alcohol, bar supplies', 'Debit', TRUE, 4),
('Restaurant', '1500', 'Kitchen Equipment', 'Asset', 'Fixed Asset', 'Ovens, refrigerators, appliances', 'Debit', TRUE, 5),
('Restaurant', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 6),
('Restaurant', '1600', 'Furniture and Fixtures', 'Asset', 'Fixed Asset', 'Tables, chairs, decor', 'Debit', FALSE, 7);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Restaurant', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Food vendors and suppliers', 'Credit', TRUE, 8),
('Restaurant', '2100', 'Sales Tax Payable', 'Liability', 'Current Liability', 'Collected sales tax', 'Credit', TRUE, 9),
('Restaurant', '2200', 'Tips Payable', 'Liability', 'Current Liability', 'Employee tips to be distributed', 'Credit', TRUE, 10);

-- EQUITY
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Restaurant', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 11),
('Restaurant', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 12);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Restaurant', '4000', 'Food Sales', 'Revenue', 'Operating Revenue', 'Dine-in and takeout food', 'Credit', TRUE, 13),
('Restaurant', '4100', 'Beverage Sales', 'Revenue', 'Operating Revenue', 'Drinks and alcohol sales', 'Credit', TRUE, 14),
('Restaurant', '4200', 'Catering Revenue', 'Revenue', 'Operating Revenue', 'Off-site catering services', 'Credit', FALSE, 15);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Restaurant', '5000', 'Cost of Food Sold', 'Expense', 'Cost of Sales', 'Food ingredients and supplies', 'Debit', TRUE, 16),
('Restaurant', '5100', 'Cost of Beverages Sold', 'Expense', 'Cost of Sales', 'Drink and alcohol costs', 'Debit', TRUE, 17),
('Restaurant', '5200', 'Kitchen Labor', 'Expense', 'Operating Expense', 'Chef, cooks, prep staff wages', 'Debit', TRUE, 18),
('Restaurant', '5300', 'Server and FOH Labor', 'Expense', 'Operating Expense', 'Waitstaff, bartenders, hosts', 'Debit', TRUE, 19),
('Restaurant', '5400', 'Rent and Occupancy', 'Expense', 'Operating Expense', 'Restaurant space rental', 'Debit', TRUE, 20),
('Restaurant', '5500', 'Utilities', 'Expense', 'Operating Expense', 'Gas, electric, water', 'Debit', TRUE, 21),
('Restaurant', '5600', 'Equipment Repairs', 'Expense', 'Operating Expense', 'Kitchen equipment maintenance', 'Debit', FALSE, 22),
('Restaurant', '5700', 'Marketing and Promotions', 'Expense', 'Operating Expense', 'Advertising and specials', 'Debit', FALSE, 23);

-- ==========================================
-- NONPROFIT ORGANIZATION TEMPLATE
-- (Charities, Foundations, Associations)
-- ==========================================

-- ASSETS
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Nonprofit', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Nonprofit', '1100', 'Pledges Receivable', 'Asset', 'Current Asset', 'Promised donations not yet received', 'Debit', TRUE, 2),
('Nonprofit', '1200', 'Grants Receivable', 'Asset', 'Current Asset', 'Awarded grants pending payment', 'Debit', FALSE, 3),
('Nonprofit', '1500', 'Property and Equipment', 'Asset', 'Fixed Asset', 'Office equipment and furniture', 'Debit', FALSE, 4),
('Nonprofit', '1510', 'Accumulated Depreciation', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 5);

-- LIABILITIES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Nonprofit', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Nonprofit', '2100', 'Deferred Revenue', 'Liability', 'Current Liability', 'Grant advances and prepaid fees', 'Credit', FALSE, 7);

-- EQUITY (NET ASSETS)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Nonprofit', '3000', 'Net Assets Without Donor Restrictions', 'Equity', 'Net Assets', 'Unrestricted funds', 'Credit', TRUE, 8),
('Nonprofit', '3100', 'Net Assets With Donor Restrictions', 'Equity', 'Net Assets', 'Restricted/designated funds', 'Credit', TRUE, 9);

-- REVENUE
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Nonprofit', '4000', 'Individual Donations', 'Revenue', 'Contribution Revenue', 'Direct donor contributions', 'Credit', TRUE, 10),
('Nonprofit', '4100', 'Corporate Donations', 'Revenue', 'Contribution Revenue', 'Business and corporate gifts', 'Credit', TRUE, 11),
('Nonprofit', '4200', 'Grant Revenue', 'Revenue', 'Contribution Revenue', 'Foundation and government grants', 'Credit', TRUE, 12),
('Nonprofit', '4300', 'Fundraising Events', 'Revenue', 'Earned Revenue', 'Galas, auctions, special events', 'Credit', FALSE, 13),
('Nonprofit', '4400', 'Program Service Fees', 'Revenue', 'Earned Revenue', 'Fees for services provided', 'Credit', FALSE, 14),
('Nonprofit', '4500', 'Investment Income', 'Revenue', 'Other Revenue', 'Interest and dividends', 'Credit', FALSE, 15);

-- EXPENSES
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Nonprofit', '5000', 'Program Services', 'Expense', 'Program Expense', 'Direct mission-related expenses', 'Debit', TRUE, 16),
('Nonprofit', '5100', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Staff compensation', 'Debit', TRUE, 17),
('Nonprofit', '5200', 'Fundraising Expenses', 'Expense', 'Operating Expense', 'Donor acquisition and events', 'Debit', TRUE, 18),
('Nonprofit', '5300', 'Administrative Expenses', 'Expense', 'Operating Expense', 'General overhead and admin', 'Debit', TRUE, 19),
('Nonprofit', '5400', 'Professional Fees', 'Expense', 'Operating Expense', 'Legal, accounting, consulting', 'Debit', FALSE, 20),
('Nonprofit', '5500', 'Marketing and Communications', 'Expense', 'Operating Expense', 'Outreach and awareness', 'Debit', FALSE, 21);

-- Enable RLS
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_account_templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable all for authenticated users" ON chart_of_accounts;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON journal_entries;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON ledger_entries;
DROP POLICY IF EXISTS "Enable read for all users" ON industry_account_templates;

-- Create policies
CREATE POLICY "Enable all for authenticated users" ON chart_of_accounts
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Enable all for authenticated users" ON journal_entries
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Enable all for authenticated users" ON ledger_entries
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Enable read for all users" ON industry_account_templates
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Grant permissions
GRANT ALL ON chart_of_accounts TO anon, authenticated;
GRANT ALL ON journal_entries TO anon, authenticated;
GRANT ALL ON ledger_entries TO anon, authenticated;
GRANT ALL ON industry_account_templates TO anon, authenticated;
