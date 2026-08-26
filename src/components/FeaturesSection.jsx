import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '../RouterContext';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const CARD_EASE = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    number: '01',
    title: 'App Development.',
    route: 'services/app-dev',
    icon: '/services/app-dev.png',
    items: [
      'Cross-platform iOS & Android builds',
      'Performance-optimised React Native',
      'Real-time features & offline sync',
      'App Store & Play Store launch support',
    ],
  },
  {
    number: '02',
    title: 'Web Engineering.',
    route: 'services/web-dev',
    icon: '/services/web-dev.png',
    items: [
      'Cinematic, animation-rich front-ends',
      'Scalable back-end & API architecture',
      'SEO-first, Core Web Vitals optimised',
    ],
  },
  {
    number: '03',
    title: 'AI / ML Solutions.',
    route: 'services/ml',
    icon: '/services/ml-ai.png',
    items: [
      'Custom model training & fine-tuning',
      'Intelligent automation pipelines',
      'Predictive analytics dashboards',
    ],
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { navigate } = useRouter();

  return (
    <motion.div
      ref={ref}
      className="bg-[#F5F5EE] rounded-2xl p-6 flex flex-col justify-between h-full border border-black/15"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ delay: (index + 1) * 0.15, duration: 0.6, ease: CARD_EASE }}
    >
      <div>
        {/* Icon */}
        <img
          src={feature.icon}
          alt={feature.title}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover mb-6"
        />

        {/* Number + title */}
        <div className="flex items-start gap-2 mb-5">
          <span className="text-black/50 text-[10px] mt-1">{feature.number}</span>
          <h3 className="text-black font-medium text-base sm:text-lg leading-tight">
            {feature.title}
          </h3>
        </div>

        {/* Checklist */}
        <ul className="space-y-3">
          {feature.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check size={14} className="text-[#F04A00] mt-0.5 flex-shrink-0" />
              <span className="text-black/70 text-xs sm:text-sm leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn more */}
      <a
        href={`#/${feature.route}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(feature.route);
        }}
        className="inline-flex items-center gap-1 text-black text-xs sm:text-sm mt-8 group cursor-pointer"
      >
        <span>Learn more</span>
        <ArrowRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ transform: 'rotate(-45deg)' }}
        />
      </a>
    </motion.div>
  );
}

function VideoCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden h-full min-h-[260px]"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ delay: 0, duration: 0.6, ease: CARD_EASE }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/Strenovix.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <p
        className="absolute bottom-5 left-5 font-medium text-sm sm:text-base"
        style={{ color: '#ffffff' }}
      >
        Your creative canvas.
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headerSegments = [
    {
      text: 'Studio-grade workflows for visionary builders.',
      className: 'text-black',
    },
    {
      text: 'Built for pure vision. Powered by technology.',
      className: 'text-[#F04A00] font-serif italic',
    },
  ];

  return (
    <section className="min-h-screen bg-transparent py-24 px-4 md:px-8 relative z-10 overflow-hidden" id="services">
      {/* Bg noise */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-14 max-w-3xl">
          <WordsPullUpMultiStyle
            segments={headerSegments}
            containerClassName="justify-start gap-x-[0.25em]"
          />
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-2 lg:h-[480px]">
          <VideoCard />
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.number} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
