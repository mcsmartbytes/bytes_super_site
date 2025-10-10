"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    services: 4,
    monthlyRevenue: 0
  });

  // Mock data - replace with real Supabase queries later
  useEffect(() => {
    setStats({
      totalInquiries: 24,
      newInquiries: 5,
      services: 4,
      monthlyRevenue: 8500
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalInquiries}</p>
              <p className="text-sm text-green-600 mt-2">
                <i className="fas fa-arrow-up mr-1"></i>
                +12% this month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-envelope text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Inquiries</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.newInquiries}</p>
              <p className="text-sm text-gray-500 mt-2">Last 7 days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-bell text-blue-800 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.services}</p>
              <p className="text-sm text-gray-500 mt-2">Bookkeeping, Excel, etc.</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-briefcase text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-2">
                <i className="fas fa-arrow-up mr-1"></i>
                +8% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-dollar-sign text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <i className="fas fa-bolt text-blue-800 mr-2"></i>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/admin/inquiries" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-envelope text-blue-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View Inquiries</p>
                  <p className="text-sm text-gray-500">Check new contact form submissions</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </Link>

            <Link href="/admin/services" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-briefcase text-blue-800"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Services</p>
                  <p className="text-sm text-gray-500">Edit service details and pricing</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </Link>

            <Link href="/" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-eye text-green-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View Website</p>
                  <p className="text-sm text-gray-500">See how your site looks to visitors</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <i className="fas fa-clock text-blue-800 mr-2"></i>
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New inquiry received</p>
                <p className="text-xs text-gray-500 mt-1">From: john@example.com - Bookkeeping Services</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New inquiry received</p>
                <p className="text-xs text-gray-500 mt-1">From: sarah@company.com - Excel Solutions</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-700 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Service page updated</p>
                <p className="text-xs text-gray-500 mt-1">Database Conversion pricing updated</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Traffic Preview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          <i className="fas fa-chart-line text-blue-800 mr-2"></i>
          Website Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Page Views</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">1,247</p>
            <p className="text-xs text-green-600 mt-1">+15% vs last week</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">342</p>
            <p className="text-xs text-green-600 mt-1">+8% vs last week</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">4.2%</p>
            <p className="text-xs text-blue-800 mt-1">-2% vs last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
