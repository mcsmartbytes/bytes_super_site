"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      // For now, use mock data if table doesn't exist
      setInquiries([
        {
          id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          service: 'Bookkeeping Services',
          message: 'I need help with monthly bookkeeping for my small business. Can you provide a quote?',
          status: 'new',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          service: 'Excel Solutions',
          message: 'Looking for someone to help automate our inventory tracking spreadsheet.',
          status: 'read',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          name: 'Mike Davis',
          email: 'mike@business.com',
          service: 'Database Conversion',
          message: 'We have a complex Excel system that needs to be converted to a database.',
          status: 'responded',
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'new' | 'read' | 'responded') => {
    setInquiries(inquiries.map(inq =>
      inq.id === id ? { ...inq, status } : inq
    ));

    // Update in database
    try {
      await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredInquiries = filter === 'all'
    ? inquiries
    : inquiries.filter(inq => inq.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'read': return 'bg-blue-100 text-orange-600';
      case 'responded': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
          <p className="text-gray-600 mt-2">Manage and respond to customer inquiries</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-blue-900 transition font-semibold"
        >
          <i className="fas fa-sync-alt mr-2"></i>
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 bg-white p-2 rounded-lg border border-gray-200 inline-flex">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'all' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All ({inquiries.length})
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'new' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          New ({inquiries.filter(i => i.status === 'new').length})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'read' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Read ({inquiries.filter(i => i.status === 'read').length})
        </button>
        <button
          onClick={() => setFilter('responded')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'responded' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Responded ({inquiries.filter(i => i.status === 'responded').length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-700 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading inquiries...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No inquiries found</h3>
          <p className="text-gray-600">When customers contact you, their messages will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                onClick={() => {
                  setSelectedInquiry(inquiry);
                  if (inquiry.status === 'new') {
                    updateStatus(inquiry.id, 'read');
                  }
                }}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedInquiry?.id === inquiry.id ? 'border-orange-700 shadow-md' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                    <p className="text-sm text-gray-600">{inquiry.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  <i className="fas fa-briefcase mr-1"></i>
                  {inquiry.service}
                </p>
                <p className="text-xs text-gray-400">
                  <i className="fas fa-clock mr-1"></i>
                  {formatDate(inquiry.created_at)}
                </p>
              </div>
            ))}
          </div>

          {/* Inquiry Detail */}
          <div className="lg:col-span-2">
            {selectedInquiry ? (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedInquiry.name}</h2>
                    <p className="text-gray-600">{selectedInquiry.email}</p>
                  </div>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus(selectedInquiry.id, e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Service Interested In</label>
                    <p className="text-gray-900 mt-1">{selectedInquiry.service}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Message</label>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Received</label>
                    <p className="text-gray-600 mt-1">
                      {new Date(selectedInquiry.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.service}&body=Hi ${selectedInquiry.name},%0D%0A%0D%0AThank you for your inquiry about ${selectedInquiry.service}.`}
                    className="block w-full text-center px-4 py-3 bg-orange-700 text-white rounded-lg hover:bg-blue-900 transition font-semibold"
                  >
                    <i className="fas fa-reply mr-2"></i>
                    Reply via Email
                  </a>
                  <a
                    href={`tel:${selectedInquiry.email}`}
                    className="block w-full text-center px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call Client
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <i className="fas fa-hand-pointer text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select an inquiry</h3>
                <p className="text-gray-600">Click on an inquiry from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
