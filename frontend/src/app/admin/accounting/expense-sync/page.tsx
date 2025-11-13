'use client';

import { useState, useEffect } from 'react';
import { expensesSupabase } from '@/lib/supabase';
import AdminNav from '@/components/AdminNav';
import { syncExpensesBulk, checkSyncReadiness } from '@/services/expenseSyncService';

interface UnsyncedExpense {
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

interface SyncHistory {
  id: string;
  expense_description: string;
  expense_amount: number;
  expense_category: string;
  expense_date: string;
  sync_status: string;
  synced_at: string;
  error_message?: string;
  business_name?: string;
  user_name?: string;
}

export default function ExpenseSyncPage() {
  const [loading, setLoading] = useState(true);
  const [unsyncedExpenses, setUnsyncedExpenses] = useState<UnsyncedExpense[]>([]);
  const [syncHistory, setSyncHistory] = useState<SyncHistory[]>([]);
  const [selectedExpenses, setSelectedExpenses] = useState<Set<string>>(new Set());
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [clientId, setClientId] = useState<string>(''); // TODO: Get from user session/settings
  const [syncReadiness, setSyncReadiness] = useState<{ ready: boolean; message: string } | null>(null);

  useEffect(() => {
    fetchData();
    checkSystemReadiness();
  }, []);

  const checkSystemReadiness = async () => {
    const readiness = await checkSyncReadiness();
    setSyncReadiness(readiness);

    if (!readiness.ready) {
      console.warn('Sync system not ready:', readiness.message);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch unsynced expenses
      const { data: unsyncedData, error: unsyncedError } = await expensesSupabase
        .from('unsynced_expenses')
        .select('*')
        .order('date', { ascending: false });

      if (unsyncedError) throw unsyncedError;
      setUnsyncedExpenses(unsyncedData || []);

      // Fetch recent sync history
      const { data: historyData, error: historyError } = await expensesSupabase
        .from('recent_syncs')
        .select('*')
        .limit(50);

      if (historyError) throw historyError;
      setSyncHistory(historyData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load expense data');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpenseSelection = (expenseId: string) => {
    const newSelection = new Set(selectedExpenses);
    if (newSelection.has(expenseId)) {
      newSelection.delete(expenseId);
    } else {
      newSelection.add(expenseId);
    }
    setSelectedExpenses(newSelection);
  };

  const selectAll = () => {
    setSelectedExpenses(new Set(unsyncedExpenses.map(e => e.id)));
  };

  const deselectAll = () => {
    setSelectedExpenses(new Set());
  };

  const syncExpenses = async () => {
    if (selectedExpenses.size === 0) {
      alert('Please select at least one expense to sync');
      return;
    }

    // Check if system is ready
    if (syncReadiness && !syncReadiness.ready) {
      alert(
        'Sync system not ready.\n\n' +
        syncReadiness.message +
        '\n\nPlease run ACCOUNTING_INTEGRATION_SETUP.sql in Supabase first.'
      );
      return;
    }

    // Check if client ID is set
    if (!clientId) {
      const userClientId = prompt(
        'Please enter your Client ID.\n\n' +
        'This links mobile expenses to your accounting client.\n' +
        'You can find this in your client settings or create a new client first.'
      );

      if (!userClientId) {
        return;
      }

      setClientId(userClientId);
    }

    setSyncing(true);
    try {
      const expensesToSync = unsyncedExpenses.filter(e => selectedExpenses.has(e.id));

      // Use the bulk sync service
      const result = await syncExpensesBulk(expensesToSync, clientId);

      // Show results
      if (result.failures === 0) {
        alert(`✅ Successfully synced ${result.successes} expenses!`);
      } else {
        const errorList = result.errors.slice(0, 5).join('\n- ');
        const more = result.errors.length > 5 ? `\n... and ${result.errors.length - 5} more` : '';

        alert(
          `Sync completed:\n\n` +
          `✅ Successful: ${result.successes}\n` +
          `❌ Failed: ${result.failures}\n\n` +
          `Errors:\n- ${errorList}${more}\n\n` +
          `Check the Sync History tab for details.`
        );
      }

      setSelectedExpenses(new Set());
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Sync error:', error);
      alert('Failed to sync expenses: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSyncing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading expenses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mobile Expense Sync</h1>
          <p className="mt-2 text-gray-600">
            Sync expenses from Expenses Made Easy mobile app to accounting system
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${
                activeTab === 'pending'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Pending Sync ({unsyncedExpenses.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Sync History ({syncHistory.length})
            </button>
          </nav>
        </div>

        {/* Pending Sync Tab */}
        {activeTab === 'pending' && (
          <div>
            {unsyncedExpenses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">All caught up!</h3>
                <p className="mt-1 text-sm text-gray-500">No expenses waiting to be synced.</p>
              </div>
            ) : (
              <>
                {/* Bulk Actions */}
                <div className="bg-white rounded-lg shadow mb-4 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      {selectedExpenses.size} of {unsyncedExpenses.length} selected
                    </span>
                    <button
                      onClick={selectAll}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Select All
                    </button>
                    {selectedExpenses.size > 0 && (
                      <button
                        onClick={deselectAll}
                        className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                      >
                        Deselect All
                      </button>
                    )}
                  </div>
                  <button
                    onClick={syncExpenses}
                    disabled={selectedExpenses.size === 0 || syncing}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {syncing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Syncing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Sync Selected ({selectedExpenses.size})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Expenses List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedExpenses.size === unsyncedExpenses.length}
                            onChange={() => selectedExpenses.size === unsyncedExpenses.length ? deselectAll() : selectAll()}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {unsyncedExpenses.map((expense) => (
                        <tr
                          key={expense.id}
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedExpenses.has(expense.id) ? 'bg-orange-50' : ''
                          }`}
                          onClick={() => toggleExpenseSelection(expense.id)}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedExpenses.has(expense.id)}
                              onChange={() => toggleExpenseSelection(expense.id)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(expense.date)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {expense.description}
                            {expense.payment_method && (
                              <span className="ml-2 text-xs text-gray-500">({expense.payment_method})</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div>
                              <div className="font-medium text-gray-900">{expense.business_name || 'Unknown'}</div>
                              <div className="text-xs text-gray-500">{expense.user_name}</div>
                              {expense.industry && (
                                <div className="text-xs text-gray-400">{expense.industry}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-gray-900">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {expense.receipt_url ? (
                              <a
                                href={expense.receipt_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 hover:text-orange-900"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </a>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Sync History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {syncHistory.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No sync history</h3>
                <p className="mt-1 text-sm text-gray-500">Sync some expenses to see history here.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Synced At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {syncHistory.map((sync) => (
                    <tr key={sync.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(sync.synced_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {sync.expense_description}
                        <div className="text-xs text-gray-500">Expense Date: {formatDate(sync.expense_date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {sync.expense_category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="font-medium text-gray-900">{sync.business_name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{sync.user_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-gray-900">
                        {formatCurrency(sync.expense_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {sync.sync_status === 'success' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        ) : sync.sync_status === 'failed' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" title={sync.error_message}>
                            Failed
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
