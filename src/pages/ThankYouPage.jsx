import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home, Briefcase, Mail, ChevronLeft, CalendarCheck } from 'lucide-react';
import { useRouter } from '../RouterContext';
import { trackPageView } from '../utils/analytics';
import './ThankYouPage.css';

const ROADMAP_STEPS = [
  {
    num: '1',
    heading: 'Requirement Review',
    desc: 'Our engineering leads thoroughly examine your scope, tech stack, and goals within 12-24 hours.',
  },
  {
    num: '2',
    heading: 'Discovery Session',
    desc: 'We schedule a quick 20-min consultation to clarify architectural nuances and timeline expectations.',
  },
  {
    num: '3',
    heading: 'Proposal & Kickoff',
    desc: 'You receive a complete milestone blueprint with sprint deliverables and transparent terms.',
  },
];

export default function ThankYouPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    trackPageView('thank-you', 'Thank You | Strenovix');
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="thankyou-root">
      {/* Top Navigation Bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <ChevronLeft size={16} />
          Home
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <a href="mailto:strenovix@gmail.com" className="page-back-cta inline-flex items-center gap-1.5">
          <Mail size={14} />
          Direct Email
        </a>
      </div>

      <div className="thankyou-container">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="thankyou-badge"
        >
          <CheckCircle2 size={16} />
          Message Successfully Received
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="thankyou-title"
        >
          Thank You for <span className="text-[#F04A00]">Reaching Out.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="thankyou-subtitle"
        >
          We've received your inquiry. One of our engineers will review your project details and get back to you shortly.
        </motion.p>

        {/* 3-Step Next Steps Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="thankyou-roadmap"
        >
          <div className="thankyou-roadmap-title">
            <CalendarCheck size={16} />
            What Happens Next?
          </div>
          <div className="thankyou-steps-grid">
            {ROADMAP_STEPS.map((step) => (
              <div key={step.num} className="thankyou-step-card">
                <div className="thankyou-step-num">{step.num}</div>
                <h2 className="thankyou-step-heading">{step.heading}</h2>
                <p className="thankyou-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="thankyou-actions"
        >
          <button onClick={() => navigate('')} className="thankyou-btn-primary">
            <Home size={16} />
            Back to Homepage
          </button>
          <button
            onClick={() => {
              navigate('');
              setTimeout(() => {
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }, 200);
            }}
            className="thankyou-btn-secondary"
          >
            <Briefcase size={16} />
            Explore Case Studies
          </button>
        </motion.div>
      </div>
    </div>
  );
}
