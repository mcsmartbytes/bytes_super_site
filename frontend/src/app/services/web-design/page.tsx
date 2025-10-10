"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function WebDesignService() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "A simple 5-page business website takes 2-3 weeks. E-commerce sites and custom web applications typically take 6-12 weeks depending on features and complexity."
    },
    {
      question: "Do you provide hosting and maintenance?",
      answer: "Yes! I can handle hosting setup and provide ongoing maintenance packages. Or I can build the site and hand it off to you with full documentation if you prefer to self-manage."
    },
    {
      question: "Will my website work on mobile devices?",
      answer: "Absolutely! Every website I build is fully responsive and optimized for mobile, tablet, and desktop. Mobile-first design is standard practice."
    },
    {
      question: "Can you help with SEO and Google rankings?",
      answer: "Yes! I implement SEO best practices including proper meta tags, fast loading speeds, semantic HTML, and structured data. For ongoing SEO strategy and content optimization, I can recommend specialists."
    },
    {
      question: "What if I need changes after the site is live?",
      answer: "I provide training so you can make simple content updates yourself. For bigger changes or technical updates, I offer hourly support or monthly maintenance packages."
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
              <i className="fas fa-laptop-code"></i>
              <span>Professional Web Design</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Modern, Responsive Websites That Drive Results</h1>
            <p className="text-xl text-orange-100 mb-8">
              Custom website design and development for businesses ready to grow. From simple landing pages to complex web applications - built with modern tech, optimized for performance and conversions.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Full-Service Web Development</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a professional online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-palette',
                title: 'Custom Design',
                description: 'Unique, branded designs that reflect your business personality'
              },
              {
                icon: 'fas fa-mobile-alt',
                title: 'Responsive Layout',
                description: 'Perfect display on all devices - mobile, tablet, and desktop'
              },
              {
                icon: 'fas fa-rocket',
                title: 'Performance Optimized',
                description: 'Fast loading speeds for better user experience and SEO'
              },
              {
                icon: 'fas fa-search',
                title: 'SEO Foundation',
                description: 'Built-in SEO best practices to help you rank on Google'
              },
              {
                icon: 'fas fa-shopping-cart',
                title: 'E-commerce Ready',
                description: 'Online store setup with payment processing and inventory'
              },
              {
                icon: 'fas fa-life-ring',
                title: 'Training & Support',
                description: 'Learn to manage your site plus ongoing support options'
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
                title: 'Discovery Call',
                description: 'Understand your goals, target audience, and design preferences'
              },
              {
                step: '2',
                title: 'Design & Mockups',
                description: 'Create wireframes and visual designs for your approval'
              },
              {
                step: '3',
                title: 'Development',
                description: 'Build the site with modern tech, test thoroughly, and optimize'
              },
              {
                step: '4',
                title: 'Launch & Train',
                description: 'Deploy to production, train you on management, provide support'
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Website</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$3K</span>
                <span className="text-gray-600">-$8K</span>
              </div>
              <p className="text-gray-600 mb-6">Professional business website with up to 10 pages, contact forms, and content management.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Custom design & branding</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Mobile responsive</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>SEO optimized</span>
                </li>
              </ul>
              <Link href="/#contact" className="block w-full py-3 bg-white text-gray-700 border-2 border-gray-300 text-center rounded-xl font-semibold hover:bg-gray-100 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border-2 border-orange-600 relative">
              <span className="absolute -top-3 right-8 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">E-commerce / Web App</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$8K</span>
                <span className="text-gray-600">-$30K+</span>
              </div>
              <p className="text-gray-600 mb-6">Full-featured online store or custom web application with advanced functionality.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Shopping cart & payments</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>User accounts & dashboards</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Custom features & integrations</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <i className="fas fa-check text-orange-600 mr-3"></i>
                  <span>Ongoing maintenance available</span>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Online Presence?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation and custom quote for your website or web application
          </p>
          <Link href="/#contact" className="inline-block px-8 py-4 bg-white text-stone-900 rounded-xl hover:bg-gray-100 transition text-lg font-bold">
            Start Your Project Today
          </Link>
        </div>
      </section>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
