'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { subBrands, site } from '@/lib/content';
import { EASE } from '@/lib/motion';

const fields = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: false, autoComplete: 'tel' },
];

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Something went wrong.');
      setStatus('success');
      e.target.reset();
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try WhatsApp.');
    }
  };

  return (
    <div className="card-base relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand shadow-glow"
            >
              <motion.svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                <motion.path
                  d="M20 6 9 17l-5-5"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                />
              </motion.svg>
            </motion.div>
            <h3 className="mt-5 font-display text-h3 text-ink">Request received</h3>
            <p className="mt-2 max-w-sm text-slate">
              Thank you — we&apos;ll get back to you shortly. For anything urgent, message us on WhatsApp.
            </p>
            <div className="mt-6 flex gap-3">
              <Button href={site.whatsapp} variant="primary" size="md" target="_blank" rel="noreferrer">
                WhatsApp us
              </Button>
              <Button variant="secondary" size="md" onClick={() => setStatus('idle')}>
                Send another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <FieldWrap key={f.name} className={f.name === 'name' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-ink">
                    {f.label} {f.required && <span className="text-reesh-blue">*</span>}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    autoComplete={f.autoComplete}
                    className="peer w-full rounded-btn border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-all duration-med ease-reesh placeholder:text-gray focus:border-reesh-blue focus:shadow-[0_0_0_4px_rgba(0,159,208,.14)]"
                  />
                </FieldWrap>
              ))}

              <FieldWrap>
                <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
                  Service of interest
                </label>
                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  className="w-full rounded-btn border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-all duration-med ease-reesh focus:border-reesh-blue focus:shadow-[0_0_0_4px_rgba(0,159,208,.14)]"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {subBrands.map((b) => (
                    <option key={b.slug} value={b.name}>
                      {b.name} — {b.tag}
                    </option>
                  ))}
                  <option value="Multiple / Not sure">Multiple / Not sure</option>
                </select>
              </FieldWrap>

              <FieldWrap>
                <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-ink">
                  Budget range
                </label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue=""
                  className="w-full rounded-btn border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-all duration-med ease-reesh focus:border-reesh-blue focus:shadow-[0_0_0_4px_rgba(0,159,208,.14)]"
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $500</option>
                  <option>$500 – $2,000</option>
                  <option>$2,000 – $5,000</option>
                  <option>$5,000+</option>
                </select>
              </FieldWrap>
            </div>

            <FieldWrap>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                Tell us about your project <span className="text-reesh-blue">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-none rounded-btn border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-all duration-med ease-reesh placeholder:text-gray focus:border-reesh-blue focus:shadow-[0_0_0_4px_rgba(0,159,208,.14)]"
                placeholder="What are you looking to build or grow?"
              />
            </FieldWrap>

            {status === 'error' && (
              <p role="alert" className="rounded-btn bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button type="submit" variant="primary" size="lg" arrow className="w-full sm:w-auto" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Request'}
              </Button>
              <p className="text-sm text-gray">We usually reply within one business day.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldWrap({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}
