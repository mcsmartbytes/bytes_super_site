"use client";
import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Bookkeeping Services',
    message: ''
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
        .from('inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;

      // Send email notification
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!emailResponse.ok) {
          console.error('Email sending failed, but form was saved');
        }
      } catch (emailError) {
        // Email failed but form was saved - still show success
        console.error('Email error:', emailError);
      }

      // Success!
      setStatus('success');
      setFormData({ name: '', email: '', service: 'Bookkeeping Services', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="md:col-span-2 bg-green-50 rounded-2xl p-8 border-2 border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
            <i className="fas fa-check"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out! I'll review your message and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-2 bg-white rounded-2xl p-8 border-2 border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send a Message</h3>

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
              <i className="fas fa-user"></i>
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:ring-2 focus:ring-orange-100 outline-none transition"
              placeholder="John Smith"
              disabled={status === 'submitting'}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
              <i className="fas fa-envelope"></i>
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:ring-2 focus:ring-orange-100 outline-none transition"
              placeholder="john@company.com"
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <i className="fas fa-briefcase"></i>
            Service Interested In *
          </label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:ring-2 focus:ring-orange-100 outline-none transition"
            disabled={status === 'submitting'}
          >
            <option>Bookkeeping Services</option>
            <option>Excel Solutions</option>
            <option>Database Conversion</option>
            <option>Custom Consulting</option>
            <option>Not Sure - Need Consultation</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <i className="fas fa-comment"></i>
            Message *
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:ring-2 focus:ring-orange-100 outline-none transition resize-none"
            placeholder="Tell me about your needs..."
            disabled={status === 'submitting'}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Sending...
            </>
          ) : (
            <>
              Send Message <i className="fas fa-paper-plane ml-2"></i>
            </>
          )}
        </button>

        <div className="text-center text-sm text-gray-600">
          <i className="fas fa-lock text-orange-600 mr-2"></i>
          Your information is secure and will never be shared
        </div>
      </form>
    </div>
  );
}
