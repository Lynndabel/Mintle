// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';
import { FarcasterProvider } from './farcaster-provider';
import MiniAppMetadata from './components/MiniAppMetadata';

export const metadata: Metadata = {
  title: '⛓️ Blockchain Wordle',
  description: 'Guess blockchain words. Build your streak on Base.',
  openGraph: {
    title: '⛓️ Blockchain Wordle',
    description: 'Guess blockchain words. Build your streak on Base.',
    images: [{
      url: 'https://eldrow-ecru.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Blockchain Wordle',
    }],
  },
  metadataBase: new URL('https://eldrow-ecru.vercel.app'),
  robots: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <MiniAppMetadata />
      </head>
      <body>
        <FarcasterProvider>
          <Providers>{children}</Providers>
        </FarcasterProvider>
      </body>
    </html>
  );
}