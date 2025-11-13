-- Add New Industries to Existing Accounting System
-- Run this in Supabase SQL Editor to add 8 new industry templates

-- Step 1: Update the constraint to allow new industries
ALTER TABLE industry_account_templates
DROP CONSTRAINT IF EXISTS industry_account_templates_industry_check;

ALTER TABLE industry_account_templates
ADD CONSTRAINT industry_account_templates_industry_check
CHECK (industry IN (
  'Logistics', 'Construction', 'Healthcare', 'Retail',
  'Professional Services', 'Social Media', 'E-commerce', 'Technology',
  'Advertising', 'Real Estate', 'Restaurant', 'Nonprofit', 'General'
));

-- Step 2: Delete any old test data and add new templates
DELETE FROM industry_account_templates WHERE industry IN ('Advertising', 'Real Estate', 'Restaurant', 'Nonprofit', 'Professional Services', 'Social Media', 'E-commerce', 'Technology');

-- Step 3: Add Professional Services (21 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Professional Services', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Professional Services', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Unbilled services and outstanding invoices', 'Debit', TRUE, 2),
('Professional Services', '1200', 'Prepaid Expenses', 'Asset', 'Current Asset', 'Insurance, rent, subscriptions', 'Debit', FALSE, 3),
('Professional Services', '1500', 'Office Equipment', 'Asset', 'Fixed Asset', 'Computers, furniture, technology', 'Debit', FALSE, 4),
('Professional Services', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 5),
('Professional Services', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Professional Services', '2100', 'Unearned Revenue', 'Liability', 'Current Liability', 'Retainers and prepaid services', 'Credit', TRUE, 7),
('Professional Services', '2200', 'Accrued Payroll', 'Liability', 'Current Liability', 'Unpaid wages and benefits', 'Credit', FALSE, 8),
('Professional Services', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 9),
('Professional Services', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 10),
('Professional Services', '3200', 'Draws', 'Equity', 'Equity', 'Owner withdrawals', 'Debit', FALSE, 11),
('Professional Services', '4000', 'Service Revenue', 'Revenue', 'Operating Revenue', 'Professional services provided', 'Credit', TRUE, 12),
('Professional Services', '4100', 'Consulting Fees', 'Revenue', 'Operating Revenue', 'Consulting engagements', 'Credit', TRUE, 13),
('Professional Services', '4200', 'Retainer Fees', 'Revenue', 'Operating Revenue', 'Monthly retainer income', 'Credit', FALSE, 14),
('Professional Services', '5000', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Employee compensation', 'Debit', TRUE, 15),
('Professional Services', '5100', 'Rent Expense', 'Expense', 'Operating Expense', 'Office rent', 'Debit', TRUE, 16),
('Professional Services', '5200', 'Professional Liability Insurance', 'Expense', 'Operating Expense', 'E&O and malpractice insurance', 'Debit', TRUE, 17),
('Professional Services', '5300', 'Continuing Education', 'Expense', 'Operating Expense', 'Training and certifications', 'Debit', FALSE, 18),
('Professional Services', '5400', 'Marketing and Business Development', 'Expense', 'Operating Expense', 'Client acquisition costs', 'Debit', FALSE, 19),
('Professional Services', '5500', 'Software and Subscriptions', 'Expense', 'Operating Expense', 'Professional software tools', 'Debit', TRUE, 20),
('Professional Services', '5600', 'Office Supplies', 'Expense', 'Operating Expense', 'General office expenses', 'Debit', FALSE, 21);

-- Step 4: Add Social Media (19 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Social Media', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Social Media', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Outstanding brand partnerships', 'Debit', TRUE, 2),
('Social Media', '1500', 'Content Production Equipment', 'Asset', 'Fixed Asset', 'Cameras, lighting, audio gear', 'Debit', TRUE, 3),
('Social Media', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 4),
('Social Media', '1600', 'Computer Equipment', 'Asset', 'Fixed Asset', 'Editing computers and workstations', 'Debit', FALSE, 5),
('Social Media', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Social Media', '2100', 'Unearned Revenue', 'Liability', 'Current Liability', 'Prepaid sponsorships', 'Credit', FALSE, 7),
('Social Media', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 8),
('Social Media', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 9),
('Social Media', '4000', 'Sponsored Content Revenue', 'Revenue', 'Operating Revenue', 'Brand partnerships and sponsorships', 'Credit', TRUE, 10),
('Social Media', '4100', 'Ad Revenue', 'Revenue', 'Operating Revenue', 'Platform monetization', 'Credit', TRUE, 11),
('Social Media', '4200', 'Affiliate Commissions', 'Revenue', 'Operating Revenue', 'Affiliate marketing income', 'Credit', TRUE, 12),
('Social Media', '4300', 'Course and Product Sales', 'Revenue', 'Operating Revenue', 'Digital products', 'Credit', FALSE, 13),
('Social Media', '5000', 'Content Production Costs', 'Expense', 'Operating Expense', 'Props, sets, travel for shoots', 'Debit', TRUE, 14),
('Social Media', '5100', 'Freelancer and Contractor Fees', 'Expense', 'Operating Expense', 'Editors, designers, assistants', 'Debit', TRUE, 15),
('Social Media', '5200', 'Software Subscriptions', 'Expense', 'Operating Expense', 'Editing, design, and analytics tools', 'Debit', TRUE, 16),
('Social Media', '5300', 'Platform Advertising', 'Expense', 'Operating Expense', 'Paid promotion costs', 'Debit', FALSE, 17),
('Social Media', '5400', 'Internet and Hosting', 'Expense', 'Operating Expense', 'Website and cloud storage', 'Debit', FALSE, 18),
('Social Media', '5500', 'Professional Development', 'Expense', 'Operating Expense', 'Courses and training', 'Debit', FALSE, 19);

-- Step 5: Add E-commerce (21 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('E-commerce', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('E-commerce', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'B2B customer receivables', 'Debit', FALSE, 2),
('E-commerce', '1200', 'Inventory', 'Asset', 'Current Asset', 'Products available for sale', 'Debit', TRUE, 3),
('E-commerce', '1300', 'Inventory in Transit', 'Asset', 'Current Asset', 'Goods being shipped to warehouse', 'Debit', FALSE, 4),
('E-commerce', '1500', 'Warehouse Equipment', 'Asset', 'Fixed Asset', 'Shelving, packing equipment', 'Debit', FALSE, 5),
('E-commerce', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to suppliers', 'Credit', TRUE, 6),
('E-commerce', '2100', 'Customer Deposits', 'Liability', 'Current Liability', 'Prepaid orders and pre-orders', 'Credit', FALSE, 7),
('E-commerce', '2200', 'Sales Tax Payable', 'Liability', 'Current Liability', 'Collected sales tax', 'Credit', TRUE, 8),
('E-commerce', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 9),
('E-commerce', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 10),
('E-commerce', '4000', 'Product Sales', 'Revenue', 'Operating Revenue', 'Online product sales', 'Credit', TRUE, 11),
('E-commerce', '4100', 'Shipping Revenue', 'Revenue', 'Operating Revenue', 'Shipping fees collected', 'Credit', FALSE, 12),
('E-commerce', '4900', 'Sales Returns and Allowances', 'Revenue', 'Operating Revenue', 'Refunds and discounts (contra-revenue)', 'Debit', TRUE, 13),
('E-commerce', '5000', 'Cost of Goods Sold', 'Expense', 'Cost of Sales', 'Product acquisition costs', 'Debit', TRUE, 14),
('E-commerce', '5100', 'Shipping and Fulfillment', 'Expense', 'Operating Expense', 'Outbound shipping costs', 'Debit', TRUE, 15),
('E-commerce', '5200', 'Payment Processing Fees', 'Expense', 'Operating Expense', 'Credit card and PayPal fees', 'Debit', TRUE, 16),
('E-commerce', '5300', 'Platform Fees', 'Expense', 'Operating Expense', 'Shopify, Amazon, marketplace fees', 'Debit', TRUE, 17),
('E-commerce', '5400', 'Digital Marketing', 'Expense', 'Operating Expense', 'Facebook, Google ads', 'Debit', TRUE, 18),
('E-commerce', '5500', 'Packaging Supplies', 'Expense', 'Operating Expense', 'Boxes, tape, labels', 'Debit', FALSE, 19),
('E-commerce', '5600', 'Warehouse and Storage', 'Expense', 'Operating Expense', 'Third-party fulfillment', 'Debit', FALSE, 20),
('E-commerce', '5700', 'Returns and Refunds', 'Expense', 'Operating Expense', 'Processing costs for returns', 'Debit', FALSE, 21);

-- Step 6: Add Technology/SaaS (21 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Technology', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Technology', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Outstanding customer invoices', 'Debit', TRUE, 2),
('Technology', '1200', 'Prepaid Expenses', 'Asset', 'Current Asset', 'Prepaid cloud services', 'Debit', FALSE, 3),
('Technology', '1500', 'Computer Equipment', 'Asset', 'Fixed Asset', 'Development workstations', 'Debit', TRUE, 4),
('Technology', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 5),
('Technology', '1600', 'Software Licenses', 'Asset', 'Intangible Asset', 'Development tools and platforms', 'Debit', FALSE, 6),
('Technology', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 7),
('Technology', '2100', 'Deferred Revenue', 'Liability', 'Current Liability', 'Prepaid subscriptions', 'Credit', TRUE, 8),
('Technology', '2200', 'Accrued Expenses', 'Liability', 'Current Liability', 'Unpaid server and operational costs', 'Credit', FALSE, 9),
('Technology', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 10),
('Technology', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 11),
('Technology', '4000', 'Subscription Revenue', 'Revenue', 'Operating Revenue', 'Monthly/annual SaaS fees', 'Credit', TRUE, 12),
('Technology', '4100', 'Professional Services', 'Revenue', 'Operating Revenue', 'Custom development and consulting', 'Credit', FALSE, 13),
('Technology', '4200', 'License Fees', 'Revenue', 'Operating Revenue', 'Software licensing income', 'Credit', FALSE, 14),
('Technology', '5000', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Developer and staff compensation', 'Debit', TRUE, 15),
('Technology', '5100', 'Cloud Infrastructure', 'Expense', 'Operating Expense', 'AWS, Azure, hosting costs', 'Debit', TRUE, 16),
('Technology', '5200', 'Software and Tools', 'Expense', 'Operating Expense', 'Development tools and services', 'Debit', TRUE, 17),
('Technology', '5300', 'Research and Development', 'Expense', 'Operating Expense', 'Product development costs', 'Debit', FALSE, 18),
('Technology', '5400', 'Customer Acquisition', 'Expense', 'Operating Expense', 'Marketing and sales expenses', 'Debit', TRUE, 19),
('Technology', '5500', 'Customer Support', 'Expense', 'Operating Expense', 'Support staff and tools', 'Debit', FALSE, 20),
('Technology', '5600', 'Security and Compliance', 'Expense', 'Operating Expense', 'Security audits and certifications', 'Debit', FALSE, 21);

-- Continued in next block...
