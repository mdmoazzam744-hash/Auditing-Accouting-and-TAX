'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES as defaultServices } from '../../data/services';
import { fetchServicesFromSupabase } from '../../lib/supabase';
import ServiceCard from '../../components/ServiceCard';
import { Search, Filter, Layers, CheckCircle2, ShoppingBag, Database, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function MenuPage() {
  const [services, setServices] = useState(defaultServices);
  const [dataSource, setDataSource] = useState('loading');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const { totalItems, grandTotal } = useCart();

  const loadServices = async () => {
    setDataSource('loading');
    const { services: fetched, source } = await fetchServicesFromSupabase();
    setServices(fetched);
    setDataSource(source);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const categories = ['All', 'Auditing', 'Accounting', 'TAX'];

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchesCategory =
          selectedCategory === 'All' || service.category === selectedCategory;
        const matchesSearch =
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (service.badge && service.badge.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [services, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header Banner */}
      <div className="bg-brown-950 text-cream-50 rounded-2xl p-8 sm:p-12 border-2 border-gold-500/30 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brown-900 border border-gold-500/40 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Complete UAE Advisory Menu</span>
            </div>

            {/* Supabase Status Indicator */}
            <div
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                dataSource === 'supabase'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : dataSource === 'loading'
                  ? 'bg-brown-900 text-gold-300 border-gold-500/30 animate-pulse'
                  : 'bg-brown-900 text-cream-300 border-brown-700'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-gold-400" />
              <span>
                {dataSource === 'supabase'
                  ? '⚡ Live Supabase Menu'
                  : dataSource === 'loading'
                  ? 'Connecting to Supabase...'
                  : '📁 Local Catalog (Run SQL to sync)'}
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream-50">
            Services <span className="gold-text-gradient">Menu</span> & Catalog
          </h1>

          <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
            Select from our 8 signature Auditing, Accounting, and TAX advisory solutions loaded directly from your Supabase database. All engagements include dedicated UAE certified auditors, direct FTA filing, and transparent AED pricing.
          </p>
        </div>

        {/* Floating Quick Cart preview in header if items added */}
        {totalItems > 0 && (
          <div className="mt-6 pt-6 border-t border-brown-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-cream-200 text-sm">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <span>
                You have <strong className="text-gold-400 font-bold">{totalItems}</strong> service package{totalItems > 1 ? 's' : ''} in your cart
              </span>
              <span className="text-brown-500">•</span>
              <span className="font-serif font-bold text-cream-50">
                Total: AED {grandTotal.toLocaleString()}
              </span>
            </div>
            <Link
              href="/cart"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider gold-gradient text-brown-950 rounded-lg hover:brightness-110 shadow"
            >
              Review Cart & Checkout →
            </Link>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-cream-100 rounded-xl p-4 sm:p-6 border border-cream-300 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-brown-950 text-gold-400 border border-gold-500/50 shadow'
                    : 'bg-cream-50 text-brown-800 hover:bg-cream-200 border border-cream-300'
                }`}
              >
                {cat === 'All' ? 'All 8 Services' : cat}
              </button>
            ))}
          </div>

          {/* Search Input & Sort & Refresh */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-4 h-4 text-brown-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit, tax, vat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-cream-300 bg-cream-50 text-brown-950 placeholder-brown-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-cream-300 bg-cream-50 text-brown-950 focus:outline-none focus:border-gold-500"
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={loadServices}
              className="px-3 py-2 rounded-lg border border-cream-300 bg-cream-50 hover:bg-cream-200 text-brown-800 text-xs font-medium flex items-center justify-center transition"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${dataSource === 'loading' ? 'animate-spin' : ''}`} />
              Sync
            </button>
          </div>
        </div>

        {/* Active Filter Summary */}
        <div className="flex items-center justify-between text-xs text-brown-600 pt-2 border-t border-cream-200">
          <span>
            Showing <strong>{filteredServices.length}</strong> services
          </span>
          <span className="text-gold-700 font-medium">All fees in UAE Dirhams (AED)</span>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream-100 rounded-xl border border-cream-300 p-8 space-y-4">
          <p className="text-base text-brown-700">No services match your search or filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-bold gold-gradient text-brown-950 rounded-lg uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Guarantee Notice */}
      <div className="p-6 bg-brown-900 rounded-xl text-cream-200 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <span>
            <strong>Our Commitment:</strong> Every engagement is assigned a licensed UAE Certified Public Accountant (CPA) and registered FTA Tax Agent.
          </span>
        </div>
        <Link
          href="/cart"
          className="px-4 py-2 gold-gradient text-brown-950 font-bold uppercase rounded text-[11px] whitespace-nowrap hover:brightness-110"
        >
          Proceed to Cart
        </Link>
      </div>
    </div>
  );
}
