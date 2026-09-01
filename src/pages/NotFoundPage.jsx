import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Compass, Sparkles, ChevronLeft } from 'lucide-react';
import { useRouter } from '../RouterContext';
import { trackPageView } from '../utils/analytics';
import './NotFoundPage.css';

const POPULAR_PAGES = [
  { title: 'App Development', path: 'services/app-dev', desc: 'iOS, Android & Cross-Platform' },
  { title: 'Web Engineering', path: 'services/web-dev', desc: 'High-Performance Web Platforms' },
  { title: 'Machine Learning', path: 'services/ml', desc: 'Agentic AI, LLMs & Vision' },
  { title: 'SAP & Cloud', path: 'services/sap', desc: 'Enterprise Systems & Automation' },
];

export default function NotFoundPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    trackPageView('404', '404 - Page Not Found | Strenovix');
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="notfound-root">
      {/* Top Back Header */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <ChevronLeft size={16} />
          Home
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button
          className="page-back-cta"
          onClick={() => {
            navigate('');
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 200);
          }}
        >
          Contact Us
        </button>
      </div>

      <div className="notfound-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="notfound-badge"
        >
          <Compass size={14} />
          Error 404
        </motion.div>

        <div className="notfound-code-wrapper">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="notfound-code"
          >
            404
          </motion.div>
          <div className="notfound-code-glow" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="notfound-title"
        >
          Lost in Digital Space?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="notfound-desc"
        >
          The page you are looking for doesn't exist, was renamed, or has traveled beyond our event horizon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="notfound-actions"
        >
          <button onClick={() => navigate('')} className="notfound-btn-primary">
            <Home size={16} />
            Return to Homepage
          </button>
          <button
            onClick={() => {
              navigate('');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 200);
            }}
            className="notfound-btn-secondary"
          >
            <Sparkles size={16} />
            Start a Project
          </button>
        </motion.div>

        {/* Quick Links Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="notfound-services-box"
        >
          <p className="notfound-services-title">Explore Our Core Capabilities</p>
          <div className="notfound-services-grid">
            {POPULAR_PAGES.map((svc) => (
              <div
                key={svc.title}
                className="notfound-service-card"
                onClick={() => navigate(svc.path)}
              >
                <div className="notfound-service-card-title">
                  <span>{svc.title}</span>
                  <ArrowRight size={13} className="text-[#F04A00]" />
                </div>
                <span className="notfound-service-card-desc">{svc.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
