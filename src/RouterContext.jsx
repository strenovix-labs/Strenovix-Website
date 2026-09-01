import { createContext, useContext, useState, useEffect } from 'react';
import { trackPageView } from './utils/analytics';

const RouterContext = createContext(null);

// In-page section anchors that belong on the home page
const HOME_ANCHORS = new Set([
  '',
  'home',
  'our-story',
  'services',
  'work',
  'team',
  'contact',
  'studio',
  'founders',
  'process',
  'stats',
  'testimonials',
  'features',
  'about'
]);

export const normalizeRoute = (rawHash) => {
  if (!rawHash) return '';
  const clean = rawHash.replace(/^#\/?/, '').replace(/\/+$/, '').trim().toLowerCase();
  
  if (HOME_ANCHORS.has(clean)) {
    return '';
  }

  // Alias maps
  if (clean === 'app-dev') return 'services/app-dev';
  if (clean === 'web-dev') return 'services/web-dev';
  if (clean === 'ml' || clean === 'ai' || clean === 'ml-ai') return 'services/ml';
  if (clean === 'sap' || clean === 'cloud') return 'services/sap';
  if (clean === 'thankyou' || clean === 'thanks') return 'thank-you';
  if (clean === 'privacy') return 'privacy-policy';
  if (clean === 'terms') return 'terms-and-conditions';

  return clean;
};

const getRoute = () => normalizeRoute(window.location.hash);

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handle = () => {
      const newRoute = getRoute();
      setRoute(newRoute);
      trackPageView(newRoute);
    };

    window.addEventListener('hashchange', handle);
    // Initial page track
    trackPageView(getRoute());

    return () => window.removeEventListener('hashchange', handle);
  }, []);

  const navigate = (path) => {
    const normalized = normalizeRoute(path);
    if (!path || path === '') {
      window.location.hash = '';
    } else {
      window.location.hash = `/${path}`;
    }
    setRoute(normalized);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);
