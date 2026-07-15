import { useState } from 'react';
import BorderGlow from './BorderGlow';
import './Testimonials.css';

const testimonials = [
  {
    quote: "Working with Strenovix completely changed how we approach our digital product. The app they built for us exceeded every benchmark.",
    name: "Aditi Sharma",
    role: "CEO, HealthFirst",
  },
  {
    quote: "Their web team is world-class. Our new platform loads in under a second, conversion rates are up 340%, and the design is stunning.",
    name: "Rahul Mehta",
    role: "CTO, Nexus Commerce",
  },
  {
    quote: "The ML model they trained on our data cut our processing time by 80%. Absolutely game-changing intelligence for our business.",
    name: "Priya Nair",
    role: "VP Product, DataSense",
  },
  {
    quote: "Our ROAS went 5× in two months. Strenovix's marketing team knows exactly how to turn ad spend into real revenue.",
    name: "Karthik Iyer",
    role: "Marketing Director, Growspark",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <span className="section-label reveal">Testimonials</span>
        <h2 className="section-heading reveal">
          Hear it from our<br />clients themselves.
        </h2>

        <div className="testi-cards reveal">
          {testimonials.map((t, i) => (
            <BorderGlow
              key={i}
              className={`testi-glow ${i === active ? 'active' : ''}`}
              backgroundColor={i === active ? 'var(--white-05)' : 'var(--black)'}
              borderRadius={20}
              glowColor="246 100 69"
              colors={['#6c63ff', '#00d8ff', '#ff4ecd']}
            >
              <div
                className={`testi-card ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        <div className="testi-dots reveal">
          {testimonials.map((_, i) => (
            <button key={i} className={`testi-dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
