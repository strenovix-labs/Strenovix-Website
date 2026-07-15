import { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';
import './Navbar.css';

export default function Navbar({ items = [] }) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el  = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-header">
      <div className={`nav-pill ${scrolled ? 'nav-pill--scrolled' : ''}`}>
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={(e) => scrollTo(e, '#home')}>
          <img src="/logo.jpeg" alt="Strenovix" className="nav-logo-img" />
          <span className="nav-logo-text">STRENOVIX</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-wrapper">
          <GooeyNav
            items={items}
            particleCount={12}
            particleDistances={[60, 10]}
            particleR={80}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={['246, 100%, 69%', '192, 100%, 50%', '313, 100%, 64%']}
            onItemClick={(e, item) => scrollTo(e, item.href)}
          />
        </div>

        {/* CTA */}
        <a href="#contact" className="nav-cta" onClick={(e) => scrollTo(e, '#contact')}>
          Get Started
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile toggle */}
        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
        {items.map((item, i) => (
          <a key={i} href={item.href} className="nav-mobile-link" onClick={(e) => scrollTo(e, item.href)}>
            {item.label}
          </a>
        ))}
        <a href="#contact" className="nav-mobile-cta" onClick={(e) => scrollTo(e, '#contact')}>
          Get Started
        </a>
      </div>
    </header>
  );
}
