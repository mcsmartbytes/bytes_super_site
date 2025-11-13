"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Invoice {
  id: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  status: string;
  customer_id: string;
  customers?: {
    customer_name: string;
    company_name?: string;
  };
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalReceivables: 0,
    overdueAmount: 0,
    paidThisMonth: 0,
  });

  useEffect(() => {
    fetchInvoices();
    fetchStats();
  }, [filter]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("invoices")
        .select(`
          *,
          customers (
            customer_name,
            company_name
          )
        `)
        .order("invoice_date", { ascending: false });

      // Apply filter
      if (filter === "unpaid") {
        query = query.in("status", ["sent", "partial", "overdue"]);
      } else if (filter === "paid") {
        query = query.eq("status", "paid");
      } else if (filter === "overdue") {
        query = query.eq("status", "overdue");
      } else if (filter === "draft") {
        query = query.eq("status", "draft");
      }

      const { data, error } = await query;

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      alert("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Total invoices
      const { count: total } = await supabase
        .from("invoices")
        .select("*", { count: "exact", head: true });

      // Total receivables (unpaid invoices)
      const { data: unpaid } = await supabase
        .from("invoices")
        .select("balance_due")
        .in("status", ["sent", "partial", "overdue"]);

      const totalReceivables = unpaid?.reduce((sum, inv) => sum + (Number(inv.balance_due) || 0), 0) || 0;

      // Overdue amount
      const { data: overdue } = await supabase
        .from("invoices")
        .select("balance_due")
        .eq("status", "overdue");

      const overdueAmount = overdue?.reduce((sum, inv) => sum + (Number(inv.balance_due) || 0), 0) || 0;

      // Paid this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const { data: paid } = await supabase
        .from("invoices")
        .select("amount_paid")
        .eq("status", "paid")
        .gte("invoice_date", startOfMonth.toISOString().split("T")[0]);

      const paidThisMonth = paid?.reduce((sum, inv) => sum + (Number(inv.amount_paid) || 0), 0) || 0;

      setStats({
        totalInvoices: total || 0,
        totalReceivables,
        overdueAmount,
        paidThisMonth,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      // Delete invoice items first
      await supabase.from("invoice_items").delete().eq("invoice_id", id);

      // Delete invoice
      const { error } = await supabase.from("invoices").delete().eq("id", id);

      if (error) throw error;

      fetchInvoices();
      fetchStats();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      alert("Failed to delete invoice");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <span>💰</span>
              <span>Accounting Tools</span>
            </Link>
            <Link
              href="/admin/accounting/customers"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white mt-1"
            >
              <span>👥</span>
              <span>Customers</span>
            </Link>
            <Link
              href="/admin/accounting/vendors"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white mt-1"
            >
              <span>🏢</span>
              <span>Vendors</span>
            </Link>
            <Link
              href="/admin/accounting/invoices"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white mt-1"
            >
              <span>📄</span>
              <span>Invoices (AR)</span>
            </Link>
            <Link
              href="/admin/accounting/bills"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white mt-1"
            >
              <span>📥</span>
              <span>Bills (AP)</span>
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Invoices (Accounts Receivable)</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/accounting/invoices/new"
              className="bg-[#D2691E] text-white px-6 py-2 rounded-md hover:bg-[#B8560F] transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Create Invoice
            </Link>
          </div>
        </header>

        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Invoices</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalInvoices}</p>
                </div>
                <div className="text-4xl">📄</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Receivables</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalReceivables)}</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overdue Amount</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.overdueAmount)}</p>
                </div>
                <div className="text-4xl">⚠️</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Paid This Month</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.paidThisMonth)}</p>
                </div>
                <div className="text-4xl">✓</div>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-[#D2691E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Invoices
              </button>
              <button
                onClick={() => setFilter("draft")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "draft"
                    ? "bg-[#D2691E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => setFilter("unpaid")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "unpaid"
                    ? "bg-[#D2691E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Unpaid
              </button>
              <button
                onClick={() => setFilter("overdue")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "overdue"
                    ? "bg-[#D2691E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Overdue
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === "paid"
                    ? "bg-[#D2691E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Paid
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {filter === "all" ? "All Invoices" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Invoices`}
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading invoices...</div>
            ) : invoices.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No invoices found. Click "Create Invoice" to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance Due
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/admin/accounting/invoices/${invoice.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-900"
                          >
                            {invoice.invoice_number}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.customers?.customer_name || "Unknown"}
                          </div>
                          {invoice.customers?.company_name && (
                            <div className="text-sm text-gray-500">{invoice.customers.company_name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(invoice.invoice_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(invoice.due_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          {formatCurrency(invoice.total_amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          {formatCurrency(invoice.balance_due)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              invoice.status
                            )}`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/accounting/invoices/${invoice.id}/edit`}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(invoice.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
