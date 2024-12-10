import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from '@/shared/container/ui/toaster';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Quick Laundry',
  description: 'Laundry now with quick laundry',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      ></Script>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
