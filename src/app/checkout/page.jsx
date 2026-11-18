'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { UAE_EMIRATES } from '../../data/services';
import { saveOrderToSupabase } from '../../lib/supabase';
import { 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle, 
  Printer, 
  ArrowLeft, 
  Lock, 
  FileText,
  AlertCircle,
  Database
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    totalItems,
    subtotal,
    discountCode,
    discountAmount,
    discountPercent,
    vatAmount,
    grandTotal,
  } = useCart();

  const [formData, setFormData] = useState({
    companyName: 'Apex Gulf Holdings LLC',
    tradeLicenseNo: 'CN-894201',
    trn: '100482910300003',
    jurisdiction: 'Dubai',
    entityType: 'Mainland LLC',
    contactName: 'Tariq Al Mansoori',
    jobTitle: 'Chief Financial Officer',
    email: 'cfo@apexgulf.ae',
    phone: '+971 50 123 4567',
    notes: 'Urgent annual statutory audit report required for bank credit facility renewal.',
    paymentMethod: 'bank_transfer',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [supabaseStatus, setSupabaseStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `UAE-AUD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(ref);

    const orderPayload = {
      orderReference: ref,
      ...formData,
      items: [...cart],
      subtotal,
      discountAmount,
      discountCode,
      vatAmount,
      grandTotal,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    // Save order into Supabase
    const dbResult = await saveOrderToSupabase(orderPayload);
    setSupabaseStatus(dbResult);
    setSubmittedData(orderPayload);
    setIsSubmitting(false);
    setOrderComplete(true);
    clearCart();
  };

  // If order complete, show corporate receipt view
  if (orderComplete && submittedData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-cream-50 rounded-2xl border-2 border-gold-500/40 shadow-2xl p-6 sm:p-10 space-y-8 print:border-none print:shadow-none">
          {/* Header */}
          <div className="text-center space-y-3 border-b border-cream-300 pb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Engagement Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-950">
              Audit & TAX Engagement Order Received
            </h1>
            <p className="text-xs sm:text-sm text-brown-700 max-w-lg mx-auto">
              Thank you for choosing <strong>Audit and Accouting with TAX</strong>. Your engagement has been logged with our senior audit partner desk.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-brown-950 text-gold-400 font-mono text-sm font-bold border border-gold-500/40">
              Order Ref: {orderReference}
            </div>

            {/* Supabase Storage Badge */}
            <div className="pt-2">
              {supabaseStatus?.success ? (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-300">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Order saved to Supabase (public.orders)</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium border border-amber-300">
                  <Database className="w-3.5 h-3.5 text-amber-600" />
                  <span>Order confirmed locally (Run the SQL schema in Supabase to sync table)</span>
                </div>
              )}
            </div>
          </div>

          {/* Engagement Receipt Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-brown-800 bg-cream-100 p-6 rounded-xl border border-cream-300">
            <div>
              <h3 className="font-serif text-sm font-bold text-brown-950 uppercase tracking-wider mb-2 text-gold-800">
                Client Entity Information
              </h3>
              <p><strong>Company:</strong> {submittedData.companyName}</p>
              <p><strong>Trade License:</strong> {submittedData.tradeLicenseNo}</p>
              <p><strong>Tax Reg No (TRN):</strong> {submittedData.trn || 'Not Registered'}</p>
              <p><strong>Jurisdiction:</strong> {submittedData.jurisdiction} ({submittedData.entityType})</p>
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-brown-950 uppercase tracking-wider mb-2 text-gold-800">
                Engagement Contact
              </h3>
              <p><strong>Authorized Signatory:</strong> {submittedData.contactName}</p>
              <p><strong>Designation:</strong> {submittedData.jobTitle}</p>
              <p><strong>Corporate Email:</strong> {submittedData.email}</p>
              <p><strong>UAE Phone:</strong> {submittedData.phone}</p>
              <p><strong>Date:</strong> {submittedData.date}</p>
            </div>
          </div>

          {/* Itemized Order Table */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-brown-950">
              Purchased Professional Services
            </h3>
            <div className="border border-cream-300 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-brown-950 text-cream-100 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4 text-center">Category</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Fee (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-300 text-brown-900 bg-cream-50">
                  {submittedData.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4 font-semibold">{item.name}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brown-900 text-gold-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                      <td className="py-3 px-4 text-right font-serif font-bold">
                        AED {(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="bg-cream-100 p-4 rounded-lg space-y-2 text-xs text-brown-900 max-w-sm ml-auto border border-cream-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-serif font-bold">AED {submittedData.subtotal.toLocaleString()}</span>
              </div>
              {submittedData.discountAmount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Promo Discount ({submittedData.discountCode}):</span>
                  <span>- AED {submittedData.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>UAE VAT (5%):</span>
                <span className="font-serif font-bold">AED {submittedData.vatAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-brown-950 border-t border-cream-300 pt-2">
                <span>Grand Total:</span>
                <span className="font-serif text-lg text-brown-950">
                  AED {submittedData.grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="p-4 rounded-lg bg-brown-900 text-cream-200 border border-gold-500/40 text-xs space-y-2">
            <h4 className="font-serif text-gold-400 font-bold uppercase tracking-wider">
              {submittedData.paymentMethod === 'bank_transfer'
                ? 'Bank Wire Settlement Details'
                : 'Payment Processing Method: ' + submittedData.paymentMethod.toUpperCase()}
            </h4>
            <p>
              <strong>Beneficiary:</strong> Audit and Accouting with TAX LLC • <strong>Bank:</strong> Emirates NBD Dubai • <strong>IBAN:</strong> AE920330000000001234567 • <strong>SWIFT:</strong> EBILAEADXXX
            </p>
            <p className="text-gold-300 text-[11px]">
              * Please mention Reference <strong>{orderReference}</strong> in your bank transfer narration.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream-300 print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-4 py-2 border border-brown-300 rounded-lg text-xs font-semibold text-brown-800 hover:bg-cream-200 transition"
            >
              <Printer className="w-4 h-4 mr-2 text-gold-600" />
              Print Official Receipt
            </button>
            <div className="flex items-center space-x-3">
              <Link
                href="/menu"
                className="px-4 py-2 text-xs font-semibold text-brown-800 hover:text-gold-700"
              >
                Back to Menu
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 gold-gradient text-brown-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 shadow"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and order is not complete
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-brown-950">
          No Items in Cart for Checkout
        </h1>
        <p className="text-xs text-brown-600">
          Please select at least one Auditing, Accounting or TAX package before checking out.
        </p>
        <Link
          href="/menu"
          className="inline-block px-6 py-3 gold-gradient text-brown-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow"
        >
          View Services Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Title */}
      <div className="border-b border-cream-300 pb-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-700">
          <CreditCard className="w-4 h-4" />
          <span>Final Step</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-950 mt-1">
          Engagement <span className="gold-text-gradient">Checkout</span>
        </h1>
        <p className="text-xs sm:text-sm text-brown-600 mt-1">
          Provide your UAE corporate entity details and select your preferred professional settlement method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
          {/* Section 1: Company Entity Information */}
          <div className="bg-cream-50 p-6 rounded-xl border border-cream-300 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-cream-200 pb-3">
              <Building2 className="w-5 h-5 text-gold-600" />
              <h2 className="font-serif text-lg font-bold text-brown-950">
                1. Company & Entity Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  Company Legal Name (as per Trade License) *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  Trade License Number *
                </label>
                <input
                  type="text"
                  name="tradeLicenseNo"
                  required
                  value={formData.tradeLicenseNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  FTA Tax Registration Number (TRN - 15 digits)
                </label>
                <input
                  type="text"
                  name="trn"
                  maxLength={15}
                  value={formData.trn}
                  onChange={handleInputChange}
                  placeholder="e.g. 100482910300003"
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  Emirate / Location *
                </label>
                <select
                  name="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                >
                  {UAE_EMIRATES.map((em) => (
                    <option key={em} value={em}>
                      {em}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-brown-800 mb-1">
                  Entity Jurisdiction Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mainland LLC', 'Free Zone (DMCC/DIFC/etc)', 'Offshore / Foreign'].map(
                    (type) => (
                      <label
                        key={type}
                        className={`flex items-center justify-center p-2 rounded-lg border cursor-pointer text-center text-xs transition ${
                          formData.entityType === type
                            ? 'bg-brown-900 text-gold-300 border-gold-500 font-bold'
                            : 'bg-cream-100 text-brown-800 border-cream-300 hover:bg-cream-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="entityType"
                          value={type}
                          checked={formData.entityType === type}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span>{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Person */}
          <div className="bg-cream-50 p-6 rounded-xl border border-cream-300 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-cream-200 pb-3">
              <FileText className="w-5 h-5 text-gold-600" />
              <h2 className="font-serif text-lg font-bold text-brown-950">
                2. Authorized Signatory / Financial Contact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  Contact Person Full Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  Job Title / Designation *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block font-medium text-brown-800 mb-1">
                  UAE Mobile / Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-brown-800 mb-1">
                  Engagement Notes & Specific Instructions
                </label>
                <textarea
                  rows={2}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Need urgent draft report by Thursday for board meeting..."
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 bg-cream-100 text-brown-950 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Settlement Method */}
          <div className="bg-cream-50 p-6 rounded-xl border border-cream-300 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-cream-200 pb-3">
              <CreditCard className="w-5 h-5 text-gold-600" />
              <h2 className="font-serif text-lg font-bold text-brown-950">
                3. Settlement & Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'bank_transfer',
                  title: 'Corporate Bank Wire (Recommended)',
                  desc: 'Direct transfer to our Emirates NBD Corporate Client Trust Account. Proforma invoice generated immediately.',
                },
                {
                  id: 'card',
                  title: 'Credit / Debit Card (Visa / Mastercard)',
                  desc: 'Instant online authorization. 3D Secure verified for corporate purchase cards.',
                },
                {
                  id: 'cheque',
                  title: 'Corporate Cheque on Engagement Delivery',
                  desc: 'Payable to "Audit and Accouting with TAX LLC" upon formal signing of Engagement Letter.',
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start p-3.5 rounded-xl border cursor-pointer transition ${
                    formData.paymentMethod === opt.id
                      ? 'border-gold-500 bg-cream-100/90 shadow-sm'
                      : 'border-cream-300 hover:bg-cream-100/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.id}
                    checked={formData.paymentMethod === opt.id}
                    onChange={handleInputChange}
                    className="mt-1 text-gold-600 focus:ring-gold-500"
                  />
                  <div className="ml-3 text-xs">
                    <span className="font-bold text-brown-950 block">{opt.title}</span>
                    <span className="text-brown-600 leading-relaxed">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 gold-gradient text-brown-950 font-bold uppercase tracking-wider text-sm rounded-xl shadow-xl hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">⚙</span> Saving Order to Supabase...
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Confirm Engagement & Place Order (AED {grandTotal.toLocaleString()})</span>
              </>
            )}
          </button>
        </form>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-4 bg-cream-50 rounded-xl border-2 border-gold-500/40 p-6 shadow-md space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-cream-200 pb-3">
            <h2 className="font-serif text-lg font-bold text-brown-950">
              Order Review
            </h2>
            <Link
              href="/cart"
              className="text-xs text-gold-700 hover:text-gold-800 font-semibold"
            >
              Edit Cart ({totalItems})
            </Link>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="text-xs border-b border-cream-200 pb-2 space-y-0.5">
                <div className="flex justify-between font-semibold text-brown-950">
                  <span className="line-clamp-1">{item.name}</span>
                  <span className="font-serif font-bold whitespace-nowrap ml-2">
                    AED {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-brown-500 flex justify-between">
                  <span>Qty: {item.quantity}</span>
                  <span>{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-xs text-brown-800 pt-2 border-t border-cream-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-serif font-bold text-brown-950">
                AED {subtotal.toLocaleString()}
              </span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Discount ({discountCode}):</span>
                <span>- AED {discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>UAE VAT (5%):</span>
              <span className="font-serif font-bold text-brown-950">
                AED {vatAmount.toLocaleString()}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-cream-300 pt-3 flex justify-between items-baseline">
              <div>
                <span className="block text-sm font-bold text-brown-950">Final Total</span>
                <span className="text-[10px] text-brown-500 uppercase">Prices in AED</span>
              </div>
              <span className="font-serif text-2xl font-black text-brown-950">
                AED {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 bg-brown-900 rounded-lg text-cream-200 text-[11px] space-y-1">
            <div className="flex items-center text-gold-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> FTA Compliant Invoice
            </div>
            <p className="text-cream-400">
              Tax invoice with TRN will be delivered instantly to {formData.email || 'your email'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
