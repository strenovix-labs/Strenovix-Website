import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import AnimatedLetter from './AnimatedLetter';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const ABOUT_TEXT =
  'Over the last three years, we have partnered with startups and enterprises across 12 industries — building apps, platforms, and campaigns that have earned recognition and driven measurable growth on an international scale.';

export default function AboutSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = ABOUT_TEXT.split('');

  const segments = [
    { text: 'We are Strenovix,', className: 'font-normal text-primary' },
    { text: 'a self-built digital studio.', className: 'font-serif italic text-primary' },
    { text: 'We craft apps, websites, ML models, and marketing that convert.', className: 'font-normal text-primary' },
  ];

  return (
    <section className="relative z-10 bg-transparent py-24 px-4 md:px-8" id="our-story">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-3xl p-8 md:p-16 text-center">

          {/* Label */}
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase block mb-8">
            Digital Excellence
          </span>

          {/* Pull-up multi-style heading */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12">
            <WordsPullUpMultiStyle segments={segments} />
          </div>

          {/* Scroll-linked character reveal paragraph */}
          <div ref={containerRef} className="max-w-2xl mx-auto">
            <p
              className="text-xs sm:text-sm md:text-base"
              style={{ color: '#DEDBC8', lineHeight: 1.7 }}
            >
              {chars.map((char, i) => (
                <AnimatedLetter
                  key={i}
                  char={char}
                  index={i}
                  total={chars.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
