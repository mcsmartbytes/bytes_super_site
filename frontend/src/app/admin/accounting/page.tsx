"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AccountingToolsPage() {
  const [stats, setStats] = useState({
    totalAccounts: 0,
    pendingEntries: 0,
    monthlyJournalEntries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total accounts count
      const { count: accountsCount } = await supabase
        .from("chart_of_accounts")
        .select("*", { count: "exact", head: true });

      // Get pending journal entries
      const { count: pendingCount } = await supabase
        .from("journal_entries")
        .select("*", { count: "exact", head: true })
        .eq("status", "Draft");

      // Get this month's journal entries
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const { count: monthlyCount } = await supabase
        .from("journal_entries")
        .select("*", { count: "exact", head: true })
        .gte("entry_date", startOfMonth.toISOString().split("T")[0]);

      setStats({
        totalAccounts: accountsCount || 0,
        pendingEntries: pendingCount || 0,
        monthlyJournalEntries: monthlyCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const accountingModules = [
    {
      title: "Chart of Accounts",
      description: "Manage your account structure and categories",
      icon: "📊",
      href: "/admin/accounting/chart-of-accounts",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Journal Entries",
      description: "Create and manage journal entries",
      icon: "📝",
      href: "/admin/accounting/journal-entries",
      color: "from-green-500 to-green-600",
    },
    {
      title: "General Ledger",
      description: "View detailed account transactions",
      icon: "📖",
      href: "/admin/accounting/general-ledger",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Trial Balance",
      description: "Review account balances and verify entries",
      icon: "⚖️",
      href: "/admin/accounting/trial-balance",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Financial Reports",
      description: "Generate P&L, Balance Sheet, and Cash Flow",
      icon: "📈",
      href: "/admin/reports",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Accounts Payable",
      description: "Manage vendor bills and payments",
      icon: "💸",
      href: "/admin/accounting/accounts-payable",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Accounts Receivable",
      description: "Track customer invoices and payments",
      icon: "💰",
      href: "/admin/accounting/accounts-receivable",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Bank Reconciliation",
      description: "Match bank statements with your records",
      icon: "🏦",
      href: "/admin/accounting/bank-reconciliation",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c2c2c] text-white flex-shrink-0">
        <div className="p-6">
          <Image
            src="/logo.jpg"
            alt="MC Smart Bytes"
            width={180}
            height={45}
            className="h-10 w-auto mb-2"
          />
          <p className="text-xs text-gray-400">Professional Accounting Platform</p>
        </div>

        <nav className="px-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Dashboard
            </h3>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <span>📊</span>
              <span>Overview</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Accounting
            </h3>
            <Link
              href="/admin/accounting"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white"
            >
              <span>💰</span>
              <span>Accounting Tools</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Client Management
            </h3>
            <Link
              href="/admin/clients"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <span>👥</span>
              <span>All Clients</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tasks & Reports
            </h3>
            <Link
              href="/admin/tasks"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <span>✓</span>
              <span>Tasks</span>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white mt-1"
            >
              <span>📄</span>
              <span>Reports</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Accounting Tools</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, <span className="text-[#D2691E] font-semibold">MC Smart Bytes Admin</span>
            </span>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold">
              Logout
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Accounts</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalAccounts}</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Entries</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.pendingEntries}</p>
                </div>
                <div className="text-4xl">📝</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Entries</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.monthlyJournalEntries}</p>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </div>
          </div>

          {/* Accounting Modules Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Accounting Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountingModules.map((module) => (
                <Link
                  key={module.title}
                  href={module.href}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#D2691E]"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl mb-4`}>
                    {module.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/accounting/journal-entries?action=new"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">➕</span>
                <div>
                  <p className="font-semibold text-gray-800">New Journal Entry</p>
                  <p className="text-sm text-gray-600">Record a transaction</p>
                </div>
              </Link>

              <Link
                href="/admin/accounting/trial-balance"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">⚖️</span>
                <div>
                  <p className="font-semibold text-gray-800">Run Trial Balance</p>
                  <p className="text-sm text-gray-600">Verify account balances</p>
                </div>
              </Link>

              <Link
                href="/admin/reports"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold text-gray-800">Generate Report</p>
                  <p className="text-sm text-gray-600">Create financial statements</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
