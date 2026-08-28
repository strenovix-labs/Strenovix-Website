import React, { useEffect, useState } from "react";
import { useRouter } from '../RouterContext';
import { MacbookScroll, Badge } from "@/components/ui/macbook-scroll";
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './AppDevPage.css';  /* reuse shared back-bar styles */
import './WebDevPage.css';

/* ── MacbookScrollDemo (user's exact code: only image to be replaced) ── */
function MacbookScrollDemo() {
  return (
    <div className="wdp-macbook-wrap">
      <MacbookScroll
        title={
          <span>
            This is how we build the web.<br />No shortcuts, no compromise.
          </span>
        }
        badge={
          <a href="https://www.strenovix.in">
          </a>
        }
        src="https://www.strenovix.in/"
        showGradient={false}
      />
    </div>
  );
}

/* ── 6 additional interactive project sections ── */
const webProjects = [
  {
    id: '01',
    label: 'Land Rover "House of Brands"',
    tech: 'React · Three.js · Vanilla CSS · Oxlint',
    desc: 'Immersive luxury showroom and interactive configurator for Land Rover\'s iconic lineup.',
    category: 'Luxury Automotive Interactive Showroom',
    description: 'Land Rover "House of Brands" is an immersive interactive web application showcasing Land Rover’s iconic vehicle lineup, including Range Rover, Defender, and Discovery.\n\nThe platform provides a luxury digital showroom experience featuring an interactive 3D chassis animation renderer, a dynamic vehicle configurator (allowing real-time customization of exterior colors, wheels, interior trims, and accessories), detailed specs comparison tools, and smooth responsive navigation designed around luxury automotive branding aesthetics.',
    tags: ['React', 'Three.js', 'Oxlint'],
    year: '2026',
    image: '/projects/jlr-rangerover.jpg',
    images: [
      '/projects/jlr-rangerover.jpg',
      '/projects/jlr-hub.jpg',
      '/projects/jlr-configurator.png',
      '/projects/jlr-menu.png',
      '/projects/jlr-defender.jpg',
      '/projects/jlr-defender-config.png',
      '/projects/jlr-discovery.jpg',
      '/projects/jlr-discovery-config.png'
    ],
  },
  {
    id: '02',
    label: 'Storefront & Brand Commerce Builds',
    tech: 'React · Tailwind · Framer Motion',
    desc: 'E-commerce storefronts built for fashion and streetwear brands with custom animations.',
    category: 'E-Commerce UI/UX: Fashion & Streetwear Storefronts',
    description: "A series of e-commerce storefronts built for fashion and streetwear brands, featuring React and Tailwind front-ends with Framer Motion micro-interactions, tuned for conversion rather than just looks: fast product browsing, low-friction checkout, and a visual identity that actually matches each brand instead of feeling like a template.",
    tags: ['React', 'Tailwind', 'Framer Motion'],
    year: '2025',
    image: '/projects/ecommerce.jpg',
    images: [
      '/projects/ecommerce.jpg',
      '/projects/ecommerce-lee.png',
      '/projects/ecommerce-bucket.png'
    ],
  },
];

function ImageCarousel({ images, alt }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-black group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIdx}
          src={images[currentIdx]}
          alt={`${alt} - Slide ${currentIdx + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full object-contain"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/80 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/80 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-white w-3' : 'bg-white/40'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    if (window.lenis) {
      window.lenis.stop();
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#F5F5EE] border border-black/15 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            data-lenis-prevent
            style={{ overscrollBehavior: 'contain' }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full border border-black/10 bg-white/40 flex items-center justify-center text-black hover:text-[#F04A00] hover:border-black/30 transition-colors"
            >
              <X size={16} />
            </button>

            {project.images && project.images.length > 0 ? (
              <ImageCarousel images={project.images} alt={project.label} />
            ) : project.image ? (
              <div className="w-full aspect-[16/9] overflow-hidden border-b border-black/[0.06]">
                <img src={project.image} alt={project.label} className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="p-8 md:p-10">
              <span className="text-black/50 text-xs">{project.id} · {project.year}</span>
              <h3 className="text-black font-medium text-2xl md:text-3xl leading-tight mt-2 mb-2">
                {project.label}
              </h3>
              <p className="text-black/60 text-xs uppercase tracking-wide mb-6">{project.category}</p>

              <p className="text-black/70 text-sm leading-relaxed mb-8 whitespace-pre-line">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-black/70 border border-black/[0.1] rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WebDevPage() {
  const { navigate } = useRouter();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="wdp-root">
      {/* Back bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button className="page-back-cta" onClick={() => navigate('')}>Get Started</button>
      </div>

      {/* Hero heading */}
      <div className="wdp-hero">
        <p className="wdp-eyebrow">Web Development Portfolio</p>
        <h1 className="wdp-title">
          Websites that <span className="hp-glow">outperform</span><br />the competition.
        </h1>
        <p className="wdp-sub">High-performance web applications engineered for speed, conversion, and scale.</p>
      </div>

      {/* 1. MacBook reveal */}
      <MacbookScrollDemo />

      <div className="wdp-content-wrap">
        {/* 2. Horizontal scroll strip */}
        <section className="wdp-section wdp-hscroll-section">
        <div className="wdp-section-head">
          <span className="wdp-section-label">Featured Builds</span>
          <h2 className="wdp-section-h2">Scroll through our work</h2>
        </div>
        <div className="wdp-hscroll">
          {webProjects.map((p, i) => (
            <div key={i} className="wdp-hcard" onClick={() => setSelectedProject(p)}>
              <div className="wdp-hcard-img">
                {p.image ? (
                  <img src={p.image} alt={p.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="wdp-placeholder-img"><span>{i + 1}</span></div>
                )}
              </div>
              <div className="wdp-hcard-body">
                <span className="wdp-hcard-label">{p.label}</span>
                <span className="wdp-hcard-tech">{p.tech}</span>
                <p className="wdp-hcard-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bento grid */}
      <section className="wdp-section">
        <div className="wdp-section-head">
          <span className="wdp-section-label">Case Studies</span>
          <h2 className="wdp-section-h2">Projects at a glance</h2>
        </div>
        <div className="wdp-bento-two">
          <div className="wdp-bento-card" onClick={() => setSelectedProject(webProjects[0])}>
            <div
              className="wdp-bento-img"
              style={{ backgroundImage: 'url(/projects/jlr-rangerover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="wdp-bento-caption"><b>Land Rover "House of Brands"</b> · Automotive</div>
          </div>
          <div className="wdp-bento-card" onClick={() => setSelectedProject(webProjects[1])}>
            <div
              className="wdp-bento-img"
              style={{ backgroundImage: 'url(/projects/ecommerce.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="wdp-bento-caption"><b>Storefront & Brand Commerce Builds</b> · E-Commerce</div>
          </div>
        </div>
      </section>

      {/* 4. Floating metric cards */}
      <section className="wdp-section">
        <div className="wdp-section-head">
          <span className="wdp-section-label">By the numbers</span>
          <h2 className="wdp-section-h2">Results that matter</h2>
        </div>
        <div className="wdp-metric-grid">
          {[
            ['340%', 'Conversion Lift', 'Storefront & Brand Commerce Builds'],
            ['<1s', 'Load Time', 'All Projects'],
            ['60 FPS', '3D Rendering Speed', 'Land Rover "House of Brands"']
          ].map(([v, l, s]) => (
            <div key={l} className="wdp-metric-card">
              <span className="wdp-metric-val">{v}</span>
              <span className="wdp-metric-label">{l}</span>
              <span className="wdp-metric-sub">{s}</span>
            </div>
          ))}
        </div>
      </section>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
