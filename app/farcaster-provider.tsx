// app/farcaster-provider.tsx
'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function FarcasterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initSdk = async () => {
      try {
        await sdk.actions.ready();
      } catch (error) {
        console.log('Not in Farcaster client, continuing...');
      }
    };
    initSdk();
  }, []);

  return <>{children}</>;
}