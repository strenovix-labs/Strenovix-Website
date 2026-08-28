import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ChromaGrid from './ChromaGrid';
import ScrollVelocity from './ScrollVelocity';

const teamItems = [
  {
    image: '/team/nivesh.png',
    title: 'Nivesh Varun',
    subtitle: 'ML Engineer · Backend Engineer',
    handle: '@niveshvarun',
    borderColor: '#F04A00',
    gradient: 'linear-gradient(135deg, #000000 0%, #d1d5db 100%)',
    url: ''
  },
  {
    image: '/team/rupesh.png',
    title: 'Rupesh',
    subtitle: 'App Developer · Backend · UI/UX',
    handle: '@rupesh',
    borderColor: '#F04A00',
    gradient: 'linear-gradient(135deg, #000000 0%, #d1d5db 100%)',
    url: ''
  },
  {
    image: '/team/sajan.png',
    title: 'Sajan',
    subtitle: 'Full Stack · Cloud · Agentic AI Engineer',
    handle: '@sajan',
    borderColor: '#F04A00',
    gradient: 'linear-gradient(135deg, #000000 0%, #d1d5db 100%)',
    url: ''
  },
  {
    image: '/team/sanjay.png',
    title: 'Sanjay',
    subtitle: 'SaaS · SAP · ML · App Developer',
    handle: '@sanjay',
    borderColor: '#F04A00',
    gradient: 'linear-gradient(135deg, #000000 0%, #d1d5db 100%)',
    url: '',
    objectPosition: '68% center'
  },
  {
    image: '/team/tamil.png',
    title: 'Tamil',
    subtitle: 'App Developer · Data Analyst · SAP',
    handle: '@tamil',
    borderColor: '#F04A00',
    gradient: 'linear-gradient(135deg, #000000 0%, #d1d5db 100%)',
    url: ''
  },
  {
    image: '/team/vijai-compressed.png',
    title: 'Roobak Vijai',
    subtitle: 'App Developer · Digital Marketing · Backend · UI/UX',
    handle: '@vijai',
    borderColor: '#F04A00',
    gradient: 'linear-gradient(135deg, #000000 0%, #d1d5db 100%)',
    url: ''
  }
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-transparent py-24 px-4 md:px-8 relative overflow-hidden" id="team">
      
      {/* ScrollVelocity in the background spanning edge-to-edge across the screen */}
      <div className="scroll-velocity-container">
        <ScrollVelocity
          texts={['Strenovix', 'Strenovix', 'Strenovix', 'Strenovix', 'Strenovix', 'Strenovix']} 
          velocity={50}
          className=""
          numCopies={12}
          damping={65}
          stiffness={800}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section heading */}
        <motion.div
          ref={ref}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-black/60 text-[10px] sm:text-xs tracking-widest uppercase block mb-4">
            The Collective
          </span>
          <h2
            className="font-medium leading-none tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#000000' }}
          >
            Minds behind<br />the magic.
          </h2>
        </motion.div>

        {/* ChromaGrid in the foreground */}
        <div style={{ minHeight: '600px', position: 'relative' }}>
          <ChromaGrid 
            items={teamItems}
            radius={800}
            damping={2}
            fadeOut={2}
            ease="power3.out"
            columns={3}
            rows={2}
          />
        </div>

      </div>
    </section>
  );
}
