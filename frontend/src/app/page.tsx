"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCardHover = (index: number) => {
    if (!flippedCards.has(index)) {
      setFlippedCards((prev) => new Set([...prev, index]));
    }
  };

  const products = [
    {
      title: "Expenses Made Easy",
      description:
        "Snap a photo of your receipt and let AI extract all the details. Track mileage with GPS. Generate tax-ready reports.",
      icon: "fas fa-receipt",
      features: [
        "AI receipt scanning",
        "GPS mileage tracking",
        "IRS tax categories",
        "Schedule C reports",
      ],
      pricing: "Free",
      priceNote: "Pro: $29/month",
      premium: true,
      link: "https://expenses-made-easy-opal.vercel.app/auth/signup",
      badge: "AI-Powered",
    },
    {
      title: "Books Made Easy",
      description:
        "Full accounting software without the complexity. Create invoices, track bills, manage customers and vendors.",
      icon: "fas fa-book",
      features: [
        "Invoicing & A/R",
        "Bills & A/P",
        "Financial reports",
        "Expenses sync automatically",
      ],
      pricing: "Free",
      priceNote: "Pro: $29/month",
      link: "https://books-made-easy-app.vercel.app/signup",
      badge: "Most Popular",
    },
    {
      title: "SiteSense",
      description:
        "Know if your jobs are profitable before they're done. Track time, costs, and compare estimates to actuals in real-time.",
      icon: "fas fa-hard-hat",
      features: [
        "Job costing",
        "Time tracking",
        "Estimate vs actual",
        "Profitability tracking",
      ],
      pricing: "Free",
      priceNote: "Pro: $29/month",
      link: "https://sitesense-lilac.vercel.app/signup",
      badge: "For Contractors",
    },
  ];

  const successStories = [
    {
      title: "HVAC Contractor",
      description:
        "Replaced shoebox of receipts with AI scanning, saving 10+ hours per month on expense tracking.",
      stats: [
        { number: "10hrs", label: "Saved/Month" },
        { number: "$3K", label: "Tax Savings" },
      ],
      tags: ["Expenses Made Easy", "Contractors"],
    },
    {
      title: "Remodeling Company",
      description:
        "Tracked job costs in real-time, discovered 2 unprofitable job types and adjusted pricing.",
      stats: [
        { number: "23%", label: "Profit Increase" },
        { number: "$45K", label: "Annual Savings" },
      ],
      tags: ["SiteSense", "Job Costing"],
    },
    {
      title: "Landscaping Business",
      description:
        "Automated invoicing and expense sync cut bookkeeping time from 8 hours to 1 hour weekly.",
      stats: [
        { number: "87%", label: "Time Saved" },
        { number: "7hrs", label: "Saved/Week" },
      ],
      tags: ["Books Made Easy", "Automation"],
    },
  ];

  const testimonials = [
    {
      quote:
        "I was drowning in receipts stuffed in my truck console. Expenses Made Easy let me snap photos on the job site and everything is organized automatically. Found $3,200 in deductions I would have missed!",
      author: "Mike Rodriguez",
      title: "Owner",
      company: "Rodriguez Electric LLC",
      results: [
        { number: "$3,200", label: "Tax Savings" },
        { number: "10hrs", label: "Saved/Month" },
      ],
    },
    {
      quote:
        "We finally know which jobs make money and which don't. SiteSense showed us our kitchen remodels were losing money - we adjusted our estimates and now they're our most profitable jobs.",
      author: "Sarah Thompson",
      title: "Operations Manager",
      company: "Thompson Remodeling",
      results: [
        { number: "23%", label: "Profit Increase" },
        { number: "Real-time", label: "Job Tracking" },
      ],
    },
    {
      quote:
        "After trying QuickBooks and hating it, Books Made Easy was refreshing. Simple enough that I actually use it, powerful enough to run my whole business.",
      author: "James Chen",
      title: "Founder",
      company: "Chen Plumbing Services",
      results: [
        { number: "7hrs", label: "Saved/Week" },
        { number: "100%", label: "On-time Invoices" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/logo.jpg"
                  alt="MC Smart Bytes"
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            <ul className="hidden md:flex items-center gap-8">
              <li>
                <Link
                  href="#products"
                  className="text-gray-700 hover:text-blue-800 transition font-medium"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-700 hover:text-blue-800 transition font-medium"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-700 hover:text-blue-800 transition font-medium"
                >
                  Done For You
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-700 hover:text-blue-800 transition font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-800 transition font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                >
                  Start Free
                </Link>
              </li>
            </ul>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-800 transition"
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}
              ></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <ul className="md:hidden mt-4 flex flex-col gap-4 pb-4">
              <li>
                <Link
                  href="#products"
                  className="block text-gray-700 hover:text-blue-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="block text-gray-700 hover:text-blue-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="block text-gray-700 hover:text-blue-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Done For You
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block text-gray-700 hover:text-blue-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-blue-800 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="block px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95 z-10"></div>
        <div className="absolute inset-0 bg-[url('/tech-background.png')] bg-cover bg-center"></div>

        <div className="relative z-20 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="text-white">Websites & Apps That</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Power Small Business Success
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                We build custom digital tools that simplify your workflow and give you
                time back — no bloated software or monthly fees.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 text-lg font-bold inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-rocket"></i>
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Right side - Device Mockups */}
            <div className="relative">
              {/* Laptop Mockup */}
              <div className="relative mx-auto max-w-lg">
                <div className="bg-gray-800 rounded-t-xl p-2 border-t-4 border-gray-700">
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  {/* Dashboard Screen */}
                  <div className="bg-slate-900 rounded-lg p-4 aspect-[16/10]">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-cyan-400 font-bold text-sm">Dashboard</div>
                      <div className="flex gap-2">
                        <div className="w-8 h-2 bg-gray-700 rounded"></div>
                        <div className="w-8 h-2 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-3 border border-cyan-500/30">
                        <div className="text-xs text-gray-400">Revenue</div>
                        <div className="text-lg font-bold text-white">$24,500</div>
                        <div className="text-xs text-green-400">+12.5%</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
                        <div className="text-xs text-gray-400">Jobs</div>
                        <div className="text-lg font-bold text-white">47</div>
                        <div className="text-xs text-green-400">+8 new</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-3 border border-orange-500/30">
                        <div className="text-xs text-gray-400">Pending</div>
                        <div className="text-lg font-bold text-white">12</div>
                        <div className="text-xs text-yellow-400">Action</div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Monthly Overview</span>
                        <span>Jan - Dec</span>
                      </div>
                      <div className="flex items-end gap-1 h-16">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t opacity-80" style={{height: `${h}%`}}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 h-4 rounded-b-xl"></div>
                <div className="bg-gray-800 h-2 mx-16 rounded-b-lg"></div>
              </div>

              {/* Tablet Mockup - positioned to overlap */}
              <div className="absolute -right-4 top-1/2 transform translate-y-[-30%] w-32 hidden md:block">
                <div className="bg-gray-800 rounded-xl p-1.5 border-2 border-gray-700 shadow-2xl">
                  <div className="bg-slate-900 rounded-lg p-2 aspect-[3/4]">
                    <div className="text-cyan-400 font-bold text-[8px] mb-1">Invoices</div>
                    <div className="space-y-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="bg-gray-800 rounded p-1.5 flex justify-between items-center">
                          <div className="w-8 h-1.5 bg-gray-600 rounded"></div>
                          <div className="w-6 h-1.5 bg-green-500/50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Mockup - positioned to overlap */}
              <div className="absolute -left-4 bottom-0 transform translate-y-[20%] w-20 hidden md:block">
                <div className="bg-gray-800 rounded-2xl p-1 border-2 border-gray-700 shadow-2xl">
                  <div className="bg-slate-900 rounded-xl p-1.5 aspect-[9/16]">
                    <div className="w-8 h-1 bg-gray-700 rounded-full mx-auto mb-1"></div>
                    <div className="text-cyan-400 font-bold text-[6px] mb-1">Expenses</div>
                    <div className="space-y-0.5">
                      {[1,2,3].map(i => (
                        <div key={i} className="bg-gray-800 rounded p-1">
                          <div className="w-6 h-1 bg-gray-600 rounded mb-0.5"></div>
                          <div className="w-4 h-1 bg-cyan-500/50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-2xl animate-bounce">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* What We Build Section */}
      <section id="what-we-build" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Smart Tools for <span className="text-cyan-400">Real-World Business Problems</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "fas fa-desktop",
                title: "Custom Websites",
                description: "Designed to convert and built to scale with you"
              },
              {
                icon: "fas fa-mobile-alt",
                title: "Simple Business Apps",
                description: "Automate tasks and streamline operations"
              },
              {
                icon: "fas fa-chart-line",
                title: "Dashboards & Reports",
                description: "Real-time insights with zero tech hassle"
              },
              {
                icon: "fas fa-link",
                title: "Integrations",
                description: "Connect your systems and eliminate double entry"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From Idea to Impact in <span className="text-cyan-400">Just 3 Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Book a Free Call",
                description: "We learn about your business goals and bottlenecks.",
                icon: "fas fa-phone-alt"
              },
              {
                step: "2",
                title: "Build Your Tool",
                description: "We design and deliver a custom app or website tailored to your needs.",
                icon: "fas fa-tools"
              },
              {
                step: "3",
                title: "Launch & Support",
                description: "You go live — and we stick around to support and improve over time.",
                icon: "fas fa-rocket"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-2xl p-8 text-center hover:border-cyan-500/50 transition-all">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 text-2xl mx-auto mb-4 mt-4">
                    <i className={item.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-cyan-500/50 text-2xl">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-calendar-alt"></i>
              Book Your Free Call
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              A Few Tools We've Built for <span className="text-cyan-400">Small Businesses</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Job Tracker", icon: "fas fa-tasks", color: "from-blue-500 to-blue-600" },
              { name: "Appointment Booker", icon: "fas fa-calendar-check", color: "from-green-500 to-emerald-600" },
              { name: "Custom CRM", icon: "fas fa-users", color: "from-purple-500 to-violet-600" },
              { name: "Invoice Portal", icon: "fas fa-file-invoice-dollar", color: "from-orange-500 to-amber-600" }
            ].map((tool, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-cyan-500/50 hover:bg-slate-800 transition-all group">
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <i className={tool.icon}></i>
                </div>
                <h3 className="text-lg font-bold text-white">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              OUR SOFTWARE SUITE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Business Tools That Work Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike disconnected apps, our Made Easy suite shares data
              automatically. Expenses flow to your books. Jobs track
              profitability in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="relative h-[520px] perspective-1000"
                onMouseEnter={() => handleCardHover(idx)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                    flippedCards.has(idx) ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute w-full h-full backface-hidden rounded-2xl border-2 ${
                      product.premium ? "border-blue-800" : "border-gray-200"
                    } bg-white p-8 shadow-lg`}
                  >
                    <span className="absolute -top-3 right-8 bg-blue-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>

                    <div className="flex items-center justify-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
                        <i className={product.icon}></i>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-center text-lg leading-relaxed">
                      {product.description}
                    </p>

                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <p className="text-sm text-gray-500 italic">
                        Hover to see details
                      </p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 ${
                      product.premium ? "border-blue-800" : "border-gray-200"
                    } bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg`}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {product.title}
                    </h3>

                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-gray-700">
                          <i className="fas fa-check-circle text-blue-800 mr-3 text-lg"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-white rounded-xl p-4 mb-6 text-center border-2 border-blue-200">
                      <div className="text-3xl font-bold text-blue-800 mb-1">
                        {product.pricing}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.priceNote}
                      </div>
                    </div>

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white text-center rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Try Free <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-5xl">
                <i className="fas fa-link"></i>
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-2">
                  All Your Data Flows Seamlessly
                </h4>
                <p className="text-blue-100">
                  Expenses become accounting entries. Jobs track costs from
                  receipts to profit. One connected platform means no more
                  manual data entry between apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Success Stories Section */}
      <section id="stories" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Results for Real Contractors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how contractors like you are saving time and making more money
              with the Made Easy suite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-700 to-blue-800 overflow-hidden">
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-8 text-white">
                      {item.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">
                            {stat.number}
                          </div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fas fa-hard-hat text-6xl text-white/30"></i>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-blue-50 text-blue-900 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              SIMPLE PRICING
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No credit card required. Use the free tier as long as you want.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-gray-500 mb-6">Forever free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">25 expense receipts/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Basic mileage tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">5 invoices/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">1 active job</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Mobile app access</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="block text-center border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-xl hover:bg-blue-800 hover:text-white transition-all font-semibold"
              >
                Start Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">Pro</h3>
              <div className="text-4xl font-bold text-blue-800 mb-1">$29</div>
              <div className="text-gray-500 mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Unlimited expenses</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">AI receipt scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Unlimited invoices</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">10 active jobs</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Tax reports & export</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Business Tier */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$79</div>
              <div className="text-gray-500 mb-6">per month</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Up to 5 team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Unlimited jobs</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Advanced reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-blue-800 mt-1"></i>
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <Link
                href="#contact"
                className="block text-center border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-xl hover:bg-blue-800 hover:text-white transition-all font-semibold"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Done For You Callout */}
          <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-10 text-center max-w-4xl mx-auto">
            <div className="text-4xl mb-4">
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3 className="text-3xl font-bold mb-4">Want Us to Handle It?</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
              Our Done For You services let you focus on your trade while we
              manage your books, process your expenses, and keep your financials
              in order.
            </p>
            <Link
              href="/services"
              className="inline-block bg-white text-slate-800 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all font-semibold shadow-lg"
            >
              Learn About Done For You <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-cyan-400">Clients Are Saying</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-8 md:p-12">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className={`${activeTestimonial === idx ? "block" : "hidden"}`}
                >
                  <div className="text-5xl text-cyan-400 mb-6">
                    <i className="fas fa-quote-left"></i>
                  </div>

                  <p className="text-xl text-gray-300 italic leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                      <h5 className="text-lg font-bold text-white">
                        {testimonial.author}
                      </h5>
                      <div className="text-cyan-400 font-semibold">
                        {testimonial.title}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.company}
                      </div>
                      <div className="text-yellow-400 text-lg mt-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      {testimonial.results.map((result, rIdx) => (
                        <div
                          key={rIdx}
                          className="text-center bg-slate-700/50 px-4 py-3 rounded-xl min-w-[120px] border border-slate-600"
                        >
                          <div className="text-2xl font-bold text-cyan-400">
                            {result.number}
                          </div>
                          <div className="text-xs text-gray-400">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeTestimonial === idx
                        ? "bg-cyan-400 w-8"
                        : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              ABOUT MC SMART BYTES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why MC Smart Bytes exists
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-8">
            <div className="md:col-span-2 lg:col-span-4">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-8">
                <p className="text-xl text-blue-100 leading-relaxed mb-6">
                  For over 20 years, bookkeeping for contractors and small businesses
                  has meant seeing the same problems over and over: great work in the
                  field, chaos in the back office.
                </p>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-times-circle text-red-400 mt-1"></i>
                    <span>Receipts in shoe boxes, glove compartments, and random photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-times-circle text-red-400 mt-1"></i>
                    <span>Spreadsheets that only one person understands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-times-circle text-red-400 mt-1"></i>
                    <span>Invoicing and job costs that never match the bank or tax return</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                <p className="text-gray-800 leading-relaxed">
                  <strong>MC Smart Bytes was started to fix that</strong> with small,
                  focused tools and websites that plug directly into your real workflow,
                  not a generic "one size fits all" system.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "fas fa-tools",
                    title: "Creator of Made Easy Suite",
                    description:
                      "Built from real contractor pain points I saw over 20 years",
                  },
                  {
                    icon: "fas fa-calculator",
                    title: "Certified Bookkeeper",
                    description:
                      "Hands-on experience with contractor financials and tax prep",
                  },
                  {
                    icon: "fas fa-hands-helping",
                    title: "Done For You Available",
                    description:
                      "Our team can manage your books using the same tools",
                  },
                ].map((expertise, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 text-xl mb-4">
                      <i className={expertise.icon}></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {expertise.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {expertise.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap mt-6">
                {[
                  "Certified Bookkeeper",
                  "Microsoft Excel Expert",
                  "QuickBooks Certified",
                  "20+ Years Experience",
                ].map((credential, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200"
                  >
                    <i className="fas fa-certificate text-blue-800"></i>
                    {credential}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-3">
              {/* Credibility Statement */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center mb-6">
                <i className="fas fa-award text-4xl mb-3"></i>
                <p className="text-lg font-semibold">
                  Over 200+ contractors and small businesses supported with cleaner
                  books, better tools, and more confident decisions.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    number: "200+",
                    label: "Businesses Supported",
                    desc: "Across trades and industries",
                  },
                  {
                    number: "20+",
                    label: "Years Experience",
                    desc: "In small business bookkeeping",
                  },
                  {
                    number: "98%",
                    label: "Satisfaction Rate",
                    desc: "Based on client feedback",
                  },
                  {
                    number: "24hr",
                    label: "Response Time",
                    desc: "For all support requests",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center"
                  >
                    <div className="text-4xl font-bold text-blue-800 mb-2">
                      {stat.number}
                    </div>
                    <div className="font-bold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? Want a demo? We're here to help.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <ContactForm />

            <div className="space-y-6">
              {[
                {
                  icon: "fas fa-envelope",
                  title: "Email",
                  content: "info@mcsmartbytes.com",
                  subtext: "Response within 24 hours",
                },
                {
                  icon: "fas fa-globe",
                  title: "Website",
                  content: "www.mcsmartbytes.com",
                  subtext: "More info & resources",
                },
                {
                  icon: "fas fa-calendar-check",
                  title: "Availability",
                  content: "Monday - Friday",
                  subtext: "9 AM - 6 PM EST",
                },
              ].map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center hover:border-blue-800 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl text-blue-800 mb-3">
                    <i className={contact.icon}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    {contact.title}
                  </h4>
                  <p className="text-gray-800 font-medium mb-1">
                    {contact.content}
                  </p>
                  <p className="text-sm text-gray-600">{contact.subtext}</p>
                </div>
              ))}

              <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-6 text-white text-center">
                <h4 className="font-bold text-xl mb-2 flex items-center justify-center gap-2">
                  <i className="fas fa-rocket"></i>
                  Start Free Today
                </h4>
                <p className="text-blue-100 text-sm mb-4">
                  No credit card required. Start tracking expenses in minutes.
                </p>
                <Link
                  href="/signup"
                  className="inline-block px-6 py-2 bg-white text-blue-800 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Get Started <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
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
              <p className="text-blue-100 text-sm mb-4">
                The Made Easy suite for contractors and small businesses
              </p>
              <div className="space-y-2 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check"></i>
                  <span>Built for Contractors</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check"></i>
                  <span>20+ Years Experience</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>
                  <a
                    href="https://expenses-made-easy-opal.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Expenses Made Easy
                  </a>
                </li>
                <li>
                  <a
                    href="https://books-made-easy-app.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Books Made Easy
                  </a>
                </li>
                <li>
                  <a
                    href="https://sitesense-lilac.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    SiteSense
                  </a>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Done For You</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>
                  <Link href="/services" className="hover:text-white transition">
                    Managed Bookkeeping
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition">
                    Expense Management
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition">
                    Setup & Training
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Get Started</h4>
              <ul className="space-y-2 text-sm text-blue-100 mb-4">
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-white transition"
                  >
                    Start Free Trial
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
              <div className="text-sm text-blue-100">
                <a
                  href="mailto:info@mcsmartbytes.com"
                  className="hover:text-white transition"
                >
                  info@mcsmartbytes.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm text-blue-100">
            <p>
              &copy; {new Date().getFullYear()} MC Smart Bytes. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
