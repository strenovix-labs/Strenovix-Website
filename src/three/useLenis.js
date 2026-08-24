import { useEffect } from 'react';
import Lenis from 'lenis';

// Default Lenis config drives real window scrollTop (no virtual wrapper),
// so framer-motion's useScroll (which reads native scroll/getBoundingClientRect)
// keeps working unmodified.
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis();
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
}
