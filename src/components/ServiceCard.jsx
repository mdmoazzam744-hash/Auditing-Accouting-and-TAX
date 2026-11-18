'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check, Plus, Clock, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ServiceCard({ service }) {
  const { cart, addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cart.find((item) => item.id === service.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(service);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Auditing':
        return 'bg-brown-900 text-gold-300 border-gold-500/40';
      case 'Accounting':
        return 'bg-brown-800 text-cream-100 border-brown-600';
      case 'TAX':
        return 'bg-gold-500/20 text-gold-700 border-gold-600';
      default:
        return 'bg-brown-800 text-gold-400 border-brown-700';
    }
  };

  return (
    <div className="bg-cream-50 rounded-xl border border-cream-300 hover:border-gold-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Card Header & Badges */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getCategoryTheme(
              service.category
            )} uppercase tracking-wider`}
          >
            {service.category}
          </span>
          {service.popular && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded gold-gradient text-brown-950 uppercase tracking-wide">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-bold text-brown-950 mb-2 group-hover:text-gold-700 transition-colors leading-snug">
          {service.name}
        </h3>

        <div className="flex items-center text-xs text-brown-600 mb-3 space-x-2">
          <Clock className="w-3.5 h-3.5 text-gold-600" />
          <span>Timeline: {service.turnaround}</span>
          <span className="text-cream-400">•</span>
          <span className="text-gold-700 font-medium">{service.badge}</span>
        </div>

        <p className="text-xs sm:text-sm text-brown-800 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features Checklist */}
        <div className="space-y-1.5 pt-2 border-t border-cream-200">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-start text-xs text-brown-700">
              <Check className="w-3.5 h-3.5 text-gold-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer with Price and Action */}
      <div className="bg-cream-100/80 px-6 py-4 border-t border-cream-200 flex items-center justify-between">
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-brown-600 font-medium">
            Professional Fee
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-xs font-bold text-gold-700">AED</span>
            <span className="text-2xl font-serif font-black text-brown-950">
              {service.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-brown-500">+ 5% VAT</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {inCartQty > 0 && (
            <Link
              href="/cart"
              className="text-xs px-2.5 py-2 rounded border border-brown-300 text-brown-800 hover:bg-cream-200 font-medium flex items-center"
              title="View in Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1 text-gold-600" />
              ({inCartQty})
            </Link>
          )}

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center shadow-sm ${
              justAdded
                ? 'bg-green-700 text-white'
                : 'gold-gradient text-brown-950 hover:brightness-110 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 mr-1" /> Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
