import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface AdBannerProps {
  className?: string;
  onDismiss?: () => void;
  dismissible?: boolean;
  adClient?: string; // Google AdSense client ID
  adSlot?: string; // Google AdSense ad slot ID
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  adSize?: {
    width: number;
    height: number;
  };
}

// Declare global adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  onDismiss,
  dismissible = true,
  adClient = 'ca-pub-1234567890123456', // Replace with your actual AdSense client ID
  adSlot = '1234567890', // Replace with your actual ad slot ID
  adFormat = 'auto',
  adSize = { width: 728, height: 90 }
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  const adRef = useRef<HTMLModElement>(null);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  useEffect(() => {
    // Load Google AdSense script if not already loaded
    const loadAdSenseScript = () => {
      if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + adClient;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load AdSense script'));
        document.head.appendChild(script);
      });
    };

    // Initialize ad
    const initializeAd = async () => {
      try {
        await loadAdSenseScript();
        
        // Initialize adsbygoogle array if it doesn't exist
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Push ad configuration
        if (adRef.current) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setIsAdLoaded(true);
          } catch (error) {
            console.error('AdSense error:', error);
            setAdError('Failed to load advertisement');
          }
        }
      } catch (error) {
        console.error('Failed to load AdSense:', error);
        setAdError('Advertisement service unavailable');
      }
    };

    if (isVisible) {
      initializeAd();
    }
  }, [isVisible, adClient]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-3xl px-4 ${className}`}>
      <div className="backdrop-blur-md bg-white/95 rounded-lg shadow-lg border border-white/20 p-2">
        {/* Header with dismiss button and ad label - more compact */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Advertisement
          </span>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150"
              aria-label="Dismiss ad"
            >
              <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Google AdSense Ad Container - horizontal layout */}
        <div className="flex justify-center">
          {adError ? (
            // Fallback content when ad fails to load - more compact
            <div className="text-center p-2 bg-gray-50 rounded border border-gray-200 w-full">
              <div className="flex items-center justify-center gap-4">
                <div className="text-xs text-gray-500">Advertisement</div>
                <div className="text-sm text-gray-700 font-medium">
                  Discover Global Brand Insights
                </div>
                <div className="text-xs text-gray-600">
                  Explore worldwide brand presence
                </div>
              </div>
            </div>
          ) : (
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{
                display: 'inline-block',
                width: adFormat === 'auto' ? '100%' : `${adSize.width}px`,
                height: adFormat === 'auto' ? '90px' : `${adSize.height}px`,
                minWidth: '320px',
                maxWidth: '100%',
                minHeight: '50px',
                maxHeight: '90px'
              }}
              data-ad-client={adClient}
              data-ad-slot={adSlot}
              data-ad-format={adFormat === 'auto' ? 'horizontal' : adFormat}
              data-full-width-responsive={adFormat === 'auto' ? 'true' : 'false'}
            />
          )}
        </div>

        {/* Loading indicator - more compact */}
        {!isAdLoaded && !adError && (
          <div className="flex justify-center items-center py-2">
            <div className="animate-pulse flex space-x-1">
              <div className="h-1 w-1 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="h-1 w-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-1 w-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};