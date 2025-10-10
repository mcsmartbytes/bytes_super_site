"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function BookkeepingService() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in monthly bookkeeping services?",
      answer: "Monthly bookkeeping includes bank reconciliation, categorizing expenses and income, accounts payable/receivable management, financial reports (P&L, Balance Sheet, Cash Flow), and monthly review calls."
    },
    {
      question: "How many hours per month do most clients need?",
      answer: "Most small businesses need 4-8 hours per month. The exact time depends on transaction volume, complexity, and how organized your records are. I'll provide an accurate estimate after reviewing your needs."
    },
    {
      question: "Do you work with QuickBooks Online or Desktop?",
      answer: "Yes, I'm certified in both QuickBooks Online and Desktop. I can also work with other platforms like Xero, FreshBooks, or help you migrate to a better system."
    },
    {
      question: "Can you help with tax preparation?",
      answer: "I provide bookkeeping services that prepare your records for tax filing. While I don't file taxes myself, I partner with CPAs and can ensure your books are tax-ready and provide all necessary reports to your tax preparer."
    },
    {
      question: "What if I'm behind on my bookkeeping?",
      answer: "No problem! I offer catch-up bookkeeping services to get you current. I'll provide a quote based on the backlog, and we can set up ongoing monthly services once you're caught up."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="MC Smart Bytes" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/#services" className="text-gray-700 hover:text-orange-600 transition font-medium">Services</Link>
              <Link href="/#about" className="text-gray-700 hover:text-orange-600 transition font-medium">About</Link>
              <Link href="/#contact" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition font-semibold">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 to-stone-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <i className="fas fa-calculator"></i>
              <span>Professional Bookkeeping</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Bookkeeping Services That Keep Your Business Organized</h1>
            <p className="text-xl text-orange-100 mb-8">
              Monthly bookkeeping, financial reporting, and tax preparation support for small to medium-sized businesses. 20+ years of experience helping businesses stay organized and compliant.
            </p>
            <div className="flex gap-4">
              <Link href="/#contact" className="px-8 py-4 bg-white text-stone-900 rounded-xl hover:bg-gray-100 transition text-lg font-bold">
                Get Free Consultation
              </Link>
              <Link href="#pricing" className="px-8 py-4 bg-white/10 backdrop-blur text-white border-2 border-white rounded-xl hover:bg-white/20 transition text-lg font-semibold">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">WHAT'S INCLUDED</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Bookkeeping Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to keep your finances organized and tax-ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-check-double',
                title: 'Bank Reconciliation',
                description: 'Match and verify all bank and credit card transactions monthly'
              },
              {
                icon: 'fas fa-file-invoice-dollar',
                title: 'Expense Categorization',
                description: 'Properly categorize all expenses for accurate reporting and tax deductions'
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Financial Reports',
                description: 'Monthly P&L, Balance Sheet, and Cash Flow statements'
              },
              {
                icon: 'fas fa-receipt',
                title: 'Accounts Payable/Receivable',
                description: 'Track bills and invoices to manage cash flow effectively'
              },
              {
                icon: 'fas fa-file-alt',
                title: 'Tax Preparation Support',
                description: 'Keep records tax-ready and provide reports for your CPA'
              },
              {
                icon: 'fas fa-comments',
                title: 'Monthly Review',
                description: 'Review your financials and answer questions about your reports'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-2xl mb-4">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">HOW IT WORKS</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Straightforward Process</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Free Consultation',
                description: 'We discuss your business needs and review your current bookkeeping situation'
              },
              {
                step: '2',
                title: 'Setup & Training',
                description: 'I set up or clean up your QuickBooks and train you on best practices'
              },
              {
                step: '3',
                title: 'Monthly Service',
                description: 'Regular monthly bookkeeping, reconciliation, and financial reporting'
              },
              {
                step: '4',
                title: 'Review & Support',
                description: 'Monthly review calls and ongoing support whenever you need help'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">PRICING</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent, Affordable Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden fees, no long-term contracts
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hourly Rate</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$75</span>
                <span className="text-gray-600">/hour</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for businesses that need occasional bookkeeping help or catch-up services.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>No monthly commitment</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Pay only for time used</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Great for catch-up work</span>
                </li>
              </ul>
              <Link href="/#contact" className="block w-full py-3 bg-white text-gray-700 border-2 border-gray-300 text-center rounded-xl font-semibold hover:bg-gray-100 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border-2 border-orange-600 relative">
              <span className="absolute -top-3 right-8 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Monthly Package</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$300</span>
                <span className="text-gray-600">-$600/mo</span>
              </div>
              <p className="text-gray-600 mb-6">Fixed monthly fee based on your business size and complexity. Most clients: 4-8 hours/month.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Predictable monthly cost</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Monthly financial reports</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Cancel anytime</span>
                </li>
              </ul>
              <Link href="/#contact" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">FAQs</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <i className={`fas fa-chevron-${openFaq === idx ? 'up' : 'down'} text-orange-600`}></i>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-stone-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Your Books in Order?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation and custom quote for your business
          </p>
          <Link href="/#contact" className="inline-block px-8 py-4 bg-white text-stone-900 rounded-xl hover:bg-gray-100 transition text-lg font-bold">
            Schedule Free Consultation
          </Link>
        </div>
      </section>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
