import { useState, useEffect } from 'react';
import { useRouter } from '../RouterContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Server, Code, Layout, Share2 } from 'lucide-react';
import './AppDevPage.css';
import './SAPPage.css';

const sapModules = [
  {
    id: 's4hana',
    name: 'S/4HANA & ECC Core',
    icon: Server,
    accent: '#000000',
    arch: 'ERP Core · Custom Workflows · Module Config',
    desc: 'Deep configuration and extension of core SAP modules including FICO, MM, SD, and PP, optimized for modern business processes.',
    useCases: ['Core ERP Implementation', 'Process Automation', 'Custom Workflows', 'Financial Consolidation'],
    metrics: [['35%', 'Process Speedup'], ['100%', 'Compliance'], ['Zero', 'Core Disruptions']],
  },
  {
    id: 'abap',
    name: 'ABAP Development',
    icon: Code,
    accent: '#000000ff',
    arch: 'OO-ABAP · RESTful Application Programming (RAP) · Cloud Edition',
    desc: 'High-performance custom ABAP development, building scalable reports, enhancements, BADIs, BAPIs, and APIs on legacy and modern SAP stacks.',
    useCases: ['Custom Enhancement', 'API Enablement', 'Batch Processing', 'Legacy Modernisation'],
    metrics: [['50%', 'Dev Efficiency'], ['Sub-sec', 'DB Latency'], ['Clean Core', 'Architecture']],
  },
  {
    id: 'fiori',
    name: 'SAP Fiori & UX',
    icon: Layout,
    accent: '#000000ff',
    arch: 'SAPUI5 · Fiori Elements · Custom Web Apps',
    desc: 'Designing and building intuitive, mobile-responsive user interfaces with SAPUI5 and Fiori Elements, transforming complex screens into simple workflows.',
    useCases: ['Mobile-first Fiori Apps', 'Launchpad Setup', 'Persona-based UX', 'Offline Capabilities'],
    metrics: [['4.8★', 'User Adoption'], ['60%', 'Training Reduction'], ['Fully', 'Responsive']],
  },
  {
    id: 'btp',
    name: 'SAP BTP & Cloud Integration',
    icon: Share2,
    accent: '#000000ff',
    arch: 'Integration Suite · Extension Suite · SAP HANA Cloud',
    desc: 'Connecting SAP with third-party SaaS applications, building side-by-side extensions, and deploying cloud-native enterprise services on SAP BTP.',
    useCases: ['Hybrid Cloud Connect', 'Side-by-Side Apps', 'API Management', 'Enterprise Analytics'],
    metrics: [['99.99%', 'API Uptime'], ['Real-time', 'Data Sync'], ['10+', 'SaaS Connectors']],
  },
];

