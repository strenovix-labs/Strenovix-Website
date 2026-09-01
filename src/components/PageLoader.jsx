import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from '../RouterContext';
import './PageLoader.css';

export default function PageLoader() {
  const { route } = useRouter();
  const [progress, setProgress] = useState(0);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Initial site mount loader
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setInitialLoaded(true), 400);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Route transition progress indicator
  useEffect(() => {
    setIsRouteLoading(true);
    setProgress(30);

    const t1 = setTimeout(() => setProgress(75), 100);
    const t2 = setTimeout(() => setProgress(100), 250);
    const t3 = setTimeout(() => {
      setIsRouteLoading(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [route]);

  return (
    <>
      {/* Route change top progress bar */}
      {isRouteLoading && (
        <div className="page-loader-bar-wrap" aria-hidden="true">
          <div
            className="page-loader-bar"
            style={{
              width: `${progress}%`,
              opacity: progress === 100 ? 0 : 1,
            }}
          />
        </div>
      )}

      {/* Initial load splash curtain */}
      <AnimatePresence>
        {!initialLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="page-initial-curtain"
          >
            <div className="page-curtain-spinner" />
            <span className="page-curtain-logo">STRENOVIX</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
