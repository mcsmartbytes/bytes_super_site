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
        <button
          onClick={fetchBookings}
          className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition font-semibold"
        >
          <i className="fas fa-sync-alt mr-2"></i>
          Refresh
        </button>
      </div>

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
                onClick={() => setSelectedBooking(booking)}
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
                  <a
                    href={`mailto:${selectedBooking.email}?subject=Re: ${selectedBooking.service} Consultation&body=Hi ${selectedBooking.name},%0D%0A%0D%0AThank you for booking a consultation with MC Smart Bytes.`}
                    className="block w-full text-center px-4 py-3 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition font-semibold"
                  >
                    <i className="fas fa-reply mr-2"></i>
                    Send Confirmation Email
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
