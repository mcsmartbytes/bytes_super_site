"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Client } from "@/types/database";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    industry: "",
    plan: "FULL SERVICE" as const,
    monthly_fee: 0,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("clients").insert([
        {
          ...formData,
          transactions_count: 0,
          status: "active",
        },
      ]);

      if (error) throw error;

      setShowAddModal(false);
      setFormData({
        company_name: "",
        contact_name: "",
        email: "",
        phone: "",
        industry: "",
        plan: "FULL SERVICE",
        monthly_fee: 0,
      });
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Failed to add client. Please try again.");
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
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white mt-1"
            >
              <span>📈</span>
              <span>Analytics</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Client Management
            </h3>
            <Link
              href="/admin/clients"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white"
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
          <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
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
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">All Clients</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
              >
                + Add Client
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading clients...</div>
            ) : clients.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No clients found. Click "+ Add Client" to add your first client.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Monthly Fee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transactions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{client.company_name}</div>
                        <div className="text-sm text-blue-600">{client.contact_name}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{client.industry}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {client.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">${client.monthly_fee}</td>
                      <td className="px-6 py-4 text-gray-700">{client.transactions_count}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Client</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan *</label>
                  <select
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        plan: e.target.value as "FULL SERVICE" | "BASIC" | "PREMIUM",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="BASIC">BASIC</option>
                    <option value="FULL SERVICE">FULL SERVICE</option>
                    <option value="PREMIUM">PREMIUM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Fee *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.monthly_fee}
                    onChange={(e) =>
                      setFormData({ ...formData, monthly_fee: parseFloat(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
