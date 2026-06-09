import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ChevronDown, Briefcase, Calendar } from 'lucide-react'

const experiences = [
  {
    role: 'AI Intern — Ambient Email Agent',
    company: 'Infosys Springboard',
    period: 'Nov 2025 – Feb 2026',
    type: 'Remote',
    color: '#8b5cf6',
    points: [
      'Built an autonomous Ambient Email Assistant using LangGraph and Google Gemini, enabling intelligent email triage, contextual understanding, and action execution (ignore, notify, respond).',
      'Designed a multi-node, stateful workflow incorporating ReAct reasoning, tool integration, and Human-in-the-Loop (HITL) checkpoints for safe automation.',
      'Developed a custom evaluation pipeline with human-labeled datasets to measure intent accuracy, perform error analysis, and improve decision quality.',
      'Implemented persistent memory and LangSmith observability for adaptive behavior and secure version-controlled deployment via Git/GitHub.',
    ],
  },
  {
    role: 'ML Intern — Plant Disease Detection',
    company: 'Edunet Foundation (Microsoft · SAP · AICTE)',
    period: 'Dec 2024 – Feb 2025',
    type: 'Remote · Bengaluru',
    color: '#a78bfa',
    points: [
      'Developed a Plant Disease Detection System using Convolutional Neural Networks for image recognition tasks.',
      'Delivered actionable insights for farmers — detecting plant diseases and recommending treatments and pesticides.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Motion Cut',
    period: 'Sep 2024 – Oct 2024',
    type: 'Remote · Lucknow',
    color: '#c084fc',
    points: [
      'Developed and deployed three interactive web projects using React, HTML, CSS, and JavaScript.',
      'Built a personal portfolio website with integrated contact form and dynamic content loading.',
      'Created a Movie Fan Page with embedded YouTube trailers and dynamic quote features.',
      'Designed a Cricket Star Showcase platform profiling iconic cricket players.',
    ],
  },
]

function ExperienceCard({ exp, index, inView }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Timeline dot */}
      <div style={{
        position: 'absolute',
        left: '-2.5rem',
        top: '1.6rem',
        width: 12, height: 12,
        borderRadius: '50%',
        background: exp.color,
        boxShadow: `0 0 16px ${exp.color}80`,
        border: '2px solid var(--clr-bg)',
        zIndex: 1,
      }} />

      <motion.div
        whileHover={{ borderColor: 'rgba(139,92,246,0.4)' }}
        style={{
          borderRadius: '16px',
          border: '1px solid var(--clr-border)',
          background: 'var(--clr-bg-card)',
          overflow: 'hidden',
          transition: 'border-color 0.25s',
        }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%', textAlign: 'left',
            padding: '1.4rem 1.6rem',
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', gap: '1rem',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--clr-text)',
              marginBottom: '0.3rem',
            }}>
              {exp.role}
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
              alignItems: 'center',
            }}>
              <span style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontSize: '0.85rem', color: exp.color, fontWeight: 600,
              }}>
                <Briefcase size={13} />
                {exp.company}
              </span>
              <span style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontSize: '0.8rem', color: 'var(--clr-text-dim)',
              }}>
                <Calendar size={12} />
                {exp.period}
              </span>
              <span style={{
                fontSize: '0.74rem',
                color: 'var(--clr-text-dim)',
                padding: '0.15rem 0.55rem',
                borderRadius: '99px',
                border: '1px solid var(--clr-border)',
              }}>
                {exp.type}
              </span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: 'var(--clr-text-dim)', marginTop: '0.25rem', flexShrink: 0 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ul style={{
                padding: '0 1.6rem 1.4rem',
                display: 'flex', flexDirection: 'column', gap: '0.65rem',
              }}>
                {exp.points.map((pt, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: '0.75rem',
                    fontSize: '0.88rem',
                    color: 'var(--clr-text-muted)',
                    lineHeight: 1.7,
                  }}>
                    <span style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: exp.color,
                      flexShrink: 0,
                      marginTop: '0.55rem',
                    }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience" style={{ position: 'relative', zIndex: 1 }}>
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
          }}>02 · Experience</span>
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
            marginBottom: '3rem',
          }}
        >
          Where I've <span className="grad-text">worked</span>
        </motion.h2>

        {/* Timeline */}
        <div style={{
          paddingLeft: '2.5rem',
          borderLeft: '1px solid var(--clr-border)',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
          position: 'relative',
        }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
