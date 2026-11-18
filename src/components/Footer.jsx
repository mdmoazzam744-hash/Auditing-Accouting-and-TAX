import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brown-950 text-cream-200 border-t border-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-brown-950 font-bold shadow-md">
                <Building2 className="w-5 h-5 text-brown-950" />
              </div>
              <div>
                <span className="font-serif font-bold text-cream-50 text-lg block leading-tight">
                  Audit and Accouting with TAX
                </span>
                <span className="text-xs text-gold-400 uppercase tracking-widest">
                  Premier UAE Advisory
                </span>
              </div>
            </div>
            <p className="text-xs text-cream-400 leading-relaxed">
              Licensed chartered accountants, registered FTA tax agents, and independent audit assurance partners serving mainland, DIFC, ADGM, and free zone enterprises across the UAE.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gold-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Official Registered FTA Tax Agency</span>
            </div>
          </div>

          {/* Quick Pages */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">
              Website Pages
            </h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-gold-300 transition-colors">
                  Menu (Services Catalog)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition-colors">
                  Cart (Review Selections)
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-gold-300 transition-colors">
                  Checkout & Payment
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Practices */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">
              Core Practice Areas
            </h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li>• Statutory Financial & Assurance Audits</li>
              <li>• UAE Corporate Tax Registration & Returns</li>
              <li>• Federal Tax Authority (FTA) VAT Compliance</li>
              <li>• Monthly Bookkeeping & IFRS Financials</li>
              <li>• Transfer Pricing & Economic Substance (ESR)</li>
              <li>• Anti-Money Laundering (goAML/AML-CFT)</li>
            </ul>
          </div>

          {/* UAE Offices Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">
              UAE Client Offices
            </h4>
            <div className="space-y-2.5 text-xs text-cream-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Level 24, Boulevard Plaza Tower 1, Downtown Dubai, UAE</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Al Maryah Island, ADGM Square, Abu Dhabi, UAE</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>+971 4 288 9100 / +971 2 690 1200</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>advisory@auditaccountingtax.ae</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-brown-800 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-500">
          <p>© {new Date().getFullYear()} Audit and Accouting with TAX LLC. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-gold-400/80">
            <span>Prices in AED (UAE Dirhams)</span>
            <span>•</span>
            <span>5% UAE VAT Applicable</span>
            <span>•</span>
            <span>MoE & FTA Regulated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
