-- MC Smart Bytes Admin Dashboard Database Schema
-- Run this in your Supabase SQL Editor to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS clients CASCADE;

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  industry TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('BASIC', 'FULL SERVICE', 'PREMIUM')),
  monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  transactions_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('P&L', 'Balance Sheet', 'Cash Flow')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_tasks_client_id ON tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_transactions_client_id ON transactions(client_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_reports_client_id ON reports(client_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
DROP TRIGGER IF EXISTS update_transaction_count ON transactions;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update transaction count for clients
CREATE OR REPLACE FUNCTION update_client_transaction_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE clients SET transactions_count = transactions_count + 1 WHERE id = NEW.client_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE clients SET transactions_count = GREATEST(transactions_count - 1, 0) WHERE id = OLD.client_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update transaction count
CREATE TRIGGER update_transaction_count AFTER INSERT OR DELETE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_client_transaction_count();

-- Insert sample data (optional - you can remove this section if you don't want sample data)
INSERT INTO clients (company_name, contact_name, email, phone, industry, plan, monthly_fee, status) VALUES
  ('Nevaeh''s Social Media Advertising', 'Nevaeh Blue', 'nevaeh@socialmedia.com', '555-0101', 'Professional Services', 'FULL SERVICE', 149.00, 'active'),
  ('Swift Delivery Solutions', 'John Smith', 'john@swiftdelivery.com', '555-0102', 'Logistics', 'FULL SERVICE', 99.00, 'active')
ON CONFLICT (email) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (text, priority, completed, due_date) VALUES
  ('Review pending transactions for ABC Delivery', 'HIGH', FALSE, CURRENT_DATE + INTERVAL '2 days'),
  ('Generate monthly P&L reports', 'MEDIUM', TRUE, CURRENT_DATE),
  ('Follow up on overdue invoices', 'HIGH', FALSE, CURRENT_DATE + INTERVAL '1 day'),
  ('Update vehicle depreciation schedules', 'LOW', FALSE, CURRENT_DATE + INTERVAL '7 days'),
  ('Reconcile bank statements', 'MEDIUM', FALSE, CURRENT_DATE + INTERVAL '3 days'),
  ('Client onboarding call - FastTrack Logistics', 'HIGH', FALSE, CURRENT_DATE + INTERVAL '1 day');

-- Enable Row Level Security (RLS) - Important for security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable all for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON tasks;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON transactions;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON reports;

-- Create policies for authenticated users (adjust these based on your auth setup)
-- For now, we'll allow all operations for authenticated and anonymous users
CREATE POLICY "Enable all for authenticated users" ON clients
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Enable all for authenticated users" ON tasks
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Enable all for authenticated users" ON transactions
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Enable all for authenticated users" ON reports
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Grant necessary permissions
GRANT ALL ON clients TO anon, authenticated;
GRANT ALL ON tasks TO anon, authenticated;
GRANT ALL ON transactions TO anon, authenticated;
GRANT ALL ON reports TO anon, authenticated;
