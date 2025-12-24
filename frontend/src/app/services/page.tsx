"use client";
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function DoneForYouPage() {
  const services = [
    {
      id: 'managed-bookkeeping',
      name: 'Managed Bookkeeping',
      icon: '📊',
      description: 'We run Books Made Easy for you. Monthly reconciliation, financial reporting, and tax-ready records without lifting a finger.',
      monthlyRate: '$500-1,500/month',
      savings: 'Save 20+ hours monthly',
      features: [
        'Monthly bank reconciliation',
        'Invoice & bill management',
        'Financial statements',
        'Tax-ready documentation',
        'Cash flow monitoring',
        'Vendor & customer management',
        'Quarterly review calls',
        'Year-end tax prep support'
      ],
      popular: true
    },
    {
      id: 'expense-management',
      name: 'Expense Management',
      icon: '🧾',
      description: 'We process and categorize all your receipts in Expenses Made Easy. You snap photos, we handle the rest.',
      monthlyRate: '$200-400/month',
      savings: 'Never lose a deduction',
      features: [
        'Receipt processing & categorization',
        'Mileage log review',
        'Missing receipt follow-up',
        'Weekly expense summary',
        'Tax category assignment',
        'Monthly expense reports',
        'Budget monitoring',
        'Sync to your bookkeeping'
      ],
      popular: false
    },
    {
      id: 'setup-training',
      name: 'Setup & Training',
      icon: '🚀',
      description: 'Get up and running in a day. We configure everything and train you or your team on the Made Easy suite.',
      monthlyRate: '$500 one-time',
      savings: 'Start right from day one',
      features: [
        'Full software setup',
        'Chart of accounts configuration',
        'Category customization',
        'Team member setup',
        'Integration configuration',
        '1-on-1 training session',
        'Video walkthrough library',
        '30-day email support'
      ],
      popular: false
    },
    {
      id: 'job-costing-support',
      name: 'Job Costing Support',
      icon: '🏗️',
      description: 'We help you track job profitability in SiteSense. Know which jobs make money before they\'re done.',
      monthlyRate: '$300-600/month',
      savings: 'Stop losing money on jobs',
      features: [
        'Job setup & configuration',
        'Time entry review',
        'Cost allocation',
        'Profitability reporting',
        'Estimate vs actual tracking',
        'Weekly job status reports',
        'Budget alerts',
        'Integration with Books Made Easy'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#8B7355] to-[#A68A6A] text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-yellow-400">★</span>
              <span className="text-white font-medium">Premium Managed Services</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 text-white leading-tight">
              <span className="bg-gradient-to-r from-[#D2691E] to-[#F4A460] bg-clip-text text-transparent">Done For You</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Focus on your trade. We'll handle your books, expenses, and job tracking
              using the same Made Easy tools — managed by experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full text-white/90 border border-white/20">
                ★ 20+ Years Experience
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full text-white/90 border border-white/20">
                ✓ 200+ Contractors Served
              </div>
              <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full text-white/90 border border-white/20">
                🛠️ Made Easy Suite Experts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-8">How Done For You Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">You Use the Apps</h3>
                <p className="text-gray-600">Snap receipts, log mileage, create invoices — the easy parts</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">We Handle the Rest</h3>
                <p className="text-gray-600">Categorization, reconciliation, reporting — the tedious parts</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">You Stay Informed</h3>
                <p className="text-gray-600">Weekly summaries, monthly reports, quarterly calls</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">Choose Your Level of Support</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mix and match services based on what you need. Start small and add more as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative border-l-4 border-[#D2691E] ${
                  service.popular ? 'ring-2 ring-[#D2691E]' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#D2691E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>

                  <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="text-3xl font-bold text-[#D2691E] mb-1">
                      {service.monthlyRate}
                    </div>
                    <div className="text-sm text-green-600 font-semibold flex items-center gap-1">
                      <span>✓</span>
                      {service.savings}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-[#D2691E] mt-1 mr-3">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#contact"
                    className={`block w-full text-center py-4 rounded-md font-bold transition-all ${
                      service.popular
                        ? 'bg-[#D2691E] text-white hover:bg-[#B8560F]'
                        : 'bg-gray-100 text-[#2c3e50] hover:bg-gray-200'
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Done For You */}
      <section className="py-20 bg-[#8B7355] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Choose Done For You?</h2>
            <p className="text-xl text-white/90 mb-12">
              You get the power of the Made Easy software suite plus expert support —
              without hiring a full-time bookkeeper.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-2">Save Money</h3>
                <p className="text-white/80">Fraction of the cost of a full-time bookkeeper</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-5xl mb-4">⏱️</div>
                <h3 className="text-2xl font-bold mb-2">Save Time</h3>
                <p className="text-white/80">20+ hours per month back in your pocket</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-2">Stay Compliant</h3>
                <p className="text-white/80">Tax-ready records, no IRS surprises</p>
              </div>
            </div>

            <Link
              href="/#contact"
              className="inline-block px-12 py-5 bg-white text-[#8B7355] rounded-md font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#D2691E]">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
                  Do I still need to use the software?
                </h3>
                <p className="text-gray-600">
                  Yes, but just the easy parts — snapping receipts, logging mileage, and creating invoices. We handle all the categorization, reconciliation, and reporting.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#D2691E]">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
                  What if I want to do it myself later?
                </h3>
                <p className="text-gray-600">
                  No problem! Your data is always in your Made Easy account. You can downgrade to self-service anytime — the software works the same either way.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#D2691E]">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
                  How do we communicate?
                </h3>
                <p className="text-gray-600">
                  We're flexible — email, phone, or video calls. You'll get weekly email summaries and can schedule calls whenever needed. Most clients do a monthly check-in call.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#D2691E]">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-3">
                  Can I bundle multiple services?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Most contractors start with Managed Bookkeeping and add Expense Management. We offer discounts for bundled services — just ask.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#D2691E]">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Offload Your Bookkeeping?</h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how Done For You can save you time and stress.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-white text-[#D2691E] rounded-md font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Schedule Free Consultation
            </Link>
            <a
              href="https://expenses-made-easy-opal.vercel.app/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-md font-bold text-lg hover:bg-white hover:text-[#D2691E] transition-all"
            >
              Try the Software First
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B7355] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            &copy; {new Date().getFullYear()} MC Smart Bytes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
