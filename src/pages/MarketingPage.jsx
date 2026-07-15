import { useRouter } from '../RouterContext';
import './AppDevPage.css';
import './MarketingPage.css';

const channels = [
  { icon: '🔍', name: 'SEO & Content', desc: 'Technical SEO audits, keyword strategy, long-form content and authority link-building that compound over time.', result: '4.8× organic traffic growth on avg.' },
  { icon: '📱', name: 'Social & Paid Ads', desc: 'Precision targeting across Meta, Google, LinkedIn and TikTok — only pay for audiences that actually convert.', result: '5× ROAS within 60 days' },
  { icon: '✉️', name: 'Email Marketing', desc: 'Segmented, behaviour-triggered automations that nurture leads and recover abandoned revenue at scale.', result: '42% avg open rate · 9% CTR' },
  { icon: '📊', name: 'Analytics & CRO', desc: 'Full-funnel attribution, heatmaps, A/B testing and conversion optimisation to squeeze every rupee of ROI.', result: '340% conversion lift on avg.' },
];

const campaigns = [
  { brand: 'FreshCart', type: 'SEO + Content', result: '5.2× organic growth in 6 months', bg: '#0d1a14' },
  { brand: 'FinEdge',   type: 'Paid Ads',      result: '7× ROAS, ₹1.2Cr revenue in 90 days', bg: '#0d1525' },
  { brand: 'GrowSpark', type: '360° Campaign',  result: '220K new users · 5× ROAS in 60 days', bg: '#1a1025' },
  { brand: 'StyleHub',  type: 'Email + Social', result: '48% open rate · 38% revenue lift', bg: '#1a1410' },
  { brand: 'EduReach',  type: 'Content + SEO',  result: '3× monthly leads, 67% lower CPL', bg: '#0d1a14' },
  { brand: 'TechNest',  type: 'LinkedIn Ads',   result: '280 enterprise leads in one quarter', bg: '#0d1525' },
];

const stats = [['220K+', 'New Users / Campaign'], ['5×', 'Avg ROAS'], ['₹10Cr+', 'Revenue Driven'], ['340%', 'Avg Conv. Lift'], ['42%', 'Email Open Rate'], ['60%', 'Lower CPL']];

export default function MarketingPage() {
  const { navigate } = useRouter();

  return (
    <div className="mkp-root">
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

      {/* Hero */}
      <div className="mkp-hero">
        <span className="mkp-eyebrow">Digital Marketing Portfolio</span>
        <h1 className="mkp-title">
          We turn clicks into<br /><span className="mkp-glow">customers.</span>
        </h1>
        <p className="mkp-sub">
          Data-driven growth campaigns across SEO, paid ads, social media and email — engineered to dominate your market.
        </p>
      </div>

      {/* Live stats ticker */}
      <div className="mkp-ticker-wrap">
        <div className="mkp-ticker">
          {[...stats, ...stats].map(([v, l], i) => (
            <div key={i} className="mkp-tick-item">
              <span className="mkp-tick-val">{v}</span>
              <span className="mkp-tick-label">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div className="mkp-channels">
        <div className="mkp-section-head">
          <span className="mkp-label">What We Do</span>
          <h2 className="mkp-h2">Every channel, one strategy.</h2>
        </div>
        <div className="mkp-channel-grid">
          {channels.map((c, i) => (
            <div key={i} className="mkp-channel-card">
              <div className="mkp-ch-icon">{c.icon}</div>
              <h3 className="mkp-ch-name">{c.name}</h3>
              <p className="mkp-ch-desc">{c.desc}</p>
              <div className="mkp-ch-result">{c.result}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign showcase */}
      <div className="mkp-cases">
        <div className="mkp-section-head">
          <span className="mkp-label">Our Work</span>
          <h2 className="mkp-h2">Campaigns that moved the needle.</h2>
        </div>
        <div className="mkp-case-grid">
          {campaigns.map((c, i) => (
            <div key={i} className="mkp-case-card" style={{ background: c.bg }}>
              <div className="mkp-case-top">
                <span className="mkp-case-brand">{c.brand}</span>
                <span className="mkp-case-type">{c.type}</span>
              </div>
              <div className="mkp-case-img" />
              <p className="mkp-case-result">{c.result}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy process */}
      <div className="mkp-process">
        <div className="mkp-section-head">
          <span className="mkp-label">How We Work</span>
          <h2 className="mkp-h2">Our growth formula.</h2>
        </div>
        <div className="mkp-steps">
          {['Market Research & Audit', 'Strategy & Creative', 'Launch & A/B Test', 'Scale & Optimise'].map((s, i) => (
            <div key={i} className="mkp-step">
              <span className="mkp-step-num">0{i + 1}</span>
              <span className="mkp-step-label">{s}</span>
              <div className="mkp-step-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
