// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';
import { FarcasterProvider } from './farcaster-provider';

export const metadata: Metadata = {
  title: '⛓️ Blockchain Wordle',
  description: 'Guess blockchain words. Build your streak on Base.',
  openGraph: {
    title: '⛓️ Blockchain Wordle',
    description: 'Guess blockchain words. Build your streak on Base.',
    images: ['/og-image.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FarcasterProvider>
          <Providers>{children}</Providers>
        </FarcasterProvider>
      </body>
    </html>
  );
}