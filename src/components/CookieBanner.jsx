import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { useRouter } from '../RouterContext';
import { updateAnalyticsConsent } from '../utils/analytics';
import './CookieBanner.css';

const COOKIE_STORAGE_KEY = 'strenovix_cookie_consent';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { navigate } = useRouter();

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Delay slightly for smooth entrance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        updateAnalyticsConsent(consent === 'accepted');
      }
    } catch {
      // In case localStorage is blocked by private browsing mode
      setIsVisible(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted');
    } catch (e) {
      console.warn('Storage error', e);
    }
    updateAnalyticsConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, 'declined');
    } catch (e) {
      console.warn('Storage error', e);
    }
    updateAnalyticsConsent(false);
    setIsVisible(false);
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    navigate('privacy-policy');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Cookie consent banner"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="cookie-banner-container"
        >
          <div className="cookie-banner-card">
            <div className="cookie-banner-header">
              <div className="cookie-banner-title-wrap">
                <div className="cookie-banner-icon">
                  <Cookie size={18} />
                </div>
                <span className="cookie-banner-title">Cookie & Privacy Preferences</span>
              </div>
              <button
                type="button"
                onClick={handleDecline}
                className="cookie-banner-close"
                aria-label="Close cookie banner"
              >
                <X size={16} />
              </button>
            </div>

            <p className="cookie-banner-text">
              We use cookies and Google Analytics to understand website performance and improve your browsing experience. Read our{' '}
              <a href="#privacy-policy" onClick={handlePrivacyClick} className="cookie-banner-link">
                Privacy Policy
              </a>{' '}
              to learn more.
            </p>

            <div className="cookie-banner-actions">
              <button
                type="button"
                onClick={handleAccept}
                className="cookie-btn-accept inline-flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} />
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="cookie-btn-decline"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
