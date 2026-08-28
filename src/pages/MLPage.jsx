import { useState, useEffect } from 'react';
import { useRouter } from '../RouterContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Cpu, Activity, Image as ImageIcon, Layers } from 'lucide-react';
import './AppDevPage.css';
import './MLPage.css';

const models = [
  {
    id: 'transformers',
    name: 'Transformers',
    icon: Cpu,
    accent: '#000000',
    arch: 'Self-Attention · Multi-Head · Encoder-Decoder',
    desc: "We've fine-tuned BERT, GPT and T5 variants for NLP tasks including sentiment analysis, entity extraction, Q&A, and code generation at production scale.",
    useCases: ['Text Classification', 'Summarisation', 'Code Generation', 'Question Answering'],
    metrics: [['94%', 'F1 Score'], ['12M', 'Tokens/day'], ['<40ms', 'Inference']],
  },
  {
    id: 'lstm',
    name: 'LSTM Networks',
    icon: Activity,
    accent: '#000000ff',
    arch: 'Bidirectional · Stacked · Attention-augmented',
    desc: 'Long Short-Term Memory networks trained for time series forecasting, stock prediction, anomaly detection and sequential recommendation systems.',
    useCases: ['Time Series Forecasting', 'Anomaly Detection', 'Speech Recognition', 'Recommendation'],
    metrics: [['91%', 'Forecast Accuracy'], ['6M', 'Seq/day'], ['±2%', 'MAPE'],],
  },
  {
    id: 'cnn',
    name: 'CNN Models',
    icon: ImageIcon,
    accent: '#000000ff',
    arch: 'ResNet · EfficientNet · Custom Conv Stacks',
    desc: 'Convolutional neural networks for image classification, real-time object detection, medical imaging diagnosis and visual quality inspection.',
    useCases: ['Image Classification', 'Object Detection', 'Medical Imaging', 'Quality Control'],
    metrics: [['98.2%', 'Top-1 Acc'], ['60fps', 'Real-time Det.'], ['0.94', 'AUC-ROC']],
  },
  {
    id: 'nn',
    name: 'Deep Neural Networks',
    icon: Layers,
    accent: '#000000ff',
    arch: 'MLP · Residual · Attention · Custom',
    desc: 'Deep feedforward and residual networks for tabular prediction, fraud detection, personalisation and regression problems across industries.',
    useCases: ['Fraud Detection', 'Price Prediction', 'Customer Churn', 'Personalisation'],
    metrics: [['89%', 'Precision'], ['2ms', 'Latency'], ['4× ROI', 'on avg.']],
  },
];

