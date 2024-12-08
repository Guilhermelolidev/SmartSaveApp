import { Toaster } from '@/components/ui/sonner';
import { images } from '@/constants/images';
import type { Metadata } from 'next';
import { Open_Sans, Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const openSans = Open_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'Smart Save',
  description: 'Management of signatures',
  icons: {
    icon: images.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${openSans.variable} antialiased`}>
        {children}
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
