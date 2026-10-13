import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import Button from './Button';

const STORAGE_KEY = 'evidalis_cookie_consent';
const STORAGE_TIME_KEY = 'evidalis_cookie_consent_timestamp';
const COOKIE_NAME = 'evidalis_cookie_consent';

export const CookieConsentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent (stored in localStorage or cookie)
    try {
      const storedConsent = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('insightflow_cookie_consent');
      const hasCookie = document.cookie.split('; ').some((row) => row.startsWith(`${COOKIE_NAME}=`) || row.startsWith('insightflow_cookie_consent='));

      if (!storedConsent && !hasCookie) {
        // Show only for first-time visitors after a gentle mount delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 750);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.warn('[Evidalis] Could not access storage for cookie consent:', err);
    }
  }, []);

  const handleConsent = (choice) => {
    try {
      // 1. Store only once in localStorage
      localStorage.setItem(STORAGE_KEY, choice);
      localStorage.setItem(STORAGE_TIME_KEY, new Date().toISOString());

      // 2. Set actual browser cookie (valid for 1 year)
      const maxAge = 365 * 24 * 60 * 60;
      document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=${maxAge}; SameSite=Lax`;
    } catch (err) {
      console.warn('[Evidalis] Failed to persist cookie consent:', err);
    }

    // Dismiss popup
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Storage Preferences"
      className="fixed bottom-4 right-4 z-50 max-w-md w-[calc(100vw-2rem)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="rounded-xl bg-[#ECECEC] border border-[#C4BEB2] p-5 shadow-2xl">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] shrink-0">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-[#35332F]">
                Cookie &amp; Session Storage
              </h4>
              <button
                onClick={() => handleConsent('essential')}
                className="text-[#6B655B] hover:text-[#35332F] transition-colors p-1 rounded cursor-pointer"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#625D54] mt-1 leading-relaxed">
              We use essential cookies and local storage to retain your dataset analysis session, filter states, and active cluster lineage across visits.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#EAE4D7]">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleConsent('essential')}
            className="text-xs"
          >
            Essential Only
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleConsent('all')}
            className="text-xs"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentPopup;
