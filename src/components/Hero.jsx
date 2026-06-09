import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowDown, GitFork, Link2 } from 'lucide-react'

const ROLES = [
  'Full Stack Developer',
  'AI/ML Engineer',
  'React Specialist',
  'Problem Solver',
  'Freelancer'
]

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pause = 1800) {
  const [text, setText]       = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    const current = words[wordIdx]
    if (!deleting && text === current) {
      timeout.current = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    } else {
      const delta = deleting ? deletingSpeed : typingSpeed
      timeout.current = setTimeout(() => {
        setText(deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
        )
      }, delta)
    }
    return () => clearTimeout(timeout.current)
  }, [text, deleting, wordIdx, words, typingSpeed, deletingSpeed, pause])

  return text
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }
})

export default function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid lines background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow center */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(109,40,217,0.14) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="section-wrap" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'center',
        }} className="hero-grid">

          {/* Text content */}
          <div style={{ maxWidth: '640px' }}>
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '99px',
              border: '1px solid var(--clr-border)',
              background: 'rgba(139,92,246,0.08)',
              fontSize: '0.78rem',
              fontWeight: 500,
              color: 'var(--clr-purple-300)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--clr-accent)',
                boxShadow: '0 0 8px var(--clr-accent)',
                animation: 'pulse 2s ease infinite'
              }} />
              Open to opportunities
            </motion.div>

            {/* Name */}
            <motion.h1 {...fadeUp(0.2)} style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
              color: 'var(--clr-text)',
            }}>
              Syed{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--clr-purple-300) 0%, var(--clr-accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Umair
              </span>{' '}
              Ali
            </motion.h1>

            {/* Typewriter */}
            <motion.div {...fadeUp(0.3)} style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.1rem, 3vw, 1.7rem)',
              color: 'var(--clr-purple-400)',
              marginBottom: '1.5rem',
              minHeight: '2.2rem',
              display: 'flex', alignItems: 'center', gap: '2px',
            }}>
              {role}
              <span style={{
                display: 'inline-block',
                width: 3, height: '1.2em',
                background: 'var(--clr-accent)',
                borderRadius: '2px',
                marginLeft: '2px',
                animation: 'blink 1s step-end infinite',
              }} />
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.4)} style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--clr-text-muted)',
              marginBottom: '2.5rem',
              maxWidth: '520px',
            }}>
              B.Tech CSE (AI & ML) graduate with hands-on experience across{' '}
              <span style={{ color: 'var(--clr-purple-300)', fontWeight: 500 }}>6+ projects</span>{' '}
              in full-stack development and AI/ML. I build responsive, data-driven applications
              using React, Node.js, Python & LangGraph.
            </motion.p>

            {/* CTA row */}
            <motion.div {...fadeUp(0.5)} style={{
              display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center'
            }}>
              {/* Download Resume */}
              <motion.a
                href="/resume.pdf"
                download="Syed_Umair_Ali_Resume.pdf"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--clr-purple-600), var(--clr-purple-700))',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: '0 0 30px rgba(109,40,217,0.4)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.02em',
                  border: '1px solid rgba(167,139,250,0.25)',
                }}
              >
                <Download size={17} strokeWidth={2.5} />
                Download Resume
              </motion.a>

              {/* Contact */}
              <motion.a
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: 'var(--clr-purple-300)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.02em',
                  border: '1px solid var(--clr-border)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
                  e.currentTarget.style.background = 'rgba(139,92,246,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--clr-border)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Let's Talk
              </motion.a>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '0.6rem', marginLeft: '0.3rem' }}>
                {[
                  { Icon: GitFork,   href: 'https://github.com/umairjs-codes',                     label: 'GitHub' },
                  { Icon: Link2, href: 'https://www.linkedin.com/in/syed-umair-ali-a01b87262/', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 42, height: 42,
                      borderRadius: '10px',
                      border: '1px solid var(--clr-border)',
                      color: 'var(--clr-text-muted)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
                      e.currentTarget.style.color = 'var(--clr-purple-300)'
                      e.currentTarget.style.background = 'rgba(139,92,246,0.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--clr-border)'
                      e.currentTarget.style.color = 'var(--clr-text-muted)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile image / avatar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-avatar"
            style={{
              position: 'relative',
              width: 280, height: 320,
              flexShrink: 0,
            }}
          >
            {/* Decorative ring */}
            <div style={{
              position: 'absolute', inset: -16,
              borderRadius: '24px',
              border: '1px solid rgba(139,92,246,0.25)',
              animation: 'spin-slow 12s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: -32,
              borderRadius: '32px',
              border: '1px dashed rgba(139,92,246,0.12)',
            }} />

            {/* Avatar container */}
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '20px',
              background: 'linear-gradient(145deg, rgba(109,40,217,0.25) 0%, rgba(13,8,26,0.9) 100%)',
              border: '1px solid var(--clr-border)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1rem',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Initials avatar */}
              <div style={{
                width: 110, height: 110,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--clr-purple-600), var(--clr-purple-900))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '2.5rem',
                color: 'var(--clr-purple-200)',
                boxShadow: '0 0 40px rgba(109,40,217,0.5)',
                border: '3px solid rgba(196,181,253,0.3)',
                letterSpacing: '-0.02em',
              }}>
                UA
              </div>

              <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--clr-purple-200)',
                  marginBottom: '0.25rem',
                }}>
                  Syed Umair Ali
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--clr-text-dim)',
                  fontWeight: 500,
                }}>
                  CSE (AI & ML) · B.Tech 2025
                </div>
              </div>

              {/* Mini stats */}
              <div style={{
                display: 'flex', gap: '1rem',
                borderTop: '1px solid var(--clr-border)',
                width: '100%', padding: '0.85rem 1.5rem',
                justifyContent: 'center',
              }}>
                {[['6+', 'Projects'], ['3', 'Internships']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: 'var(--clr-purple-300)',
                    }}>{n}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--clr-text-dim)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute', bottom: '-3rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.4rem',
            color: 'var(--clr-text-dim)',
            fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px var(--clr-accent); }
          50% { box-shadow: 0 0 18px var(--clr-accent); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-avatar {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
