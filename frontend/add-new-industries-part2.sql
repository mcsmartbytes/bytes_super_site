-- Part 2: Add remaining new industries
-- Run AFTER add-new-industries.sql

-- Add Advertising/Marketing (20 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Advertising', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Advertising', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Client billings and outstanding invoices', 'Debit', TRUE, 2),
('Advertising', '1200', 'Prepaid Media Buys', 'Asset', 'Current Asset', 'Prepaid advertising placements', 'Debit', FALSE, 3),
('Advertising', '1500', 'Office Equipment', 'Asset', 'Fixed Asset', 'Computers, cameras, production equipment', 'Debit', FALSE, 4),
('Advertising', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 5),
('Advertising', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Advertising', '2100', 'Client Retainers', 'Liability', 'Current Liability', 'Prepaid client fees', 'Credit', TRUE, 7),
('Advertising', '2200', 'Media Vendor Payables', 'Liability', 'Current Liability', 'Amounts owed to media platforms', 'Credit', TRUE, 8),
('Advertising', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 9),
('Advertising', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 10),
('Advertising', '4000', 'Agency Fees', 'Revenue', 'Operating Revenue', 'Client service fees and retainers', 'Credit', TRUE, 11),
('Advertising', '4100', 'Media Commission', 'Revenue', 'Operating Revenue', 'Commission on media placements', 'Credit', TRUE, 12),
('Advertising', '4200', 'Creative Services', 'Revenue', 'Operating Revenue', 'Design, copywriting, production', 'Credit', TRUE, 13),
('Advertising', '4300', 'Strategy and Consulting', 'Revenue', 'Operating Revenue', 'Marketing strategy services', 'Credit', FALSE, 14),
('Advertising', '5000', 'Media Costs', 'Expense', 'Cost of Sales', 'Direct media buying costs', 'Debit', TRUE, 15),
('Advertising', '5100', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Employee compensation', 'Debit', TRUE, 16),
('Advertising', '5200', 'Freelancer and Contractor Fees', 'Expense', 'Operating Expense', 'Outsourced creative work', 'Debit', TRUE, 17),
('Advertising', '5300', 'Production Costs', 'Expense', 'Operating Expense', 'Video, photo, content production', 'Debit', TRUE, 18),
('Advertising', '5400', 'Software and Tools', 'Expense', 'Operating Expense', 'Adobe, analytics, social tools', 'Debit', TRUE, 19),
('Advertising', '5500', 'Client Entertainment', 'Expense', 'Operating Expense', 'Client meetings and events', 'Debit', FALSE, 20);

-- Add Real Estate (19 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Real Estate', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Real Estate', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Commission receivables', 'Debit', TRUE, 2),
('Real Estate', '1200', 'Escrow Deposits', 'Asset', 'Current Asset', 'Client funds held in escrow', 'Debit', FALSE, 3),
('Real Estate', '1500', 'Office Equipment', 'Asset', 'Fixed Asset', 'Furniture, computers, signs', 'Debit', FALSE, 4),
('Real Estate', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 5),
('Real Estate', '2100', 'Commission Payable', 'Liability', 'Current Liability', 'Agent commission splits', 'Credit', TRUE, 6),
('Real Estate', '2200', 'Client Deposits Held', 'Liability', 'Current Liability', 'Escrow liabilities', 'Credit', FALSE, 7),
('Real Estate', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 8),
('Real Estate', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 9),
('Real Estate', '4000', 'Sales Commission', 'Revenue', 'Operating Revenue', 'Property sales commissions', 'Credit', TRUE, 10),
('Real Estate', '4100', 'Property Management Fees', 'Revenue', 'Operating Revenue', 'Monthly management income', 'Credit', TRUE, 11),
('Real Estate', '4200', 'Lease Commissions', 'Revenue', 'Operating Revenue', 'Rental placement fees', 'Credit', FALSE, 12),
('Real Estate', '4300', 'Referral Fees', 'Revenue', 'Operating Revenue', 'Agent referral income', 'Credit', FALSE, 13),
('Real Estate', '5000', 'Agent Commissions', 'Expense', 'Cost of Sales', 'Commission splits to agents', 'Debit', TRUE, 14),
('Real Estate', '5100', 'Marketing and Advertising', 'Expense', 'Operating Expense', 'Listings, signs, digital ads', 'Debit', TRUE, 15),
('Real Estate', '5200', 'MLS and Association Fees', 'Expense', 'Operating Expense', 'Multiple listing services', 'Debit', TRUE, 16),
('Real Estate', '5300', 'Office Rent', 'Expense', 'Operating Expense', 'Office space rental', 'Debit', TRUE, 17),
('Real Estate', '5400', 'Professional Fees', 'Expense', 'Operating Expense', 'Legal, accounting, licensing', 'Debit', FALSE, 18),
('Real Estate', '5500', 'Vehicle Expenses', 'Expense', 'Operating Expense', 'Gas, maintenance for showings', 'Debit', FALSE, 19);

-- Add Restaurant/Food Service (23 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Restaurant', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Restaurant', '1100', 'Accounts Receivable', 'Asset', 'Current Asset', 'Catering and corporate accounts', 'Debit', FALSE, 2),
('Restaurant', '1200', 'Food Inventory', 'Asset', 'Current Asset', 'Raw ingredients and supplies', 'Debit', TRUE, 3),
('Restaurant', '1210', 'Beverage Inventory', 'Asset', 'Current Asset', 'Drinks, alcohol, bar supplies', 'Debit', TRUE, 4),
('Restaurant', '1500', 'Kitchen Equipment', 'Asset', 'Fixed Asset', 'Ovens, refrigerators, appliances', 'Debit', TRUE, 5),
('Restaurant', '1510', 'Accumulated Depreciation - Equipment', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', TRUE, 6),
('Restaurant', '1600', 'Furniture and Fixtures', 'Asset', 'Fixed Asset', 'Tables, chairs, decor', 'Debit', FALSE, 7),
('Restaurant', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Food vendors and suppliers', 'Credit', TRUE, 8),
('Restaurant', '2100', 'Sales Tax Payable', 'Liability', 'Current Liability', 'Collected sales tax', 'Credit', TRUE, 9),
('Restaurant', '2200', 'Tips Payable', 'Liability', 'Current Liability', 'Employee tips to be distributed', 'Credit', TRUE, 10),
('Restaurant', '3000', 'Owner Equity', 'Equity', 'Equity', 'Owner capital contributions', 'Credit', TRUE, 11),
('Restaurant', '3100', 'Retained Earnings', 'Equity', 'Equity', 'Accumulated profits', 'Credit', TRUE, 12),
('Restaurant', '4000', 'Food Sales', 'Revenue', 'Operating Revenue', 'Dine-in and takeout food', 'Credit', TRUE, 13),
('Restaurant', '4100', 'Beverage Sales', 'Revenue', 'Operating Revenue', 'Drinks and alcohol sales', 'Credit', TRUE, 14),
('Restaurant', '4200', 'Catering Revenue', 'Revenue', 'Operating Revenue', 'Off-site catering services', 'Credit', FALSE, 15),
('Restaurant', '5000', 'Cost of Food Sold', 'Expense', 'Cost of Sales', 'Food ingredients and supplies', 'Debit', TRUE, 16),
('Restaurant', '5100', 'Cost of Beverages Sold', 'Expense', 'Cost of Sales', 'Drink and alcohol costs', 'Debit', TRUE, 17),
('Restaurant', '5200', 'Kitchen Labor', 'Expense', 'Operating Expense', 'Chef, cooks, prep staff wages', 'Debit', TRUE, 18),
('Restaurant', '5300', 'Server and FOH Labor', 'Expense', 'Operating Expense', 'Waitstaff, bartenders, hosts', 'Debit', TRUE, 19),
('Restaurant', '5400', 'Rent and Occupancy', 'Expense', 'Operating Expense', 'Restaurant space rental', 'Debit', TRUE, 20),
('Restaurant', '5500', 'Utilities', 'Expense', 'Operating Expense', 'Gas, electric, water', 'Debit', TRUE, 21),
('Restaurant', '5600', 'Equipment Repairs', 'Expense', 'Operating Expense', 'Kitchen equipment maintenance', 'Debit', FALSE, 22),
('Restaurant', '5700', 'Marketing and Promotions', 'Expense', 'Operating Expense', 'Advertising and specials', 'Debit', FALSE, 23);

-- Add Nonprofit (21 accounts)
INSERT INTO industry_account_templates (industry, account_number, account_name, account_type, account_subtype, description, normal_balance, is_required, display_order) VALUES
('Nonprofit', '1000', 'Cash and Cash Equivalents', 'Asset', 'Current Asset', 'Operating cash and bank accounts', 'Debit', TRUE, 1),
('Nonprofit', '1100', 'Pledges Receivable', 'Asset', 'Current Asset', 'Promised donations not yet received', 'Debit', TRUE, 2),
('Nonprofit', '1200', 'Grants Receivable', 'Asset', 'Current Asset', 'Awarded grants pending payment', 'Debit', FALSE, 3),
('Nonprofit', '1500', 'Property and Equipment', 'Asset', 'Fixed Asset', 'Office equipment and furniture', 'Debit', FALSE, 4),
('Nonprofit', '1510', 'Accumulated Depreciation', 'Asset', 'Fixed Asset', 'Contra-asset account', 'Credit', FALSE, 5),
('Nonprofit', '2000', 'Accounts Payable', 'Liability', 'Current Liability', 'Money owed to vendors', 'Credit', TRUE, 6),
('Nonprofit', '2100', 'Deferred Revenue', 'Liability', 'Current Liability', 'Grant advances and prepaid fees', 'Credit', FALSE, 7),
('Nonprofit', '3000', 'Net Assets Without Donor Restrictions', 'Equity', 'Net Assets', 'Unrestricted funds', 'Credit', TRUE, 8),
('Nonprofit', '3100', 'Net Assets With Donor Restrictions', 'Equity', 'Net Assets', 'Restricted/designated funds', 'Credit', TRUE, 9),
('Nonprofit', '4000', 'Individual Donations', 'Revenue', 'Contribution Revenue', 'Direct donor contributions', 'Credit', TRUE, 10),
('Nonprofit', '4100', 'Corporate Donations', 'Revenue', 'Contribution Revenue', 'Business and corporate gifts', 'Credit', TRUE, 11),
('Nonprofit', '4200', 'Grant Revenue', 'Revenue', 'Contribution Revenue', 'Foundation and government grants', 'Credit', TRUE, 12),
('Nonprofit', '4300', 'Fundraising Events', 'Revenue', 'Earned Revenue', 'Galas, auctions, special events', 'Credit', FALSE, 13),
('Nonprofit', '4400', 'Program Service Fees', 'Revenue', 'Earned Revenue', 'Fees for services provided', 'Credit', FALSE, 14),
('Nonprofit', '4500', 'Investment Income', 'Revenue', 'Other Revenue', 'Interest and dividends', 'Credit', FALSE, 15),
('Nonprofit', '5000', 'Program Services', 'Expense', 'Program Expense', 'Direct mission-related expenses', 'Debit', TRUE, 16),
('Nonprofit', '5100', 'Salaries and Wages', 'Expense', 'Operating Expense', 'Staff compensation', 'Debit', TRUE, 17),
('Nonprofit', '5200', 'Fundraising Expenses', 'Expense', 'Operating Expense', 'Donor acquisition and events', 'Debit', TRUE, 18),
('Nonprofit', '5300', 'Administrative Expenses', 'Expense', 'Operating Expense', 'General overhead and admin', 'Debit', TRUE, 19),
('Nonprofit', '5400', 'Professional Fees', 'Expense', 'Operating Expense', 'Legal, accounting, consulting', 'Debit', FALSE, 20),
('Nonprofit', '5500', 'Marketing and Communications', 'Expense', 'Operating Expense', 'Outreach and awareness', 'Debit', FALSE, 21);

-- Verify results
SELECT industry, COUNT(*) as account_count
FROM industry_account_templates
GROUP BY industry
ORDER BY industry;
