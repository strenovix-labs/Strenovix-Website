import BorderGlow from './BorderGlow';
import './FinalCTA.css';

const contactLinks = [
  { icon: '✉️', label: 'Email',       value: 'strenovix@gmail.com',            href: 'mailto:strenovix@gmail.com' },
  { icon: '💼', label: 'LinkedIn',    value: 'linkedin.com/company/strenovix',  href: 'https://linkedin.com' },
  { icon: '🐦', label: 'X / Twitter', value: '@strenovix',                      href: 'https://x.com' },
  { icon: '📸', label: 'Instagram',   value: '@strenovix.studio',               href: 'https://instagram.com' },
];

export default function FinalCTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-glow" />

      <div className="cta-inner">
        {/* Heading block */}
        <div className="cta-heading-block">
          <span className="section-label reveal">Ready to start?</span>
          <h2 className="cta-heading reveal">
            Let's build something<br />
            <span className="glow-text">extraordinary.</span>
          </h2>
          <p className="cta-sub reveal">
            Whether it's an app, a website, an AI model or a growth campaign, we're ready to execute at the highest level.
          </p>

          <div className="cta-actions reveal">
            <a href="mailto:strenovix@gmail.com" className="btn-primary">
              Email Us Directly
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Services
            </button>
          </div>
        </div>

        {/* Contact cards */}
        <div className="cta-contacts reveal">
          {contactLinks.map((c) => (
            <BorderGlow
              key={c.label}
              className="cta-contact-glow"
              backgroundColor="var(--black)"
              borderRadius={14}
              glowColor="246 100 69"
              colors={['#6c63ff', '#00d8ff', '#ff4ecd']}
            >
              <a href={c.href} target="_blank" rel="noreferrer" className="cta-contact-card">
                <span className="cta-contact-icon">{c.icon}</span>
                <div className="cta-contact-info">
                  <span className="cta-contact-label">{c.label}</span>
                  <span className="cta-contact-value">{c.value}</span>
                </div>
                <svg className="cta-contact-arrow" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </BorderGlow>
          ))}
        </div>
      </div>

      {/* Big tagline bar */}
      <div className="cta-tagline-bar">
        <div className="cta-tagline-text">
          {['App Dev ', '✦', 'Web Dev', '✦', 'ML / AI', '✦', 'Marketing', '✦',
            'App Dev ', '✦', 'Web Dev', '✦', 'ML / AI', '✦', 'Marketing', '✦'].map((word, i) => (
            <span key={i} className="cta-tagline-word">{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
