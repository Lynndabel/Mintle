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
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://eldrow-ecru.vercel.app/og-image.png',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://eldrow-ecru.vercel.app'
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