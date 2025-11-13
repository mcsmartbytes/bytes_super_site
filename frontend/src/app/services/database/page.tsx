"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function DatabaseService() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why should I move from Excel to a database?",
      answer: "Excel becomes problematic with multiple users, large datasets, or complex workflows. A database provides multi-user access without conflicts, better performance with large data, automated workflows, data integrity, and scales as your business grows."
    },
    {
      question: "Will I lose my existing Excel data?",
      answer: "Not at all! I migrate all your existing data carefully. We can even keep Excel as a frontend interface if you prefer - connected to a database backend for better performance and reliability."
    },
    {
      question: "How long does a database conversion take?",
      answer: "Simple conversions take 1-2 weeks. Complex projects with custom features, automation, and integrations typically take 4-8 weeks. I'll provide a detailed timeline after reviewing your Excel file."
    },
    {
      question: "What database technology do you use?",
      answer: "I typically use PostgreSQL, MySQL, or SQL Server for traditional databases, and Supabase or Firebase for modern cloud solutions. The choice depends on your needs, budget, and existing tech stack."
    },
    {
      question: "Can you train my team to use the new system?",
      answer: "Absolutely! Training is included in every project. I provide documentation, video tutorials, and hands-on training sessions to ensure your team is comfortable with the new system."
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
              <i className="fas fa-database"></i>
              <span>Database Solutions</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Transform Excel Spreadsheets Into Powerful Databases</h1>
            <p className="text-xl text-orange-100 mb-8">
              Outgrow Excel limitations with custom database solutions. Multi-user access, better performance, automated workflows, and scalability for your growing business.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Database Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Excel migration to custom database applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-exchange-alt',
                title: 'Excel to Database Migration',
                description: 'Seamlessly migrate your spreadsheets to a robust database system'
              },
              {
                icon: 'fas fa-users',
                title: 'Multi-User Access',
                description: 'Enable your team to work simultaneously without conflicts or corruption'
              },
              {
                icon: 'fas fa-bolt',
                title: 'Performance Optimization',
                description: 'Handle large datasets with fast queries and instant results'
              },
              {
                icon: 'fas fa-cogs',
                title: 'Workflow Automation',
                description: 'Automate repetitive tasks, validations, and notifications'
              },
              {
                icon: 'fas fa-shield-alt',
                title: 'Data Integrity & Security',
                description: 'Role-based permissions, audit trails, and backup systems'
              },
              {
                icon: 'fas fa-chart-area',
                title: 'Custom Reporting',
                description: 'Real-time dashboards and reports tailored to your business'
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
                title: 'Discovery & Analysis',
                description: 'We review your Excel files, understand workflows, and identify pain points'
              },
              {
                step: '2',
                title: 'Design & Planning',
                description: 'I design the database schema, user interface, and migration strategy'
              },
              {
                step: '3',
                title: 'Build & Migrate',
                description: 'Develop the database, migrate your data, and build custom features'
              },
              {
                step: '4',
                title: 'Train & Deploy',
                description: 'Train your team, deploy the system, and provide ongoing support'
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple Migrations</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$2K</span>
                <span className="text-gray-600">-$5K</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for straightforward Excel to database conversions with basic features.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Data migration included</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Basic forms & reports</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Training & documentation</span>
                </li>
              </ul>
              <Link href="/#contact" className="block w-full py-3 bg-white text-gray-700 border-2 border-gray-300 text-center rounded-xl font-semibold hover:bg-gray-100 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border-2 border-orange-600 relative">
              <span className="absolute -top-3 right-8 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$5K</span>
                <span className="text-gray-600">-$25K+</span>
              </div>
              <p className="text-gray-600 mb-6">Full-featured database applications with custom workflows, automation, and integrations.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Custom features & automation</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>API & system integrations</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Advanced dashboards</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Ongoing support available</span>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Outgrow Excel?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation - send me your Excel file for a custom quote and migration plan
          </p>
          <Link href="/#contact" className="inline-block px-8 py-4 bg-white text-stone-900 rounded-xl hover:bg-gray-100 transition text-lg font-bold">
            Get Free Database Consultation
          </Link>
        </div>
      </section>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
