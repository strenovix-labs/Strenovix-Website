import { useRef, useEffect, useState } from 'react';
import './Stats.css';

const metrics = [
  { value: 50,  suffix: '+', label: 'Projects Concluded'  },
  { value: 98,  suffix: '%', label: 'Efficiency Increase'  },
  { value: 3,   suffix: 'x', label: 'Avg. Turnaround Speed' },
  { value: 40,  suffix: '+', label: 'Happy Clients'         },
  { value: 60,  suffix: '%', label: 'Cost Saving vs Agency' },
  { value: 3,   suffix: '+', label: 'Years Experience'      },
];

function Counter({ value, suffix }) {
  const [count, setCount]  = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className="stat-value">{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-inner">

        <div className="stats-header reveal">
          <div>
            <span className="section-label">Key Stats</span>
            <h2 className="section-heading">
              Numbers that<br /><span className="glow-text">speak for themselves.</span>
            </h2>
            <p className="stats-sub">
              We help companies turn technology into real marketing and product advantage.
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="stats-grid">
          {metrics.map((m) => (
            <div key={m.label} className="stat-item reveal">
              <Counter value={m.value} suffix={m.suffix} />
              <span className="stat-label">{m.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
