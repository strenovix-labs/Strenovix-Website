import React from "react";
import { useRouter } from '../RouterContext';
import { MacbookScroll, Badge } from "@/components/ui/macbook-scroll";
import './AppDevPage.css';  /* reuse shared back-bar styles */
import './WebDevPage.css';

/* ── MacbookScrollDemo (user's exact code — only image to be replaced) ── */
function MacbookScrollDemo() {
  return (
    <div className="wdp-macbook-wrap">
      <MacbookScroll
        title={
          <span>
            This is how we build the web.<br />No shortcuts, no compromise.
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            <Badge className="wdp-badge" />
          </a>
        }
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
        showGradient={false}
      />
    </div>
  );
}

/* ── 5 additional interactive project sections ── */
const webProjects = [
  { label: 'E-Commerce Platform', tech: 'Next.js · Stripe · Sanity', desc: 'Headless commerce with 340% conversion lift in 90 days.' },
  { label: 'SaaS Dashboard',      tech: 'React · D3 · Node.js',      desc: 'Real-time analytics platform serving 50K+ daily users.' },
  { label: 'Healthcare Portal',   tech: 'Next.js · GraphQL · AWS',   desc: 'HIPAA-compliant patient portal used across 12 clinics.' },
  { label: 'Crypto Trading UI',   tech: 'React · WebSockets · Redis', desc: 'Sub-50ms latency trading interface with live orderbooks.' },
  { label: 'AI Content Studio',   tech: 'Next.js · OpenAI · Prisma', desc: 'Content generation suite for 8K+ marketing teams.' },
];

export default function WebDevPage() {
  const { navigate } = useRouter();

  return (
    <div className="wdp-root">
      {/* Back bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button className="page-back-cta" onClick={() => navigate('')}>Get Started</button>
      </div>

      {/* Hero heading */}
      <div className="wdp-hero">
        <p className="wdp-eyebrow">Web Development Portfolio</p>
        <h1 className="wdp-title">
          Websites that <span className="hp-glow">outperform</span><br />the competition.
        </h1>
        <p className="wdp-sub">High-performance web applications engineered for speed, conversion, and scale.</p>
      </div>

      {/* 1. MacBook reveal */}
      <MacbookScrollDemo />

      {/* 2. Horizontal scroll strip */}
      <section className="wdp-section wdp-hscroll-section">
        <div className="wdp-section-head">
          <span className="wdp-section-label">Featured Builds</span>
          <h2 className="wdp-section-h2">Scroll through our work</h2>
        </div>
        <div className="wdp-hscroll">
          {webProjects.map((p, i) => (
            <div key={i} className="wdp-hcard">
              <div className="wdp-hcard-img"><div className="wdp-placeholder-img"><span>{i + 1}</span></div></div>
              <div className="wdp-hcard-body">
                <span className="wdp-hcard-label">{p.label}</span>
                <span className="wdp-hcard-tech">{p.tech}</span>
                <p className="wdp-hcard-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bento grid */}
      <section className="wdp-section">
        <div className="wdp-section-head">
          <span className="wdp-section-label">Case Studies</span>
          <h2 className="wdp-section-h2">Projects at a glance</h2>
        </div>
        <div className="wdp-bento">
          <div className="wdp-bento-large"><div className="wdp-bento-img" /><div className="wdp-bento-caption"><b>Nexus Commerce</b> · E-commerce</div></div>
          <div className="wdp-bento-sm"><div className="wdp-bento-img" /><div className="wdp-bento-caption"><b>HealthCare Portal</b></div></div>
          <div className="wdp-bento-sm"><div className="wdp-bento-img" /><div className="wdp-bento-caption"><b>AI Studio</b></div></div>
          <div className="wdp-bento-wide"><div className="wdp-bento-img" /><div className="wdp-bento-caption"><b>Trading Dashboard</b> · Fintech</div></div>
        </div>
      </section>

      {/* 4. Split layout */}
      <section className="wdp-section wdp-split">
        <div className="wdp-split-text">
          <span className="wdp-section-label">Spotlight</span>
          <h2 className="wdp-section-h2">SaaS Dashboard<br />redesign</h2>
          <p className="wdp-split-desc">We rebuilt a legacy analytics platform from scratch — cutting load time by 80% and growing daily active users by 3× in the first quarter after launch.</p>
          <div className="wdp-split-tags">
            {['React', 'D3.js', 'Node.js', 'PostgreSQL'].map(t => <span key={t} className="wdp-tag">{t}</span>)}
          </div>
        </div>
        <div className="wdp-split-img"><div className="wdp-placeholder-img tall"><span>↗</span></div></div>
      </section>

      {/* 5. Floating metric cards */}
      <section className="wdp-section">
        <div className="wdp-section-head">
          <span className="wdp-section-label">By the numbers</span>
          <h2 className="wdp-section-h2">Results that matter</h2>
        </div>
        <div className="wdp-metric-grid">
          {[['340%', 'Conversion Lift', 'Nexus Commerce'],['<1s', 'Load Time', 'All Projects'],['3×', 'DAU Growth', 'SaaS Dashboard'],['99.9%', 'Uptime SLA', 'Healthcare Portal'],['80%', 'Faster LCP', 'AI Content Studio']].map(([v, l, s]) => (
            <div key={l} className="wdp-metric-card">
              <span className="wdp-metric-val">{v}</span>
              <span className="wdp-metric-label">{l}</span>
              <span className="wdp-metric-sub">{s}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
