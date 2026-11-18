'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discountPercent,
    discountCode,
    discountAmount,
    vatAmount,
    grandTotal,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback(res);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-cream-200 border-2 border-gold-500/30 flex items-center justify-center text-brown-800">
          <ShoppingBag className="w-10 h-10 text-gold-600" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-brown-950">
            Your Engagement Cart is Empty
          </h1>
          <p className="text-sm text-brown-600 max-w-md mx-auto">
            You have not selected any Auditing, Accounting or TAX advisory services yet. Browse our menu to configure your engagement.
          </p>
        </div>
        <div>
          <Link
            href="/menu"
            className="inline-flex items-center px-6 py-3.5 gold-gradient text-brown-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:brightness-110 transition"
          >
            Explore Services Menu <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-300 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-700">
            <ShoppingBag className="w-4 h-4" />
            <span>Review Engagement</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-950 mt-1">
            Your Service <span className="gold-text-gradient">Cart</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/menu"
            className="text-xs font-semibold text-brown-700 hover:text-gold-700 flex items-center transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Add More Services
          </Link>
          <button
            onClick={clearCart}
            className="text-xs text-red-700 hover:text-red-900 font-medium px-3 py-1.5 rounded border border-red-200 bg-red-50 hover:bg-red-100 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-cream-50 rounded-xl border border-cream-300 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold-500/40 transition"
            >
              <div className="space-y-1 sm:max-w-md">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brown-900 text-gold-300 uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span className="text-xs text-brown-600">{item.turnaround}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brown-950">
                  {item.name}
                </h3>
                <p className="text-xs text-brown-600 line-clamp-2">
                  {item.description}
                </p>
                <div className="text-xs text-gold-700 font-semibold pt-1">
                  Unit Fee: AED {item.price.toLocaleString()}
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-cream-200">
                {/* Quantity */}
                <div className="flex items-center border border-cream-300 rounded-lg bg-cream-100">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 text-brown-700 hover:text-brown-950 hover:bg-cream-200 rounded-l-lg transition"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-brown-950">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 text-brown-700 hover:text-brown-950 hover:bg-cream-200 rounded-r-lg transition"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-[10px] text-brown-500 block uppercase font-medium">Subtotal</span>
                  <span className="font-serif font-bold text-base sm:text-lg text-brown-950">
                    AED {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-brown-400 hover:text-red-700 transition"
                  title="Remove from Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Service Guarantee Note */}
          <div className="p-4 bg-cream-100 border border-gold-500/30 rounded-xl flex items-center space-x-3 text-xs text-brown-800">
            <ShieldCheck className="w-5 h-5 text-gold-600 flex-shrink-0" />
            <span>
              All services are delivered under official UAE Letters of Engagement (EL) signed by licensed audit partners.
            </span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-cream-50 rounded-xl border-2 border-gold-500/40 p-6 shadow-md space-y-6">
          <h2 className="font-serif text-xl font-bold text-brown-950 border-b border-cream-200 pb-3">
            Engagement Summary
          </h2>

          <div className="space-y-3 text-xs text-brown-800">
            <div className="flex justify-between">
              <span>Total Selected Services</span>
              <span className="font-bold text-brown-950">{totalItems} package(s)</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal (AED)</span>
              <span className="font-serif font-bold text-brown-950">AED {subtotal.toLocaleString()}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Discount ({discountCode} - {discountPercent}%)</span>
                <span>- AED {discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="flex items-center">
                UAE VAT (5%)
                <span className="ml-1 text-[10px] text-brown-500 font-normal">(FTA standard rate)</span>
              </span>
              <span className="font-serif font-bold text-brown-950">AED {vatAmount.toLocaleString()}</span>
            </div>

            <div className="border-t-2 border-dashed border-cream-300 pt-3 flex justify-between items-baseline">
              <div>
                <span className="block text-sm font-bold text-brown-950">Total Payable</span>
                <span className="text-[10px] text-brown-500 uppercase">Including 5% UAE VAT</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gold-700 mr-1">AED</span>
                <span className="font-serif text-2xl font-black text-brown-950">
                  {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyCode} className="space-y-2 pt-2 border-t border-cream-200">
            <label className="block text-xs font-medium text-brown-800">
              Have a Corporate Promo Code?
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g. UAE2026 or VIPGOLD"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-grow px-3 py-2 text-xs rounded-lg border border-cream-300 bg-cream-100 uppercase text-brown-950 placeholder-brown-400 focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-bold uppercase gold-gradient text-brown-950 rounded-lg hover:brightness-110"
              >
                Apply
              </button>
            </div>
            {promoFeedback && (
              <div
                className={`text-xs p-2 rounded flex items-center space-x-1.5 ${
                  promoFeedback.success
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {promoFeedback.success ? (
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <span>{promoFeedback.message}</span>
              </div>
            )}
            {discountPercent > 0 && (
              <div className="flex items-center justify-between text-[11px] text-green-800 pt-1">
                <span>Code {discountCode} active</span>
                <button
                  type="button"
                  onClick={removePromo}
                  className="underline text-brown-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            className="w-full py-3.5 gold-gradient text-brown-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-lg hover:brightness-110 transition flex items-center justify-center group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="text-center">
            <Link
              href="/menu"
              className="text-xs text-brown-700 hover:text-gold-700 underline transition"
            >
              Continue exploring services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
