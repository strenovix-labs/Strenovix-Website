import './Footer.css';

const navLinks = [
  { label: 'Home',     href: '#home'     },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'Team',     href: '#team'     },
  { label: 'Contact',  href: '#contact'  },
];

const socialLinks = [
  { label: 'X / Twitter', href: 'https://x.com'          },
  { label: 'Instagram',   href: 'https://instagram.com'   },
  { label: 'LinkedIn',    href: 'https://linkedin.com'    },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      {/* Top glow line */}
      <div className="footer-glow-line" />

      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/logo.jpeg" alt="Strenovix" className="footer-logo-img" />
            <span className="footer-logo-text">STRENOVIX</span>
          </div>
          <p className="footer-tagline">
            Building digital products that dominate.<br />
            App Dev · Web Dev · ML / AI · Marketing.
          </p>
          <a href="mailto:strenovix@gmail.com" className="footer-email">
            strenovix@gmail.com
          </a>
        </div>

        {/* Links */}
        <div className="footer-links-wrap">
          <div className="footer-link-group">
            <span className="footer-group-label">Navigate</span>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="footer-link" onClick={(e) => scrollTo(e, l.href)}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="footer-link-group">
            <span className="footer-group-label">Socials</span>
            {socialLinks.map((l) => (
              <a key={l.label} href={l.href} className="footer-link" target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>

          <div className="footer-link-group">
            <span className="footer-group-label">Start a Project</span>
            <a href="mailto:strenovix@gmail.com" className="footer-cta-btn">
              Email Us
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© 2026 <span className="font-migra font-extrabold" style={{ fontFamily: 'Migra, serif', fontWeight: 800 }}>Strenovix</span>. All rights reserved.</span>
        <span>Crafted with precision ✦</span>
      </div>
    </footer>
  );
}
