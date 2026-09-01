import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, Mail, ChevronLeft } from 'lucide-react';
import { useRouter } from '../RouterContext';
import { trackPageView } from '../utils/analytics';
import './LegalPage.css';

const TERMS_SECTIONS = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    content: [
      'By accessing and using this website or commissioning software, AI/ML engineering, or design services from Strenovix ("we", "our", "us"), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any portion of these terms, you should refrain from using our services.',
    ],
  },
  {
    num: '02',
    title: 'Scope of Services',
    content: [
      'Strenovix delivers high-performance digital solutions, including AI/ML engineering, custom web applications, native and cross-platform mobile apps, cloud architecture, and enterprise software integrations.',
      'Specific project deliverables, milestones, timelines, and technical specifications are governed by mutual Statements of Work (SOW) or project agreements entered into with clients.',
    ],
  },
  {
    num: '03',
    title: 'Intellectual Property Rights',
    content: [
      'Upon full settlement of agreed project fees, all bespoke code, design assets, and intellectual property developed exclusively for the client under an active SOW are transferred to the client, unless otherwise explicitly stipulated in writing.',
      'Strenovix retains ownership of our pre-existing proprietary frameworks, boilerplates, reusable algorithmic modules, and website content.',
    ],
  },
  {
    num: '04',
    title: 'Client Collaboration & Obligations',
    content: [
      'Clients agree to provide accurate project specifications, timely feedback, and necessary credentials/assets required for smooth milestone execution.',
      'Delays caused by missing third-party dependencies, unprovided credentials, or extended feedback intervals may adjust scheduled project delivery dates.',
    ],
  },
  {
    num: '05',
    title: 'Confidentiality & Non-Disclosure',
    content: [
      'Both parties agree to treat all proprietary business logic, product roadmaps, source code, and customer data shared during the collaboration as strictly confidential.',
    ],
  },
  {
    num: '06',
    title: 'Limitation of Liability & Warranties',
    content: [
      'Strenovix provides all services using standard best engineering practices. Except as explicitly stated in a project warranty agreement, our website and exploratory advisory are provided on an "as is" and "as available" basis.',
      'In no event shall Strenovix be liable for indirect, incidental, punitive, or consequential damages arising out of service use or third-party platform interruptions.',
    ],
  },
  {
    num: '07',
    title: 'Governing Law & Dispute Resolution',
    content: [
      'These Terms and any project contracts shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.',
    ],
  },
];

export default function TermsPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    trackPageView('terms-and-conditions', 'Terms & Conditions | Strenovix');
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="legal-root">
      {/* Top Back Bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <ChevronLeft size={16} />
          Home
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button
          className="page-back-cta"
          onClick={() => {
            navigate('');
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 200);
          }}
        >
          Contact Us
        </button>
      </div>

      <div className="legal-container">
        <header className="legal-header">
          <div className="legal-badge">
            <Scale size={13} />
            Legal Framework
          </div>
          <h1 className="legal-title">Terms & Conditions</h1>
          <div className="legal-meta">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Strenovix Digital Solutions</span>
          </div>
        </header>

        <main className="legal-content">
          <p className="legal-text" style={{ fontSize: '15px', fontWeight: '500' }}>
            Please read these Terms & Conditions carefully before engaging with Strenovix or using our digital platforms. These terms define the parameters of our service relationship and intellectual property commitments.
          </p>

          {TERMS_SECTIONS.map((section, idx) => (
            <motion.section
              key={section.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="legal-section"
            >
              <h2 className="legal-section-title">
                <span className="legal-section-title-num">{section.num}.</span>
                {section.title}
              </h2>
              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="legal-text">
                  {p}
                </p>
              ))}
            </motion.section>
          ))}

          <div className="legal-footer-contact">
            <div>
              <h3 className="legal-footer-title">Need project agreement specifics?</h3>
              <p className="legal-footer-desc">
                Contact our legal and project engineering team for dedicated enterprise contracts.
              </p>
            </div>
            <a href="mailto:strenovix@gmail.com" className="legal-footer-btn">
              <Mail size={16} />
              strenovix@gmail.com
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
