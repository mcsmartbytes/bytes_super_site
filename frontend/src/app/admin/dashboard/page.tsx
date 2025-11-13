"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Client, Task } from "@/types/database";

export default function AdminDashboard() {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksResponse, clientsResponse] = await Promise.all([
        supabase.from("tasks").select("*").order("created_at", { ascending: false }).limit(6),
        supabase.from("clients").select("*").eq("status", "active"),
      ]);

      if (tasksResponse.error) throw tasksResponse.error;
      if (clientsResponse.error) throw clientsResponse.error;

      setTasks(tasksResponse.data || []);
      setClients(clientsResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const toggleTask = async (taskId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !currentStatus })
        .eq("id", taskId);

      if (error) throw error;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const calculateMonthlyRevenue = () => {
    return clients.reduce((total, client) => total + client.monthly_fee, 0);
  };

  const priorityColors = {
    HIGH: "text-red-600 bg-red-50",
    MEDIUM: "text-orange-600 bg-orange-50",
    LOW: "text-green-600 bg-green-50",
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
          {/* Dashboard Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Dashboard
            </h3>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white"
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

          {/* Accounting Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Accounting
            </h3>
            <button
              onClick={() => toggleMenu("accounting")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span>💰</span>
                <span>Accounting Tools</span>
              </div>
              <span>{expandedMenus.includes("accounting") ? "▼" : "▶"}</span>
            </button>
          </div>

          {/* Reports Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Reports
            </h3>
            <button
              onClick={() => toggleMenu("reports")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span>📄</span>
                <span>Financial Reports</span>
              </div>
              <span>{expandedMenus.includes("reports") ? "▼" : "▶"}</span>
            </button>
          </div>

          {/* Client Management Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Client Management
            </h3>
            <button
              onClick={() => toggleMenu("clients")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span>👥</span>
                <span>Client Management</span>
              </div>
              <span>{expandedMenus.includes("clients") ? "▼" : "▶"}</span>
            </button>
          </div>

          {/* Industry Specializations Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Industry Specializations
            </h3>
            <button
              onClick={() => toggleMenu("logistics")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white text-sm"
            >
              <div className="flex items-center gap-3">
                <span>🚚</span>
                <span>Logistics & Delivery</span>
              </div>
              <span>{expandedMenus.includes("logistics") ? "▼" : "▶"}</span>
            </button>
            <button
              onClick={() => toggleMenu("construction")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white text-sm mt-1"
            >
              <div className="flex items-center gap-3">
                <span>🏗️</span>
                <span>Construction & Contracting</span>
              </div>
              <span>{expandedMenus.includes("construction") ? "▼" : "▶"}</span>
            </button>
            <button
              onClick={() => toggleMenu("healthcare")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white text-sm mt-1"
            >
              <div className="flex items-center gap-3">
                <span>🏥</span>
                <span>Healthcare & Medical</span>
              </div>
              <span>{expandedMenus.includes("healthcare") ? "▼" : "▶"}</span>
            </button>
            <button
              onClick={() => toggleMenu("retail")}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white text-sm mt-1"
            >
              <div className="flex items-center gap-3">
                <span>🛒</span>
                <span>Retail & E-commerce</span>
              </div>
              <span>{expandedMenus.includes("retail") ? "▼" : "▶"}</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Bookkeeper Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, <span className="text-[#D2691E] font-semibold">MC Smart Bytes Admin</span></span>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold">
              Logout
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Welcome Message */}
          <div className="bg-green-50 border-l-4 border-green-500 px-6 py-3 mb-6">
            <p className="text-green-800 font-medium">Welcome back, MC Smart Bytes Admin!</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-8 border border-yellow-200">
              <div className="text-center">
                {loading ? (
                  <div className="text-3xl text-gray-400">Loading...</div>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-gray-800 mb-2">{clients.length}</div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Clients</div>
                    <div className="text-xs text-green-600 mt-1">+{clients.length} this month</div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-8 border border-yellow-200">
              <div className="text-center">
                {loading ? (
                  <div className="text-3xl text-gray-400">Loading...</div>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-gray-800 mb-2">
                      ${calculateMonthlyRevenue().toFixed(0)}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Monthly Revenue</div>
                    <div className="text-xs text-green-600 mt-1">+12% growth</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Client Companies Table */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Active Client Companies</h2>
                <Link
                  href="/admin/clients"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  + Add Company
                </Link>
              </div>
              <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading clients...</div>
                ) : clients.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No clients found. <Link href="/admin/clients" className="text-[#D2691E] hover:underline">Add your first client</Link>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Industry</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transactions</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
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

            {/* Daily Tasks Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Daily Tasks</h2>
                <Link
                  href="/admin/tasks"
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  + Add
                </Link>
              </div>
              <div className="bg-white rounded-b-lg shadow-md p-6">
                {loading ? (
                  <div className="text-center text-gray-500 py-4">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    No tasks found. <Link href="/admin/tasks" className="text-[#D2691E] hover:underline">Add your first task</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map(task => (
                      <div key={task.id} className="flex items-start gap-3 group">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id, task.completed)}
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-[#D2691E] focus:ring-[#D2691E]"
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                            {task.text}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold mt-1 ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
