'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SERVICES as defaultServices } from '../data/services';
import { fetchServicesFromSupabase } from '../lib/supabase';
import ServiceCard from '../components/ServiceCard';
import { 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  DollarSign,
  Scale,
  Database
} from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState(defaultServices);
  const [isSupabase, setIsSupabase] = useState(false);

  useEffect(() => {
    async function load() {
      const { services: fetched, source } = await fetchServicesFromSupabase();
      setServices(fetched);
      setIsSupabase(source === 'supabase');
    }
    load();
  }, []);

  const featuredServices = services.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brown-950 via-brown-900 to-brown-850 text-cream-50 pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gold-500/30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brown-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brown-800/80 border border-gold-500/40 text-gold-400 text-xs font-medium tracking-wide">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Ministry of Economy & FTA Accredited Tax Practice</span>
              </div>
              {isSupabase && (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                  <Database className="w-3 h-3 text-emerald-400" />
                  <span>Supabase Connected</span>
                </div>
              )}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-[1.15]">
              Audit and Accouting with <span className="gold-text-gradient">TAX</span>
            </h1>

            <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed font-sans font-light">
              Your one-stop corporate shop for statutory audits, UAE Corporate Tax (9%), FTA VAT compliance, and chartered accounting. Transparent fixed prices in AED with zero hidden retainers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/menu"
                className="px-6 py-3.5 gold-gradient text-brown-950 rounded-lg font-bold text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all flex items-center group"
              >
                Browse Services Menu
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/cart"
                className="px-6 py-3.5 bg-brown-800/90 hover:bg-brown-800 text-cream-100 border border-gold-500/30 rounded-lg font-semibold text-sm transition-all"
              >
                View Cart & Order
              </Link>
            </div>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-brown-800 text-xs text-cream-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Fixed Upfront AED Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>FTA EmaraTax Direct Submissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>IFRS & Free Zone Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Highlights Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-cream-100 rounded-2xl border-2 border-gold-500/40 p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-brown-950">
              500+
            </span>
            <span className="text-xs uppercase tracking-wider text-brown-700 font-semibold">
              Statutory Audits Completed
            </span>
          </div>
          <div className="space-y-1 border-l border-cream-300">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-gold-600">
              100%
            </span>
            <span className="text-xs uppercase tracking-wider text-brown-700 font-semibold">
              FTA Tax Filing Accuracy
            </span>
          </div>
          <div className="space-y-1 md:border-l border-cream-300">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-brown-950">
              AED 0
            </span>
            <span className="text-xs uppercase tracking-wider text-brown-700 font-semibold">
              Penalty Guarantee for Clients
            </span>
          </div>
          <div className="space-y-1 border-l border-cream-300">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-gold-600">
              15+
            </span>
            <span className="text-xs uppercase tracking-wider text-brown-700 font-semibold">
              Years UAE Professional Experience
            </span>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gold-700 text-xs uppercase font-bold tracking-widest mb-2">
              <Layers className="w-4 h-4" />
              <span>Core Service Packages</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-950">
              Popular Auditing, Accounting & TAX Solutions
            </h2>
            <p className="text-sm text-brown-700 mt-2 max-w-2xl">
              Select any package below to add directly to your cart and initiate professional advisory compliance.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center font-bold text-sm text-gold-700 hover:text-gold-800 transition"
          >
            Explore all 8 service offerings <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* The 3 Practice Pillars */}
      <section className="bg-cream-200/60 py-16 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
              Comprehensive Corporate Assurance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown-950">
              Why Companies Trust Our Advisory
            </h2>
            <p className="text-sm text-brown-700">
              Tailored specifically for UAE Mainland companies, Free Zones (DMCC, DIFC, JAFZA, DAFZA), and offshore legal entities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream-50 p-8 rounded-xl border border-cream-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-lg bg-brown-900 text-gold-400 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brown-950">
                1. Auditing & Financial Assurance
              </h3>
              <p className="text-xs sm:text-sm text-brown-700 leading-relaxed">
                Independent statutory audits in accordance with International Standards on Auditing (ISA) and IFRS. Required by UAE commercial banks, trade license renewal bodies, and mainland authorities.
              </p>
            </div>

            <div className="bg-cream-50 p-8 rounded-xl border border-cream-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-lg bg-brown-900 text-gold-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brown-950">
                2. Accounting & Financial Control
              </h3>
              <p className="text-xs sm:text-sm text-brown-700 leading-relaxed">
                Streamlined monthly bookkeeping, cloud accounting software setup, bank reconciliations, accounts payable and payroll WPS processing compliant with UAE Labour regulations.
              </p>
            </div>

            <div className="bg-cream-50 p-8 rounded-xl border border-cream-300 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-lg bg-brown-900 text-gold-400 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brown-950">
                3. UAE Corporate Tax & VAT (FTA)
              </h3>
              <p className="text-xs sm:text-sm text-brown-700 leading-relaxed">
                Registered FTA Tax Agents executing Corporate Tax return filings (9% rate & Small Business Relief), quarterly VAT 201 submissions, and transfer pricing documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brown-950 text-cream-100 rounded-2xl p-8 sm:p-12 border-2 border-gold-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
              Immediate Engagement
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
              Need Annual Audit or Corporate Tax Filing in UAE?
            </h3>
            <p className="text-sm text-cream-300 font-light">
              Add your required compliance package to your cart now. Check out securely with your company trade license info and receive prompt auditor assignment.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/menu"
              className="px-8 py-4 gold-gradient text-brown-950 font-bold uppercase tracking-wider text-sm rounded-lg hover:brightness-110 shadow-lg transition block text-center"
            >
              Order Service Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
