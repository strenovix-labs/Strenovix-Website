import BorderGlow from './BorderGlow';
import './Process.css';

const steps = [
  { num: '01', label: 'Kick Off Call',     desc: 'We understand your goals, target audience, and success metrics through a focused discovery sprint.' },
  { num: '02', label: 'Research & Design', desc: 'Deep competitive research followed by wireframes, prototypes and validated design systems.' },
  { num: '03', label: 'Build & Integrate', desc: 'Rapid engineering sprints with weekly demos, shipping quality code with full CI/CD pipelines.' },
  { num: '04', label: 'Launch & Optimise', desc: 'Go-live, performance tuning, A/B experiments and ongoing maintenance to keep you ahead.' },
];

const pillars = [
  { title: 'Speed',          desc: 'We move fast without breaking things. Our battle-tested process cuts time-to-market without sacrificing quality.' },
  { title: 'Research-based', desc: 'Every decision is backed by data: user research, competitive analysis, and performance benchmarks.' },
  { title: 'Unbiased',       desc: 'We recommend what actually solves your problem, not what pads our invoice.' },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-inner">
        {/* Pillars */}
        <div className="pillars">
          <div className="pillars-left">
            <span className="section-label reveal">Our Approach</span>
            <h2 className="section-heading reveal">
              Where ambition<br />meets velocity.
            </h2>
          </div>
          <div className="pillars-right">
            {pillars.map((p, i) => (
              <div key={i} className="pillar reveal">
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="how-it-works">
          <span className="section-label reveal">How It Works</span>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <BorderGlow
                key={i}
                className="reveal"
                backgroundColor="var(--black)"
                borderRadius={20}
                glowColor="246 100 69"
                colors={['#6c63ff', '#00d8ff', '#ff4ecd']}
                style={{ height: '100%' }}
              >
                <div className="step">
                  <span className="step-num">{s.num}</span>
                  <h3 className="step-label">{s.label}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