const PROJECTS = [
  {
    id: '01',
    title: 'GNSS Error Prediction Engine',
    modalTitle: 'ISRO: Satellite Orbit & Clock Error Correction ',
    desc: 'Stacks LightGBM with deep learning models to predict satellite orbit and clock errors ahead of time (ISRO collaboration).',
    tag: 'Deep Learning',
    category: 'GNSS Error Prediction Engine',
    description: "Built in collaboration with ISRO, this engine predicts satellite orbit and clock errors ahead of time instead of correcting for them after the fact. A 3-tier ensemble stacks LightGBM with deep learning models trained on historical GNSS telemetry, tightening the error margins that downstream navigation and positioning systems ultimately depend on.",
    tags: ['3-Tier Ensemble', 'LightGBM', 'Deep Learning'],
    year: '2026',
    image: '/projects/gnss.jpg',
    images: [
      '/projects/gnss.jpg',
      '/projects/gnss-dashboard.png',
      '/projects/gnss-table.png',
      '/projects/gnss-clock.png',
      '/projects/gnss-ephemeris.png'
    ],
  },
  {
    id: '02',
    title: 'DocRift',
    modalTitle: 'DocRift',
    desc: 'A team of specialized LangGraph agents that reads a codebase to find documentation drift, powered by Gemini AI.',
    tag: 'AI Agents',
    category: 'Multi-Agent Documentation & Code Analysis Platform',
    description: 'A team of specialized LangGraph agents that reads a codebase the way a senior engineer would, crawling the repository through the GitHub API, cross-referencing source against existing docs, and flagging drift: outdated explanations, undocumented functions, mismatched examples. Gemini AI powers the reasoning layer that turns raw code diffs into plain-English documentation fixes, so docs stay in sync with the code instead of quietly rotting.',
    tags: ['LangGraph', 'GitHub API', 'Gemini AI'],
    year: '2025',
    image: '/projects/docrift.jpg',
    images: [
      '/projects/docrift.jpg',
      '/projects/docrift-dashboard.jpg',
      '/projects/docrift-generate.jpg',
      '/projects/docrift-github.jpg',
      '/projects/docrift-features.jpg',
      '/projects/docrift-login.jpg'
    ],
  },
  {
    id: '03',
    title: 'Face Recog Admission',
    modalTitle: 'Face Recognition Attendance System',
    desc: 'A real-time computer vision pipeline running in active departmental use, using InsightFace and a FastAPI backend.',
    tag: 'Computer Vision',
    category: 'Live Department Deployment: Real-Time Vision Pipeline',
    description: 'A real-time computer vision pipeline running in active departmental use, where InsightFace handles detection and face embedding, a FastAPI backend serves recognition requests with sub-second latency, and SQLite in WAL mode keeps attendance writes consistent even with multiple entry points hitting it concurrently. Replaced manual roll-call with a walk-up-and-go system that has been running in production without a single missed check-in.',
    tags: ['InsightFace', 'FastAPI', 'SQLite WAL'],
    year: '2026',
    image: '/projects/face-attendance.jpg',
    images: [
      '/projects/face-attendance.jpg',
      '/projects/face-attendance-add.jpg',
      '/projects/face-attendance-capture.jpg'
    ],
  },
  {
    id: '04',
    title: 'Meiyo',
    modalTitle: 'Meiyo',
    desc: 'An image forensics tool built to detect manipulated and AI-generated photos using Error Level Analysis with 93% accuracy.',
    tag: 'Image Forensics',
    category: 'AI Image Forensics Detector: 93% Detection Accuracy',
    description: "An image forensics tool built to answer one question: is this photo real? Meiyo pairs a MobileNetV2 classifier with Error Level Analysis to surface compression and manipulation artefacts invisible to the naked eye, catching AI-generated and digitally altered images with 93% detection accuracy across benchmark testing, fast enough to run as a first-pass filter, not just a lab experiment.",
    tags: ['MobileNetV2', 'Error Level Analysis'],
    year: '2025',
    image: '/projects/meiyo.jpg',
    images: [
      '/projects/meiyo.jpg',
      '/projects/meiyo-analyzing.jpg',
      '/projects/meiyo-manipulated.jpg',
      '/projects/meiyo-forensics.jpg',
      '/projects/meiyo-authentic.jpg',
      '/projects/meiyo-authentic-forensics.jpg'
    ],
  },
  {
    id: '05',
    title: 'Medical RAG',
    modalTitle: 'Medical RAG Chatbot',
    desc: 'An AI medical assistant built on a Retrieval-Augmented Generation pipeline grounded in medical literature via FAISS.',
    tag: 'RAG / LLMs',
    category: '2nd Place: Hack-a-Cure 2025, VIT Chennai (100+ teams)',
    description: "An AI medical assistant built on a Retrieval-Augmented Generation pipeline: every answer is grounded in a curated corpus of medical literature via FAISS vector search, then reasoned over and phrased by Gemini AI so responses stay accurate instead of hallucinated. Built in a 24-hour hackathon sprint, it placed 2nd out of 100+ teams at Hack-a-Cure 2025, standing out to judges for retrieval precision and how confidently it handled edge-case medical queries under live testing.",
    tags: ['LangChain', 'FAISS', 'Gemini AI'],
    year: '2025',
    image: '/projects/medical-rag.jpg',
    images: [
      '/projects/medical-rag.jpg',
      '/projects/medical-rag-chat.jpg',
      '/projects/medical-rag-unsupported.jpg',
      '/projects/medical-rag-quota.jpg'
    ],
  }
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
              <ImageCarousel images={project.images} alt={project.title} />
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

export default function MLPage() {
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
    <div className="ml-root">
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
      <div className="ml-hero">
        <span className="ml-eyebrow">ML Training Portfolio</span>
        <h1 className="ml-title">
          Intelligence we've<br /><span className="ml-glow">engineered from scratch.</span>
        </h1>
        <p className="ml-sub">
          Custom model training across Transformers, LSTM, CNN and Deep Neural Networks, solving real business problems with AI.
        </p>
      </div>

      {/* Neural net animation banner */}
      <div className="ml-network-banner">
        <NetworkViz />
      </div>

      {/* Model cards */}
      <div className="ml-models">
        {models.map((m) => (
          <div key={m.id} className="ml-model-card" style={{ '--accent': m.accent }}>
            <div className="ml-model-header">
              <div className="ml-model-icon" style={{ background: '#F04A0015' }}>
                <m.icon color="#F04A00" size={24} strokeWidth={2} />
              </div>
              <div>
                <h2 className="ml-model-name">{m.name}</h2>
                <span className="ml-model-arch">{m.arch}</span>
              </div>
            </div>
            <p className="ml-model-desc">{m.desc}</p>
            <div className="ml-use-cases">
              {m.useCases.map(u => <span key={u} className="ml-uc-tag">{u}</span>)}
            </div>
            <div className="ml-metrics">
              {m.metrics.map(([v, l]) => (
                <div key={l} className="ml-metric">
                  <span className="ml-metric-val">{v}</span>
                  <span className="ml-metric-lbl">{l}</span>
                </div>
              ))}
            </div>
            <div className="ml-accent-bar" style={{ background: m.accent }} />
          </div>
        ))}
      </div>

      {/* Projects showcase */}
      <div className="ml-projects">
        <h2 className="ml-proj-heading">Projects we've shipped</h2>
        <div className="ml-proj-grid">
          {PROJECTS.map((proj) => (
            <div key={proj.title} className="ml-proj-card" onClick={() => setSelectedProject(proj)}>
              <div 
                className="ml-proj-img" 
                style={proj.image ? { backgroundImage: `url(${proj.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
              <div className="ml-proj-body">
                <span className="ml-proj-tag">{proj.tag}</span>
                <h3 className="ml-proj-title">{proj.title}</h3>
                <p className="ml-proj-desc">{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

/* Animated neural network visualisation */
function NetworkViz() {
  const layers = [3, 5, 5, 3];
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <svg className="ml-nn-svg" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {layers.map((count, li) => {
        const x = 80 + li * 150;
        return Array.from({ length: count }, (_, ni) => {
          const y = 90 - ((count - 1) * 30) / 2 + ni * 30;
          const isNodeHovered = hoveredNode !== null && hoveredNode.li === li && hoveredNode.ni === ni;

          return (
            <g 
              key={`${li}-${ni}`}
              onMouseEnter={() => setHoveredNode({ li, ni })}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* connections to next layer */}
              {li < layers.length - 1 && Array.from({ length: layers[li + 1] }, (_, nj) => {
                const nx = x + 150;
                const ny = 90 - ((layers[li + 1] - 1) * 30) / 2 + nj * 30;
                
                const isLineActive = hoveredNode !== null && (
                  (hoveredNode.li === li && hoveredNode.ni === ni) ||
                  (hoveredNode.li === li + 1 && hoveredNode.ni === nj)
                );

                const strokeColor = isLineActive ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.08)';
                const strokeWidth = isLineActive ? 2 : 1;
                const pulseColor = isLineActive ? '#000000' : 'rgba(0, 0, 0, 0.25)';
                const pulseRadius = isLineActive ? 2.5 : 1.5;

                // Speed up active lines
                const dur = isLineActive ? '0.6s' : `${1.2 + ((ni + nj) % 4) * 0.4}s`;
                const begin = `${((ni * 3 + nj * 7) % 10) * 0.2}s`;
                
                return (
                  <g key={nj}>
                    <line
                      x1={x} y1={y} x2={nx} y2={ny}
                      stroke={strokeColor} strokeWidth={strokeWidth}
                      className={`nn-line nn-line-${li}-${ni}-${nj}`}
                      style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                    />
                    {/* Signal pulse */}
                    <circle r={pulseRadius} fill={pulseColor} style={{ transition: 'fill 0.2s, r 0.2s' }}>
                      <animateMotion
                        path={`M ${x} ${y} L ${nx} ${ny}`}
                        dur={dur}
                        repeatCount="indefinite"
                        begin={begin}
                      />
                    </circle>
                  </g>
                );
              })}
              
              {/* Outer pulsing ripple ring */}
              <circle cx={x} cy={y} r="10" fill="none" stroke={isNodeHovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)'} strokeWidth="1" style={{ transition: 'stroke 0.2s' }}>
                <animate attributeName="r" values={isNodeHovered ? '10;26' : '10;22'} dur={isNodeHovered ? '1s' : `${2 + ((li + ni) % 3) * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur={isNodeHovered ? '1s' : `${2 + ((li + ni) % 3) * 0.5}s`} repeatCount="indefinite" />
              </circle>

              {/* Node core glow */}
              <circle cx={x} cy={y} r="10" fill={isNodeHovered ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.05)'} stroke={isNodeHovered ? '#000000' : 'rgba(0, 0, 0, 0.2)'} strokeWidth="1" style={{ transition: 'fill 0.2s, stroke 0.2s' }}>
                <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5 + ((li + ni) % 3) * 0.4}s`} repeatCount="indefinite" />
              </circle>

              {/* Inner solid node */}
              <circle cx={x} cy={y} r={isNodeHovered ? 7 : 5} fill="#000000" style={{ transition: 'fill 0.2s, r 0.2s' }} />

              {/* Large invisible hover target for easier mouse interaction */}
              <circle cx={x} cy={y} r="20" fill="transparent" pointerEvents="all" />
            </g>
          );
        });
      })}
      
      {/* Dynamic labels */}
      <text x="80"  y="165" fill="rgba(0, 0, 0, 0.5)" fontSize="10" textAnchor="middle" fontFamily="Syne">Input</text>
      <text x="230" y="165" fill="rgba(0, 0, 0, 0.5)" fontSize="10" textAnchor="middle" fontFamily="Syne">Hidden</text>
      <text x="380" y="165" fill="rgba(0, 0, 0, 0.5)" fontSize="10" textAnchor="middle" fontFamily="Syne">Hidden</text>
      <text x="530" y="165" fill="rgba(0, 0, 0, 0.5)" fontSize="10" textAnchor="middle" fontFamily="Syne">Output</text>
    </svg>
  );
}
