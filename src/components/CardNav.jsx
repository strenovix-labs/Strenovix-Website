import { useState, useEffect } from 'react';
import './CardNav.css';

const CardNav = ({ items = [], logo, logoAlt = 'Strenovix', baseColor = 'rgba(10,9,15,0.85)', buttonBgColor, buttonTextColor }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileOpen(false);
    };

    return (
        <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
            <nav className="navbar" style={{ backgroundColor: scrolled ? baseColor : 'transparent' }}>
                <div className="navbar-logo">
                    {logo ? <img src={logo} alt={logoAlt} /> : <span className="logo-text">STRENOVIX</span>}
                </div>

                <div className={`navbar-links desktop-only`}>
                    {items.map((item, i) => (
                        <a key={i} href={item.href} className="nav-link" onClick={e => scrollToSection(e, item.href)}>
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="navbar-actions desktop-only">
                    <button className="nav-cta" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }} onClick={e => scrollToSection(e, '#contact')}>
                        Get Started
                    </button>
                </div>

                <div className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    <div className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} />
                    <div className={`hamburger-line ${isMobileOpen ? 'open' : ''}`} />
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
                <div className="mobile-menu-links">
                    {items.map((item, i) => (
                        <a key={i} href={item.href} className="mobile-nav-link" onClick={e => scrollToSection(e, item.href)}>
                            {item.label}
                        </a>
                    ))}
                    <button className="nav-cta mobile-cta" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }} onClick={e => scrollToSection(e, '#contact')}>
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};

export default CardNav;