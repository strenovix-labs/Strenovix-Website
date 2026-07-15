import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * segments: Array<{ text: string, className: string }>
 */
export default function WordsPullUpMultiStyle({ segments, containerClassName = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  // Build a flat list of { word, className } pairs
  const allWords = segments.flatMap(({ text, className }) =>
    text.split(' ').filter(Boolean).map((word) => ({ word, className }))
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${containerClassName}`}>
      {allWords.map(({ word, className }, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
