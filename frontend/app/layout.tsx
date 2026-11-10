import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ResaleHub | Institutional Franchise Resale Brokerage Platform',
  description:
    'A high-trust, minimalist Franchise Resale Brokerage Platform connecting qualified buyers, confidential sellers, and corporate franchisors through structured Data Rooms and digital NDAs.',
  keywords: [
    'franchise resale',
    'buy a franchise',
    'sell a franchise',
    'franchise business broker',
    'confidential franchise listings',
    'franchise M&A',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

