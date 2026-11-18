'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { 
  Building2, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  CreditCard, 
  Home, 
  Layers,
  PhoneCall
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: Layers },
    { name: 'Cart', href: '/cart', icon: ShoppingBag, badge: totalItems },
    { name: 'Checkout', href: '/checkout', icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brown-950/95 backdrop-blur-md border-b border-gold-500/30 text-cream-100 shadow-lg">
      {/* Top micro banner */}
      <div className="bg-brown-900 border-b border-brown-800/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-cream-300">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-gold-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> FTA Accredited Tax Agents
            </span>
            <span className="hidden md:inline text-brown-500">|</span>
            <span className="hidden md:inline">IFRS & Commercial Companies Law Compliant</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gold-400">Currency: AED (Dirhams)</span>
            <span className="text-cream-400 hidden sm:inline">Dubai & Abu Dhabi Offices</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-lg gold-gradient flex items-center justify-center text-brown-950 font-bold shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-brown-950" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-cream-50 group-hover:text-gold-300 transition-colors">
                Audit and Accouting with TAX
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-gold-400 font-medium">
                Auditing • Accounting • UAE TAX Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brown-800 text-gold-400 border border-gold-500/40 shadow-inner'
                      : 'text-cream-200 hover:text-gold-300 hover:bg-brown-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.name}
                  {link.badge > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-bold rounded-full bg-gold-500 text-brown-950 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/menu"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider gold-gradient text-brown-950 rounded-md hover:brightness-110 transition shadow-sm font-sans"
            >
              Order Service
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/cart"
              className="relative p-2 text-cream-200 hover:text-gold-400"
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-gold-500 text-brown-950">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-cream-300 hover:text-gold-400 hover:bg-brown-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brown-900 border-b border-gold-500/30 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-brown-800 text-gold-400 border border-gold-500/40'
                    : 'text-cream-200 hover:bg-brown-850 hover:text-gold-300'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3 text-gold-400" />
                  {link.name}
                </div>
                {link.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gold-500 text-brown-950">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-brown-800">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 gold-gradient text-brown-950 font-bold rounded-md uppercase tracking-wider text-sm"
            >
              View All 8 Services
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
