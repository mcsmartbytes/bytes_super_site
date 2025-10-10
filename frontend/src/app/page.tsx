"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCardHover = (index: number) => {
    if (!flippedCards.has(index)) {
      setFlippedCards(prev => new Set([...prev, index]));
    }
  };

  const services = [
    {
      title: 'Bookkeeping Services',
      description: 'Professional monthly bookkeeping to keep your finances organized and tax-ready year-round.',
      icon: 'fas fa-calculator',
      features: [
        'Monthly reconciliation',
        'Financial reporting',
        'Tax preparation support',
        'QuickBooks setup & training'
      ],
      pricing: '$75/hour',
      priceNote: 'Most clients: 4-8 hours/month',
      premium: true
    },
    {
      title: 'Excel Solutions',
      description: 'Expert Excel fixes, custom formulas, macros, and spreadsheet automation.',
      icon: 'fas fa-file-excel',
      features: [
        'Formula fixes & troubleshooting',
        'Custom macros & VBA',
        'Dashboard creation',
        'Data analysis & visualization'
      ],
      pricing: '$150-250/hour',
      priceNote: 'Based on complexity'
    },
    {
      title: 'Database Conversion',
      description: 'Transform Excel spreadsheets into powerful, scalable database applications.',
      icon: 'fas fa-database',
      features: [
        'Excel to SQL migration',
        'Custom web apps',
        'Multi-user access',
        'Automated reporting'
      ],
      pricing: '$800-2,500',
      priceNote: 'Per project'
    },
    {
      title: 'Custom Consulting',
      description: 'Strategic guidance for process automation and business efficiency.',
      icon: 'fas fa-lightbulb',
      features: [
        'Process automation',
        'System integration',
        'Workflow optimization',
        'Technology recommendations'
      ],
      pricing: '$125/hour',
      priceNote: 'First consultation free'
    }
  ];

  const portfolioItems = [
    {
      title: 'Manufacturing Dashboard',
      description: 'Replaced expensive BI software with custom Excel dashboard, saving $18K annually.',
      stats: [
        { number: '87%', label: 'Cost Reduction' },
        { number: '12hrs', label: 'Time Saved/Week' }
      ],
      tags: ['Excel', 'Dashboard', 'Automation']
    },
    {
      title: 'Healthcare Bookkeeping',
      description: 'Streamlined medical practice finances, catching $45K in missed deductions.',
      stats: [
        { number: '$45K', label: 'Tax Savings' },
        { number: '20hrs', label: 'Saved/Month' }
      ],
      tags: ['Bookkeeping', 'Healthcare', 'Tax Prep']
    },
    {
      title: 'E-commerce Website',
      description: 'Built custom e-commerce site with inventory integration for growing retailer.',
      stats: [
        { number: '300%', label: 'Lead Increase' },
        { number: '$120K', label: 'Revenue/Year' }
      ],
      tags: ['Web Design', 'E-commerce', 'Integration']
    }
  ];

  const testimonials = [
    {
      quote: "I was drowning in spreadsheets and receipts. MC Smart Bytes not only organized everything but found $8,500 in missed deductions. Their bookkeeping service pays for itself!",
      author: "Jennifer Martinez",
      title: "Owner",
      company: "Martinez Consulting LLC",
      results: [
        { number: '$8,500', label: 'Tax Savings' },
        { number: '15hrs', label: 'Saved/Month' }
      ]
    },
    {
      quote: "We were quoted $12,000 for a custom software solution. MC Smart Bytes built exactly what we needed for $2,400 using smart Excel automation. Incredible value!",
      author: "David Thompson",
      title: "Operations Manager",
      company: "Thompson Manufacturing",
      results: [
        { number: '80%', label: 'Cost Savings' },
        { number: '25hrs', label: 'Saved/Week' }
      ]
    },
    {
      quote: "After trying three other bookkeepers, I finally found someone who understands small business. Responsive, accurate, and actually helps me understand my numbers.",
      author: "Sarah Chen",
      title: "Founder",
      company: "Chen Digital Agency",
      results: [
        { number: '100%', label: 'Accuracy Rate' },
        { number: '24hr', label: 'Response Time' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white border-b border-gray-200'}`}>
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="MC Smart Bytes" width={180} height={50} className="h-12 w-auto" priority />
            </div>

            <ul className="hidden md:flex items-center gap-8">
              <li><Link href="#services" className="text-gray-700 hover:text-orange-700 transition font-medium">Services</Link></li>
              <li><Link href="/services" className="text-gray-700 hover:text-orange-700 transition font-medium">Pricing</Link></li>
              <li><Link href="/blog" className="text-gray-700 hover:text-orange-700 transition font-medium">Blog</Link></li>
              <li><Link href="#about" className="text-gray-700 hover:text-orange-700 transition font-medium">About</Link></li>
              <li><Link href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold">Get Started</Link></li>
            </ul>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700 hover:text-orange-700 transition">
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <ul className="md:hidden mt-4 flex flex-col gap-4 pb-4">
              <li><Link href="#services" className="block text-gray-700 hover:text-orange-700 transition">Services</Link></li>
              <li><Link href="/services" className="block text-gray-700 hover:text-orange-700 transition">Pricing</Link></li>
              <li><Link href="/blog" className="block text-gray-700 hover:text-orange-700 transition">Blog</Link></li>
              <li><Link href="#about" className="block text-gray-700 hover:text-orange-700 transition">About</Link></li>
              <li><Link href="#contact" className="block px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl text-center">Get Started</Link></li>
            </ul>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-stone-700/90 to-neutral-900/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center"></div>

        <div className="relative z-20 container mx-auto px-6 py-32">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold mb-8 border border-white/30">
            <i className="fas fa-award"></i>
            <span>20+ Years Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-slate-700">Transform Your Business with</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700">Smart Automation</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Expert bookkeeping, Excel automation, and custom software solutions that save time and money
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">200+</div>
              <div className="text-gray-200 text-sm">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">$2M+</div>
              <div className="text-gray-200 text-sm">Client Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">15+hrs</div>
              <div className="text-gray-200 text-sm">Saved Per Week</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/book" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:shadow-2xl hover:shadow-orange-600/50 hover:-translate-y-1 transition-all duration-300 text-lg font-bold">
              Book Free Consultation <i className="fas fa-calendar-check ml-2"></i>
            </Link>
            <Link href="#contact" className="px-8 py-4 bg-white text-stone-700 border-2 border-white rounded-xl hover:bg-gray-100 transition text-lg font-semibold">
              Get Free Business Analysis
            </Link>
          </div>

          <div className="flex gap-4 justify-center flex-wrap text-gray-200 text-xs">
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur px-3 py-1 rounded-full"><i className="fas fa-check"></i> No Long-term Contracts</span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur px-3 py-1 rounded-full"><i className="fas fa-check"></i> Money-back Guarantee</span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur px-3 py-1 rounded-full"><i className="fas fa-check"></i> Free Consultation</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-2xl animate-bounce">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">OUR SERVICES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Services Designed to Save You Time & Money</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From bookkeeping to custom software, we provide solutions that actually work for small businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="relative h-[550px] perspective-1000"
                onMouseEnter={() => handleCardHover(idx)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flippedCards.has(idx) ? 'rotate-y-180' : ''}`}>
                  {/* Front of card */}
                  <div className={`absolute w-full h-full backface-hidden rounded-2xl border-2 ${service.premium ? 'border-orange-700' : 'border-gray-200'} bg-white p-8 shadow-lg`}>
                    {service.premium && (
                      <span className="absolute -top-3 right-8 bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
                    )}

                    <div className="flex items-center justify-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
                        <i className={service.icon}></i>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                    <p className="text-gray-600 text-center text-lg leading-relaxed">{service.description}</p>

                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <p className="text-sm text-gray-500 italic">Hover to see details</p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 ${service.premium ? 'border-orange-700' : 'border-gray-200'} bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{service.title}</h3>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-gray-700">
                          <i className="fas fa-check-circle text-orange-700 mr-3 text-lg"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-white rounded-xl p-4 mb-6 text-center border-2 border-blue-200">
                      <div className="text-3xl font-bold text-orange-700 mb-1">{service.pricing}</div>
                      <div className="text-sm text-gray-600">{service.priceNote}</div>
                    </div>

                    <Link href="#contact" className="block w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      Get Started <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-900 to-stone-700 rounded-2xl p-8 text-white text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-5xl">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-2">100% Satisfaction Guarantee</h4>
                <p className="text-blue-100">Not happy with the work? Get a full refund within 30 days. No questions asked.</p>
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">SUCCESS STORIES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Real Results for Real Businesses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses like yours save money and streamline operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 bg-gradient-to-br from-orange-600 to-orange-700 overflow-hidden">
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-8 text-white">
                      {item.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">{stat.number}</div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-blue-50 text-red-900 text-xs rounded-full font-medium">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from businesses we've helped
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className={`${activeTestimonial === idx ? 'block' : 'hidden'}`}
                >
                  <div className="text-5xl text-orange-700 mb-6">
                    <i className="fas fa-quote-left"></i>
                  </div>

                  <p className="text-xl text-gray-800 italic leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                      <h5 className="text-lg font-bold text-gray-900">{testimonial.author}</h5>
                      <div className="text-orange-700 font-semibold">{testimonial.title}</div>
                      <div className="text-gray-600 text-sm">{testimonial.company}</div>
                      <div className="text-orange-700 text-lg mt-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      {testimonial.results.map((result, rIdx) => (
                        <div key={rIdx} className="text-center bg-white px-4 py-3 rounded-xl min-w-[120px]">
                          <div className="text-2xl font-bold text-orange-700">{result.number}</div>
                          <div className="text-xs text-gray-600">{result.label}</div>
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
                    className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === idx ? 'bg-orange-700 w-8' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">ABOUT US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About MC Smart Bytes</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-8">
            <div className="md:col-span-2 lg:col-span-4">
              <div className="bg-gradient-to-r from-amber-900 to-stone-700 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-2xl font-bold mb-4">A Personal Approach to Business Solutions</h3>
                <p className="text-blue-100 leading-relaxed">
                  With over 20 years in bookkeeping and software development, I understand the challenges small businesses face.
                  Unlike large firms where you're just a number, you'll work directly with me on every project.
                  I take the time to understand your unique needs and deliver solutions that actually work for your business.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'fas fa-calculator',
                    title: 'Bookkeeping Expertise',
                    description: '20+ years helping businesses stay organized and tax-compliant'
                  },
                  {
                    icon: 'fas fa-laptop-code',
                    title: 'Technical Skills',
                    description: 'Expert in Excel, databases, web development, and automation'
                  },
                  {
                    icon: 'fas fa-handshake',
                    title: 'Client-Focused',
                    description: 'Direct communication, no middlemen, personalized service'
                  }
                ].map((expertise, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-orange-700 text-xl mb-4">
                      <i className={expertise.icon}></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{expertise.title}</h4>
                    <p className="text-gray-600 text-sm">{expertise.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap mt-6">
                {[
                  'QuickBooks Certified',
                  'Excel Expert',
                  'CPA Partnership',
                  'Insured & Bonded'
                ].map((credential, idx) => (
                  <span key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                    <i className="fas fa-certificate text-orange-700"></i>
                    {credential}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 lg:col-span-3">
              <div className="grid gap-6">
                {[
                  { number: '200+', label: 'Businesses Helped', desc: 'From startups to established companies' },
                  { number: '$2M+', label: 'In Client Savings', desc: 'Through efficiency and tax strategies' },
                  { number: '98%', label: 'Satisfaction Rate', desc: 'Based on client feedback' },
                  { number: '24hr', label: 'Response Time', desc: 'Usually much faster' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <div className="text-4xl font-bold text-orange-700 mb-2">{stat.number}</div>
                    <div className="font-bold text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">GET IN TOUCH</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's discuss how we can help streamline your business operations
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <ContactForm />

            <div className="space-y-6">
              {[
                {
                  icon: 'fas fa-envelope',
                  title: 'Email',
                  content: 'info@mcsmartbytes.com',
                  subtext: 'Response within 24 hours'
                },
                {
                  icon: 'fas fa-globe',
                  title: 'Website',
                  content: 'www.mcsmartbytes.com',
                  subtext: 'More info & resources'
                },
                {
                  icon: 'fas fa-calendar-check',
                  title: 'Availability',
                  content: 'Monday - Friday',
                  subtext: '9 AM - 6 PM EST'
                }
              ].map((contact, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center hover:border-orange-700 hover:shadow-lg transition-all">
                  <div className="text-3xl text-orange-700 mb-3">
                    <i className={contact.icon}></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{contact.title}</h4>
                  <p className="text-gray-800 font-medium mb-1">{contact.content}</p>
                  <p className="text-sm text-gray-600">{contact.subtext}</p>
                </div>
              ))}

              <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white text-center">
                <h4 className="font-bold text-xl mb-2 flex items-center justify-center gap-2">
                  <i className="fas fa-clock"></i>
                  Limited Availability
                </h4>
                <p className="text-blue-100 text-sm mb-4">
                  To ensure quality service, I limit new clients to 3-4 per month.
                </p>
                <Link href="#contact" className="inline-block px-6 py-2 bg-white text-orange-700 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Reserve Your Spot <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-stone-700 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold mb-4">MC Smart Bytes</div>
              <p className="text-blue-100 text-sm mb-4">
                Professional business solutions for your success
              </p>
              <div className="flex gap-2 flex-wrap">
                {['QuickBooks', 'Excel', 'CPA Partner'].map((badge, idx) => (
                  <span key={idx} className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs">
                    <i className="fas fa-certificate"></i>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li><Link href="#services" className="hover:text-white transition">Bookkeeping</Link></li>
                <li><Link href="#services" className="hover:text-white transition">Excel Solutions</Link></li>
                <li><Link href="#services" className="hover:text-white transition">Database Conversion</Link></li>
                <li><Link href="#services" className="hover:text-white transition">Custom Consulting</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li><Link href="#portfolio" className="hover:text-white transition">Case Studies</Link></li>
                <li><Link href="#testimonials" className="hover:text-white transition">Client Reviews</Link></li>
                <li><Link href="#about" className="hover:text-white transition">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Get Started</h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li><Link href="#contact" className="hover:text-white transition">Free Consultation</Link></li>
                <li><Link href="#contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100 text-sm">&copy; 2025 MC Smart Bytes. All rights reserved.</p>
            <div className="flex gap-4 text-blue-100 text-sm">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              <Link href="#contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
