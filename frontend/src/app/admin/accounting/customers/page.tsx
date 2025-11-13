"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: string;
  customer_name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  payment_terms?: string;
  credit_limit?: number;
  status: string;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    totalReceivables: 0,
  });

  const [formData, setFormData] = useState({
    customer_name: "",
    company_name: "",
    email: "",
    phone: "",
    address_line1: "",
    city: "",
    state: "",
    zip_code: "",
    payment_terms: "Net 30",
    credit_limit: 0,
    notes: "",
    status: "active",
  });

  useEffect(() => {
    fetchCustomers();
    fetchStats();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("customer_name", { ascending: true });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Total customers
      const { count: total } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });

      // Active customers
      const { count: active } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Total receivables (from invoices)
      const { data: invoices } = await supabase
        .from("invoices")
        .select("balance_due")
        .in("status", ["sent", "partial", "overdue"]);

      const totalReceivables = invoices?.reduce((sum, inv) => sum + (Number(inv.balance_due) || 0), 0) || 0;

      setStats({
        totalCustomers: total || 0,
        activeCustomers: active || 0,
        totalReceivables,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCustomer) {
        // Update existing customer
        const { error } = await supabase
          .from("customers")
          .update(formData)
          .eq("id", editingCustomer.id);

        if (error) throw error;
      } else {
        // Create new customer
        const { error } = await supabase
          .from("customers")
          .insert([formData]);

        if (error) throw error;
      }

      setShowModal(false);
      setEditingCustomer(null);
      resetForm();
      fetchCustomers();
      fetchStats();
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("Failed to save customer");
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      customer_name: customer.customer_name || "",
      company_name: customer.company_name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address_line1: "",
      city: "",
      state: "",
      zip_code: "",
      payment_terms: customer.payment_terms || "Net 30",
      credit_limit: customer.credit_limit || 0,
      notes: "",
      status: customer.status || "active",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", id);

      if (error) throw error;

      fetchCustomers();
      fetchStats();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer. They may have existing invoices.");
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: "",
      company_name: "",
      email: "",
      phone: "",
      address_line1: "",
      city: "",
      state: "",
      zip_code: "",
      payment_terms: "Net 30",
      credit_limit: 0,
      notes: "",
      status: "active",
    });
  };

  const openAddModal = () => {
    setEditingCustomer(null);
    resetForm();
    setShowModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white mt-1"
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
          <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={openAddModal}
              className="bg-[#D2691E] text-white px-6 py-2 rounded-md hover:bg-[#B8560F] transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Add Customer
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.activeCustomers}</p>
                </div>
                <div className="text-4xl">✓</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Receivables</p>
                  <p className="text-3xl font-bold text-gray-800">{formatCurrency(stats.totalReceivables)}</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">All Customers</h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading customers...</div>
            ) : customers.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No customers yet. Click "Add Customer" to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Terms
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit Limit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {customer.customer_name}
                            </div>
                            {customer.company_name && (
                              <div className="text-sm text-gray-500">{customer.company_name}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.email || "-"}</div>
                          <div className="text-sm text-gray-500">{customer.phone || "-"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.payment_terms || "Net 30"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(customer.credit_limit || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              customer.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCustomer(null);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address_line1}
                    onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={formData.payment_terms}
                    onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="Due on Receipt">Due on Receipt</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Limit
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.credit_limit}
                    onChange={(e) =>
                      setFormData({ ...formData, credit_limit: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCustomer(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B8560F]"
                >
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
