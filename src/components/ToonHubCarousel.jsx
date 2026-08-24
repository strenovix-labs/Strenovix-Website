import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const MEMBERS = [
  { name: 'Nivesh Varun', role: 'AIML Engineer', image: '/team/nivesh.png' },
  { name: 'Rupesh', role: 'App Developer', image: '/team/rupesh.png' },
  { name: 'Sajan', role: 'FullStack Developer', image: '/team/sajan.png' },
  { name: 'Sanjay', role: 'AIML Engineer', image: '/team/sanjay.png' },
  { name: 'Tamil', role: 'FullStack Developer', image: '/team/tamil.png' },
  { name: 'Vijai', role: 'App Developer', image: '/team/vijai-compressed.png' },
];

const N = MEMBERS.length;

const TRANS = [
  'transform 650ms cubic-bezier(0.4,0,0.2,1)',
  'filter 650ms cubic-bezier(0.4,0,0.2,1)',
  'opacity 650ms cubic-bezier(0.4,0,0.2,1)',
  'left 650ms cubic-bezier(0.4,0,0.2,1)',
  'height 650ms cubic-bezier(0.4,0,0.2,1)',
  'bottom 650ms cubic-bezier(0.4,0,0.2,1)',
].join(', ');

/*
  CSS mask that fades the portrait crop to transparent at the edges —
  the face/upper body floats, hard rectangle disappears.
*/
const STICKER_MASK = [
  'radial-gradient(',
  'ellipse 88% 80% at 50% 35%,',
  'black 30%,',
  'rgba(0,0,0,0.6) 55%,',
  'transparent 78%',
  ')',
].join(' ');

