"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./hero-parallax.css";

export function HeroParallax({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const firstRow  = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow  = products.slice(10, 15);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX        = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]),   springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]),  springConfig);
  const rotateX           = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]),   springConfig);
  const opacity           = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),  springConfig);
  const rotateZ           = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]),   springConfig);
  const translateY        = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  if (isMobile) {
    return (
      <div className="hp-root hp-mobile">
        <HPHeader />
        <div className="hp-grid-wrap">
          <div className="hp-grid">
            {products.map(p => (
              <ProductCard
                key={p.title}
                product={p}
                onOpenModal={setSelectedProduct}
                isMobile={true}
              />
            ))}
          </div>
        </div>
        <ProjectModal project={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    );
  }

  return (
    <div ref={ref} className="hp-root">
      <HPHeader />
      <div className="hp-perspective-wrap">
        <motion.div className="hp-body" style={{ rotateX, rotateZ, translateY, opacity }}>
          <motion.div className="hp-row">
            {firstRow.map(p  => <ProductCard key={p.title} product={p} translate={translateX} onOpenModal={setSelectedProduct} />)}
          </motion.div>
          <motion.div className="hp-row">
            {secondRow.map(p => <ProductCard key={p.title} product={p} translate={translateXReverse} onOpenModal={setSelectedProduct} />)}
          </motion.div>
          <motion.div className="hp-row">
            {thirdRow.map(p  => <ProductCard key={p.title} product={p} translate={translateX} onOpenModal={setSelectedProduct} />)}
          </motion.div>
        </motion.div>
      </div>
      
      <ProjectModal project={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

function HPHeader() {
  return (
    <div className="hp-header">
      <p className="hp-eyebrow">App Development Portfolio</p>
      <h1 className="hp-title">
        Apps we've built that<br />
        <span className="hp-glow">define categories.</span>
      </h1>
      <p className="hp-sub">
        World-class mobile applications engineered for performance, delight, and real-world impact.
      </p>
    </div>
  );
}

function ProductCard({ product, translate, onOpenModal, isMobile = false }) {
  const hasModal = !!product.description;
  const hasLink = !hasModal && !!product.link;
  const isExternal = hasLink && (product.link.startsWith("http://") || product.link.startsWith("https://"));

  const handleCardClick = (e) => {
    if (hasModal) {
      e.preventDefault();
      onOpenModal(product);
    }
  };

  const CardElement = hasLink ? motion.a : hasModal ? motion.button : motion.div;
  const extraProps = hasLink
    ? {
        href: product.link,
        target: isExternal ? "_blank" : undefined,
        rel: isExternal ? "noopener noreferrer" : undefined,
        "aria-label": `${product.title} (Opens in new tab)`
      }
    : hasModal
    ? {
        type: "button",
        onClick: handleCardClick,
        "aria-haspopup": "dialog",
        "aria-label": `View details for ${product.title}`
      }
    : {};

  const styleProp = isMobile ? {} : { x: translate };
  const hoverProp = (!isMobile && (hasLink || hasModal)) ? { y: -20 } : {};

  return (
    <CardElement
      className={`hp-card ${!hasLink && !hasModal ? 'hp-card-no-link' : ''}`}
      style={styleProp}
      whileHover={hoverProp}
      {...extraProps}
    >
      <div className="hp-card-link-row">
        <span className="hp-card-title">
          {product.title}
          {hasLink && isExternal && (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </div>
      <div className="hp-img-wrap">
        <img src={product.thumbnail} alt="" className="hp-img" loading="lazy" />
      </div>
    </CardElement>
  );
}

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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-black/80 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F04A00]"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-black/80 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F04A00]"
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
              className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-white w-3' : 'bg-white/40'} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F04A00] focus-visible:ring-offset-2`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const originalActiveElement = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    if (window.lenis) {
      window.lenis.stop();
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const focusTimeout = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener('keydown', onKey);
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimeout);
      if (originalActiveElement && typeof originalActiveElement.focus === 'function') {
        originalActiveElement.focus();
      }
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full border border-black/10 bg-white/40 flex items-center justify-center text-black hover:text-[#F04A00] hover:border-black/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F04A00] focus-visible:ring-offset-2"
            >
              <X size={16} />
            </button>

            {project.images && project.images.length > 0 ? (
              <ImageCarousel images={project.images} alt={project.title} />
            ) : project.thumbnail ? (
              <div className="w-full aspect-[16/9] overflow-hidden border-b border-black/[0.06]">
                <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="p-8 md:p-10 text-left">
              <span className="text-black/50 text-xs">{project.year}</span>
              <h3 id="modal-title" className="text-black font-medium text-2xl md:text-3xl leading-tight mt-2 mb-2">
                {project.title}
              </h3>
              <p className="text-black/60 text-xs uppercase tracking-wide mb-6">{project.category}</p>

              <p className="text-black/70 text-sm leading-relaxed mb-8">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
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
