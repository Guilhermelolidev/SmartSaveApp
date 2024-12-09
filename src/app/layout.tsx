import { Toaster } from '@/components/ui/sonner';
import { images } from '@/constants/images';
import { auth } from '@/utils/auth';
import { Providers } from '@/utils/providers';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${openSans.variable} antialiased`}>
        <SessionProvider session={session}>
          <Providers>
            <Toaster position='top-center' richColors />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
