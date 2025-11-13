"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function BookkeepingService() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can you fix my Excel problem?",
      answer: "Most formula fixes and simple issues can be resolved within hours. More complex projects like dashboard creation or VBA macros typically take 1-3 days depending on scope."
    },
    {
      question: "Do I need to know VBA or programming?",
      answer: "Not at all! I handle all the technical work. I'll build the solution and train you on how to use it. You don't need any programming knowledge."
    },
    {
      question: "Can you work with Google Sheets too?",
      answer: "Yes! While I specialize in Excel, I can also work with Google Sheets for most projects. Some advanced features may work differently, but I can adapt solutions for either platform."
    },
    {
      question: "What if my Excel file is really messy?",
      answer: "That's actually one of my specialties! I've cleaned up spreadsheets with years of tangled data. I'll organize, document, and optimize your file so it's easy to use and maintain."
    },
    {
      question: "Will you teach me how to maintain it?",
      answer: "Absolutely! Every solution comes with documentation and training. I want you to be self-sufficient, though I'm always available if you need ongoing support."
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
              <i className="fas fa-file-excel"></i>
              <span>Expert Excel Solutions</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Excel Fixes, Automation & Custom Solutions</h1>
            <p className="text-xl text-orange-100 mb-8">
              From formula troubleshooting to complex macros and dashboards, I solve Excel problems and automate your spreadsheets. Save hours every week with smart automation.
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
                icon: 'fas fa-wrench',
                title: 'Formula Fixes',
                description: 'Troubleshoot broken formulas and optimize calculations for better performance'
              },
              {
                icon: 'fas fa-robot',
                title: 'Macros & VBA',
                description: 'Custom automation with macros to eliminate repetitive tasks'
              },
              {
                icon: 'fas fa-chart-bar',
                title: 'Dashboard Creation',
                description: 'Interactive dashboards with charts, pivot tables, and real-time data'
              },
              {
                icon: 'fas fa-table',
                title: 'Data Cleanup',
                description: 'Clean messy data, remove duplicates, and organize spreadsheets'
              },
              {
                icon: 'fas fa-link',
                title: 'Data Integration',
                description: 'Connect Excel to databases, APIs, and other data sources'
              },
              {
                icon: 'fas fa-graduation-cap',
                title: 'Training & Support',
                description: 'Learn Excel best practices and get ongoing support'
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Fixes</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$150</span>
                <span className="text-gray-600">/hour</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for formula fixes, troubleshooting, and small improvements.</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complex Projects</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$250</span>
                <span className="text-gray-600">/hour</span>
              </div>
              <p className="text-gray-600 mb-6">For dashboards, macros, VBA automation, and complex data projects. Get a fixed-price quote.</p>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Fix Your Excel Problems?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation - send me your file and I'll provide an estimate
          </p>
          <Link href="/#contact" className="inline-block px-8 py-4 bg-white text-stone-900 rounded-xl hover:bg-gray-100 transition text-lg font-bold">
            Get Free Estimate
          </Link>
        </div>
      </section>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
