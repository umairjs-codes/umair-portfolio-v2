import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ExternalLink, GitFork, Globe } from 'lucide-react'

const projects = [
  {
    title: 'Dr. Crop AI',
    desc: 'CNN-powered plant disease detection system. Farmers upload a photo; the app identifies the disease and recommends targeted pesticide treatment.',
    tags: ['Python', 'Flask', 'CNN', 'HTML', 'CSS', 'JavaScript'],
    icon: '🌿',
    color: '#7c3aed',
    github: 'https://github.com/umairjs-codes/Plant-disease-detection.git',
    live: null,
  },
  {
    title: 'Ambient Email Agent',
    desc: 'Autonomous email assistant using LangGraph + Google Gemini. Features ReAct reasoning, HITL checkpoints, and LangSmith observability for intelligent triage.',
    tags: ['LangGraph', 'Google Gemini', 'Python', 'ReAct', 'HITL'],
    icon: '📧',
    color: '#8b5cf6',
    github: 'https://github.com/springboardmentor74219x/infosys-langgraph-email-assistant-group2.git',
    live: null,
  },
  {
    title: 'Personal Portfolio',
    desc: 'Responsive developer portfolio with dynamic content loading, integrated contact form, and smooth animations. Deployed on Vercel.',
    tags: ['React', 'JavaScript', 'CSS', 'Vercel'],
    icon: '💼',
    color: '#a78bfa',
    github: 'https://github.com/umairjs-codes/umair-s_portfolio',
    live: 'https://umair-s-portfolio-gold.vercel.app/',
  },
  {
    title: 'Movie Fan Page',
    desc: 'Dynamic movie showcase with embedded YouTube trailers, dynamic quote features, and rich media browsing experience.',
    tags: ['React', 'HTML', 'CSS', 'JavaScript', 'YouTube embedded links'],
    icon: '🎬',
    color: '#c084fc',
    github: 'https://github.com/umairjs-codes/Moviefan-page.git',
    live: null,
  },
  {
    title: 'HCP CRM AI Agent',
    desc: 'An AI-powered Customer Relationship Management system for pharmaceutical field representatives to log and manage interactions with Healthcare Professionals (HCPs).',
    tags: ['LangGraph', 'Python(FastAPI)', 'React 18',' Redux Toolkit', 'Groq API ', 'PostgreSQL'],
    icon: '🏥',
    color: '#9333ea',
    github: 'https://github.com/umairjs-codes/hcp-crm.git',
    live: null,
  },
  {
    title: 'Document Q&A Assistant',
    desc: 'AI-powered question answering system for PDFs, audio, and video files using Groq API. Upload any PDF or document and ask natural language questions — the agent retrieves and synthesizes accurate answers.',
    tags: ['Python', 'React 18', 'PyPDF2', 'Zustand', 'Groq API (LLM & Whisper)'],
    icon: '📄',
    color: '#7c3aed',
    github: 'https://github.com/umairjs-codes/document-qa-assistant.git',
    live: null,
  },
]

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 1 }}>
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
          }}>04 · Projects</span>
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
          Things I've <span className="grad-text">built</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.45)' }}
              style={{
                padding: '1.5rem',
                borderRadius: '18px',
                background: 'var(--clr-bg-card)',
                border: '1px solid var(--clr-border)',
                display: 'flex', flexDirection: 'column',
                gap: '1rem',
                transition: 'border-color 0.25s, transform 0.3s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: 3,
                background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                borderRadius: '18px 18px 0 0',
              }} />

              {/* Icon + Links */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '12px',
                  background: `${proj.color}25`,
                  border: `1px solid ${proj.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem',
                }}>
                  {proj.icon}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {proj.github && (
                    <motion.a
                      href={proj.github} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 34, height: 34, borderRadius: '8px',
                        border: '1px solid var(--clr-border)',
                        color: 'var(--clr-text-dim)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--clr-purple-300)'
                        e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--clr-text-dim)'
                        e.currentTarget.style.borderColor = 'var(--clr-border)'
                      }}
                    >
                      <GitFork size={16} />
                    </motion.a>
                  )}
                  {proj.live && (
                    <motion.a
                      href={proj.live} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 34, height: 34, borderRadius: '8px',
                        border: '1px solid var(--clr-border)',
                        color: 'var(--clr-text-dim)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--clr-purple-300)'
                        e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--clr-text-dim)'
                        e.currentTarget.style.borderColor = 'var(--clr-border)'
                      }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700, fontSize: '1rem',
                  color: 'var(--clr-text)',
                  marginBottom: '0.5rem',
                }}>
                  {proj.title}
                </div>
                <p style={{
                  fontSize: '0.84rem',
                  color: 'var(--clr-text-muted)',
                  lineHeight: 1.7,
                }}>
                  {proj.desc}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                {proj.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '0.2rem 0.65rem',
                    borderRadius: '99px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: 'rgba(109,40,217,0.15)',
                    color: 'var(--clr-purple-300)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    letterSpacing: '0.02em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <motion.a
            href="https://github.com/umairjs-codes"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.75rem 1.8rem',
              borderRadius: '12px',
              border: '1px solid var(--clr-border)',
              color: 'var(--clr-purple-300)',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s',
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
            <GitFork size={17} />
            See all projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}