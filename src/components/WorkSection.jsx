import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const FLAGSHIP = {
  title: 'NEYAM & VoteAble',
  tagline: "Tamil Nadu's first digital accessibility initiative for elections",
  category: 'Flagship Project — Built under the guidance of the Dindigul District Collector for the 2026 Legislative Assembly Election',
  description:
    "A two-app system built to make voting genuinely accessible for differently-abled citizens. NEYAM is the citizen-facing app — voters locate polling stations, request assistance, register, and raise complaints through a conversational chatbot flow, in English and Tamil. VoteAble is the companion admin app used by RO/ARO and BLO officers to track requests, visualize voter locations on a map, and route cases for resolution. Officially inaugurated at the District Collector's Office and covered across regional news outlets.",
  stats: [
    { label: 'Installs', value: '3.56K+' },
    { label: 'Total queries handled', value: '10K+' },
    { label: 'DAP voting participation', value: '82%' },
    { label: 'Dindigul voter turnout', value: '86%' },
  ],
  tags: ['React Native', 'Node.js', 'Maps & Geolocation', 'Real-time Dashboards'],
  image: '/projects/neyam-cover.jpg',
  image2: '/projects/neyam-phones.jpg',
};

const PROJECTS = [
  {
    id: '01',
    title: 'ISRO — Satellite Orbit & Clock Error Correction ',
    category: 'GNSS Error Prediction Engine',
    description:
      "Built in collaboration with ISRO, this engine predicts satellite orbit and clock errors ahead of time instead of correcting for them after the fact. A 3-tier ensemble stacks LightGBM with deep learning models trained on historical GNSS telemetry, tightening the error margins that downstream navigation and positioning systems ultimately depend on.",
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
    category: 'Multi-Agent Documentation & Code Analysis Platform',
    description:
      'A team of specialized LangGraph agents that reads a codebase the way a senior engineer would — crawling the repository through the GitHub API, cross-referencing source against existing docs, and flagging drift: outdated explanations, undocumented functions, mismatched examples. Gemini AI powers the reasoning layer that turns raw code diffs into plain-English documentation fixes, so docs stay in sync with the code instead of quietly rotting.',
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
    title: 'Face Recognition Attendance System',
    category: 'Live Department Deployment — Real-Time Vision Pipeline',
    description:
      'A real-time computer vision pipeline running in active departmental use — InsightFace handles detection and face embedding, a FastAPI backend serves recognition requests with sub-second latency, and SQLite in WAL mode keeps attendance writes consistent even with multiple entry points hitting it concurrently. Replaced manual roll-call with a walk-up-and-go system that has been running in production without a single missed check-in.',
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
    category: 'AI Image Forensics Detector — 93% Detection Accuracy',
    description:
      "An image forensics tool built to answer one question: is this photo real? Meiyo pairs a MobileNetV2 classifier with Error Level Analysis to surface compression and manipulation artefacts invisible to the naked eye, catching AI-generated and digitally altered images with 93% detection accuracy across benchmark testing — fast enough to run as a first-pass filter, not just a lab experiment.",
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
    title: 'Medical RAG Chatbot',
    category: '2nd Place — Hack-a-Cure 2025, VIT Chennai (100+ teams)',
    description:
      "An AI medical assistant built on a Retrieval-Augmented Generation pipeline — every answer is grounded in a curated corpus of medical literature via FAISS vector search, then reasoned over and phrased by Gemini AI so responses stay accurate instead of hallucinated. Built in a 24-hour hackathon sprint, it placed 2nd out of 100+ teams at Hack-a-Cure 2025, standing out to judges for retrieval precision and how confidently it handled edge-case medical queries under live testing.",
    tags: ['LangChain', 'FAISS', 'Gemini AI'],
    year: '2025',
    image: '/projects/medical-rag.jpg',
    images: [
      '/projects/medical-rag.jpg',
      '/projects/medical-rag-chat.jpg',
      '/projects/medical-rag-unsupported.jpg',
      '/projects/medical-rag-quota.jpg'
    ],
  },
  {
    id: '06',
    title: 'Storefront & Brand Commerce Builds',
    category: 'E-Commerce UI/UX — Fashion & Streetwear Storefronts',
    description:
      "A series of e-commerce storefronts built for fashion and streetwear brands — React and Tailwind front-ends with Framer Motion micro-interactions, tuned for conversion rather than just looks: fast product browsing, low-friction checkout, and a visual identity that actually matches each brand instead of feeling like a template.",
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

function FlagshipCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden mb-8 hover:border-white/[0.16] transition-colors duration-300"
    >
      <div className="grid md:grid-cols-2">
        {/* Image side */}
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto">
          <img
            src={FLAGSHIP.image}
            alt={FLAGSHIP.title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
          />
          <img
            src={FLAGSHIP.image2}
            alt=""
            className="hidden md:block absolute bottom-4 right-4 w-[38%] rounded-xl shadow-2xl border border-white/10 object-cover"
          />
        </div>

        {/* Content side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400 mb-4 w-fit border border-amber-400/30 rounded-full px-3 py-1">
            Flagship Project
          </span>
          <h3 className="text-primary font-medium text-3xl md:text-4xl leading-tight mb-2">
            {FLAGSHIP.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{FLAGSHIP.tagline}</p>
          <p className="text-gray-500 text-[11px] mb-4 uppercase tracking-wide">{FLAGSHIP.category}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{FLAGSHIP.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {FLAGSHIP.stats.map((s) => (
              <div key={s.label}>
                <div className="text-primary text-xl font-semibold">{s.value}</div>
                <div className="text-gray-500 text-[11px]">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {FLAGSHIP.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-gray-400 border border-white/[0.1] rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectRow({ project, index, onOpen }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.button
      type="button"
      ref={ref}
      onClick={() => onOpen(project)}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group w-full text-left border-t border-white/[0.06] py-6 md:py-8 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 px-2 rounded-lg"
    >
      <div className="flex items-center gap-6 md:gap-10 min-w-0">
        <span className="text-gray-600 text-xs hidden sm:block">{project.id}</span>
        {project.image && (
          <div className="hidden sm:block w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/[0.08]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-primary font-medium text-lg sm:text-xl md:text-2xl leading-tight group-hover:translate-x-1 transition-transform duration-300 truncate">
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{project.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
        <div className="hidden md:flex gap-2 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-gray-500 border border-white/[0.08] rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-gray-600 text-xs hidden sm:block">{project.year}</span>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight size={13} className="text-primary -rotate-45" />
        </div>
      </div>
    </motion.button>
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
      {/* Active Image */}
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

      {/* Navigation Arrows */}
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

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-white w-3' : 'bg-white/40'
                }`}
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
            className="relative bg-[#0c0c0c] border border-white/[0.08] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            data-lenis-prevent
            style={{ overscrollBehavior: 'contain' }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-gray-400 hover:text-primary hover:border-white/30 transition-colors"
            >
              <X size={16} />
            </button>

            {project.images && project.images.length > 0 ? (
              <ImageCarousel images={project.images} alt={project.title} />
            ) : project.image ? (
              <div className="w-full aspect-[16/9] overflow-hidden border-b border-white/[0.06]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="p-8 md:p-10">
              <span className="text-gray-600 text-xs">{project.id} · {project.year}</span>
              <h3 className="text-primary font-medium text-2xl md:text-3xl leading-tight mt-2 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-6">{project.category}</p>

              <p className="text-gray-400 text-sm leading-relaxed mb-8">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-400 border border-white/[0.1] rounded-full px-3 py-1"
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

export default function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="relative z-10 bg-transparent py-24 px-4 md:px-8" id="work">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <motion.div
            ref={ref}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase block mb-4">
              Selected Work
            </span>
            <h2
              className="font-medium leading-none tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#E1E0CC' }}
            >
              Projects that<br /><span className="font-serif italic text-[#F04A00]">define us.</span>
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-primary/70 text-sm hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            View all
            <ArrowRight size={14} className="-rotate-45" />
          </motion.a>
        </div>

        <FlagshipCard />

        <div>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} onOpen={setSelectedProject} />
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>

      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
