-- ==============================================================================
-- Audit and Accounting with TAX - Supabase Schema
-- Run this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Table: services (Accounting, Audit, TAX)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Auditing', 'Accounting', 'TAX')),
    badge TEXT,
    price NUMERIC NOT NULL,
    turnaround TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional view alias so querying "audit_accounting_tax" also works
CREATE OR REPLACE VIEW public.audit_accounting_tax AS
SELECT * FROM public.services;

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public / anon) to view services
DROP POLICY IF EXISTS "Allow public read access to services" ON public.services;
CREATE POLICY "Allow public read access to services"
    ON public.services
    FOR SELECT
    USING (true);

-- Allow inserting/updating services if needed
DROP POLICY IF EXISTS "Allow anon insert to services" ON public.services;
CREATE POLICY "Allow anon insert to services"
    ON public.services
    FOR INSERT
    WITH CHECK (true);

-- Seed the 8 Sample Auditing, Accounting and TAX Services (AED prices)
INSERT INTO public.services (id, name, category, badge, price, turnaround, description, features, popular)
VALUES
(
    'statutory-audit',
    'Statutory Financial Audit & Assurance',
    'Auditing',
    'Mandatory / Core',
    4500,
    '5 - 7 Business Days',
    'Comprehensive annual financial audit compliant with UAE Federal Commercial Companies Law and IFRS standards. Full independent auditor report signed by Ministry accredited auditors.',
    '["IFRS compliant independent audit report", "Balance sheet & P&L verification", "Management letter & internal control review", "Free Zone & Mainland authority submission ready"]'::jsonb,
    true
),
(
    'uae-corporate-tax',
    'UAE Corporate Tax Registration & Annual Return Filing',
    'TAX',
    'Federal Tax Authority (FTA)',
    2200,
    '3 - 5 Business Days',
    'End-to-end Corporate Tax compliance under Federal Decree-Law No. 47 of 2022. Includes taxable income calculation, relief optimization, and electronic filing via EmaraTax.',
    '["EmaraTax account setup & Corporate Tax registration", "Taxable income & allowable deduction computation", "Small Business Relief eligibility assessment", "Official FTA Corporate Tax Return submission"]'::jsonb,
    true
),
(
    'vat-compliance',
    'Quarterly VAT Return Filing & Compliance Review',
    'TAX',
    '5% UAE VAT',
    1200,
    '2 - 3 Business Days',
    'Accurate reconciliation of sales, purchases, and input/output VAT. Guaranteed error-free filing on EmaraTax portal to avoid FTA administrative penalties.',
    '["Input tax recovery verification & invoice check", "EmaraTax Form VAT 201 preparation & filing", "Zero-rated & exempt supplies reconciliation", "Pre-audit risk health check"]'::jsonb,
    false
),
(
    'monthly-bookkeeping',
    'Monthly Corporate Bookkeeping & Management Accounts',
    'Accounting',
    'Monthly Retainer',
    1800,
    'Monthly Delivery',
    'Dedicated senior accountant managing your general ledger, bank reconciliations, accounts payable/receivable, and delivering monthly executive financial dashboards.',
    '["Cloud accounting setup (Zoho / QuickBooks / Xero)", "Multi-currency bank & credit card reconciliation", "Monthly Balance Sheet & Income Statement", "Accounts receivable aging & debtor tracking"]'::jsonb,
    true
),
(
    'internal-audit',
    'Internal Controls & Forensic Risk Assurance Audit',
    'Auditing',
    'Governance & Risk',
    3800,
    '7 - 10 Business Days',
    'In-depth assessment of corporate governance, fraud vulnerabilities, internal financial checks, and operational compliance to safeguard stakeholders and investors.',
    '["Fraud risk evaluation & operational walk-throughs", "Standard Operating Procedure (SOP) stress-test", "Executive risk heat-map & recommendations", "Board-level presentation & summary report"]'::jsonb,
    false
),
(
    'esr-aml-compliance',
    'ESR & Anti-Money Laundering (AML/CFT) Compliance Package',
    'Auditing',
    'Regulatory Mandate',
    2500,
    '3 - 4 Business Days',
    'Economic Substance Regulations (ESR) notification/reporting and Ministry of Economy goAML screening & AML framework development for Designated Non-Financial Businesses.',
    '["Relevant activity substance test evaluation", "ESR annual portal submission & documentation", "goAML registration & compliance officer onboarding", "KYC policy manual & risk rating matrix"]'::jsonb,
    false
),
(
    'transfer-pricing',
    'Transfer Pricing Master File & Local File Documentation',
    'TAX',
    'OECD & FTA Compliant',
    5000,
    '10 - 14 Business Days',
    'Detailed economic benchmarking analysis and documentation for cross-border and related-party transactions in full compliance with UAE FTA Transfer Pricing regulations.',
    '["Arm’s length standard benchmarking & documentation", "Master file & Local file preparation", "Related party disclosure form filing support", "Intercompany agreement review & tax risk mitigation"]'::jsonb,
    false
),
(
    'payroll-wps',
    'Corporate Payroll Accounting & WPS Compliant Processing',
    'Accounting',
    'MOHRE & Central Bank',
    1500,
    'Bi-monthly / Monthly',
    'Full payroll lifecycle management compliant with UAE Labour Law, Wages Protection System (WPS) SIF file generation, end-of-service gratuity calculation, and pay slips.',
    '["SIF file generation for UAE Central Bank WPS", "End of Service Gratuity (EOSB) actuarial calculation", "Detailed employee salary slips & leave tracking", "Departmental payroll expense allocation reports"]'::jsonb,
    false
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    price = EXCLUDED.price,
    turnaround = EXCLUDED.turnaround,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    popular = EXCLUDED.popular;


-- ------------------------------------------------------------------------------
-- 2. Table: orders
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_reference TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    trade_license_no TEXT NOT NULL,
    trn TEXT,
    jurisdiction TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    notes TEXT,
    payment_method TEXT NOT NULL,
    subtotal NUMERIC NOT NULL,
    discount_code TEXT,
    discount_amount NUMERIC DEFAULT 0,
    vat_amount NUMERIC NOT NULL,
    grand_total NUMERIC NOT NULL,
    items JSONB NOT NULL,
    status TEXT DEFAULT 'pending_review',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public / anon users to place (insert) orders from checkout
DROP POLICY IF EXISTS "Allow anon to insert orders" ON public.orders;
CREATE POLICY "Allow anon to insert orders"
    ON public.orders
    FOR INSERT
    WITH CHECK (true);

-- Allow reading orders by reference / anon for receipt
DROP POLICY IF EXISTS "Allow anon to view orders" ON public.orders;
CREATE POLICY "Allow anon to view orders"
    ON public.orders
    FOR SELECT
    USING (true);
