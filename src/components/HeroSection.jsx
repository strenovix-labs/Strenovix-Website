import { useRef, useEffect, useCallback } from 'react';
import { Globe, ArrowRight, ExternalLink, Mail } from 'lucide-react';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4';

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Services',  href: '#services'  },
  { label: 'Work',      href: '#work'      },
  { label: 'Contact',   href: '#contact'   },
];

export default function HeroSection() {
  const videoRef     = useRef(null);
  const isFadingOut  = useRef(false);
  const rafRef       = useRef(null);

  /* Animate video opacity with RAF — no CSS transitions */
  const animateOpacity = useCallback((from, to, ms, onDone) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / ms, 1);
      if (videoRef.current) videoRef.current.style.opacity = String(from + (to - from) * p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.style.opacity = '0';

    /* canplay → play → fade in */
    const onCanPlay = () => {
      v.play().then(() => {
        isFadingOut.current = false;
        animateOpacity(0, 1, 500);
      }).catch(() => {});
    };

    /* timeupdate → crossfade to black 0.55s before loop */
    const onTimeUpdate = () => {
      if (!v.duration) return;
      if (v.duration - v.currentTime <= 0.55 && !isFadingOut.current) {
        isFadingOut.current = true;
        animateOpacity(parseFloat(v.style.opacity) || 1, 0, 500);
      }
    };

    /* ended → black for 100ms → restart → fade in */
    const onEnded = () => {
      v.style.opacity = '0';
      isFadingOut.current = false;
      setTimeout(() => {
        v.currentTime = 0;
        v.play().then(() => animateOpacity(0, 1, 500)).catch(() => {});
      }, 100);
    };

    v.addEventListener('canplay',    onCanPlay);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended',      onEnded);

    return () => {
      v.removeEventListener('canplay',    onCanPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended',      onEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animateOpacity]);

  return (
    <section className="min-h-screen overflow-hidden relative z-10 flex flex-col bg-transparent" id="home">

      {/* ── Background video ──────────────────────────────────── */}
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* ── Navbar ───────────────────────────────────────────── */}
      <div className="relative z-20 px-4 sm:px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* Left: brand + nav links */}
          <div className="flex items-center">
            <Globe size={22} className="text-white flex-shrink-0" />
            <span
              className="text-white font-semibold text-base sm:text-lg ml-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Strenovix
            </span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="hidden sm:block text-white text-sm font-medium hover:text-white/70 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-4 sm:px-6 py-2 text-white text-xs sm:text-sm font-medium hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Start a Project
            </a>
          </div>

        </div>
      </div>

      {/* ── Hero content ─────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">

        {/* Giant heading */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight mb-8 leading-none"
          style={{ fontFamily: "'Instrument Serif', serif", whiteSpace: 'nowrap' }}
        >
          Build it, then{' '}
          <em className="italic">win</em>.
        </h1>

        {/* Email / newsletter input */}
        <div className="max-w-xl w-full mb-6">
          <div className="liquid-glass rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none min-w-0"
              style={{ fontFamily: 'inherit', border: 'none' }}
            />
            <button
              className="bg-white rounded-full p-2.5 sm:p-3 text-black hover:bg-white/90 transition-colors flex-shrink-0 flex items-center justify-center"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed px-4 max-w-sm sm:max-w-md mb-8">
          Stay updated with the latest from Strenovix. Get insights, project launches,
          and behind-the-scenes on the digital products we craft.
        </p>

        {/* Manifesto button */}
        <button className="liquid-glass rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
          Our Manifesto
        </button>

      </div>

      {/* ── Social icon row ───────────────────────────────────── */}
      <div className="relative z-10 flex justify-center gap-3 sm:gap-4 pb-10 sm:pb-12">
        {[Globe, ExternalLink, Mail].map((Icon, i) => (
          <button
            key={i}
            className="liquid-glass rounded-full p-3 sm:p-4 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            aria-label={['Website', 'External', 'Email'][i]}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

    </section>
  );
}
