"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ChartOfAccount, Client, IndustryAccountTemplate } from "@/types/database";

export default function ChartOfAccountsPage() {
  const [accounts, setAccounts] = useState<ChartOfAccount[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [dbSetupError, setDbSetupError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    account_number: "",
    account_name: "",
    account_type: "Asset" as const,
    account_subtype: "",
    description: "",
    normal_balance: "Debit" as const,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      fetchAccounts();
    }
  }, [selectedClient]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("status", "active")
        .order("company_name");

      if (error) throw error;
      setClients(data || []);
      if (data && data.length > 0) {
        setSelectedClient(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchAccounts = async () => {
    if (!selectedClient) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("chart_of_accounts")
        .select("*")
        .eq("client_id", selectedClient)
        .eq("is_active", true)
        .order("account_number");

      if (error) {
        if (error.code === "42P01" || error.message?.includes("does not exist")) {
          setDbSetupError("database_not_setup");
        }
        throw error;
      }
      setAccounts(data || []);
      setDbSetupError(null); // Clear error if successful
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const importIndustryTemplate = async () => {
    if (!selectedClient || !selectedIndustry) {
      alert("Please select a client and industry");
      return;
    }

    try {
      // Fetch industry templates
      const { data: templates, error: fetchError } = await supabase
        .from("industry_account_templates")
        .select("*")
        .eq("industry", selectedIndustry)
        .order("display_order");

      if (fetchError) {
        console.error("Supabase error details:", fetchError);
        console.error("Error code:", fetchError.code);
        console.error("Error message:", fetchError.message);
        console.error("Full error object:", JSON.stringify(fetchError, null, 2));

        // Check various indicators that the table doesn't exist
        const errorStr = JSON.stringify(fetchError).toLowerCase();
        if (
          fetchError.code === "42P01" ||
          fetchError.code === "PGRST116" ||
          fetchError.message?.toLowerCase().includes("does not exist") ||
          fetchError.message?.toLowerCase().includes("relation") ||
          errorStr.includes("does not exist") ||
          errorStr.includes("relation")
        ) {
          throw new Error(
            "DATABASE_NOT_SETUP: The accounting tables haven't been created yet. " +
            "Please run the accounting-schema.sql file in Supabase SQL Editor first."
          );
        }
        throw fetchError;
      }

      if (!templates || templates.length === 0) {
        alert(`No templates found for ${selectedIndustry}. Please check that the SQL schema was run completely.`);
        return;
      }

      // Check if client already has accounts
      const { data: existingAccounts } = await supabase
        .from("chart_of_accounts")
        .select("account_number")
        .eq("client_id", selectedClient);

      if (existingAccounts && existingAccounts.length > 0) {
        if (!confirm("This client already has accounts. Do you want to add these templates anyway?")) {
          return;
        }
      }

      // Insert accounts from templates
      const accountsToInsert = templates.map((template: IndustryAccountTemplate) => ({
        client_id: selectedClient,
        account_number: template.account_number,
        account_name: template.account_name,
        account_type: template.account_type,
        account_subtype: template.account_subtype,
        description: template.description,
        normal_balance: template.normal_balance,
        is_system_account: template.is_required,
        is_active: true,
      }));

      const { error: insertError } = await supabase
        .from("chart_of_accounts")
        .insert(accountsToInsert);

      if (insertError) throw insertError;

      alert(`Successfully imported ${templates.length} accounts!`);
      setShowImportModal(false);
      fetchAccounts();
    } catch (error: any) {
      console.error("Error importing template:", error);
      const errorMsg = error?.message || JSON.stringify(error) || "Unknown error";

      if (errorMsg.includes("DATABASE_NOT_SETUP") || errorMsg.includes("does not exist") || errorMsg.includes("42P01")) {
        alert(
          "⚠️ DATABASE SETUP REQUIRED\n\n" +
          "The accounting tables haven't been created yet.\n\n" +
          "STEPS TO FIX:\n" +
          "1. Go to: https://kktxfbmlmajmbmwxocvn.supabase.co\n" +
          "2. Click: SQL Editor (left sidebar)\n" +
          "3. Click: New Query\n" +
          "4. Copy ALL contents from: accounting-schema.sql\n" +
          "5. Paste into editor and click RUN\n\n" +
          "Then refresh this page and try again."
        );
      } else {
        alert(`Error importing template:\n\n${errorMsg}`);
      }
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) {
      alert("Please select a client");
      return;
    }

    try {
      const { error } = await supabase.from("chart_of_accounts").insert([
        {
          client_id: selectedClient,
          ...formData,
          is_active: true,
          is_system_account: false,
        },
      ]);

      if (error) throw error;

      setShowAddModal(false);
      setFormData({
        account_number: "",
        account_name: "",
        account_type: "Asset",
        account_subtype: "",
        description: "",
        normal_balance: "Debit",
      });
      fetchAccounts();
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Failed to add account");
    }
  };

  const filteredAccounts = accounts.filter((account) => {
    if (filterType === "ALL") return true;
    return account.account_type === filterType;
  });

  const groupedAccounts = filteredAccounts.reduce((acc, account) => {
    if (!acc[account.account_type]) {
      acc[account.account_type] = [];
    }
    acc[account.account_type].push(account);
    return acc;
  }, {} as Record<string, ChartOfAccount[]>);

  const accountTypeColors: Record<string, string> = {
    Asset: "bg-blue-100 text-blue-800",
    Liability: "bg-red-100 text-red-800",
    Equity: "bg-green-100 text-green-800",
    Revenue: "bg-purple-100 text-purple-800",
    Expense: "bg-orange-100 text-orange-800",
  };

  const selectedClientData = clients.find((c) => c.id === selectedClient);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Same as before */}
      <aside className="w-64 bg-[#2c2c2c] text-white flex-shrink-0">
        <div className="p-6">
          <Image src="/logo.jpg" alt="MC Smart Bytes" width={180} height={45} className="h-10 w-auto mb-2" />
          <p className="text-xs text-gray-400">Professional Accounting Platform</p>
        </div>
        <nav className="px-4">
          <div className="mb-6">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white">
              <span>📊</span><span>Overview</span>
            </Link>
          </div>
          <div className="mb-6">
            <Link href="/admin/accounting" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white">
              <span>💰</span><span>Accounting Tools</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/accounting" className="text-sm text-gray-600 hover:text-[#D2691E]">
                ← Back to Accounting Tools
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 mt-1">Chart of Accounts</h1>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-semibold">
              Logout
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Database Setup Warning */}
          {dbSetupError === "database_not_setup" && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-red-800 mb-2">
                    ⚠️ Database Setup Required
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    The accounting tables haven't been created in Supabase yet. Please follow these steps to set up the database:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-red-700 space-y-1 mb-3">
                    <li>Go to: <a href="https://kktxfbmlmajmbmwxocvn.supabase.co" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-red-900">Supabase Dashboard</a></li>
                    <li>Click <strong>SQL Editor</strong> in the left sidebar</li>
                    <li>Click <strong>New Query</strong></li>
                    <li>Copy ALL contents from: <code className="bg-red-100 px-1 rounded">accounting-schema.sql</code></li>
                    <li>Paste into editor and click <strong>RUN</strong></li>
                  </ol>
                  <p className="text-sm text-red-700">
                    After running the schema, refresh this page to start using the accounting system with 12 industry-specific templates!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Client Selection and Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-end justify-between">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                >
                  <option value="">Choose a client...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.company_name} ({client.industry})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                >
                  <option value="ALL">All Account Types</option>
                  <option value="Asset">Assets</option>
                  <option value="Liability">Liabilities</option>
                  <option value="Equity">Equity</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Expense">Expenses</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowImportModal(true)}
                  disabled={!selectedClient}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-semibold"
                >
                  📥 Import Template
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  disabled={!selectedClient}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-semibold"
                >
                  + Add Account
                </button>
              </div>
            </div>
          </div>

          {/* Accounts Display */}
          {!selectedClient ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">Please select a client to view their chart of accounts</p>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">Loading accounts...</p>
            </div>
          ) : accounts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                No accounts found for {selectedClientData?.company_name}
              </p>
              <button
                onClick={() => setShowImportModal(true)}
                className="bg-[#D2691E] text-white px-6 py-3 rounded-md hover:bg-[#B8560F] font-semibold"
              >
                Import Industry Template
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedAccounts).map(([type, typeAccounts]) => (
                <div key={type} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] px-6 py-3">
                    <h2 className="text-lg font-bold text-white">
                      {type}s ({typeAccounts.length})
                    </h2>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Account #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Account Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Subtype
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Normal Balance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {typeAccounts.map((account) => (
                        <tr key={account.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono text-sm font-semibold text-gray-900">
                            {account.account_number}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{account.account_name}</div>
                            {account.description && (
                              <div className="text-sm text-gray-500">{account.description}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-700 text-sm">{account.account_subtype}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                                account.normal_balance === "Debit"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {account.normal_balance}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                                accountTypeColors[account.account_type]
                              }`}
                            >
                              {account.is_system_account && "🔒 "}
                              {account.account_type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Import Template Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Import Industry Template</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Industry Template
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
              >
                <option value="">Choose industry...</option>
                <option value="Logistics">🚚 Logistics & Delivery</option>
                <option value="Construction">🏗️ Construction & Contracting</option>
                <option value="Healthcare">🏥 Healthcare & Medical</option>
                <option value="Retail">🛒 Retail & E-commerce</option>
                <option value="Professional Services">💼 Professional Services</option>
                <option value="Social Media">📱 Social Media & Content</option>
                <option value="E-commerce">🛍️ E-commerce & Online Sales</option>
                <option value="Technology">💻 Technology & SaaS</option>
                <option value="Advertising">📢 Advertising & Marketing</option>
                <option value="Real Estate">🏠 Real Estate & Property</option>
                <option value="Restaurant">🍽️ Restaurant & Food Service</option>
                <option value="Nonprofit">🤝 Nonprofit Organization</option>
              </select>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
              <p className="text-sm text-blue-800">
                This will import a complete chart of accounts specific to the selected industry,
                including all standard accounts needed for bookkeeping.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setSelectedIndustry("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={importIndustryTemplate}
                disabled={!selectedIndustry}
                className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B8560F] disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
              >
                Import Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Account</h2>
            <form onSubmit={handleAddAccount}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.account_name}
                    onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                    placeholder="e.g., Cash"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type *
                  </label>
                  <select
                    value={formData.account_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        account_type: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="Asset">Asset</option>
                    <option value="Liability">Liability</option>
                    <option value="Equity">Equity</option>
                    <option value="Revenue">Revenue</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Subtype *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.account_subtype}
                    onChange={(e) => setFormData({ ...formData, account_subtype: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                    placeholder="e.g., Current Asset"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Normal Balance *
                  </label>
                  <select
                    value={formData.normal_balance}
                    onChange={(e) =>
                      setFormData({ ...formData, normal_balance: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                    placeholder="Optional description..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B8560F] font-semibold"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
