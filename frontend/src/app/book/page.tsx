"use client";
import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bookkeeping Services',
    booking_date: '',
    booking_time: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('bookings')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          booking_date: formData.booking_date,
          booking_time: formData.booking_time,
          notes: formData.notes,
          status: 'pending'
        }]);

      if (error) throw error;

      // Send email notification
      try {
        await fetch('/api/send-booking-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Bookkeeping Services',
        booking_date: '',
        booking_time: '',
        notes: ''
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-green-50 rounded-2xl p-8 border-2 border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
              <i className="fas fa-check"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for booking with MC Smart Bytes! I'll review your request and send you a confirmation email within 24 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Book Another Appointment
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="MC Smart Bytes" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-orange-700 transition font-medium"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Booking Form */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Consultation</h1>
            <p className="text-lg text-gray-600">
              Schedule a free consultation to discuss how I can help transform your business operations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <i className="fas fa-user text-orange-600"></i>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    placeholder="John Smith"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <i className="fas fa-envelope text-orange-600"></i>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    placeholder="john@company.com"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <i className="fas fa-phone text-orange-600"></i>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  placeholder="(123) 456-7890"
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <i className="fas fa-briefcase text-orange-600"></i>
                  Service *
                </label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  disabled={status === 'submitting'}
                >
                  <option>Bookkeeping Services</option>
                  <option>Excel Solutions</option>
                  <option>Database Conversion</option>
                  <option>Custom Consulting</option>
                  <option>General Consultation</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <i className="fas fa-calendar text-orange-600"></i>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.booking_date}
                    onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <i className="fas fa-clock text-orange-600"></i>
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.booking_time}
                    onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <i className="fas fa-comment text-orange-600"></i>
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition resize-none"
                  placeholder="Tell me about your needs or any specific questions you have..."
                  disabled={status === 'submitting'}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calendar-check mr-2"></i>
                    Request Booking
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                <i className="fas fa-info-circle text-orange-700 mr-2"></i>
                You will receive a confirmation email within 24 hours
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
