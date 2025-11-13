"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Client, Report } from "@/types/database";

export default function ReportsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedReportType, setSelectedReportType] = useState<string>("P&L");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsResponse, reportsResponse] = await Promise.all([
        supabase.from("clients").select("*").eq("status", "active"),
        supabase.from("reports").select("*").order("created_at", { ascending: false }),
      ]);

      if (clientsResponse.error) throw clientsResponse.error;
      if (reportsResponse.error) throw reportsResponse.error;

      setClients(clientsResponse.data || []);
      setReports(reportsResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    if (!selectedClient) {
      alert("Please select a client");
      return;
    }

    try {
      // Here you would typically make an API call to your backend to generate the report
      // For now, we'll create a placeholder report entry
      const { error } = await supabase.from("reports").insert([
        {
          client_id: selectedClient,
          type: selectedReportType,
          period_start: dateRange.start,
          period_end: dateRange.end,
          data: {}, // This would contain the actual report data
        },
      ]);

      if (error) throw error;

      alert("Report generated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report");
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.company_name || "Unknown Client";
  };

  const deleteReport = async (reportId: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      const { error } = await supabase.from("reports").delete().eq("id", reportId);

      if (error) throw error;

      setReports((prev) => prev.filter((report) => report.id !== reportId));
      alert("Report deleted successfully");
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report");
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
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white mt-1"
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
          <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
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
          {/* Generate Report Section */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4">
              <h2 className="text-xl font-bold text-white">Generate New Report</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client *
                  </label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="">Choose a client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type *
                  </label>
                  <select
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="P&L">Profit & Loss</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Cash Flow">Cash Flow Statement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={generateReport}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4">
              <h2 className="text-xl font-bold text-white">Recent Reports</h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading reports...</div>
            ) : reports.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No reports found. Generate your first report above.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Report Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {getClientName(report.client_id)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(report.period_start).toLocaleDateString()} -{" "}
                        {new Date(report.period_end).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(report.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold">
                            View
                          </button>
                          <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold">
                            Download
                          </button>
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Report Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💰</span>
                <h3 className="text-lg font-bold text-gray-800">Profit & Loss</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Track income, expenses, and net profit over a specific period. Essential for
                understanding business profitability.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Revenue breakdown</li>
                <li>• Expense categories</li>
                <li>• Net income calculation</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📊</span>
                <h3 className="text-lg font-bold text-gray-800">Balance Sheet</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Snapshot of assets, liabilities, and equity at a specific point in time. Shows
                financial position.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Current & fixed assets</li>
                <li>• Liabilities overview</li>
                <li>• Owner's equity</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💵</span>
                <h3 className="text-lg font-bold text-gray-800">Cash Flow</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Monitor cash inflows and outflows from operations, investing, and financing
                activities.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Operating cash flow</li>
                <li>• Investment activities</li>
                <li>• Financing activities</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
