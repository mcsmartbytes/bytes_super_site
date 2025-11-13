"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Client, Transaction } from "@/types/database";

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    industry: "",
    plan: "FULL SERVICE" as const,
    monthly_fee: 0,
    status: "active" as const,
  });

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single();

      if (clientError) throw clientError;

      setClient(clientData);
      setFormData({
        company_name: clientData.company_name,
        contact_name: clientData.contact_name,
        email: clientData.email,
        phone: clientData.phone || "",
        industry: clientData.industry,
        plan: clientData.plan,
        monthly_fee: clientData.monthly_fee,
        status: clientData.status,
      });

      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .select("*")
        .eq("client_id", clientId)
        .order("date", { ascending: false });

      if (!transactionError) {
        setTransactions(transactionData || []);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      alert("Failed to load client data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("clients")
        .update(formData)
        .eq("id", clientId);

      if (error) throw error;

      setIsEditing(false);
      fetchClientData();
      alert("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase.from("clients").delete().eq("id", clientId);

      if (error) throw error;

      alert("Client deleted successfully");
      router.push("/admin/clients");
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-gray-500">Loading client data...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-gray-500">Client not found</div>
      </div>
    );
  }

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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/clients"
              className="text-gray-600 hover:text-[#D2691E] transition-colors"
            >
              ← Back to Clients
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">{client.company_name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, <span className="text-[#D2691E] font-semibold">MC Smart Bytes Admin</span>
            </span>
          </div>
        </header>

        <div className="p-8">
          {/* Client Info Card */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Client Information</h2>
              <div className="flex gap-2">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company_name}
                        onChange={(e) =>
                          setFormData({ ...formData, company_name: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, contact_name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.value as "active" | "inactive",
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Company Name</p>
                    <p className="text-lg font-semibold text-gray-900">{client.company_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Contact Name</p>
                    <p className="text-lg font-semibold text-gray-900">{client.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg text-blue-600">{client.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-lg text-gray-900">{client.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Industry</p>
                    <p className="text-lg text-gray-900">{client.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Plan</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {client.plan}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Monthly Fee</p>
                    <p className="text-lg font-semibold text-gray-900">${client.monthly_fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        client.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {client.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Transactions</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold">
                + Add Transaction
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No transactions found for this client.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(transaction.transaction_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-900">{transaction.description}</td>
                      <td className="px-6 py-4 text-gray-700">{transaction.category}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
