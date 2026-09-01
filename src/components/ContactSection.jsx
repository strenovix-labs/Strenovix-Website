import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from '../RouterContext';
import { trackEvent } from '../utils/analytics';

export default function ContactSection({ prefilledEmail }) {
  const ref = useRef(null);
  const emailInputRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { navigate } = useRouter();
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    honeypot: '',
  });
  
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const validateEmail = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g. name@example.com)';
    }
    return '';
  };

  useEffect(() => {
    if (prefilledEmail) {
      setFormState((s) => ({ ...s, email: prefilledEmail }));
      const err = validateEmail(prefilledEmail);
      if (err) {
        setEmailError(err);
        setEmailTouched(true);
      }
    }
  }, [prefilledEmail]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormState((s) => ({ ...s, email: val }));
    if (emailTouched) {
      setEmailError(validateEmail(val));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(formState.email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Validate email explicitly
    const emailErr = validateEmail(formState.email);
    if (emailErr) {
      setEmailTouched(true);
      setEmailError(emailErr);
      emailInputRef.current?.focus();
      return;
    }

    // Check other required fields
    if (!formState.name.trim() || !formState.projectDetails.trim()) {
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
        trackEvent('form_submit', {
          form_name: 'contact_section',
          sender_name: formState.name,
        });
        setFormState({ name: '', email: '', phone: '', projectDetails: '', honeypot: '' });
        setEmailError('');
        setEmailTouched(false);
        // Smoothly redirect to Thank You page
        setTimeout(() => {
          navigate('thank-you');
        }, 600);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };

  const isEmailInvalid = Boolean(emailTouched && emailError);

  return (
    <section className="relative z-10 bg-transparent pt-20 pb-10 px-4 md:px-8" id="contact">
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
                <p className="text-black text-lg font-medium mb-2">Thanks! Redirecting you to confirmation...</p>
                <p className="text-black/70 text-sm">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    disabled={status === 'sending'}
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className="w-full bg-[#F5F5EE] border border-black/[0.08] rounded-xl px-5 py-4 text-black text-sm placeholder-gray-400 outline-none focus:border-[#F04A00]/40 transition-colors disabled:opacity-60"
                  />
                </div>

                {/* Email with dedicated error state */}
                <div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    placeholder="Your email"
                    required
                    disabled={status === 'sending'}
                    value={formState.email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    aria-invalid={isEmailInvalid}
                    aria-describedby={isEmailInvalid ? 'email-error-msg' : undefined}
                    className={`w-full bg-[#F5F5EE] rounded-xl px-5 py-4 text-black text-sm placeholder-gray-400 outline-none transition-all disabled:opacity-60 ${
                      isEmailInvalid
                        ? 'border border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/30'
                        : 'border border-black/[0.08] focus:border-[#F04A00]/40'
                    }`}
                  />
                  <AnimatePresence>
                    {isEmailInvalid && (
                      <motion.p
                        id="email-error-msg"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 pl-1 font-medium"
                      >
                        <AlertCircle size={13} className="shrink-0 text-red-500" />
                        {emailError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    disabled={status === 'sending'}
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    className="w-full bg-[#F5F5EE] border border-black/[0.08] rounded-xl px-5 py-4 text-black text-sm placeholder-gray-400 outline-none focus:border-[#F04A00]/40 transition-colors disabled:opacity-60"
                  />
                </div>

                {/* Project Details */}
                <div>
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    disabled={status === 'sending'}
                    value={formState.projectDetails}
                    onChange={(e) => setFormState((s) => ({ ...s, projectDetails: e.target.value }))}
                    className="w-full bg-[#F5F5EE] border border-black/[0.08] rounded-xl px-5 py-4 text-black text-sm placeholder-gray-400 outline-none focus:border-[#F04A00]/40 transition-colors resize-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2 hover:gap-3 bg-black rounded-full pl-5 pr-1 py-1 transition-all duration-300 w-fit disabled:opacity-60"
                >
                  <span className="font-medium text-sm text-[#F5F5EE]">
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </span>
                  <span className="bg-[#F04A00] rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    {status === 'sending' ? (
                      <Loader2 size={15} className="text-[#F5F5EE] animate-spin" />
                    ) : (
                      <ArrowRight size={15} className="text-[#F5F5EE]" />
                    )}
                  </span>
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-xs mt-1">
                    Something went wrong. Please check your details or email us directly at strenovix@gmail.com.
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
