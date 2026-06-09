import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Code2, Brain, Layers, Globe } from 'lucide-react'

const cards = [
  { Icon: Code2,  title: 'Frontend Dev',   desc: 'React, JavaScript, Tailwind CSS — building pixel-perfect, responsive UIs.' },
  { Icon: Layers, title: 'Backend Dev',    desc: 'Node.js, Express, Fast APIs, Python Flask — robust server-side logic.' },
  { Icon: Brain,  title: 'AI / ML',        desc: 'CNN image recognition, LangGraph agents, Google Gemini integration.' },
  { Icon: Globe,  title: 'Full Stack',     desc: 'End-to-end project delivery: from idea to deployed, production-ready app.' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-wrap" ref={ref}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            marginBottom: '1rem',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--clr-purple-400)',
          }}>
            01 · About
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--clr-border)', maxWidth: 80 }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }} className="about-grid">

          {/* Left: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              Crafting{' '}
              <span className="grad-text">intelligent</span>{' '}
              web experiences
            </motion.h2>

            {[
              `I'm a B.Tech graduate in Computer Science & Engineering (AI & ML) from Khwaja Moinuddin Chishti Language University, Lucknow (2025, CGPA: 6.69). I combine a solid foundation in algorithms with real-world frontend craftsmanship.`,
              `Over three internships — at Motion Cut, Edunet Foundation (Microsoft/SAP/AICTE), and Infosys Springboard — I've shipped production-grade work ranging from CNN-powered crop disease detection to autonomous LangGraph email agents.`,
              `I thrive in agile teams, take ownership end-to-end, and am genuinely excited about the convergence of modern frontend frameworks and AI-powered tooling.`,
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                style={{
                  color: 'var(--clr-text-muted)',
                  fontSize: '0.97rem',
                  lineHeight: 1.85,
                  marginBottom: '1rem',
                }}
              >
                {p}
              </motion.p>
            ))}

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem', marginTop: '1.5rem',
              }}
            >
              {[
                ['📍', 'Budaun, Uttar Pradesh'],
                ['🎓', 'B.Tech CSE (AI & ML)'],
                ['💼', 'Open to Full-time'],
                ['🌐', 'English · Hindi'],
              ].map(([icon, text]) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.85rem', color: 'var(--clr-text-muted)',
                }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: service cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {cards.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, borderColor: 'rgba(139,92,246,0.45)' }}
                style={{
                  padding: '1.4rem',
                  borderRadius: '16px',
                  background: 'var(--clr-bg-card)',
                  border: '1px solid var(--clr-border)',
                  transition: 'border-color 0.25s',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 42, height: 42,
                  borderRadius: '10px',
                  background: 'rgba(109,40,217,0.2)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.9rem',
                  color: 'var(--clr-purple-400)',
                }}>
                  <Icon size={20} />
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: 'var(--clr-text)',
                  marginBottom: '0.4rem',
                }}>
                  {title}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--clr-text-dim)',
                  lineHeight: 1.6,
                }}>
                  {desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
