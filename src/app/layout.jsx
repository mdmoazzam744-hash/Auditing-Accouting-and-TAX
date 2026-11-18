import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Audit and Accouting with TAX | Premier UAE Accounting, Audit & TAX Services',
  description: 'Auditing, Accounting and TAX shop website offering statutory financial audits, UAE Corporate Tax return filing, FTA VAT compliance, and corporate bookkeeping in AED.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-50 text-brown-950 antialiased selection:bg-gold-500 selection:text-brown-950">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
