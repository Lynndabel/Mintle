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
    // Required frame metadata
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://eldrow-rcru.vercel.app/og-image.png',
    
    // Button configuration
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'post_redirect',
    'fc:frame:post_url': 'https://eldrow-ecru.vercel.app/api/frame',
    
    // Recommended metadata for better discovery
    'of:version': 'vNext',
    'of:accepts:xmtp': 'vNext',
    'of:image': 'https://eldrow-ecru.vercel.app/og-image.png',
    'of:input:text': 'Enter your guess...',
    'of:post_url': 'https://eldrow-ecru.vercel.app/api/frame',
    'of:button:1': 'Play Now'
  },
  // Ensure proper caching for frame images
  robots: 'noindex, nofollow',
  // Ensure the frame is served with the correct content type
  metadataBase: new URL('https://eldrow-ecru.vercel.app')
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