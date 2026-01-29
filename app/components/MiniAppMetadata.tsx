'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MiniAppMetadata() {
  const pathname = usePathname();
  
  const miniappMetadata = {
    version: "1",
    imageUrl: "https://eldrow-ecru.vercel.app/og-image.png",
    button: {
      title: "🕹️ Play Now",
      action: {
        type: "launch_miniapp",
        url: `https://eldrow-ecru.vercel.app${pathname}`,
        name: "Blockchain Wordle",
        splashImageUrl: "https://eldrow-ecru.vercel.app/og-image.png",
        splashBackgroundColor: "#000000"
      }
    }
  };

  // For backward compatibility
  const frameMetadata = {
    ...miniappMetadata,
    button: {
      ...miniappMetadata.button,
      action: {
        ...miniappMetadata.button.action,
        type: "launch_frame"
      }
    }
  };

  // Add metadata to document head
  useEffect(() => {
    const metaMiniApp = document.createElement('meta');
    metaMiniApp.name = 'fc:miniapp';
    metaMiniApp.content = JSON.stringify(miniappMetadata);
    
    const metaFrame = document.createElement('meta');
    metaFrame.name = 'fc:frame';
    metaFrame.content = JSON.stringify(frameMetadata);
    
    document.head.appendChild(metaMiniApp);
    document.head.appendChild(metaFrame);
    
    return () => {
      document.head.removeChild(metaMiniApp);
      document.head.removeChild(metaFrame);
    };
  }, [pathname]);

  return null;
}
