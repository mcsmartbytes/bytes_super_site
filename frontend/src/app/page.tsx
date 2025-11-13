"use client";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    securityAnswer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navigation />

      {/* Hero Section - Brown Background */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#8B7355] to-[#A68A6A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <AnimatedSection animation="fade-in">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <span className="text-white font-medium">⭐ 20+ Years Experience</span>
              </div>
            </AnimatedSection>

            {/* Main Heading */}
            <AnimatedSection animation="slide-up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-[#2c3e50]">Transform Your Business</span>
                <br />
                <span className="text-[#2c3e50]">with </span>
                <span className="text-[#D2691E]">Smart Automation</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={200}>
              <p className="text-xl sm:text-2xl text-white mb-4 max-w-4xl mx-auto">
                I help businesses save{" "}
                <span className="font-bold">15-40% on operational costs</span>{" "}
                through expert
              </p>
              <p className="text-xl text-white mb-8 max-w-4xl mx-auto">
                bookkeeping, Excel automation, and strategic consulting. Join 200+
                satisfied clients who've transformed their operations.
              </p>
            </AnimatedSection>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 max-w-4xl mx-auto">
              <AnimatedSection animation="scale-in" delay={100}>
                <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-lift">
                  <div className="text-5xl font-bold text-[#D2691E] mb-2">
                    <AnimatedCounter end={200} suffix="+" duration={2500} />
                  </div>
                  <div className="text-white font-medium">Clients Served</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale-in" delay={200}>
                <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-lift">
                  <div className="text-5xl font-bold text-[#D2691E] mb-2">
                    <AnimatedCounter end={2} prefix="$" suffix="M+" duration={2500} />
                  </div>
                  <div className="text-white font-medium">Cost Savings Generated</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale-in" delay={300}>
                <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-lift">
                  <div className="text-5xl font-bold text-[#D2691E] mb-2">
                    <AnimatedCounter end={15} suffix="+" duration={2500} />
                  </div>
                  <div className="text-white font-medium">Hours Saved Per Week</div>
                </div>
              </AnimatedSection>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#D2691E] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8560F] transition-colors shadow-lg"
              >
                📋 Get Free Business Analysis
              </Link>
              <Link
                href="/#testimonials"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2c3e50] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                ▶ View Success Stories
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span>24hr Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✓</span>
                <span>Certified Professional</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span>24hr Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              What I Offer
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-4">
            Professional Services That Drive Results
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Comprehensive business solutions designed to streamline operations,
            reduce costs, and accelerate growth
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Bookkeeping */}
            <AnimatedSection animation="flip-in" delay={100}>
            <div className="bg-white border-l-4 border-[#D2691E] p-8 rounded-lg shadow-md hover-lift relative">
              <div className="absolute top-4 right-4">
                <span className="bg-[#D2691E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-4xl mb-4 text-[#D2691E]">📊</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                Expert Bookkeeping Services
              </h3>
              <p className="text-gray-600 mb-4">
                Complete financial management including monthly reconciliation,
                tax preparation, and strategic financial reporting.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Monthly financial statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Tax-ready documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Cash flow analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Financial system setup</span>
                </li>
              </ul>
              <Link
                href="/services/bookkeeping"
                className="block text-center bg-[#D2691E] text-white px-6 py-3 rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
              >
                Learn More →
              </Link>
            </div>
            </AnimatedSection>

            {/* Service 2: Excel Automation */}
            <AnimatedSection animation="flip-in" delay={200}>
            <div className="bg-white border-l-4 border-[#D2691E] p-8 rounded-lg shadow-md hover-lift">
              <div className="text-4xl mb-4 text-[#D2691E]">👔</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                Excel Automation & Templates
              </h3>
              <p className="text-gray-600 mb-4">
                Custom dashboards, automated reporting systems, and advanced
                Excel solutions that eliminate manual work.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Interactive dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Automated data imports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Custom macros & formulas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Database integration</span>
                </li>
              </ul>
              <Link
                href="/services/excel"
                className="block text-center bg-[#D2691E] text-white px-6 py-3 rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
              >
                Learn More →
              </Link>
            </div>
            </AnimatedSection>

            {/* Service 3: Web Design */}
            <AnimatedSection animation="flip-in" delay={300}>
            <div className="bg-white border-l-4 border-[#D2691E] p-8 rounded-lg shadow-md hover-lift">
              <div className="text-4xl mb-4 text-[#D2691E]">🌐</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                Professional Websites
              </h3>
              <p className="text-gray-600 mb-4">
                Modern, mobile-responsive websites that convert visitors into
                customers and establish your professional presence.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Mobile-first design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">SEO optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Lead generation tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Content management</span>
                </li>
              </ul>
              <Link
                href="/services/web-design"
                className="block text-center bg-[#D2691E] text-white px-6 py-3 rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
              >
                Learn More →
              </Link>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Free Tool Section */}
      <section id="freetool" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              Free Business Tool
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-4">
            Business Expense Savings Calculator
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Discover how much you could save with professional bookkeeping and automation
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 md:flex gap-8">
            {/* Form */}
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-6">
                Tell me about your business
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📝 Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your business name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ✉️ Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@business.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💼 Business Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent">
                    <option>Select your industry</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Healthcare</option>
                    <option>Professional Services</option>
                    <option>Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-[#D2691E] text-white px-8 py-3 rounded-md hover:bg-[#B8560F] transition-colors font-semibold"
                >
                  Continue →
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="md:w-1/3 mt-8 md:mt-0 space-y-6">
              <div className="flex gap-4">
                <div className="text-3xl">📊</div>
                <div>
                  <div className="font-bold text-[#2c3e50]">Accurate Analysis</div>
                  <div className="text-sm text-gray-600">
                    Based on 20+ years of real client data
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <div className="font-bold text-[#2c3e50]">Completely Secure</div>
                  <div className="text-sm text-gray-600">
                    Your information is never shared or sold
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🎁</div>
                <div>
                  <div className="font-bold text-[#2c3e50]">No Obligation</div>
                  <div className="text-sm text-gray-600">
                    Free tool with detailed recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Right Statistics */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              About MC Smart Bytes
            </span>
          </div>

          <div className="md:flex gap-12">
            {/* Left Content */}
            <div className="md:w-2/3">
              <h2 className="text-4xl font-bold text-[#2c3e50] mb-6">
                20+ Years of Business Excellence
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                I'm dedicated to helping businesses operate more efficiently through
                smart technology solutions. With over two decades of experience in
                bookkeeping, automation, and business consulting, I've helped hundreds
                of companies reduce costs, save time, and increase profitability.
              </p>

              {/* Credentials */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-3xl text-[#D2691E]">📋</div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2c3e50] mb-2">
                      Certified Bookkeeping Professional
                    </h3>
                    <p className="text-gray-600">
                      Expert in bookkeeping systems with advanced experience in tax
                      preparation and financial analysis
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl text-[#D2691E]">⚙️</div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2c3e50] mb-2">
                      Automation Specialist
                    </h3>
                    <p className="text-gray-600">
                      Expert in Excel VBA, Power BI, and database integration for
                      workflow optimization
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl text-[#D2691E]">📈</div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2c3e50] mb-2">
                      Business Strategy Consultant
                    </h3>
                    <p className="text-gray-600">
                      Helping businesses identify inefficiencies and implement
                      solutions that drive growth
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Statistics */}
            <div className="md:w-1/3 mt-8 md:mt-0 space-y-6">
              <AnimatedSection animation="slide-in-right" delay={100}>
                <div className="bg-gradient-to-br from-[#D2691E] to-[#B8560F] text-white p-6 rounded-lg shadow-lg hover-lift">
                  <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={200} suffix="+" duration={2500} />
                  </div>
                  <div className="font-semibold">Businesses Served</div>
                  <div className="text-sm opacity-90 mt-1">Across diverse industries</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-right" delay={200}>
                <div className="bg-gradient-to-br from-[#D2691E] to-[#B8560F] text-white p-6 rounded-lg shadow-lg hover-lift">
                  <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={2} prefix="$" suffix="M+" duration={2500} />
                  </div>
                  <div className="font-semibold">Cost Savings Generated</div>
                  <div className="text-sm opacity-90 mt-1">For clients over 5 years</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-right" delay={300}>
                <div className="bg-gradient-to-br from-[#D2691E] to-[#B8560F] text-white p-6 rounded-lg shadow-lg hover-lift">
                  <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={98} suffix="%" duration={2500} />
                  </div>
                  <div className="font-semibold">Client Satisfaction</div>
                  <div className="text-sm opacity-90 mt-1">Based on project reviews</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-right" delay={400}>
                <div className="bg-gradient-to-br from-[#D2691E] to-[#B8560F] text-white p-6 rounded-lg shadow-lg hover-lift">
                  <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={24} suffix="hr" duration={2500} />
                  </div>
                  <div className="font-semibold">Response Time</div>
                  <div className="text-sm opacity-90 mt-1">For all client inquiries</div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach Section - Brown Box */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#8B7355] text-white p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6">My Approach</h2>
            <p className="text-lg leading-relaxed">
              I believe every business is unique, which is why I take time to
              understand your specific challenges before recommending solutions. My
              goal isn't just to solve today's problems, but to build systems that
              scale with your growth and eliminate recurring issues.
            </p>
          </div>

          {/* Badges Below */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2">
              <span className="text-2xl">●</span>
              <span className="font-semibold text-[#2c3e50]">Certified Bookkeeper</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2">
              <span className="text-2xl">●</span>
              <span className="font-semibold text-[#2c3e50]">Microsoft Excel Expert</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2">
              <span className="text-2xl">●</span>
              <span className="font-semibold text-[#2c3e50]">Professional Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              Get Started Today
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Let's discuss how I can help you reduce costs, save time, and increase
            efficiency
          </p>

          <div className="md:flex gap-12">
            {/* Contact Form */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ✉️ Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@business.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🏢 Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📞 Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ☑️ Service Interest
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  >
                    <option>What service interests you most?</option>
                    <option>Bookkeeping Services</option>
                    <option>Excel Automation</option>
                    <option>Website Development</option>
                    <option>Business Consulting</option>
                    <option>Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Tell me about your project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your business challenges and what you're hoping to achieve..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {/* Security Verification */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Verification
                  </label>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-lg font-medium">What is 7 × 5 ?</span>
                    <span className="bg-[#D2691E] text-white w-8 h-8 rounded-full flex items-center justify-center">
                      ?
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D2691E] focus:border-transparent"
                    value={formData.securityAnswer}
                    onChange={(e) =>
                      setFormData({ ...formData, securityAnswer: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" id="followup" />
                  <label htmlFor="followup" className="text-sm text-gray-600">
                    I agree to receive follow-up communications about my inquiry
                  </label>
                </div>

                <div className="text-sm text-green-600 flex items-center gap-2">
                  <span>🔒</span>
                  <span>Your data is encrypted before transmission for maximum security</span>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#D2691E] text-white px-8 py-4 rounded-md hover:bg-[#B8560F] transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                >
                  📧 Send Message & Get Free Quote
                </button>
              </form>
            </div>

            {/* Right Side Trust Badges */}
            <div className="md:w-1/3 mt-12 md:mt-0 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#D2691E]">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-lg text-[#2c3e50] mb-2">
                  Quick Response
                </h3>
                <p className="text-gray-600 text-sm">
                  I respond to all inquiries within 24 hours, usually much sooner.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#D2691E]">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-bold text-lg text-[#2c3e50] mb-2">
                  Free Consultation
                </h3>
                <p className="text-gray-600 text-sm">
                  30-minute strategy session to discuss your needs and explore
                  solutions.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#D2691E]">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="font-bold text-lg text-[#2c3e50] mb-2">
                  No Obligation
                </h3>
                <p className="text-gray-600 text-sm">
                  Get expert advice and recommendations with no pressure to commit.
                </p>
              </div>

              <div className="bg-[#D2691E] text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="font-bold text-lg mb-2">Limited Availability</h3>
                <p className="text-sm mb-4">
                  I only take on 3-4 new clients per month to ensure quality service.
                  Secure your spot today.
                </p>
                <button className="bg-white text-[#D2691E] px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                  📋 Start with Free Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Brown Background */}
      <footer className="bg-[#8B7355] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logo.jpg"
                  alt="MC Smart Bytes Logo"
                  width={180}
                  height={45}
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-sm opacity-90 mb-4">
                Transforming businesses through smart automation and expert
                consulting
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>●</span>
                  <span>Certified Professional</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>●</span>
                  <span>20+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <Link href="/services/bookkeeping" className="hover:opacity-100">
                    Bookkeeping
                  </Link>
                </li>
                <li>
                  <Link href="/services/excel" className="hover:opacity-100">
                    Excel Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services/web-design" className="hover:opacity-100">
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/consulting" className="hover:opacity-100">
                    Business Consulting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <Link href="/#freetool" className="hover:opacity-100">
                    Free Expense Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:opacity-100">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:opacity-100">
                    Client Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:opacity-100">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h4 className="font-bold text-lg mb-4">Get Started</h4>
              <ul className="space-y-2 text-sm opacity-90 mb-4">
                <li>
                  <Link href="/#contact" className="hover:opacity-100">
                    Free Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:opacity-100">
                    Business Analysis
                  </Link>
                </li>
              </ul>
              <div className="text-sm space-y-1">
                <div>
                  <a
                    href="mailto:info@mcsmartbytes.com"
                    className="hover:opacity-100"
                  >
                    info@mcsmartbytes.com
                  </a>
                </div>
                <div>
                  <a href="tel:1234567890" className="hover:opacity-100">
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
            <p>
              &copy; {new Date().getFullYear()} MC Smart Bytes. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
