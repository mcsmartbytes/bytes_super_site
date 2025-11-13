"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Task, Client } from "@/types/database";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [formData, setFormData] = useState({
    text: "",
    priority: "MEDIUM" as const,
    client_id: "",
    due_date: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksResponse, clientsResponse] = await Promise.all([
        supabase.from("tasks").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("id, company_name").eq("status", "active"),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("tasks").insert([
        {
          ...formData,
          completed: false,
          client_id: formData.client_id || null,
          due_date: formData.due_date || null,
        },
      ]);

      if (error) throw error;

      setShowAddModal(false);
      setFormData({
        text: "",
        priority: "MEDIUM",
        client_id: "",
        due_date: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
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

  const deleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const priorityColors = {
    HIGH: "text-red-600 bg-red-50 border-red-200",
    MEDIUM: "text-orange-600 bg-orange-50 border-orange-200",
    LOW: "text-green-600 bg-green-50 border-green-200",
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterPriority !== "ALL" && task.priority !== filterPriority) return false;
    if (filterStatus === "COMPLETED" && !task.completed) return false;
    if (filterStatus === "PENDING" && task.completed) return false;
    return true;
  });

  const getClientName = (clientId: string | undefined) => {
    if (!clientId) return "General";
    const client = clients.find((c) => c.id === clientId);
    return client?.company_name || "Unknown";
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
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white"
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
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
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
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="ALL">All Tasks</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-semibold"
              >
                + Add Task
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-[#6B5745] to-[#8B7355] rounded-t-lg px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                All Tasks ({filteredTasks.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading tasks...</div>
            ) : filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No tasks found. Click "+ Add Task" to create your first task.
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id, task.completed)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D2691E] focus:ring-[#D2691E]"
                      />
                      <div className="flex-1">
                        <p
                          className={`text-base font-medium ${
                            task.completed ? "line-through text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {task.text}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${
                              priorityColors[task.priority as keyof typeof priorityColors]
                            }`}
                          >
                            {task.priority}
                          </span>
                          {task.client_id && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                              {getClientName(task.client_id)}
                            </span>
                          )}
                          {task.due_date && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                              Due: {new Date(task.due_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                    placeholder="Enter task description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as "HIGH" | "MEDIUM" | "LOW",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Client (Optional)
                  </label>
                  <select
                    value={formData.client_id}
                    onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="">General Task</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
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
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
