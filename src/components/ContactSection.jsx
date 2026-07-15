import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Google Apps Script Web App URL bound to the Strenovix leads spreadsheet.
// Deploy the doPost script from google-apps-script.gs (repo root) and paste
// the resulting /exec URL here — see that file's header comment for steps.
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyzEQQi4fQ7n8mnzy3jvaHsUY0qABPU_YYPG2cBOiUKkFxYAe5VKuIr8T0ZEe2AvDQPLA/exec';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', projectDetails: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ ...formState, submittedAt: new Date().toISOString() }),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const fields = [
    { key: 'name', type: 'text', placeholder: 'Your name' },
    { key: 'email', type: 'email', placeholder: 'Your email' },
    { key: 'phone', type: 'tel', placeholder: 'Your phone number' },
  ];

  return (
    <section className="relative z-10 bg-transparent py-24 px-4 md:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase block mb-4">
              Get In Touch
            </span>
            <h2
              className="font-medium leading-none tracking-[-0.04em] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#E1E0CC' }}
            >
              Ready to build<br />something great?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Drop us a message and we'll get back to you within 24 hours. We love talking
              about ambitious projects — big or small.
            </p>

            <div className="mt-10 space-y-4">
              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:strenovix@gmail.com" className="text-primary text-sm hover:text-primary/70 transition-colors">
                  strenovix@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'sent' ? (
              <div className="bg-[#101010] rounded-2xl p-10 text-center">
                <p className="text-primary text-lg font-medium mb-2">Message received!</p>
                <p className="text-gray-400 text-sm">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={formState[field.key]}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                      className="w-full bg-[#101010] border border-white/[0.06] rounded-xl px-5 py-4 text-primary text-sm placeholder-gray-600 outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>
                ))}
                <textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  value={formState.projectDetails}
                  onChange={(e) => setFormState((s) => ({ ...s, projectDetails: e.target.value }))}
                  className="w-full bg-[#101010] border border-white/[0.06] rounded-xl px-5 py-4 text-primary text-sm placeholder-gray-600 outline-none focus:border-primary/30 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-5 pr-1 py-1 transition-all duration-300 w-full sm:w-auto disabled:opacity-60"
                >
                  <span className="font-medium text-sm text-black">
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </span>
                  <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    <ArrowRight size={15} className="text-primary" />
                  </span>
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-xs">
                    Something went wrong — email us directly at{' '}
                    <a href="mailto:strenovix@gmail.com" className="underline">strenovix@gmail.com</a>.
                  </p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
