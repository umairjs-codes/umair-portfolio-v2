import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Cpu, GitFork, Globe, Layers, Zap, Brain } from 'lucide-react'

// ─── Mini project card shown inside the 3D showcase ──────────────
const FEATURED = [
  { icon: '🌿', title: 'Dr. Crop AI',          tag: 'CNN · Flask · Python',       color: '#7c3aed' },
  { icon: '📧', title: 'Ambient Email Agent',   tag: 'LangGraph · Gemini · ReAct', color: '#8b5cf6' },
  { icon: '🏥', title: 'HCP CRM AI Agent',      tag: 'LLM · Tool Calling · CRM',   color: '#9333ea' },
  { icon: '📄', title: 'Document Q&A System',   tag: 'RAG · LangChain · VectorDB', color: '#a78bfa' },
  { icon: '💼', title: 'Personal Portfolio',    tag: 'React · Vite · Framer',      color: '#c084fc' },
  { icon: '🎬', title: 'Movie Fan Page',         tag: 'React · YouTube API · CSS',  color: '#7c3aed' },
]

const STATS = [
  { Icon: Layers, label: 'Projects',    value: '6+' },
  { Icon: Brain,  label: 'AI / ML',     value: '3'  },
  { Icon: Globe,  label: 'Deployed',    value: '2'  },
  { Icon: Zap,    label: 'Internships', value: '3'  },
]

