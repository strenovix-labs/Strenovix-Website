import { useRouter } from '../RouterContext';
import BorderGlow from './BorderGlow';
import './Services.css';

const services = [
  {
    num: '01',
    title: 'App Development',
    route: 'services/app-dev',
    desc: 'Native and cross-platform apps built for performance, scalability, and exceptional UX, from concept to the App Store.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    num: '02',
    title: 'Web Development',
    route: 'services/web-dev',
    desc: 'High-performance web applications engineered for speed, SEO, and seamless experiences that convert visitors into customers.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    num: '03',
    title: 'ML Model Training',
    route: 'services/ml',
    desc: 'Custom AI and machine learning solutions that transform raw data into intelligent insights: your competitive edge.',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'LLMs'],
  },
  {
    num: '04',
    title: 'SAP',
    route: 'services/sap',
    desc: 'Seamless SAP integration, ERP customization, and cloud solutions to optimize enterprise processes and drive efficiency.',
    tags: ['SAP ECC/S4HANA', 'ABAP', 'Fiori', 'SAP BTP'],
  },
];

export default function Services() {
  const { navigate } = useRouter();

  return (
    <section className="services" id="services">
      <div className="services-inner">
        <div className="services-head">
          <span className="section-label reveal">Services</span>
          <h2 className="section-heading reveal reveal-delay-1">
            Our approach to success<br />is built on four pillars.
          </h2>
          <p className="services-sub reveal reveal-delay-2">
            Visually stunning, interactive products made to assert your digital dominance and captivate.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <BorderGlow
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              backgroundColor="var(--black)"
              borderRadius={20}
              glowColor="268 100 76"
              colors={['#c299ff', '#ff99cc', '#99ccff']}
            >
              <div
                className="service-card"
                onClick={() => navigate(s.route)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(s.route)}
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
                {s.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
              </div>
              <div className="service-cta">View Our Work →</div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
