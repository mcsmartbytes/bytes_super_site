"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bookkeeping Services',
    booking_date: '',
    booking_time: '',
    notes: '',
    status: 'confirmed' as 'pending' | 'confirmed' | 'completed' | 'cancelled'
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true })
        .order('booking_time', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBooking) {
        // Update existing booking
        const { error } = await supabase
          .from('bookings')
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service: formData.service,
            booking_date: formData.booking_date,
            booking_time: formData.booking_time,
            notes: formData.notes || null,
            status: formData.status
          })
          .eq('id', editingBooking.id);

        if (error) throw error;
      } else {
        // Create new booking
        const { error } = await supabase
          .from('bookings')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service: formData.service,
            booking_date: formData.booking_date,
            booking_time: formData.booking_time,
            notes: formData.notes || null,
            status: formData.status
          }]);

        if (error) throw error;
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Bookkeeping Services',
        booking_date: '',
        booking_time: '',
        notes: '',
        status: 'confirmed'
      });
      setShowForm(false);
      setEditingBooking(null);
      fetchBookings();
    } catch (error: any) {
      console.error('Error saving booking:', error);
      alert('Error saving booking: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setFormData({
      name: booking.name,
      email: booking.email,
      phone: booking.phone || '',
      service: booking.service,
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      notes: booking.notes || '',
      status: booking.status
    });
    setShowForm(true);
    setSelectedBooking(null);
  };

  const updateStatus = async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    ));

    try {
      await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      setBookings(bookings.filter(b => b.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-2">Manage consultation appointments</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingBooking(null);
              setSelectedBooking(null);
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: 'Bookkeeping Services',
                booking_date: '',
                booking_time: '',
                notes: '',
                status: 'confirmed'
              });
            }}
            className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition font-semibold"
          >
            <i className={`fas fa-${showForm ? 'times' : 'plus'} mr-2`}></i>
            {showForm ? 'Cancel' : 'New Booking'}
          </button>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingBooking ? 'Edit Booking' : 'Create New Booking'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Service *</label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                >
                  <option>Bookkeeping Services</option>
                  <option>Excel Solutions</option>
                  <option>Database Conversion</option>
                  <option>Web Design</option>
                  <option>Custom Consulting</option>
                  <option>General Consultation</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Time *</label>
                <input
                  type="time"
                  required
                  value={formData.booking_time}
                  onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Status *</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition resize-none"
                placeholder="Additional notes about this booking..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold"
              >
                <i className="fas fa-save mr-2"></i>
                {editingBooking ? 'Update Booking' : 'Create Booking'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBooking(null);
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 bg-white p-2 rounded-lg border border-gray-200 inline-flex flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'all' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'pending' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Pending ({bookings.filter(b => b.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'confirmed' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'completed' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Completed ({bookings.filter(b => b.status === 'completed').length})
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-md font-medium transition ${
            filter === 'cancelled' ? 'bg-orange-700 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-700 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <i className="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">When customers book consultations, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowForm(false);
                }}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedBooking?.id === booking.id ? 'border-orange-700 shadow-md' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.name}</h3>
                    <p className="text-sm text-gray-600">{booking.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <i className="fas fa-calendar mr-1 text-orange-600"></i>
                  {formatDate(booking.booking_date)}
                </p>
                <p className="text-sm text-gray-700">
                  <i className="fas fa-clock mr-1 text-orange-600"></i>
                  {formatTime(booking.booking_time)}
                </p>
              </div>
            ))}
          </div>

          {/* Booking Detail */}
          <div className="lg:col-span-2">
            {selectedBooking ? (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedBooking.name}</h2>
                    <p className="text-gray-600">{selectedBooking.email}</p>
                  </div>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => updateStatus(selectedBooking.id, e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">📅 Appointment Date</label>
                    <p className="text-gray-900 mt-1 text-lg">{formatDate(selectedBooking.booking_date)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">🕐 Appointment Time</label>
                    <p className="text-gray-900 mt-1 text-lg">{formatTime(selectedBooking.booking_time)}</p>
                  </div>

                  {selectedBooking.phone && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700">📞 Phone</label>
                      <p className="text-gray-900 mt-1">{selectedBooking.phone}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-gray-700">💼 Service</label>
                    <p className="text-gray-900 mt-1">{selectedBooking.service}</p>
                  </div>

                  {selectedBooking.notes && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700">📝 Notes</label>
                      <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedBooking.notes}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-gray-700">🗓️ Requested On</label>
                    <p className="text-gray-600 mt-1">
                      {new Date(selectedBooking.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <button
                    onClick={() => handleEdit(selectedBooking)}
                    className="block w-full text-center px-4 py-3 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition font-semibold"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit Booking
                  </button>
                  <a
                    href={`mailto:${selectedBooking.email}?subject=Re: ${selectedBooking.service} Consultation&body=Hi ${selectedBooking.name},%0D%0A%0D%0AThank you for booking a consultation with MC Smart Bytes.`}
                    className="block w-full text-center px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    <i className="fas fa-reply mr-2"></i>
                    Send Email
                  </a>
                  {selectedBooking.phone && (
                    <a
                      href={`tel:${selectedBooking.phone}`}
                      className="block w-full text-center px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      Call Client
                    </a>
                  )}
                  <button
                    onClick={() => deleteBooking(selectedBooking.id)}
                    className="block w-full text-center px-4 py-3 bg-red-50 text-red-700 border-2 border-red-200 rounded-lg hover:bg-red-100 transition font-semibold"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Delete Booking
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <i className="fas fa-hand-pointer text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a booking</h3>
                <p className="text-gray-600">Click on a booking from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