function ImageCarousel({ images, alt, className = "" }) {
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
    <div className={`relative w-full overflow-hidden bg-black group/carousel ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIdx}
          src={images[currentIdx]}
          alt={`${alt} - Slide ${currentIdx + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full object-cover object-top"
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

const PROJECTS = [
  {
    id: '01',
    title: 'SAP Sales Risk Intelligence',
    modalTitle: 'SAP Sales Risk Intelligence',
    desc: 'An AI-powered order-to-cash intelligence platform analyzing SAP sales orders in real-time to identify fulfillment risks across inventory, credit, and delivery.',
    tag: 'Order Intelligence',
    category: 'AI-Powered Order-to-Cash Intelligence',
    description: 'A proactive order intelligence platform that analyzes SAP sales orders in real time, identifying fulfillment risks across inventory, credit, and delivery. The system automatically scores and prioritizes high-risk orders, explains the root causes, and recommends corrective actions such as finance approval, prioritized picking, partial shipment, or expedited delivery. What-if simulations show the expected impact before an action is taken, helping teams turn SAP transactional data into faster, smarter fulfillment decisions.',
    tags: ['SAP Integration', 'AI Risk Engine', 'Order Intelligence'],
    year: '2026',
    image: '/projects/sap-risk-dashboard-main.png',
    images: [
      '/projects/sap-risk-dashboard-main.png',
      '/projects/sap-risk-kpis.png',
      '/projects/sap-risk-analysis.png',
      '/projects/sap-risk-simulation.png',
      '/projects/sap-risk-all-orders.png'
    ],
  },
];

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
              <ImageCarousel images={project.images} alt={project.title} className="aspect-[16/9] border-b border-black/[0.06]" />
            ) : project.image ? (
              <div className="w-full aspect-[16/9] overflow-hidden border-b border-black/[0.06]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="p-8 md:p-10">
              <span className="text-black/50 text-xs">{project.id} · {project.year}</span>
              <h3 className="text-black font-medium text-2xl md:text-3xl leading-tight mt-2 mb-2">
                {project.modalTitle || project.title}
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

export default function SAPPage() {
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
    <div className="sap-root">
      {/* Back bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button className="page-back-cta" onClick={() => navigate('')}>Get Started</button>
      </div>

      {/* Hero */}
      <div className="sap-hero">
        <span className="sap-eyebrow">SAP Implementation Portfolio</span>
        <h1 className="sap-title">
          Enterprise ERP<br /><span className="sap-glow">integrated flawlessly.</span>
        </h1>
        <p className="sap-sub">
          Custom ABAP development, Fiori UX design, and cloud integrations on SAP BTP, ensuring your core ERP runs cleanly and scales seamlessly.
        </p>
      </div>

      {/* Architecture visualization banner */}
      <div className="sap-network-banner">
        <ArchViz />
      </div>

      {/* SAP modules cards */}
      <div className="sap-models">
        {sapModules.map((m) => (
          <div key={m.id} className="sap-model-card" style={{ '--accent': m.accent }}>
            <div className="sap-model-header">
              <div className="sap-model-icon" style={{ background: '#F04A0015' }}>
                <m.icon color="#F04A00" size={24} strokeWidth={2} />
              </div>
              <div>
                <h2 className="sap-model-name">{m.name}</h2>
                <span className="sap-model-arch">{m.arch}</span>
              </div>
            </div>
            <p className="sap-model-desc">{m.desc}</p>
            <div className="sap-use-cases">
              {m.useCases.map(u => <span key={u} className="sap-uc-tag">{u}</span>)}
            </div>
            <div className="sap-metrics">
              {m.metrics.map(([v, l]) => (
                <div key={l} className="sap-metric">
                  <span className="sap-metric-val">{v}</span>
                  <span className="sap-metric-lbl">{l}</span>
                </div>
              ))}
            </div>
            <div className="sap-accent-bar" style={{ background: m.accent }} />
          </div>
        ))}
      </div>

      {/* Projects showcase */}
      <div className="sap-projects">
        <h2 className="sap-proj-heading">Projects we've shipped</h2>
        <div className="sap-proj-grid">
          {PROJECTS.map((proj) => (
            <div key={proj.title} className="sap-proj-card" onClick={() => setSelectedProject(proj)}>
              {proj.image ? (
                <div 
                  className="sap-proj-img" 
                  style={{ backgroundImage: `url(${proj.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              ) : (
                <div className="sap-proj-img-fallback">
                  <span className="sap-proj-num">{proj.id}</span>
                  <span className="sap-proj-year">{proj.year}</span>
                </div>
              )}
              <div className="sap-proj-body">
                <span className="sap-proj-tag">{proj.tag}</span>
                <h3 className="sap-proj-title">{proj.title}</h3>
                <p className="sap-proj-desc">{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

/* Animated Enterprise Architecture Visualisation */
function ArchViz() {
  const [hoveredNode, setHoveredNode] = useState(null);
  
  // Landscape nodes
  const nodes = [
    { id: 'core', label: 'S/4HANA Core', x: 300, y: 90, r: 24, color: '#F04A00', fontStyle: 'bold' },
    { id: 'btp', label: 'SAP BTP', x: 150, y: 50, r: 16, color: '#000000', fontStyle: 'normal' },
    { id: 'fiori', label: 'Fiori UX', x: 450, y: 50, r: 16, color: '#000000', fontStyle: 'normal' },
    { id: 'saas', label: 'External SaaS', x: 150, y: 130, r: 16, color: '#000000', fontStyle: 'normal' },
    { id: 'mobile', label: 'Mobile Apps', x: 450, y: 130, r: 16, color: '#000000', fontStyle: 'normal' }
  ];

  // Connections mapping: [from, to]
  const connections = [
    { from: 'btp', to: 'core' },
    { from: 'fiori', to: 'core' },
    { from: 'saas', to: 'btp' },
    { from: 'mobile', to: 'fiori' },
    { from: 'mobile', to: 'core' }
  ];

  return (
    <svg className="sap-nn-svg" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Draw connections first (behind nodes) */}
      {connections.map((conn, idx) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        const isLineActive = hoveredNode !== null && (
          hoveredNode === conn.from || hoveredNode === conn.to
        );

        const strokeColor = isLineActive ? 'rgba(240, 74, 0, 0.4)' : 'rgba(0, 0, 0, 0.08)';
        const strokeWidth = isLineActive ? 2 : 1;
        const pulseColor = isLineActive ? '#F04A00' : 'rgba(0, 0, 0, 0.2)';
        const pulseRadius = isLineActive ? 2.5 : 1.5;
        const dur = isLineActive ? '0.8s' : `${1.5 + (idx % 3) * 0.4}s`;
        const begin = `${(idx * 0.3) % 1}s`;

        return (
          <g key={`conn-${idx}`}>
            <line
              x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
              stroke={strokeColor} strokeWidth={strokeWidth}
              style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
            />
            {/* Signal pulse */}
            <circle r={pulseRadius} fill={pulseColor} style={{ transition: 'fill 0.2s, r 0.2s' }}>
              <animateMotion
                path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                dur={dur}
                repeatCount="indefinite"
                begin={begin}
              />
            </circle>
          </g>
        );
      })}

      {/* Draw nodes */}
      {nodes.map((node) => {
        const isNodeHovered = hoveredNode === node.id;
        
        return (
          <g 
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Pulsing Ripple */}
            <circle 
              cx={node.x} cy={node.y} 
              r={node.r} 
              fill="none" 
              stroke={isNodeHovered ? 'rgba(240, 74, 0, 0.4)' : 'rgba(0, 0, 0, 0.08)'} 
              strokeWidth="1" 
              style={{ transition: 'stroke 0.2s' }}
            >
              <animate attributeName="r" values={`${node.r};${node.r + 14}`} dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
            </circle>

            {/* Core container */}
            <circle 
              cx={node.x} cy={node.y} 
              r={node.r} 
              fill={isNodeHovered ? 'rgba(240, 74, 0, 0.08)' : 'rgba(0, 0, 0, 0.03)'} 
              stroke={isNodeHovered ? '#F04A00' : 'rgba(0, 0, 0, 0.15)'} 
              strokeWidth="1" 
              style={{ transition: 'fill 0.2s, stroke 0.2s' }}
            />

            {/* Inner solid center */}
            <circle 
              cx={node.x} cy={node.y} 
              r={node.r * 0.4} 
              fill={node.color} 
            />

            {/* Node label */}
            <text 
              x={node.x} 
              y={node.y + node.r + 15} 
              fill={isNodeHovered ? '#F04A00' : 'rgba(0, 0, 0, 0.6)'} 
              fontSize="9" 
              textAnchor="middle" 
              fontFamily="Syne"
              fontWeight={node.fontStyle === 'bold' ? 'bold' : 'normal'}
              style={{ transition: 'fill 0.2s' }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
