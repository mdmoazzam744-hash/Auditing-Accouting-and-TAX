import { createClient } from '@supabase/supabase-js';
import { SERVICES as fallbackServices } from '../data/services';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPERBASE_PROJECT_URL ||
  'https://hslkqqrsxqwmaoqcvgqj.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPERBASE_PUBLIC_KEY ||
  'sb_publishable_K5OC8g90QO1tGG0VAxmcUA_L-it8COw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all Auditing, Accounting & TAX services from Supabase.
 * Checks 'services' table first, then 'audit_accounting_tax' table.
 * Gracefully falls back to the 8 sample services if the table hasn't been created yet.
 */
export async function fetchServicesFromSupabase() {
  try {
    // 1. Try 'services' table
    let { data, error } = await supabase
      .from('services')
      .select('*')
      .order('id', { ascending: true });

    // 2. If 'services' doesn't exist, try 'audit_accounting_tax' table
    if (error || !data || data.length === 0) {
      const altResult = await supabase
        .from('audit_accounting_tax')
        .select('*')
        .order('id', { ascending: true });

      if (!altResult.error && altResult.data && altResult.data.length > 0) {
        data = altResult.data;
        error = null;
      }
    }

    if (error || !data || data.length === 0) {
      console.warn('Supabase services table not found or empty. Using default sample services.', error?.message);
      return { services: fallbackServices, source: 'fallback', error: error?.message || null };
    }

    // Normalize format (features json/array, price number)
    const normalized = data.map((item) => ({
      ...item,
      features: Array.isArray(item.features)
        ? item.features
        : typeof item.features === 'string'
        ? JSON.parse(item.features || '[]')
        : [],
      price: Number(item.price),
      popular: Boolean(item.popular),
    }));

    return { services: normalized, source: 'supabase', error: null };
  } catch (err) {
    console.error('Error fetching services from Supabase:', err);
    return { services: fallbackServices, source: 'fallback', error: err.message };
  }
}

/**
 * Save customer order into the Supabase 'orders' table.
 */
export async function saveOrderToSupabase(orderData) {
  try {
    const payload = {
      order_reference: orderData.orderReference,
      company_name: orderData.companyName,
      trade_license_no: orderData.tradeLicenseNo,
      trn: orderData.trn || null,
      jurisdiction: orderData.jurisdiction,
      entity_type: orderData.entityType,
      contact_name: orderData.contactName,
      job_title: orderData.jobTitle,
      email: orderData.email,
      phone: orderData.phone,
      notes: orderData.notes || null,
      payment_method: orderData.paymentMethod,
      subtotal: Number(orderData.subtotal),
      discount_code: orderData.discountCode || null,
      discount_amount: Number(orderData.discountAmount || 0),
      vat_amount: Number(orderData.vatAmount),
      grand_total: Number(orderData.grandTotal),
      items: orderData.items,
      status: 'pending_review',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('orders').insert([payload]).select();

    if (error) {
      console.error('Failed to insert order in Supabase:', error);
      return { success: false, error: error.message, payload };
    }

    return { success: true, data: data?.[0] || payload };
  } catch (err) {
    console.error('Error in saveOrderToSupabase:', err);
    return { success: false, error: err.message };
  }
}
