import { useRouter } from '../RouterContext';
import './Services.css';

const services = [
  {
    num: '01',
    title: 'App Development',
    route: 'services/app-dev',
    desc: 'Native and cross-platform apps built for performance, scalability, and exceptional UX — from concept to the App Store.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    accent: '#6c63ff',
  },
  {
    num: '02',
    title: 'Web Development',
    route: 'services/web-dev',
    desc: 'High-performance web applications engineered for speed, SEO, and seamless experiences that convert visitors into customers.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    accent: '#00d8ff',
  },
  {
    num: '03',
    title: 'ML Model Training',
    route: 'services/ml',
    desc: 'Custom AI and machine learning solutions that transform raw data into intelligent insights — your competitive edge.',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'LLMs'],
    accent: '#ff4ecd',
  },
  {
    num: '04',
    title: 'Digital Marketing',
    route: 'services/marketing',
    desc: 'Data-driven strategies that amplify your brand, grow your audience, and turn traffic into measurable revenue.',
    tags: ['SEO', 'Paid Ads', 'Content', 'Analytics'],
    accent: '#00d8ff',
  },
];

export default function Services() {
  const { navigate } = useRouter();

  return (
    <section className="services" id="services">
      <div className="services-inner">

        <div className="services-head">
          <div className="services-head-left">
            <span className="section-label reveal">Services</span>
            <h2 className="section-heading reveal">
              Four pillars.<br />One studio.
            </h2>
            <p className="services-sub reveal">
              Visually stunning, interactive products built to assert your digital dominance.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <div
              key={s.num}
              className="service-card reveal"
              onClick={() => navigate(s.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(s.route)}
              style={{ '--accent': s.accent }}
            >
              <div className="service-card-top">
                <span className="service-num">{s.num}</span>
                <svg className="service-arrow" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L16 4M16 4H6M16 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
              </div>
              <span className="service-cta">View work →</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
