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
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/30">
                <span className="text-yellow-400">★</span>
                <span className="text-white font-medium">Built for Contractors & Trades</span>
              </div>
            </AnimatedSection>

            {/* Main Heading */}
            <AnimatedSection animation="slide-up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="text-white">The </span>
                <span className="bg-gradient-to-r from-[#D2691E] to-[#F4A460] bg-clip-text text-transparent">Made Easy</span>
                <span className="text-white"> Suite</span>
                <br />
                <span className="text-white">for Your Business</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={200}>
              <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-4xl mx-auto">
                Track expenses, manage your books, and run profitable jobs —{" "}
                <strong>all in one connected platform</strong>.
              </p>
              <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
                AI-powered receipt scanning, GPS mileage tracking, invoicing, and job costing
                built for how contractors actually work.
              </p>
            </AnimatedSection>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 max-w-4xl mx-auto">
              <AnimatedSection animation="scale-in" delay={100}>
                <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-lift">
                  <div className="text-5xl font-bold text-[#D2691E] mb-2">
                    <AnimatedCounter end={200} suffix="+" duration={2500} />
                  </div>
                  <div className="text-white font-medium">Contractors Using Made Easy</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale-in" delay={200}>
                <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-lift">
                  <div className="text-5xl font-bold text-[#D2691E] mb-2">
                    <AnimatedCounter end={2} prefix="$" suffix="M+" duration={2500} />
                  </div>
                  <div className="text-white font-medium">Tracked & Managed</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale-in" delay={300}>
                <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg hover-lift">
                  <div className="text-5xl font-bold text-[#D2691E] mb-2">
                    <AnimatedCounter end={15} suffix="+" duration={2500} />
                  </div>
                  <div className="text-white font-medium">Hours Saved Weekly</div>
                </div>
              </AnimatedSection>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://expenses-made-easy-opal.vercel.app/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D2691E] to-[#A0522D] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all animate-pulse-glow"
              >
                <span>🚀</span>
                Start Free
              </a>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2c3e50] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-md border border-gray-200"
              >
                <span>▶</span>
                See How It Works
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>✓</span>
                <span>Free Forever Tier</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>✓</span>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              Our Software Suite
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-4">
            Business Tools That Work Together
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Unlike disconnected apps, our Made Easy suite shares data automatically.
            Expenses flow to your books. Jobs track profitability in real-time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1: Expenses Made Easy */}
            <AnimatedSection animation="flip-in" delay={100}>
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-gray-100">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-[#D2691E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  AI-Powered
                </span>
              </div>
              <div className="text-4xl mb-4 text-[#D2691E]">🧾</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                Expenses Made Easy
              </h3>
              <p className="text-gray-600 mb-4">
                Snap a photo of your receipt and let AI extract all the details.
                Track mileage with GPS. Generate tax-ready reports.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">AI receipt scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">GPS mileage tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">IRS tax categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Schedule C reports</span>
                </li>
              </ul>
              <a
                href="https://expenses-made-easy-opal.vercel.app/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-[#D2691E] to-[#A0522D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Try Free →
              </a>
              </div>
            </div>
            </AnimatedSection>

            {/* Product 2: Books Made Easy */}
            <AnimatedSection animation="flip-in" delay={200}>
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border-2 border-[#D2691E]">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460]"></div>
              <div className="p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-[#D2691E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-4xl mb-4 text-[#D2691E]">📚</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                Books Made Easy
              </h3>
              <p className="text-gray-600 mb-4">
                Full accounting software without the complexity. Create invoices,
                track bills, manage customers and vendors.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Invoicing & A/R</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Bills & A/P</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Financial reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Expenses sync automatically</span>
                </li>
              </ul>
              <a
                href="https://books-made-easy-app.vercel.app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-[#D2691E] to-[#A0522D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Try Free →
              </a>
              </div>
            </div>
            </AnimatedSection>

            {/* Product 3: SiteSense */}
            <AnimatedSection animation="flip-in" delay={300}>
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-gray-100">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-[#D2691E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  For Contractors
                </span>
              </div>
              <div className="text-4xl mb-4 text-[#D2691E]">🏗️</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                SiteSense
              </h3>
              <p className="text-gray-600 mb-4">
                Know if your jobs are profitable before they're done. Track time,
                costs, and compare estimates to actuals in real-time.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Job costing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Time tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Estimate vs actual</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2691E] mt-1">✓</span>
                  <span className="text-gray-700">Profitability tracking</span>
                </li>
              </ul>
              <a
                href="https://sitesense-lilac.vercel.app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-[#D2691E] to-[#A0522D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Try Free →
              </a>
              </div>
            </div>
            </AnimatedSection>
          </div>

          {/* Integration Callout */}
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                All Your Data Flows Seamlessly
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expenses become accounting entries. Jobs track costs from receipts to profit.
                One connected platform means no more manual data entry between apps.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              Simple Pricing
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-4">
            Start Free, Upgrade When Ready
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            No credit card required. Use the free tier as long as you want.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 border border-gray-200 relative overflow-hidden">
                {/* Animated top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">Free</h3>
                <div className="text-4xl font-bold text-[#2c3e50] mb-1">$0</div>
                <div className="text-gray-500 mb-6">Forever free</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">25 expense receipts/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Basic mileage tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">5 invoices/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">1 active job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Mobile app access</span>
                  </li>
                </ul>
                <a
                  href="https://expenses-made-easy-opal.vercel.app/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center border-2 border-[#D2691E] text-[#D2691E] px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#D2691E] hover:to-[#A0522D] hover:text-white hover:border-transparent transition-all font-semibold"
                >
                  Start Free
                </a>
              </div>
            </AnimatedSection>

            {/* Pro Tier */}
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 border-2 border-[#D2691E] relative overflow-hidden">
                {/* Animated top border - always visible for popular */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460]"></div>
                <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 mt-3">
                  <span className="bg-[#D2691E] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2 mt-4">Pro</h3>
                <div className="text-4xl font-bold text-[#D2691E] mb-1">$29</div>
                <div className="text-gray-500 mb-6">per month</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Unlimited expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">AI receipt scanning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Unlimited invoices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">10 active jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Tax reports & export</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Email support</span>
                  </li>
                </ul>
                <a
                  href="https://expenses-made-easy-opal.vercel.app/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gradient-to-r from-[#D2691E] to-[#A0522D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Start Free Trial
                </a>
              </div>
            </AnimatedSection>

            {/* Business Tier */}
            <AnimatedSection animation="scale-in" delay={300}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 border border-gray-200 relative overflow-hidden">
                {/* Animated top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4A460] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">Business</h3>
                <div className="text-4xl font-bold text-[#2c3e50] mb-1">$79</div>
                <div className="text-gray-500 mb-6">per month</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Up to 5 team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Unlimited jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Advanced reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D2691E] mt-1">✓</span>
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/#contact"
                  className="block text-center border-2 border-[#D2691E] text-[#D2691E] px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#D2691E] hover:to-[#A0522D] hover:text-white hover:border-transparent transition-all font-semibold"
                >
                  Contact Sales
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Done For You Callout */}
          <AnimatedSection animation="fade-in" delay={400}>
            <div className="mt-12 bg-gradient-to-r from-[#8B7355] to-[#6B5745] text-white rounded-2xl p-10 text-center shadow-xl">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-3xl font-bold mb-4">
                Want Us to Handle It?
              </h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
                Our Done For You services let you focus on your trade while we manage your books,
                process your expenses, and keep your financials in order.
              </p>
              <Link
                href="/services"
                className="inline-block bg-white text-[#8B7355] px-8 py-4 rounded-xl hover:bg-gray-100 hover:-translate-y-0.5 transition-all font-semibold shadow-lg"
              >
                Learn About Done For You →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Free Tool Section */}
      <section id="freetool" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D2691E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              Free Calculator
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center text-[#2c3e50] mb-4">
            See Your Potential Savings
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Calculate how much time and money you could save with Expenses Made Easy
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
      <section id="about" className="py-20 bg-gray-50">
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
                Built by a Bookkeeper, For Contractors
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                After 20+ years of doing books for contractors, I kept seeing the same
                problems: receipts stuffed in glove boxes, job costs discovered too late,
                and hours wasted on disconnected spreadsheets. So I built the Made Easy suite
                to solve these problems once and for all.
              </p>

              {/* Credentials */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-3xl text-[#D2691E]">🛠️</div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2c3e50] mb-2">
                      Creator of the Made Easy Suite
                    </h3>
                    <p className="text-gray-600">
                      Built Expenses Made Easy, Books Made Easy, and SiteSense from
                      real contractor pain points
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl text-[#D2691E]">📋</div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2c3e50] mb-2">
                      Certified Bookkeeping Professional
                    </h3>
                    <p className="text-gray-600">
                      20+ years of hands-on experience with contractor financials,
                      tax preparation, and job costing
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl text-[#D2691E]">🤝</div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2c3e50] mb-2">
                      Still Available for Done For You
                    </h3>
                    <p className="text-gray-600">
                      Prefer someone else handles your books? Our managed services
                      team uses the same tools to keep your finances in order
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
          <div className="bg-gradient-to-br from-[#8B7355] to-[#6B5745] text-white p-12 rounded-2xl shadow-xl">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-3xl font-bold mb-6">My Approach</h2>
            <p className="text-lg leading-relaxed text-white/90">
              I believe every business is unique, which is why I take time to
              understand your specific challenges before recommending solutions. My
              goal isn't just to solve today's problems, but to build systems that
              scale with your growth and eliminate recurring issues.
            </p>
          </div>

          {/* Badges Below */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
              <span className="text-[#D2691E]">✓</span>
              <span className="font-semibold text-[#2c3e50]">Certified Bookkeeper</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
              <span className="text-[#D2691E]">✓</span>
              <span className="font-semibold text-[#2c3e50]">Microsoft Excel Expert</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
              <span className="text-[#D2691E]">✓</span>
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
                The Made Easy suite for contractors and small businesses
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>●</span>
                  <span>Built for Contractors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>●</span>
                  <span>20+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold text-lg mb-4">Products</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="https://expenses-made-easy-opal.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                    Expenses Made Easy
                  </a>
                </li>
                <li>
                  <a href="https://books-made-easy-app.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                    Books Made Easy
                  </a>
                </li>
                <li>
                  <a href="https://sitesense-lilac.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                    SiteSense
                  </a>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:opacity-100">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Done For You */}
            <div>
              <h4 className="font-bold text-lg mb-4">Done For You</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <Link href="/services" className="hover:opacity-100">
                    Managed Bookkeeping
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:opacity-100">
                    Expense Management
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:opacity-100">
                    Setup & Training
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
                  <a href="https://expenses-made-easy-opal.vercel.app/auth/signup" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                    Start Free Trial
                  </a>
                </li>
                <li>
                  <Link href="/#contact" className="hover:opacity-100">
                    Contact Us
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
