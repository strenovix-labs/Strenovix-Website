import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe, Link2, Mail, MapPin } from 'lucide-react';
import WordsPullUp from './WordsPullUp';
import TextLoop from './ui/TextLoop';

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  { label: 'App Development', href: '#services' },
  { label: 'Web Engineering', href: '#services' },
  { label: 'ML / AI', href: '#services' },
  { label: 'Marketing', href: '#services' },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/strenovix-labs', icon: Globe },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/strenovix', icon: Link2 },
  { label: 'Email', href: 'mailto:strenovix@gmail.com', icon: Mail },
];

const EASE = [0.16, 1, 0.3, 1];

export default function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer className="bg-transparent relative z-10 overflow-hidden">

      {/* Subtle noise texture */}
      <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

      {/* ── CTA section ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32">

        <div className="border-t border-black/[0.08] mb-16 md:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12" ref={ref}>

          {/* Left - headline + CTA */}
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 border border-black/[0.10] rounded-full px-4 py-2 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-[11px] text-black/60 tracking-wide">
                Available for new projects
              </span>
            </motion.div>

            {/* Big animated headline */}
            <div
              className="font-medium leading-[0.9] tracking-[-0.04em] mb-10"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', color: '#F04A00' }}
            >
              <WordsPullUp text="Let's build something remarkable." />
            </div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
              className="flex flex-wrap items-center gap-5"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 hover:gap-3 bg-black rounded-full pl-5 pr-1 py-1 transition-all duration-300"
              >
                <span className="font-medium text-sm text-[#F5F5EE]">Start a Project</span>
                <span className="bg-[#F04A00] rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                  <ArrowRight size={15} className="text-[#F5F5EE]" />
                </span>
              </a>

              <a
                href="mailto:strenovix@gmail.com"
                className="inline-flex items-center gap-1.5 text-black/60 text-sm hover:text-[#F04A00] transition-colors duration-200"
              >
                strenovix@gmail.com
                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </div>

          {/* Right - two mini link columns */}
          <div className="grid grid-cols-2 gap-8 lg:justify-self-end lg:w-72">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            >
              <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-5">
                Services
              </p>
              <ul className="space-y-3">
                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-black/60 text-sm hover:text-[#F04A00] transition-colors duration-200 leading-none"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
            >
              <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-5">
                Connect
              </p>
              <ul className="space-y-3">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black/60 text-sm hover:text-[#F04A00] transition-colors duration-200"
                    >
                      <Icon size={13} />
                      {label}
                    </a>
                  </li>
                ))}
                <li className="inline-flex items-center gap-2 text-black/60 text-sm">
                  <MapPin size={13} />
                  Dindigul, India
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scrolling Text Ribbon ──────────────────────────── */}
      <div className="relative z-10 mt-16 md:mt-20 overflow-hidden w-full">
        <TextLoop
          text="Strenovix"
          shape="line"
          speed={90}
          direction="forward"
          separator="✦"
          curviness={90}
          fontSize={32}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#000000"
          ribbon
          ribbonColor="#F04A00"
          ribbonWidth={60}
          pauseOnHover
          className="font-migra"
        />
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────── */}
      <div className="relative z-10 mt-16 md:mt-20 border-t border-black/10 pt-8 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8">

          <nav className="flex flex-wrap gap-4 sm:gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-black/60 text-[11px] hover:text-[#F04A00] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-black/50 text-[11px] shrink-0">
            © {new Date().getFullYear()} <span className="font-migra font-extrabold">Strenovix</span>, crafted with precision.
          </p>

        </div>
      </div>

    </footer>
  );
}
