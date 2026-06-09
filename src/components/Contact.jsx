import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { useInView } from '../hooks/useInView'
import { Mail, Phone, MapPin, Send, CheckCircle, GitFork, Link2, Globe } from 'lucide-react'

const contactInfo = [
  { Icon: Mail,   label: 'Email',    value: 'imumair623@gmail.com',  href: 'mailto:imumair623@gmail.com' },
  { Icon: Phone,  label: 'Phone',    value: '+91 6398550678',         href: 'tel:+916398550678' },
  { Icon: MapPin, label: 'Location', value: 'Budaun, Uttar Pradesh',  href: null },
]

export default function Contact() {
  const [ref, inView] = useInView()

  // ✅ Real Formspree hook
  const [state, handleSubmit] = useForm("xjgzvlne")

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1.1rem',
    borderRadius: '12px',
    background: 'rgba(139,92,246,0.06)',
    border: '1px solid var(--clr-border)',
    color: 'var(--clr-text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  }

  const focusStyle = e => {
    e.target.style.borderColor = 'var(--clr-purple-500)'
    e.target.style.background  = 'rgba(139,92,246,0.1)'
  }
  const blurStyle = e => {
    e.target.style.borderColor = 'var(--clr-border)'
    e.target.style.background  = 'rgba(139,92,246,0.06)'
  }

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-wrap" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--clr-purple-400)',
          }}>06 · Contact</span>
          <div style={{ flex: 1, height: 1, background: 'var(--clr-border)', maxWidth: 80 }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            lineHeight: 1.15, letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
          }}
        >
          Let's <span className="grad-text">connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            color: 'var(--clr-text-muted)', fontSize: '0.97rem',
            marginBottom: '3rem', maxWidth: 480,
          }}
        >
          I'm actively looking for new opportunities. Whether you have a project, role, or just want to say hi, my inbox is always open.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '3rem',
          alignItems: 'start',
        }} className="contact-grid">

          {/* ── Left: contact info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contactInfo.map(({ Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem', borderRadius: '14px',
                  background: 'var(--clr-bg-card)', border: '1px solid var(--clr-border)',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '10px',
                  background: 'rgba(109,40,217,0.2)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--clr-purple-400)', flexShrink: 0,
                }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {label}
                  </div>
                  {href ? (
                    <a href={href} style={{ fontSize: '0.88rem', color: 'var(--clr-purple-300)', fontWeight: 500 }}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.88rem', color: 'var(--clr-text-muted)', fontWeight: 500 }}>
                      {value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                padding: '1rem 1.25rem', borderRadius: '14px',
                background: 'var(--clr-bg-card)', border: '1px solid var(--clr-border)',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Social
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {[
                  { Icon: GitFork, href: 'https://github.com/umairjs-codes',                      label: 'GitHub' },
                  { Icon: Link2,   href: 'https://www.linkedin.com/in/syed-umair-ali-a01b87262/', label: 'LinkedIn' },
                  { Icon: Globe,   href: 'https://umair-s-portfolio-gold.vercel.app/',             label: 'Portfolio' },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label} whileHover={{ scale: 1.1, y: -2 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 40, height: 40, borderRadius: '10px',
                      border: '1px solid var(--clr-border)',
                      color: 'var(--clr-text-dim)', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--clr-purple-300)'
                      e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
                      e.currentTarget.style.background = 'rgba(139,92,246,0.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--clr-text-dim)'
                      e.currentTarget.style.borderColor = 'var(--clr-border)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              padding: '2rem', borderRadius: '18px',
              background: 'var(--clr-bg-card)', border: '1px solid var(--clr-border)',
            }}
          >
            {/* ✅ Success screen shown after real Formspree submission */}
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '1rem', padding: '2rem 0', textAlign: 'center',
                }}
              >
                <CheckCircle size={48} color="var(--clr-purple-400)" />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--clr-purple-300)' }}>
                  Message sent!
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--clr-text-muted)' }}>
                  Thanks for reaching out — I'll get back to you soon.
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <input name="name" type="text" placeholder="Your name" required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }} />
                  </div>
                  <div>
                    <input name="email" type="email" placeholder="Your email" required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }} />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <input name="subject" type="text" placeholder="Subject" required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }} />
                </div>

                {/* Message */}
                <div>
                  <textarea name="message" placeholder="Your message..." required rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} onFocus={focusStyle} onBlur={blurStyle} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.25rem' }} />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.6rem', padding: '0.85rem', borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--clr-purple-600), var(--clr-purple-700))',
                    color: '#fff', fontWeight: 600, fontSize: '0.92rem',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 0 24px rgba(109,40,217,0.35)',
                    opacity: state.submitting ? 0.7 : 1,
                    cursor: state.submitting ? 'wait' : 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {state.submitting ? (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Sending…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Send size={16} /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}