import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = 'https://eldrow-ecru.vercel.app';
  
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${appUrl}/og-image.png" />
        <meta property="fc:frame:button:1" content="Play Now" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${appUrl}" />
        
        <meta property="og:title" content="⛓️ Blockchain Wordle" />
        <meta property="og:description" content="Guess blockchain words. Build your streak on Base." />
        <meta property="og:image" content="${appUrl}/og-image.png" />
        
        <title>Blockchain Wordle</title>
      </head>
      <body>
        <h1>Blockchain Wordle - Farcaster Frame</h1>
      </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}

export async function POST() {
  return NextResponse.json({ message: 'Frame action received' });
}