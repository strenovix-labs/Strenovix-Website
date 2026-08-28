import './Work.css';

const cases = [
  { num: '01', tag: 'App Development',  name: 'FitTrack Pro',   desc: 'A cross-platform fitness app with AI-based workout generation, real-time performance analytics and seamless wearable integration.' },
  { num: '02', tag: 'Web Development',  name: 'Nexus Commerce', desc: 'Headless e-commerce platform built on Next.js with sub-second load times, 340% conversion improvement over 90 days.' },
  { num: '03', tag: 'ML / AI',          name: 'DataSense AI',   desc: 'Custom LLM fine-tuned on proprietary datasets: reduced manual data processing by 80% and unlocked real-time market intelligence.' },
  { num: '04', tag: 'Digital Marketing', name: 'Growspark',     desc: '360° growth campaign spanning SEO, paid ads and content: 5× ROAS within two months, 220K new monthly users.' },
];

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="work-inner">

        <div className="work-head">
          <div className="work-head-left">
            <span className="section-label reveal">Our Work</span>
            <h2 className="section-heading reveal">Case Studies.</h2>
            <p className="work-sub reveal">Built to dominate: every project a benchmark.</p>
          </div>
          <div className="reveal">
            <button className="btn-ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a Project
            </button>
          </div>
        </div>

        <div className="work-list">
          {cases.map((c) => (
            <div key={c.num} className="work-item reveal">
              <span className="work-case-num">{c.num}</span>
              <div className="work-item-left">
                <span className="work-tag">{c.tag}</span>
                <h3 className="work-name">{c.name}</h3>
              </div>
              <p className="work-desc">{c.desc}</p>
              <svg className="work-arrow" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H6M16 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
