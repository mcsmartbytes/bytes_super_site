export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  industry: string;
  plan: 'FULL SERVICE' | 'BASIC' | 'PREMIUM';
  monthly_fee: number;
  transactions_count: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  text: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  completed: boolean;
  client_id?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  client_id: string;
  transaction_date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  created_at: string;
}

export interface Report {
  id: string;
  client_id: string;
  type: 'P&L' | 'Balance Sheet' | 'Cash Flow';
  period_start: string;
  period_end: string;
  data: any;
  created_at: string;
}

export interface ChartOfAccount {
  id: string;
  client_id: string;
  account_number: string;
  account_name: string;
  account_type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  account_subtype: string;
  parent_account_id?: string;
  description?: string;
  is_active: boolean;
  is_system_account: boolean;
  normal_balance: 'Debit' | 'Credit';
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  client_id: string;
  entry_number: string;
  entry_date: string;
  description: string;
  reference?: string;
  status: 'Draft' | 'Posted' | 'Void';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LedgerEntry {
  id: string;
  journal_entry_id: string;
  account_id: string;
  debit_amount: number;
  credit_amount: number;
  memo?: string;
  created_at: string;
}

export interface IndustryAccountTemplate {
  id: string;
  industry: 'Logistics' | 'Construction' | 'Healthcare' | 'Retail' | 'Professional Services' | 'Social Media' | 'E-commerce' | 'Technology' | 'Advertising' | 'Real Estate' | 'Restaurant' | 'Nonprofit' | 'General';
  account_number: string;
  account_name: string;
  account_type: string;
  account_subtype: string;
  description?: string;
  normal_balance: string;
  is_required: boolean;
  display_order: number;
  created_at: string;
}
