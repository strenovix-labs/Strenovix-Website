import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { FiLinkedin as Linkedin, FiInstagram as Instagram, FiCopy as Copy, FiCheck as Check } from 'react-icons/fi';
import Dither from './ui/Dither';
import buildingIntelligenceImg from '../assets/building-intelligence.png';
import deliveringImpactImg from '../assets/delivering-impact.png';

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function HeroSection({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [emailPopup, setEmailPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('strenovix@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe(email);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  useEffect(() => {
    if (emailPopup) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, [emailPopup]);

  return (
    <section className="min-h-screen overflow-hidden relative z-10 flex flex-col bg-transparent" id="home">

      {/* ── Background dither shader ──────────────────────────── */}
      <div className="absolute inset-0 w-full h-full">
        <Dither
          waveColor={[0.9411764705882353, 0.2901960784313726, 0]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={1}
          colorNum={4}
          pixelSize={2}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      {/* ── Navbar ───────────────────────────────────────────── */}
      <div className="relative z-20 px-4 sm:px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* Left: brand + nav links */}
          <div className="flex items-center">
            <img src="/logo.jpeg" alt="Strenovix Logo" className="w-[22px] h-[22px] object-cover rounded-md flex-shrink-0" />
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

        {/* Giant heading images */}
        <img
          src={buildingIntelligenceImg}
          alt="Building Intelligence"
          className="w-full max-w-6xl h-auto mb-1 pointer-events-none select-none px-4"
        />
        <img
          src={deliveringImpactImg}
          alt="Delivering Impact"
          className="w-full max-w-4xl h-auto -mt-4 sm:-mt-6 mb-8 pointer-events-none select-none px-4"
        />

        {/* Email / newsletter input */}
        <div className="max-w-xl w-full mb-6">
          <div className="liquid-glass rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none min-w-0"
              style={{ fontFamily: 'inherit', border: 'none' }}
            />
            <button
              onClick={handleSubscribe}
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
        <a
          href="https://www.instagram.com/strenovix?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="liquid-glass rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            Our Manifesto
          </button>
        </a>

      </div>

      {/* ── Social icon row ───────────────────────────────────── */}
      <div className="relative z-10 flex justify-center gap-3 sm:gap-4 pb-10 sm:pb-12">
        <button
          onClick={() => setEmailPopup(true)}
          className="liquid-glass rounded-full p-3 sm:p-4 text-white/70 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Email"
        >
          <Mail size={18} />
        </button>
        <a
          href="https://www.linkedin.com/in/strenovix-%E2%80%8E-31792042a/?skipRedirect=true"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-3 sm:p-4 text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://www.instagram.com/strenovix?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-3 sm:p-4 text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      </div>

      {/* ── Email Popup Modal ────────────────────────────────── */}
      {emailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative border border-white/[0.08] shadow-2xl">
            <button
              onClick={() => setEmailPopup(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-sm"
              aria-label="Close"
            >
              ✕
            </button>
            <Mail size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-white font-medium text-lg mb-2">Our Email</h3>
            <p className="text-white/80 font-mono text-sm mb-6 select-all bg-white/5 rounded-lg py-2 px-3 border border-white/5">
              strenovix@gmail.com
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopy}
                className="w-full bg-white text-black font-medium text-sm py-3 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Email
                  </>
                )}
              </button>
              <a
                href="mailto:strenovix@gmail.com"
                className="w-full liquid-glass border border-white/10 text-white font-medium text-sm py-3 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                Open Mail App
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
