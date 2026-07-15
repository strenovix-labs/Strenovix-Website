import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const stats = [
  ['50+',  'Projects'],
  ['98%',  'Satisfaction'],
  ['3+',   'Years'],
  ['12+',  'Industries'],
];

/* Scrambles el.textContent through random chars, then resolves */
function scrambleIn(el, delay = 0) {
  const final   = el.dataset.text || el.textContent;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  let frame = 0;
  const totalFrames = 28;

  el.textContent = final.replace(/\S/g, () => charset[Math.floor(Math.random() * charset.length)]);

  setTimeout(() => {
    const tick = () => {
      el.textContent = final
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i / final.length < frame / totalFrames) return ch;
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join('');
      frame++;
      if (frame <= totalFrames) requestAnimationFrame(tick);
      else el.textContent = final;
    };
    requestAnimationFrame(tick);
  }, delay * 1000);
}

export default function Hero() {
  const ref = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1 — eyebrow scramble */
      const eyebrow = ref.current.querySelector('.hero-eyebrow-text');
      if (eyebrow) scrambleIn(eyebrow, 0.3);

      /* 2 — clip-wipe each word */
      gsap.set('.hword', { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
      gsap.to('.hword', {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.8,
        stagger: 0.07,
        ease: 'power4.out',
        delay: 0.5,
      });

      /* 3 — right-side stat cards slide in */
      gsap.from('.hero-stat', {
        x: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 1.2,
      });

      /* 4 — bottom bar */
      gsap.from('.hero-bar', {
        scaleX: 0, duration: 1.2, ease: 'power4.out', delay: 1.0, transformOrigin: 'left center',
      });
      gsap.from('.hero-tag, .hero-btn', {
        opacity: 0, y: 16, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 1.4,
      });

      /* 5 — label scramble */
      const label = ref.current.querySelector('.hero-label-scramble');
      if (label) scrambleIn(label, 1.5);
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={ref}>

      {/* Top eyebrow row */}
      <div className="hero-top">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          <span
            className="hero-eyebrow-text"
            data-text="CRAFTING DIGITAL EXCELLENCE"
          >CRAFTING DIGITAL EXCELLENCE</span>
        </div>
        <span className="hero-label-scramble hero-year" data-text="2026 / 01">2026 / 01</span>
      </div>

      {/* Main content: large heading + floating stats */}
      <div className="hero-body">
        <h1 className="hero-heading">
          <span className="hline">
            <span className="hword">WE</span>
            <span className="hword">BUILD</span>
          </span>
          <span className="hline hline--accent">
            <span className="hword">DIGITAL</span>
            <span className="hword">PRODUCTS</span>
          </span>
          <span className="hline">
            <span className="hword">THAT</span>
            <span className="hword">DOMINATE.</span>
          </span>
        </h1>

        {/* Floating stats column */}
        <div className="hero-stats-col">
          {stats.map(([num, label]) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-num">{num}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom">
        <div className="hero-bar" />
        <div className="hero-bottom-inner">
          <div className="hero-tags">
            {['App Dev', 'Web Dev', 'ML / AI', 'Marketing'].map((t) => (
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>
          <div className="hero-btns">
            <button className="btn-primary hero-btn" onClick={() => scrollTo('contact')}>
              Start a Project
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-ghost hero-btn" onClick={() => scrollTo('services')}>
              Explore Services
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
