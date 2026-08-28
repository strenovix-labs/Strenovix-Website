import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ContactSection({ prefilledEmail }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', projectDetails: '', honeypot: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    if (prefilledEmail) {
      setFormState((s) => ({ ...s, email: prefilledEmail }));
    }
  }, [prefilledEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Check required fields
    if (!formState.name.trim() || !formState.email.trim() || !formState.projectDetails.trim()) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.projectDetails,
          honeypot: formState.honeypot,
        }),
      });

      if (response.ok) {
        setStatus('sent');
        setFormState({ name: '', email: '', phone: '', projectDetails: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
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
            <span className="text-black/60 text-[10px] sm:text-xs tracking-widest uppercase block mb-4">
              Get In Touch
            </span>
            <h2
              className="font-medium leading-none tracking-[-0.04em] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#000000' }}
            >
              Ready to build<br /><span className="font-serif italic text-[#F04A00]">something great?</span>
            </h2>
            <p className="text-black/70 text-sm sm:text-base leading-relaxed max-w-sm">
              Drop us a message and we'll get back to you within 24 hours. We love talking
              about ambitious projects, big or small.
            </p>

            <div className="mt-10 space-y-4">
              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:strenovix@gmail.com" className="text-black text-sm hover:text-[#F04A00] transition-colors">
                  strenovix@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'sent' ? (
              <div className="bg-[#F5F5EE] rounded-2xl p-10 text-center border border-black/15">
                <p className="text-black text-lg font-medium mb-2">Thanks! Your message has been sent successfully.</p>
                <p className="text-black/70 text-sm">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-spam protection */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={formState.honeypot}
                    onChange={(e) => setFormState((s) => ({ ...s, honeypot: e.target.value }))}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>
                {fields.map((field) => (
                  <div key={field.key}>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={formState[field.key]}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                      className="w-full bg-[#F5F5EE] border border-black/[0.08] rounded-xl px-5 py-4 text-black text-sm placeholder-gray-400 outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>
                ))}
                <textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  value={formState.projectDetails}
                  onChange={(e) => setFormState((s) => ({ ...s, projectDetails: e.target.value }))}
                  className="w-full bg-[#F5F5EE] border border-black/[0.08] rounded-xl px-5 py-4 text-black text-sm placeholder-gray-400 outline-none focus:border-primary/30 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2 hover:gap-3 bg-black rounded-full pl-5 pr-1 py-1 transition-all duration-300 w-fit disabled:opacity-60"
                >
                  <span className="font-medium text-sm text-[#F5F5EE]">
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </span>
                  <span className="bg-[#F04A00] rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    <ArrowRight size={15} className="text-[#F5F5EE]" />
                  </span>
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-xs">
                    Something went wrong. Please try again.
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