// ─── Inner dashboard rendered inside the 3D card ─────────────────
function DashboardContent() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(145deg, #0d0820 0%, #130d22 60%, #0a0612 100%)',
      borderRadius: '18px',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-body)',
      position: 'relative',
    }}>
      {/* Top bar — fake browser chrome */}
      <div style={{
        height: 42,
        background: 'rgba(139,92,246,0.08)',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        display: 'flex', alignItems: 'center',
        padding: '0 1rem', gap: '0.5rem', flexShrink: 0,
      }}>
        {/* Traffic lights */}
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        {/* Fake URL bar */}
        <div style={{
          flex: 1, maxWidth: 320, marginLeft: '0.75rem',
          height: 22, borderRadius: 6,
          background: 'rgba(139,92,246,0.1)',
          border: '1px solid rgba(139,92,246,0.15)',
          display: 'flex', alignItems: 'center',
          padding: '0 0.6rem', gap: '0.4rem',
        }}>
          <Globe size={10} color="#8b5cf6" />
          <span style={{ fontSize: '0.65rem', color: '#6d5fa8', letterSpacing: '0.02em' }}>
            umair-portfolio.vercel.app
          </span>
        </div>
        {/* Right side label */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Cpu size={12} color="#8b5cf6" />
          <span style={{ fontSize: '0.65rem', color: '#8b5cf6', fontWeight: 600, letterSpacing: '0.06em' }}>
            FULL STACK + AI/ML
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        padding: '0.85rem',
        overflow: 'hidden',
      }}>
        {/* Left: stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {/* Welcome card */}
          <div style={{
            padding: '0.9rem',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(139,92,246,0.1))',
            border: '1px solid rgba(139,92,246,0.25)',
          }}>
            <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 600, marginBottom: '0.3rem', letterSpacing: '0.06em' }}>
              DEVELOPER PROFILE
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#e9e4f7', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
              Syed Umair Ali
            </div>
            <div style={{ fontSize: '0.68rem', color: '#9d93b8', marginTop: '0.25rem' }}>
              Full Stack · AI/ML · React
            </div>
          </div>

          {/* Stat grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem', flex: 1,
          }}>
            {STATS.map(({ Icon, label, value }) => (
              <div key={label} style={{
                padding: '0.65rem',
                borderRadius: '10px',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.12)',
                display: 'flex', flexDirection: 'column',
                gap: '0.25rem',
              }}>
                <Icon size={13} color="#8b5cf6" />
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c4b5fd', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.62rem', color: '#5e5480', letterSpacing: '0.04em' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Mini skill bar */}
          <div style={{
            padding: '0.7rem',
            borderRadius: '10px',
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.1)',
          }}>
            {[
              { lang: 'JavaScript', pct: 88, color: '#f7df1e' },
              { lang: 'Python',     pct: 80, color: '#3572a5' },
              { lang: 'React',      pct: 90, color: '#61dafb' },
            ].map(({ lang, pct, color }) => (
              <div key={lang} style={{ marginBottom: '0.45rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: '0.6rem', color: '#9d93b8' }}>{lang}</span>
                  <span style={{ fontSize: '0.6rem', color: color, fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: 'rgba(139,92,246,0.1)' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99, background: color, opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'hidden' }}>
          <div style={{ fontSize: '0.62rem', color: '#5e5480', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
            Featured Projects
          </div>
          {FEATURED.map(({ icon, title, tag, color }) => (
            <div key={title} style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              padding: '0.5rem 0.65rem',
              borderRadius: '9px',
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.1)',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#ddd6fe', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {title}
                </div>
                <div style={{ fontSize: '0.58rem', color: '#5e5480', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tag}
                </div>
              </div>
              <div style={{
                marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                background: color, flexShrink: 0,
                boxShadow: `0 0 6px ${color}`,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Ambient inner glow */}
      <div style={{
        position: 'absolute', bottom: -60, left: '50%',
        transform: 'translateX(-50%)',
        width: 300, height: 120,
        background: 'radial-gradient(ellipse, rgba(109,40,217,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────
export default function ScrollShowcase() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Same transforms as the original component, tuned for our layout
  const rotate    = useTransform(scrollYProgress, [0, 0.5], [16, 0])
  const scale     = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0.75, 0.95] : [1.04, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const opacity   = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? '120vh' : '160vh',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Sticky wrapper so card stays in view while scrolling */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isMobile ? '1rem' : '2rem',
      }}>

        {/* Title — slides up as you scroll */}
        <motion.div
          style={{ translateY, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '1.5rem' : '2.5rem' }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: '99px',
              border: '1px solid rgba(139,92,246,0.25)',
              background: 'rgba(139,92,246,0.08)',
              fontSize: '0.72rem', fontWeight: 600,
              color: 'var(--clr-purple-400)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              <GitFork size={11} />
              Open Source · Actively Building
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--clr-text)',
              marginBottom: '0.6rem',
            }}>
              Building things that{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--clr-purple-300), var(--clr-accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                matter
              </span>
            </h2>

            <p style={{
              fontSize: '0.95rem',
              color: 'var(--clr-text-muted)',
              maxWidth: 460,
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              From CNN crop disease detection to autonomous AI email agents —
              every project solves a real problem.
            </p>
          </div>
        </motion.div>

        {/* 3D rotating card */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformPerspective: 1000,
            transformOrigin: 'center top',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Outer glow ring */}
          <div style={{
            padding: '3px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.6), rgba(192,132,252,0.3), rgba(109,40,217,0.6))',
            boxShadow: `
              0 0 0 1px rgba(139,92,246,0.15),
              0 20px 60px rgba(109,40,217,0.35),
              0 60px 120px rgba(109,40,217,0.15)
            `,
          }}>
            <div style={{
              width: isMobile ? '92vw' : 'min(860px, 88vw)',
              height: isMobile ? '55vw' : 'min(500px, 52vw)',
              borderRadius: '22px',
              overflow: 'hidden',
            }}>
              <DashboardContent />
            </div>
          </div>

          {/* Reflection blur under card */}
          <div style={{
            position: 'absolute',
            bottom: -40, left: '10%', right: '10%',
            height: 40,
            background: 'rgba(109,40,217,0.2)',
            filter: 'blur(20px)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Scroll hint — fades out as user scrolls */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            marginTop: '2rem',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.4rem',
            color: 'var(--clr-text-dim)',
            fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <span>Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 1, height: 28,
                background: 'linear-gradient(180deg, var(--clr-purple-500), transparent)',
                borderRadius: 99,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}