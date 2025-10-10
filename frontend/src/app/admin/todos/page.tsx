"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Todo {
  id: string;
  title: string;
  notes: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date: string | null;
  reminder_date: string | null;
  customer_id: string | null;
  customer_name: string | null;
  customer_email: string | null;
  file_url: string | null;
  file_name: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    priority: 'medium' as const,
    status: 'pending' as const,
    due_date: '',
    reminder_date: '',
    customer_id: '',
    customer_name: '',
    customer_email: '',
  });
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTodos();
    fetchInquiries();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('id, name, email')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fileUrl = null;
      let fileName = null;

      // Upload file if selected
      if (selectedFile) {
        setUploadingFile(true);
        const fileExt = selectedFile.name.split('.').pop();
        const filePath = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('todo-attachments')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('todo-attachments')
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
        fileName = selectedFile.name;
        setUploadingFile(false);
      }

      const todoData = {
        ...formData,
        file_url: fileUrl || (editingTodo?.file_url ?? null),
        file_name: fileName || (editingTodo?.file_name ?? null),
        due_date: formData.due_date || null,
        reminder_date: formData.reminder_date || null,
        customer_id: formData.customer_id || null,
      };

      if (editingTodo) {
        const { error } = await supabase
          .from('todos')
          .update(todoData)
          .eq('id', editingTodo.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('todos')
          .insert([todoData]);

        if (error) throw error;
      }

      // Reset form
      setFormData({
        title: '',
        notes: '',
        priority: 'medium',
        status: 'pending',
        due_date: '',
        reminder_date: '',
        customer_id: '',
        customer_name: '',
        customer_email: '',
      });
      setSelectedFile(null);
      setEditingTodo(null);
      setShowForm(false);
      fetchTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
      alert('Failed to save todo');
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      notes: todo.notes || '',
      priority: todo.priority,
      status: todo.status,
      due_date: todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : '',
      reminder_date: todo.reminder_date ? new Date(todo.reminder_date).toISOString().slice(0, 16) : '',
      customer_id: todo.customer_id || '',
      customer_name: todo.customer_name || '',
      customer_email: todo.customer_email || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = e.target.value;
    const customer = inquiries.find(inq => inq.id === customerId);

    setFormData({
      ...formData,
      customer_id: customerId,
      customer_name: customer?.name || '',
      customer_email: customer?.email || '',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTodos = filter === 'all'
    ? todos
    : todos.filter(todo => todo.status === filter);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <p className="text-gray-600 mt-2">Manage tasks, reminders, and customer follow-ups</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingTodo(null);
            setFormData({
              title: '',
              notes: '',
              priority: 'medium',
              status: 'pending',
              due_date: '',
              reminder_date: '',
              customer_id: '',
              customer_name: '',
              customer_email: '',
            });
          }}
          className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold"
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'} mr-2`}></i>
          {showForm ? 'Cancel' : 'New Todo'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 bg-white p-2 rounded-lg border border-gray-200 inline-flex">
        {['all', 'pending', 'in_progress', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-md font-medium transition capitalize ${
              filter === f ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f.replace('_', ' ')} ({todos.filter(t => f === 'all' || t.status === f).length})
          </button>
        ))}
      </div>

      {/* Todo Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 border-2 border-orange-200 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {editingTodo ? 'Edit Todo' : 'Create New Todo'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                  placeholder="Todo title..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                  placeholder="Add detailed notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority *
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reminder Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.reminder_date}
                  onChange={(e) => setFormData({ ...formData, reminder_date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assign to Customer
                </label>
                <select
                  value={formData.customer_id}
                  onChange={handleCustomerChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                >
                  <option value="">No customer assigned</option>
                  {inquiries.map((inq) => (
                    <option key={inq.id} value={inq.id}>
                      {inq.name} ({inq.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attach File
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none"
                />
                {editingTodo?.file_url && !selectedFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Current file: <a href={editingTodo.file_url} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">{editingTodo.file_name}</a>
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={uploadingFile}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50"
              >
                {uploadingFile ? 'Uploading...' : (editingTodo ? 'Update Todo' : 'Create Todo')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTodo(null);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Todos List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-700 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading todos...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <i className="fas fa-tasks text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No todos found</h3>
          <p className="text-gray-600">Create your first todo to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-orange-300 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{todo.title}</h3>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(todo.status)}`}>
                      {todo.status.replace('_', ' ')}
                    </span>
                  </div>
                  {todo.notes && (
                    <p className="text-gray-600 mb-3 whitespace-pre-wrap">{todo.notes}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {todo.due_date && (
                      <span>
                        <i className="fas fa-calendar mr-2"></i>
                        Due: {new Date(todo.due_date).toLocaleString()}
                      </span>
                    )}
                    {todo.reminder_date && (
                      <span>
                        <i className="fas fa-bell mr-2"></i>
                        Reminder: {new Date(todo.reminder_date).toLocaleString()}
                      </span>
                    )}
                    {todo.customer_name && (
                      <span>
                        <i className="fas fa-user mr-2"></i>
                        {todo.customer_name}
                      </span>
                    )}
                    {todo.file_url && (
                      <a href={todo.file_url} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                        <i className="fas fa-paperclip mr-2"></i>
                        {todo.file_name}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
