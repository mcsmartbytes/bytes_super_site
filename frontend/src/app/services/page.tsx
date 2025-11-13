"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const [billingCycle, setBillingCycle] = useState<'hourly' | 'monthly'>('hourly');

  const services = [
    {
      id: 'bookkeeping',
      name: 'Expert Bookkeeping Services',
      icon: 'fas fa-chart-line',
      description: 'Complete financial management including monthly reconciliation, tax preparation, and strategic financial reporting.',
      hourlyRate: '$75/hour',
      monthlyRate: '$500-1500/month',
      savings: 'Average savings: $15,000/year',
      features: [
        'Monthly financial statements',
        'Tax-ready documentation',
        'Cash flow analysis',
        'Financial system setup',
        'Accounts payable/receivable',
        'Bank reconciliations',
        'Financial reporting',
        'QuickBooks setup & training'
      ],
      popular: true
    },
    {
      id: 'excel',
      name: 'Excel Automation & Solutions',
      icon: 'fas fa-robot',
      description: 'Custom dashboards, automated reporting systems, and advanced Excel solutions that eliminate manual work.',
      hourlyRate: '$150-250/hour',
      monthlyRate: '$1000-3000/project',
      savings: 'Save 10+ hours per week',
      features: [
        'Interactive dashboards',
        'Automated data imports',
        'Custom macros & formulas',
        'Database integration',
        'Power Query solutions',
        'VBA programming',
        'Template creation',
        'Training & support'
      ],
      popular: false
    },
    {
      id: 'database',
      name: 'Database Conversion & Design',
      icon: 'fas fa-database',
      description: 'Transform your Excel spreadsheets into robust database systems with modern interfaces and reporting.',
      hourlyRate: '$200/hour',
      monthlyRate: '$3000-10,000/project',
      savings: 'Eliminate data errors, improve efficiency 80%',
      features: [
        'Excel to database migration',
        'Custom web interfaces',
        'Automated reporting',
        'Multi-user access',
        'Data validation & security',
        'Cloud-based solutions',
        'Mobile-friendly design',
        'Ongoing support'
      ],
      popular: false
    },
    {
      id: 'webdesign',
      name: 'Professional Web Design',
      icon: 'fas fa-globe',
      description: 'Modern, mobile-responsive websites that convert visitors into customers and establish your professional presence.',
      hourlyRate: 'N/A',
      monthlyRate: '$800-2,500/site',
      savings: 'Increase leads by 300%',
      features: [
        'Mobile-first responsive design',
        'SEO optimization',
        'Lead generation tools',
        'Content management system',
        'Contact forms & booking',
        'Professional copywriting',
        'Hosting setup',
        '30-day support included'
      ],
      popular: false
    },
    {
      id: 'consulting',
      name: 'Operations Consulting',
      icon: 'fas fa-lightbulb',
      description: 'Strategic process improvement and cost optimization consulting to maximize efficiency and profitability.',
      hourlyRate: '$125/hour',
      monthlyRate: '$800-2000/month',
      savings: 'ROI typically 400%+',
      features: [
        'Process optimization',
        'Cost reduction strategies',
        'Workflow automation',
        'Performance metrics',
        'Technology recommendations',
        'Staff training',
        'Implementation support',
        'Quarterly reviews'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="MC Smart Bytes" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-orange-700 transition font-medium">Home</Link>
              <Link href="/#services" className="text-gray-600 hover:text-orange-700 transition font-medium">Services</Link>
              <Link href="/blog" className="text-gray-600 hover:text-orange-700 transition font-medium">Blog</Link>
              <Link href="/book" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold">
                Book Consultation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-orange-800 to-stone-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Services & Pricing</h1>
            <p className="text-xl text-gray-100 mb-8">
              Transparent pricing for professional business solutions. Choose the services that fit your needs and budget.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">
                <i className="fas fa-star text-yellow-400 mr-2"></i>
                20+ Years Experience
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">
                <i className="fas fa-users text-green-400 mr-2"></i>
                200+ Clients Served
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">
                <i className="fas fa-dollar-sign text-blue-400 mr-2"></i>
                $2M+ Savings Generated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 -mt-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative ${
                  service.popular ? 'ring-4 ring-orange-500 ring-offset-4' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className={`p-8 ${service.popular ? 'pt-10' : ''}`}>
                  <div className={`w-16 h-16 ${service.popular ? 'bg-gradient-to-br from-orange-500 to-orange-700' : 'bg-gradient-to-br from-stone-500 to-stone-700'} rounded-2xl flex items-center justify-center text-white text-3xl mb-6`}>
                    <i className={service.icon}></i>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="text-3xl font-bold text-orange-700 mb-1">
                      {billingCycle === 'hourly' ? service.hourlyRate : service.monthlyRate}
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      <i className="fas fa-check-circle mr-1"></i>
                      {service.savings}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <i className="fas fa-check text-orange-600 mt-1 mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/book"
                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                      service.popular
                        ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Flexible Pricing Options</h2>
          <div className="inline-flex bg-gray-100 rounded-full p-2">
            <button
              onClick={() => setBillingCycle('hourly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                billingCycle === 'hourly'
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hourly Rates
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Project/Monthly
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-stone-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Choose MC Smart Bytes?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Over 20 years of proven results helping businesses save time, reduce costs, and scale efficiently.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-2">$2M+ Saved</h3>
                <p className="text-gray-300">For clients through automation and optimization</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-2">15+ Hours</h3>
                <p className="text-gray-300">Saved per week on average per client</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-2">400% ROI</h3>
                <p className="text-gray-300">Typical return on consulting investments</p>
              </div>
            </div>

            <Link
              href="/book"
              className="inline-block px-12 py-5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Schedule Free Consultation
              <i className="fas fa-calendar-check ml-3"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <i className="fas fa-question-circle text-orange-600 mr-2"></i>
                  Do you offer free consultations?
                </h3>
                <p className="text-gray-600">
                  Yes! I offer a free 30-minute consultation to discuss your needs and determine how I can help. No obligation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <i className="fas fa-question-circle text-orange-600 mr-2"></i>
                  What's your typical turnaround time?
                </h3>
                <p className="text-gray-600">
                  Most projects are completed within 1-4 weeks depending on complexity. Bookkeeping services are ongoing monthly. I always provide realistic timelines upfront.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <i className="fas fa-question-circle text-orange-600 mr-2"></i>
                  Do you work with businesses outside your area?
                </h3>
                <p className="text-gray-600">
                  Absolutely! 90% of my clients work with me remotely. I use video calls, screen sharing, and cloud-based tools to deliver seamless service anywhere.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <i className="fas fa-question-circle text-orange-600 mr-2"></i>
                  What if I need ongoing support?
                </h3>
                <p className="text-gray-600">
                  I offer flexible retainer arrangements for ongoing support. Many clients start with a project and transition to monthly support as their needs evolve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Let's discuss how I can help you save time, reduce costs, and scale efficiently.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-white text-orange-700 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-orange-700 transition-all"
            >
              Send Message
            </Link>
          </div>
        </div>
      </section>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
