/**
 * Expense Sync Service
 *
 * Handles syncing expenses from mobile app to accounting system
 * Creates journal entries using double-entry bookkeeping
 */

import { supabase, expensesSupabase } from '@/lib/supabase';

export interface UnsyncedExpense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  payment_method?: string;
  receipt_url?: string;
  user_id: string;
  business_name?: string;
  user_name?: string;
  industry?: string;
}

export interface CategoryMapping {
  id: string;
  client_id: string;
  mobile_category: string;
  account_id: string;
  account_number: string;
  account_name: string;
  debit_account_id: string;
  credit_account_id: string;
}

export interface SyncResult {
  success: boolean;
  journalEntryId?: string;
  error?: string;
}

/**
 * Creates a journal entry from a mobile expense
 *
 * Double-entry bookkeeping:
 * - Debit: Expense account (increases expense)
 * - Credit: Cash/Credit Card account (decreases asset)
 */
export async function createJournalEntryFromExpense(
  expense: UnsyncedExpense,
  clientId: string
): Promise<SyncResult> {
  try {
    // Step 1: Find category mapping (in expenses database)
    const { data: mapping, error: mappingError } = await expensesSupabase
      .from('category_account_mapping')
      .select('*')
      .eq('client_id', clientId)
      .eq('mobile_category', expense.category)
      .single();

    if (mappingError || !mapping) {
      return {
        success: false,
        error: `No category mapping found for "${expense.category}". Please configure category mappings first.`,
      };
    }

    // Step 2: Use a default user ID for journal entries
    // In production, this should be the bookkeeper's user ID from auth
    const userId = 'system';

    // Step 3: Check if journal_entries table exists and get its structure
    // If it doesn't exist, we'll create a simplified entry
    const { data: existingEntry, error: checkError } = await supabase
      .from('journal_entries')
      .select('id')
      .limit(1);

    // Determine payment method account ID (cash vs credit card)
    let paymentAccountId = mapping.credit_account_id;
    let paymentAccountName = 'Cash';

    if (expense.payment_method?.toLowerCase().includes('credit')) {
      paymentAccountName = 'Credit Card';
      // TODO: Configure separate credit card account in mappings
    }

    // Step 4: Generate entry number
    // Get count of existing entries for this client to generate sequential number
    const { count } = await supabase
      .from('journal_entries')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', clientId);

    const entryNumber = `JE-${new Date().getFullYear()}-${String((count || 0) + 1).padStart(4, '0')}`;

    // Step 5: Create journal entry header
    const journalEntryData: any = {
      client_id: clientId,
      entry_number: entryNumber,
      entry_date: expense.date,
      description: `Mobile Expense: ${expense.description}`,
      reference: `EXP-${expense.id.substring(0, 8)}`,
      status: 'Posted',
      created_by: userId,
      source: 'mobile_app',
      mobile_expense_id: expense.id,
      mobile_user_id: expense.user_id,
    };

    const { data: journalEntry, error: journalError } = await supabase
      .from('journal_entries')
      .insert(journalEntryData)
      .select()
      .single();

    if (journalError) {
      // If journal_entries table doesn't exist or has different structure, provide helpful error
      if (journalError.code === '42P01') {
        return {
          success: false,
          error: 'Journal entries table not found. Please run the accounting system setup SQL first.',
        };
      }
      throw journalError;
    }

    // Step 6: Create ledger entries (double-entry)
    const ledgerEntries = [
      {
        journal_entry_id: journalEntry.id,
        account_id: mapping.debit_account_id,
        debit_amount: expense.amount,
        credit_amount: 0,
        memo: expense.description,
      },
      {
        journal_entry_id: journalEntry.id,
        account_id: paymentAccountId,
        debit_amount: 0,
        credit_amount: expense.amount,
        memo: expense.description,
      },
    ];

    const { error: linesError } = await supabase
      .from('ledger_entries')
      .insert(ledgerEntries);

    if (linesError) {
      // If ledger_entries table doesn't exist, delete the entry and return error
      if (linesError.code === '42P01') {
        await supabase.from('journal_entries').delete().eq('id', journalEntry.id);
        return {
          success: false,
          error: 'Ledger entries table not found. Please run the accounting system setup SQL first.',
        };
      }

      // Rollback: Delete the journal entry if lines failed
      await supabase.from('journal_entries').delete().eq('id', journalEntry.id);
      throw linesError;
    }

    // Step 7: Update the expense to mark it as synced (in expenses database)
    const { error: updateError } = await expensesSupabase
      .from('expenses')
      .update({
        synced_to_accounting: true,
        synced_at: new Date().toISOString(),
        accounting_journal_entry_id: journalEntry.id,
      })
      .eq('id', expense.id);

    if (updateError) {
      throw updateError;
    }

    return {
      success: true,
      journalEntryId: journalEntry.id,
    };

  } catch (error) {
    console.error('Error creating journal entry:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Syncs multiple expenses in bulk
 */
export async function syncExpensesBulk(
  expenses: UnsyncedExpense[],
  clientId: string
): Promise<{ successes: number; failures: number; errors: string[] }> {
  let successes = 0;
  let failures = 0;
  const errors: string[] = [];

  for (const expense of expenses) {
    try {
      const result = await createJournalEntryFromExpense(expense, clientId);

      // Log to sync history (in expenses database)
      await expensesSupabase.from('expense_sync_history').insert({
        mobile_user_id: expense.user_id,
        client_id: clientId,
        expense_id: expense.id,
        journal_entry_id: result.journalEntryId,
        sync_status: result.success ? 'success' : 'failed',
        error_message: result.error,
        synced_at: new Date().toISOString(),
        metadata: {
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
          date: expense.date,
          business_name: expense.business_name,
        },
      });

      if (result.success) {
        successes++;
      } else {
        failures++;
        errors.push(`${expense.description}: ${result.error}`);
      }
    } catch (error) {
      failures++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`${expense.description}: ${errorMessage}`);

      // Log error to sync history (in expenses database)
      await expensesSupabase.from('expense_sync_history').insert({
        mobile_user_id: expense.user_id,
        client_id: clientId,
        expense_id: expense.id,
        sync_status: 'failed',
        error_message: errorMessage,
        synced_at: new Date().toISOString(),
      });
    }
  }

  return { successes, failures, errors };
}

/**
 * Gets category mappings for a client
 */
export async function getCategoryMappings(clientId: string): Promise<CategoryMapping[]> {
  const { data, error } = await expensesSupabase
    .from('category_account_mapping')
    .select('*')
    .eq('client_id', clientId)
    .order('mobile_category');

  if (error) {
    console.error('Error fetching category mappings:', error);
    return [];
  }

  return data || [];
}

/**
 * Checks if all required tables exist for syncing
 */
export async function checkSyncReadiness(): Promise<{
  ready: boolean;
  missingTables: string[];
  message: string;
}> {
  const missingTables: string[] = [];

  // Check journal_entries (in accounting database)
  const { error: journalError } = await supabase
    .from('journal_entries')
    .select('id')
    .limit(1);

  if (journalError && journalError.code === '42P01') {
    missingTables.push('journal_entries (accounting DB)');
  }

  // Check ledger_entries (in accounting database)
  const { error: linesError } = await supabase
    .from('ledger_entries')
    .select('id')
    .limit(1);

  if (linesError && linesError.code === '42P01') {
    missingTables.push('ledger_entries (accounting DB)');
  }

  // Check category_account_mapping (in expenses database)
  const { error: mappingError } = await expensesSupabase
    .from('category_account_mapping')
    .select('id')
    .limit(1);

  if (mappingError && mappingError.code === '42P01') {
    missingTables.push('category_account_mapping (expenses DB)');
  }

  if (missingTables.length > 0) {
    return {
      ready: false,
      missingTables,
      message: `Missing tables: ${missingTables.join(', ')}. Please run the appropriate SQL setup scripts.`,
    };
  }

  return {
    ready: true,
    missingTables: [],
    message: 'All required tables exist. Ready to sync.',
  };
}
