"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'MC Smart Bytes - Professional Business Website',
      category: 'web-design',
      image: '/work-example-1.png',
      description: 'Modern, responsive business website with booking system, blog, and admin panel. Built with Next.js 15, Supabase, and TailwindCSS.',
      features: [
        'Responsive design with fall color scheme',
        'Integrated booking system with email notifications',
        'Blog/resources section with CMS',
        'Admin panel for managing inquiries, bookings, and blog',
        'SEO optimized with Open Graph tags',
        'Vercel Analytics integration',
        'Mobile-first approach'
      ],
      technologies: ['Next.js 15', 'React 19', 'Supabase', 'SendGrid', 'TailwindCSS', 'TypeScript', 'Vercel'],
      liveUrl: 'https://bytes-super-site-8zwz.vercel.app',
      results: [
        'Professional online presence established',
        'Automated booking and inquiry management',
        'Blog platform for SEO and content marketing',
        'Reduced administrative time by 80%'
      ]
    },
    {
      id: 2,
      title: 'Professional Bookkeeping Dashboard',
      category: 'accounting',
      image: '/work-example-2.png',
      description: 'Full-featured accounting platform for managing multiple clients, tracking revenue, and organizing daily tasks. Industry-specific modules for logistics, construction, healthcare, and retail.',
      features: [
        'Multi-client management system',
        'Real-time revenue tracking',
        'Daily task prioritization',
        'Industry-specific workflows',
        'Financial reporting automation',
        'Secure client data management',
        'Role-based access control'
      ],
      technologies: ['Python', 'Flask', 'PostgreSQL', 'JavaScript', 'Bootstrap', 'Chart.js'],
      liveUrl: 'https://mcsmartbytes.pythonanywhere.com',
      results: [
        'Manage 10+ clients from single dashboard',
        'Automated monthly P&L reports',
        'Reduced bookkeeping time by 50%',
        'Client revenue visibility increased 100%'
      ]
    },
    {
      id: 3,
      title: 'Business Expense Tracker',
      category: 'accounting',
      image: '/logo.jpg', // Placeholder - will be updated
      description: 'Comprehensive expense tracking application with receipt management, category organization, and detailed reporting. Free tool for clients.',
      features: [
        'Easy expense entry with receipt uploads',
        'Automatic categorization',
        'Monthly/yearly reporting',
        'Export to Excel for tax preparation',
        'Multi-user support',
        'Mobile-responsive interface',
        'Cloud backup and sync'
      ],
      technologies: ['Next.js', 'Supabase', 'React', 'TailwindCSS', 'TypeScript'],
      liveUrl: 'https://expense-tracker-app.vercel.app',
      results: [
        'Free value-add for bookkeeping clients',
        'Saves 5+ hours per month per client',
        'Tax preparation time reduced 70%',
        'Client satisfaction increased'
      ]
    },
    {
      id: 4,
      title: 'Excel to Database Migration',
      category: 'database',
      image: '/logo.jpg', // Placeholder - user will provide examples
      description: 'Custom database solutions that transform complex Excel spreadsheets into robust, multi-user database systems with modern web interfaces.',
      features: [
        'Data migration from Excel to SQL database',
        'Custom web-based interface',
        'Multi-user concurrent access',
        'Advanced search and filtering',
        'Automated reporting',
        'Data validation and integrity',
        'Role-based permissions'
      ],
      technologies: ['PostgreSQL', 'MySQL', 'Next.js', 'Python', 'SQL', 'React'],
      results: [
        'Eliminated data entry errors',
        'Improved team collaboration 10x',
        'Reduced report generation time from hours to seconds',
        'Scalable solution supporting growth'
      ],
      comingSoon: true
    },
    {
      id: 5,
      title: 'Advanced Excel Automation',
      category: 'excel',
      image: '/logo.jpg', // Placeholder - user will provide examples
      description: 'Custom Excel solutions with VBA macros, Power Query, and interactive dashboards that eliminate manual data entry and streamline reporting.',
      features: [
        'Interactive dashboards with charts',
        'Automated data import from multiple sources',
        'Custom VBA macros for repetitive tasks',
        'Power Query data transformation',
        'Dynamic reporting templates',
        'Error-proof data validation',
        'Training and documentation'
      ],
      technologies: ['Excel', 'VBA', 'Power Query', 'Power Pivot', 'SQL'],
      results: [
        'Automated weekly reports (5+ hours saved)',
        'Reduced data entry errors to near zero',
        'Real-time business intelligence',
        'ROI achieved within first month'
      ],
      comingSoon: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th' },
    { id: 'web-design', name: 'Web Design', icon: 'fas fa-globe' },
    { id: 'accounting', name: 'Accounting Tools', icon: 'fas fa-calculator' },
    { id: 'excel', name: 'Excel Solutions', icon: 'fas fa-file-excel' },
    { id: 'database', name: 'Database Systems', icon: 'fas fa-database' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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
              <Link href="/services" className="text-gray-600 hover:text-orange-700 transition font-medium">Pricing</Link>
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
          <h1 className="text-5xl font-bold mb-6">Portfolio & Work Examples</h1>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Real projects, real results. See how I've helped businesses transform their operations through custom solutions.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">
              <i className="fas fa-project-diagram text-blue-400 mr-2"></i>
              50+ Projects Completed
            </div>
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">
              <i className="fas fa-users text-green-400 mr-2"></i>
              200+ Satisfied Clients
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex gap-3 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className={category.icon}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {project.comingSoon && (
                  <div className="bg-yellow-100 border-b-2 border-yellow-400 px-4 py-2 text-center">
                    <i className="fas fa-hammer text-yellow-700 mr-2"></i>
                    <span className="text-yellow-800 font-semibold">Example Screenshots Coming Soon</span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  {project.liveUrl && !project.comingSoon && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-white text-orange-700 px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      View Live
                    </a>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm">
                          <i className="fas fa-check text-orange-600 mt-1 mr-2"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="border-t pt-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <i className="fas fa-chart-line text-green-600 mr-2"></i>
                      Results Achieved:
                    </h4>
                    <ul className="space-y-2">
                      {project.results.slice(0, 2).map((result, idx) => (
                        <li key={idx} className="flex items-start text-green-700 text-sm font-medium">
                          <i className="fas fa-arrow-up mt-1 mr-2"></i>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-stone-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Custom Solution?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you need a website, accounting system, Excel automation, or database conversion, I can build a solution tailored to your business.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Schedule Free Consultation
              <i className="fas fa-calendar-check ml-2"></i>
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              View Pricing
              <i className="fas fa-dollar-sign ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