function getRoleStyle(offset, isMobile) {
  switch (offset) {
    case 0: // center
      return {
        left: '50%',
        height: isMobile ? '44%' : '64%',
        bottom: isMobile ? '24%' : '12%',
        transform: `translateX(-50%) scale(${isMobile ? 0.95 : 1.1})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
      };
    case 1: // right
      return {
        left: isMobile ? '78%' : '70%',
        height: isMobile ? '14%' : '24%',
        bottom: isMobile ? '36%' : '24%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.8,
        zIndex: 10,
      };
    case 2: // right-back
      return {
        left: isMobile ? '66%' : '61%',
        height: isMobile ? '10%' : '17%',
        bottom: isMobile ? '36%' : '24%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(3px)',
        opacity: 0.45,
        zIndex: 7,
      };
    case 3: // far-back
      return {
        left: '50%',
        height: isMobile ? '8%' : '13%',
        bottom: isMobile ? '36%' : '24%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(5px)',
        opacity: 0.28,
        zIndex: 4,
      };
    case 4: // left-back
      return {
        left: isMobile ? '34%' : '39%',
        height: isMobile ? '10%' : '17%',
        bottom: isMobile ? '36%' : '24%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(3px)',
        opacity: 0.45,
        zIndex: 7,
      };
    case 5: // left
    default:
      return {
        left: isMobile ? '22%' : '30%',
        height: isMobile ? '14%' : '24%',
        bottom: isMobile ? '36%' : '24%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.8,
        zIndex: 10,
      };
  }
}

export default function ToonHubCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const [nameVisible, setNameVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = useCallback((dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNameVisible(false);
    setActiveIndex((p) => dir === 'next' ? (p + 1) % N : (p + N - 1) % N);
    setTimeout(() => setNameVisible(true), 380);
    timerRef.current = setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const goTo = useCallback((i) => {
    if (isAnimating || i === activeIndex) return;
    setIsAnimating(true);
    setNameVisible(false);
    setActiveIndex(i);
    setTimeout(() => setNameVisible(true), 380);
    timerRef.current = setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, activeIndex]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const activeMember = MEMBERS[activeIndex];
  const isReal = activeMember.name !== 'Coming Soon';

  return (
    <section id="team" style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* Ghost wordmark */}
        <div aria-hidden="true" style={{
          position: 'absolute', insetInline: 0, top: '12%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', userSelect: 'none', zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(60px, 22vw, 300px)',
            fontWeight: 900, color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            lineHeight: 1, textTransform: 'uppercase',
            letterSpacing: '-0.02em', whiteSpace: 'nowrap',
          }}>
            THE TEAM
          </span>
        </div>

        {/* Label */}
        <div style={{
          position: 'absolute', top: '1.5rem',
          left: isMobile ? '1rem' : '2rem', zIndex: 60,
        }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase',
            color: 'rgba(222,219,200,0.4)', letterSpacing: '0.22em',
            fontFamily: 'Inter, sans-serif',
          }}>
            The Collective
          </span>
        </div>

        {/* Counter */}
        <div style={{
          position: 'absolute', top: '1.5rem',
          right: isMobile ? '1rem' : '2rem', zIndex: 60,
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
            color: 'rgba(222,219,200,0.28)', letterSpacing: '0.1em',
          }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
        </div>

        {/* ── Carousel ──────────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          {MEMBERS.map((member, i) => {
            const offset = (i - activeIndex + N) % N;
            const role = getRoleStyle(offset, isMobile);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition: TRANS,
                  willChange: 'transform, filter, opacity',
                  ...role,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    /* Person is right-of-center in the landscape photo;
                       58% horizontal crop keeps them centred, 8% from top shows face.
                       Some photos have more headroom above the subject, so their
                       vertical focus is overridden per-member (focusY). */
                    objectPosition: `58% ${member.focusY || '8%'}`,
                    display: 'block',
                    /* Radial gradient mask: face/body visible at centre,
                       edges fade to transparent → floating sticker, no hard rectangle */
                    WebkitMaskImage: STICKER_MASK,
                    maskImage: STICKER_MASK,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Member name */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '14%' : '9%',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 30, textAlign: 'center', pointerEvents: 'none',
          transition: 'opacity 300ms ease',
          opacity: nameVisible ? 1 : 0,
          whiteSpace: 'nowrap',
        }}>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: isMobile ? '1.35rem' : '1.75rem',
            color: '#E1E0CC', letterSpacing: '-0.01em',
            marginBottom: '0.25rem',
            textShadow: '0 2px 20px rgba(0,0,0,1)',
          }}>
            {isReal ? activeMember.name : '—'}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? '0.7rem' : '0.8rem',
            color: 'rgba(222,219,200,0.4)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            {isReal ? activeMember.role : `${activeMember.role} · Coming Soon`}
          </p>
        </div>

        {/* Nav buttons */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '1.5rem' : '2.0rem',
          left: isMobile ? '1rem' : '2rem', zIndex: 60,
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            fontSize: isMobile ? '0.6rem' : '0.68rem',
            color: 'rgba(222,219,200,0.22)', marginBottom: '0.75rem',
          }}>
            Strenovix Collective
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { icon: <ArrowLeft size={18} strokeWidth={1.8} />, dir: 'prev', label: 'Previous' },
              { icon: <ArrowRight size={18} strokeWidth={1.8} />, dir: 'next', label: 'Next' },
            ].map(({ icon, dir, label }) => (
              <button
                key={dir}
                onClick={() => navigate(dir)}
                aria-label={label}
                style={{
                  width: isMobile ? '2.2rem' : '2.6rem',
                  height: isMobile ? '2.2rem' : '2.6rem',
                  borderRadius: '50%', background: 'transparent',
                  border: '1px solid rgba(222,219,200,0.14)',
                  color: '#DEDBC8', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 150ms, background-color 150ms, border-color 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(222,219,200,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(222,219,200,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(222,219,200,0.14)';
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '1.5rem' : '2.2rem',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 60, display: 'flex', gap: '0.35rem', alignItems: 'center',
        }}>
          {MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Member ${i + 1}`}
              style={{
                width: i === activeIndex ? '1.4rem' : '0.28rem',
                height: '0.28rem', borderRadius: '99px',
                padding: 0, border: 'none', cursor: 'pointer',
                background: i === activeIndex ? '#DEDBC8' : 'rgba(222,219,200,0.22)',
                transition: 'width 400ms cubic-bezier(0.4,0,0.2,1), background 400ms',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '1.5rem' : '2.0rem',
          right: isMobile ? '1rem' : '2rem', zIndex: 60,
        }}>
          <a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(13px, 2.2vw, 34px)',
              color: 'rgba(222,219,200,0.45)',
              letterSpacing: '-0.02em', lineHeight: 1,
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#DEDBC8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(222,219,200,0.45)'; }}
          >
            WORK WITH US
            <ArrowRight style={{
              width: isMobile ? '0.85rem' : '1.3rem',
              height: isMobile ? '0.85rem' : '1.3rem',
            }} strokeWidth={2} />
          </a>
        </div>

      </div>
    </section>
  );
}
