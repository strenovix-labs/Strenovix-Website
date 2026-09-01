/**
 * Google Analytics Helper Utility
 * Measurement ID: G-378P639B6W
 */

export const GA_TRACKING_ID = 'G-378P639B6W';

// Track page views (called on hash route transitions)
export function trackPageView(path, title) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path ? `/#/${path}` : '/',
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
}

// Track custom user events (e.g. form submission, CTA button click)
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

// Update consent settings based on cookie banner interaction
export function updateAnalyticsConsent(granted) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
    });
  }
}
