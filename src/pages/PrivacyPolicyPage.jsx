import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, ChevronLeft, Lock } from 'lucide-react';
import { useRouter } from '../RouterContext';
import { trackPageView } from '../utils/analytics';
import './LegalPage.css';

const PRIVACY_SECTIONS = [
  {
    num: '01',
    title: 'Information We Collect',
    content: [
      'We collect information that you directly provide to us when contacting us through our website or initiating a software project with Strenovix. This includes your name, email address, phone number, organization, and project specifications.',
      'We also automatically collect standard technical usage data such as IP address, browser type, operating system, referring URLs, device information, and pages visited via Google Analytics to monitor and optimize site performance.',
    ],
  },
  {
    num: '02',
    title: 'How We Use Your Information',
    content: [
      'To evaluate project scopes, respond to inquiries, and formulate technical proposals.',
      'To provide, maintain, and enhance our software development and digital agency services.',
      'To analyze site traffic, user interaction patterns, and conversion metrics via Google Analytics.',
      'To prevent spam, fraudulent activity, and enforce security integrity across our digital properties.',
    ],
  },
  {
    num: '03',
    title: 'Cookies & Tracking Technologies',
    content: [
      'Our website uses essential cookies and Google Analytics (gtag.js) cookies to distinguish visitors, compile statistical reports, and gauge platform speed.',
      'You can control your cookie preferences at any time using our cookie consent banner or by configuring your browser settings to reject cookies.',
    ],
  },
  {
    num: '04',
    title: 'Data Storage & Security',
    content: [
      'We implement rigorous industry-standard security protocols, encryption in transit (HTTPS/TLS), and restricted access controls to safeguard your personal information.',
      'We do not sell, rent, or trade your personal information to any third parties for marketing purposes.',
    ],
  },
  {
    num: '05',
    title: 'Third-Party Services',
    content: [
      'We may engage reputable third-party services (such as Google Analytics, Resend, EmailJS, and secure hosting providers) to operate our platform. These vendors only process data in compliance with strict privacy and security agreements.',
    ],
  },
  {
    num: '06',
    title: 'Your Privacy Rights',
    content: [
      'Depending on your jurisdiction (including under India’s Digital Personal Data Protection Act and international data privacy frameworks), you have the right to access, rectify, or request deletion of your personal data held by us.',
      'To exercise any of these rights, please contact us at strenovix@gmail.com.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    trackPageView('privacy-policy', 'Privacy Policy | Strenovix');
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="legal-root">
      {/* Top Back Navigation Bar */}
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
            <Lock size={13} />
            Data Protection & Privacy
          </div>
          <h1 className="legal-title">Privacy Policy</h1>
          <div className="legal-meta">
            <span>Last Updated: September 2026</span>
            <span>•</span>
            <span>Strenovix Digital Solutions</span>
          </div>
        </header>

        <main className="legal-content">
          <p className="legal-text" style={{ fontSize: '15px', fontWeight: '500' }}>
            At Strenovix, we prioritize the trust of our clients and visitors. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information when you interact with our website and digital services.
          </p>

          {PRIVACY_SECTIONS.map((section, idx) => (
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
              <h3 className="legal-footer-title">Have questions about your data?</h3>
              <p className="legal-footer-desc">
                Contact our privacy and security team for any inquiries or data requests.
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
