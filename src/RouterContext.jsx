import { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

const getRoute = () => window.location.hash.replace(/^#\/?/, '') || '';

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handle = () => setRoute(getRoute());
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  const navigate = (path) => {
    window.location.hash = path ? `/${path}` : '';
    setRoute(path || '');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);
