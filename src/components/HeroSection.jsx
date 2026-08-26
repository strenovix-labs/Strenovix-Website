import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Mail, Menu, X } from 'lucide-react';
import { FiLinkedin as Linkedin, FiInstagram as Instagram, FiCopy as Copy, FiCheck as Check } from 'react-icons/fi';
import GradientWaves from './ui/GradientWaves';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <section className="min-h-screen overflow-hidden relative z-10 flex flex-col bg-[#F5F5EE]" id="home">

      {/* ── Background waves shader ──────────────────────────── */}
      <div className="absolute inset-0 w-full h-full">
        <GradientWaves
          horizonColor="#ff6800"
          waveColor="#f57319"
          crestColor="#F04A00"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={23}
          detail="medium"
          brightness={1}
          opacity={1}
          grain
          grainIntensity={0.05}
          mouseInteraction
          parallaxStrength={0.5}
        />
      </div>

      {/* ── Navbar ───────────────────────────────────────────── */}
      <div className="relative z-20 px-4 sm:px-6 py-6">
        <div className="bg-white/40 border border-black/10 backdrop-blur-md rounded-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">

          {/* Left: brand + nav links */}
          <div className="flex items-center">
            <img src="/logo.jpeg" alt="Strenovix Logo" className="w-[22px] h-[22px] object-cover rounded-md flex-shrink-0" />
            <span
              className="text-black font-extrabold text-base sm:text-lg ml-2 font-migra"
              style={{ fontFamily: "'Migra', serif" }}
            >
              Strenovix
            </span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-black/70 hover:text-black text-sm font-medium transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA button + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-black hover:bg-black/90 text-[#F5F5EE] rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200"
            >
              Start a Project
            </a>
            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black/70 hover:text-black p-1.5 hover:bg-black/[0.03] rounded-full transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-5xl mx-auto mt-2 px-4 py-3 bg-white/70 border border-black/10 backdrop-blur-md rounded-2xl shadow-lg flex flex-col gap-1 relative z-50 animate-fade-in">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-black/70 hover:text-black text-sm font-medium py-2 px-3 rounded-lg hover:bg-black/[0.03] transition-colors"
              >
                {label}
              </a>
            ))}
            <hr className="border-black/10 my-1" />
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-black/70 hover:text-black text-sm font-medium py-2 px-3 rounded-lg hover:bg-black/[0.03] transition-colors"
            >
              Get in touch
            </a>
          </div>
        )}
      </div>

      {/* ── Hero content ─────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[8%] md:-translate-y-[2%]">

        {/* Giant heading animated text */}
        <div className="flex flex-col items-center justify-center gap-y-8 md:gap-y-4 mb-8 w-full max-w-6xl px-4">
          {/* Row 1: Building Intelligence */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-4 w-full">
            <span className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-normal tracking-tight text-black leading-none" style={{ fontFamily: 'Regave' }}>
              Building
            </span>
            <span className="text-[clamp(1.8rem,4.5vw,4rem)] tracking-wide text-[#F04A00] leading-none" style={{ fontFamily: 'Sanstara' }}>
              Intelligence
            </span>
          </div>

          {/* Row 2: Delivering Impact */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-4 w-full">
            <span className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-normal tracking-tight text-black leading-none" style={{ fontFamily: 'Regave' }}>
              Delivering
            </span>
            <span className="text-[clamp(1.8rem,4.5vw,4rem)] tracking-wide text-[#F04A00] leading-none" style={{ fontFamily: 'Sanstara' }}>
              Impact
            </span>
          </div>
        </div>

        {/* Email / newsletter input */}
        <div className="max-w-xl w-full mb-6">
          <div className="bg-white/40 border border-black/10 backdrop-blur-md rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3 shadow-sm">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-black placeholder:text-black/40 text-sm outline-none min-w-0"
              style={{ fontFamily: 'inherit', border: 'none' }}
            />
            <button
              onClick={handleSubscribe}
              className="bg-black rounded-full p-2.5 sm:p-3 text-[#F5F5EE] hover:bg-black/90 transition-colors flex-shrink-0 flex items-center justify-center"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-black/60 text-xs sm:text-sm leading-relaxed px-4 max-w-sm sm:max-w-md mb-8">
          Stay updated with the latest from <span className="font-migra font-extrabold">Strenovix</span>. Get insights, project launches,
          and behind-the-scenes on the digital products we craft.
        </p>

        {/* Manifesto button */}
        <a
          href="https://www.instagram.com/strenovix?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-block"
        >
          <button className="bg-white/40 border border-black/10 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-black text-sm font-medium hover:bg-black/[0.03] transition-colors">
            Our Manifesto
          </button>
        </a>

        {/* ── Social icon row ───────────────────────────────────── */}
        <div className="flex justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setEmailPopup(true)}
            className="bg-white/40 border border-black/10 text-black/70 hover:text-black hover:bg-black/[0.03] rounded-full p-3 sm:p-4 transition-all flex items-center justify-center"
            aria-label="Email"
          >
            <Mail size={18} />
          </button>
          <a
            href="https://www.linkedin.com/in/strenovix-%E2%80%8E-31792042a/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/40 border border-black/10 text-black/70 hover:text-black hover:bg-black/[0.03] rounded-full p-3 sm:p-4 transition-all flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/strenovix?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/40 border border-black/10 text-black/70 hover:text-black hover:bg-black/[0.03] rounded-full p-3 sm:p-4 transition-all flex items-center justify-center"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>

      </div>

      {/* ── Email Popup Modal ────────────────────────────────── */}
      {emailPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F5F5EE] border border-black/15 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setEmailPopup(false)}
              className="absolute top-4 right-4 text-black/50 hover:text-black transition-colors text-sm"
              aria-label="Close"
            >
              ✕
            </button>
            <Mail size={32} style={{ color: '#000000' }} className="mx-auto mb-4" />
            <h3 className="text-black font-medium text-lg mb-2">Our Email</h3>
            <p className="text-black/80 font-mono text-sm mb-6 select-all bg-black/[0.03] rounded-lg py-2 px-3 border border-black/5">
              strenovix@gmail.com
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopy}
                className="w-full bg-black text-[#F5F5EE] font-medium text-sm py-3 rounded-full hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
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
                className="w-full bg-white/40 border border-black/10 text-black font-medium text-sm py-3 rounded-full hover:bg-black/[0.03] transition-colors flex items-center justify-center gap-2"
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
