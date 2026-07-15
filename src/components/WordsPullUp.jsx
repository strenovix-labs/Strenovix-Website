import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function WordsPullUp({ text, className = '', showAsterisk = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {isLast && showAsterisk && (
                <sup className="absolute" style={{ top: '0.65em', right: '-0.3em', fontSize: '0.31em' }}>
                  *
                </sup>
              )}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
