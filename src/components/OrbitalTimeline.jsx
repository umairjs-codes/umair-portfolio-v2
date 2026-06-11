import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import {
  Brain, Code2, Layers, Zap, ArrowRight,
  Link, Briefcase, Cpu, Globe, FlaskConical
} from 'lucide-react'

// ─── Timeline Data ────────────────────────────────────────────────
const TIMELINE_DATA = [
  {
    id: 1,
    title: 'Infosys AI Intern',
    date: 'Nov 2025 – Feb 2026',
    content: 'Built an autonomous Ambient Email Assistant using LangGraph + Google Gemini with ReAct reasoning, HITL checkpoints, and LangSmith observability.',
    category: 'Internship',
    icon: Brain,
    relatedIds: [2, 5],
    status: 'completed',
    energy: 95,
    color: '#8b5cf6',
  },
  {
    id: 2,
    title: 'HCP CRM Agent',
    date: '2025',
    content: 'AI-first CRM for life sciences. LangGraph agent with 5 custom tools, dual-mode input (form + AI chat), PostgreSQL + FastAPI backend, Redux Toolkit frontend.',
    category: 'AI Project',
    icon: Cpu,
    relatedIds: [1, 3, 5],
    status: 'completed',
    energy: 90,
    color: '#7c3aed',
  },
  {
    id: 3,
    title: 'Document Q&A',
    date: '2025',
    content: 'RAG-based multi-modal Q&A system. Supports PDF, audio & video via Groq Whisper. FastAPI backend + React 18 + Vite + Zustand frontend.',
    category: 'AI Project',
    icon: Layers,
    relatedIds: [2, 4],
    status: 'completed',
    energy: 88,
    color: '#9333ea',
  },
  {
    id: 4,
    title: 'Edunet ML Intern',
    date: 'Dec 2024 – Feb 2025',
    content: 'Developed a CNN-based Plant Disease Detection System with TensorFlow. Delivered actionable pesticide recommendations to farmers.',
    category: 'Internship',
    icon: FlaskConical,
    relatedIds: [3, 5],
    status: 'completed',
    energy: 80,
    color: '#a78bfa',
  },
  {
    id: 5,
    title: 'Dr. Crop AI',
    date: '2024',
    content: 'Detects crop diseases from photos using CNNs. Recommends preventive measures and targeted pesticides. Flask backend + JavaScript frontend.',
    category: 'Project',
    icon: Globe,
    relatedIds: [1, 4],
    status: 'completed',
    energy: 78,
    color: '#c084fc',
  },
  {
    id: 6,
    title: 'Motion Cut Intern',
    date: 'Sep – Oct 2024',
    content: 'Built 3 React projects — personal portfolio, Movie Fan Page with YouTube API, and Cricket Star Showcase. Dynamic content, responsive design.',
    category: 'Internship',
    icon: Code2,
    relatedIds: [7],
    status: 'completed',
    energy: 72,
    color: '#6d28d9',
  },
  {
    id: 7,
    title: 'Portfolio v2',
    date: '2025',
    content: 'This portfolio! React 18 + Vite + Framer Motion. Features dark/light mode, cursor spotlight, 3D scroll showcase, live GitHub stats, and orbital timeline.',
    category: 'Project',
    icon: Zap,
    relatedIds: [6],
    status: 'completed',
    energy: 100,
    color: '#8b5cf6',
  },
]

// ─── Status badge ─────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    completed:   { label: 'Completed',   bg: 'rgba(139,92,246,0.2)',  color: '#c4b5fd', border: 'rgba(139,92,246,0.4)' },
    'in-progress':{ label: 'In Progress', bg: 'rgba(251,191,36,0.15)', color: '#fcd34d', border: 'rgba(251,191,36,0.4)' },
    pending:     { label: 'Pending',      bg: 'rgba(107,114,128,0.2)', color: '#9ca3af', border: 'rgba(107,114,128,0.4)' },
  }
  const s = map[status] || map.pending
  return (
    <span style={{
      padding: '0.15rem 0.55rem', borderRadius: '99px',
      fontSize: '0.65rem', fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
    }}>{s.label}</span>
  )
}

// ─── Node popup card ──────────────────────────────────────────────
function NodeCard({ item, onNavigate, allItems }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 10 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 'calc(100% + 16px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 240,
        background: 'rgba(10,6,18,0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${item.color}50`,
        borderRadius: '16px',
        padding: '1rem',
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${item.color}20`,
        zIndex: 300,
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Connector line */}
      <div style={{
        position: 'absolute', top: -10, left: '50%',
        transform: 'translateX(-50%)',
        width: 1, height: 10,
        background: `linear-gradient(180deg, ${item.color}, transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <StatusBadge status={item.status} />
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-display)' }}>
          {item.date}
        </span>
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '0.9rem', color: '#e9e4f7',
        marginBottom: '0.5rem', lineHeight: 1.3,
      }}>
        {item.title}
      </div>

      {/* Content */}
      <p style={{
        fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.6, marginBottom: '0.75rem',
      }}>
        {item.content}
      </p>

      {/* Energy bar */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Zap size={9} /> Impact Level
          </span>
          <span style={{ fontSize: '0.62rem', color: item.color, fontWeight: 700 }}>{item.energy}%</span>
        </div>
        <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${item.energy}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%', borderRadius: 99,
              background: `linear-gradient(90deg, ${item.color}, #c084fc)`,
              boxShadow: `0 0 6px ${item.color}80`,
            }}
          />
        </div>
      </div>

      {/* Related nodes */}
      {item.relatedIds.length > 0 && (
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            marginBottom: '0.4rem',
            fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            <Link size={9} /> Connected
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {item.relatedIds.map(relId => {
              const rel = allItems.find(i => i.id === relId)
              if (!rel) return null
              return (
                <button key={relId} onClick={e => { e.stopPropagation(); onNavigate(relId) }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    padding: '0.2rem 0.55rem', borderRadius: '99px',
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#c4b5fd', fontSize: '0.65rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.2)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)' }}
                >
                  {rel.title} <ArrowRight size={8} />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function OrbitalTimeline() {
  const [sectionRef, inView] = useInView({ threshold: 0.1 })
  const [rotationAngle, setRotationAngle]     = useState(0)
  const [autoRotate, setAutoRotate]           = useState(true)
  const [activeId, setActiveId]               = useState(null)
  const [expandedId, setExpandedId]           = useState(null)
  const [isMobile, setIsMobile]               = useState(false)
  const rafRef    = useRef(null)
  const lastTime  = useRef(null)
  const angleRef  = useRef(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // rAF-based smooth rotation
  useEffect(() => {
    if (!autoRotate || !inView) return
    const tick = (ts) => {
      if (!lastTime.current) lastTime.current = ts
      const delta = ts - lastTime.current
      lastTime.current = ts
      angleRef.current = (angleRef.current + delta * 0.018) % 360
      setRotationAngle(parseFloat(angleRef.current.toFixed(2)))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [autoRotate, inView])

  const RADIUS = isMobile ? 120 : 185

  const getPos = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const rad   = (angle * Math.PI) / 180
    const x     = RADIUS * Math.cos(rad)
    const y     = RADIUS * Math.sin(rad)
    const zIdx  = Math.round(100 + 50 * Math.cos(rad))
    const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2)))
    return { x, y, zIdx, opacity }
  }

  const toggle = (id) => {
    if (expandedId === id) {
      setExpandedId(null)
      setActiveId(null)
      setAutoRotate(true)
    } else {
      setExpandedId(id)
      setActiveId(id)
      setAutoRotate(false)
      // Snap rotation so clicked node sits at top (270°)
      const idx = TIMELINE_DATA.findIndex(i => i.id === id)
      const target = 270 - (idx / TIMELINE_DATA.length) * 360
      angleRef.current = ((target % 360) + 360) % 360
      setRotationAngle(angleRef.current)
    }
  }

  const isRelated = (id) => {
    if (!activeId) return false
    const active = TIMELINE_DATA.find(i => i.id === activeId)
    return active?.relatedIds.includes(id) ?? false
  }

  return (
    <section id="orbital" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-wrap" ref={sectionRef}>

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clr-purple-400)',
          }}>
            03 · Journey
          </span>
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
          Career <span className="grad-text">constellation</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            color: 'var(--clr-text-muted)', fontSize: '0.9rem',
            marginBottom: '2rem', maxWidth: 460,
          }}
        >
          Click any node to explore. Connected nodes pulse — follow the links to trace how each experience led to the next.
        </motion.p>

        {/* ── Orbital canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={() => { setExpandedId(null); setActiveId(null); setAutoRotate(true) }}
          style={{
            position: 'relative',
            width: '100%',
            height: isMobile ? 340 : 480,
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(13,8,26,0.8) 0%, rgba(10,6,18,0.95) 100%)',
            border: '1px solid var(--clr-border)',
            overflow: 'visible',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default',
          }}
        >
          {/* Grid lines */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden',
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }} />

          {/* Orbit ring */}
          <div style={{
            position: 'absolute',
            width: RADIUS * 2 + 2,
            height: RADIUS * 2 + 2,
            borderRadius: '50%',
            border: '1px solid rgba(139,92,246,0.12)',
            pointerEvents: 'none',
          }} />

          {/* Outer decorative ring */}
          <div style={{
            position: 'absolute',
            width: RADIUS * 2 + 50,
            height: RADIUS * 2 + 50,
            borderRadius: '50%',
            border: '1px dashed rgba(139,92,246,0.06)',
            pointerEvents: 'none',
          }} />

          {/* ── Center core ── */}
          <div style={{
            position: 'absolute',
            width: isMobile ? 52 : 64,
            height: isMobile ? 52 : 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6d28d9, #8b5cf6, #c084fc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(109,40,217,0.6), 0 0 80px rgba(109,40,217,0.2)',
            zIndex: 10,
            cursor: 'default',
          }}>
            {/* Ping rings */}
            <div style={{
              position: 'absolute',
              width: isMobile ? 68 : 84,
              height: isMobile ? 68 : 84,
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.3)',
              animation: 'orb-ping 2s ease-out infinite',
            }} />
            <div style={{
              position: 'absolute',
              width: isMobile ? 88 : 108,
              height: isMobile ? 88 : 108,
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.15)',
              animation: 'orb-ping 2s ease-out 0.6s infinite',
            }} />
            {/* UA monogram */}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: isMobile ? '0.85rem' : '1rem',
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '-0.02em',
              zIndex: 1,
            }}>
              UA
            </span>
          </div>

          {/* ── Orbital nodes ── */}
          {TIMELINE_DATA.map((item, index) => {
            const { x, y, zIdx, opacity } = getPos(index, TIMELINE_DATA.length)
            const isExpanded  = expandedId === item.id
            const isRel       = isRelated(item.id)
            const Icon        = item.icon

            return (
              <div
                key={item.id}
                onClick={e => { e.stopPropagation(); toggle(item.id) }}
                style={{
                  position: 'absolute',
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex: isExpanded ? 200 : zIdx,
                  opacity: isExpanded ? 1 : (activeId && !isRel && item.id !== activeId ? 0.25 : opacity),
                  transition: 'opacity 0.4s ease',
                  cursor: 'pointer',
                }}
              >
                {/* Glow halo */}
                <div style={{
                  position: 'absolute',
                  width: item.energy * 0.4 + 36,
                  height: item.energy * 0.4 + 36,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${item.color}25 0%, transparent 70%)`,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  animation: isRel ? 'orb-pulse 1.2s ease-in-out infinite' : 'none',
                }} />

                {/* Node button */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: isMobile ? 38 : 44,
                    height: isMobile ? 38 : 44,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isExpanded
                      ? `linear-gradient(135deg, ${item.color}, #c084fc)`
                      : isRel
                        ? `rgba(139,92,246,0.3)`
                        : 'rgba(13,8,26,0.9)',
                    border: `2px solid ${isExpanded ? item.color : isRel ? '#c4b5fd' : 'rgba(139,92,246,0.3)'}`,
                    boxShadow: isExpanded
                      ? `0 0 20px ${item.color}80, 0 0 40px ${item.color}30`
                      : isRel
                        ? `0 0 12px rgba(139,92,246,0.5)`
                        : 'none',
                    transition: 'all 0.3s ease',
                    color: isExpanded ? '#fff' : isRel ? '#c4b5fd' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  <Icon size={isMobile ? 14 : 17} />
                </motion.div>

                {/* Label */}
                <div style={{
                  position: 'absolute',
                  top: isMobile ? 42 : 50,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  color: isExpanded ? '#e9e4f7' : 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s',
                  pointerEvents: 'none',
                }}>
                  {item.title}
                </div>

                {/* Popup card */}
                <AnimatePresence>
                  {isExpanded && (
                    <NodeCard
                      key={item.id}
                      item={item}
                      allItems={TIMELINE_DATA}
                      onNavigate={toggle}
                    />
                  )}
                </AnimatePresence>
              </div>
            )
          })}

          {/* Hint text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: autoRotate ? 0.5 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            Click any node to explore
          </motion.div>
        </motion.div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            marginTop: '1.5rem', justifyContent: 'center',
          }}
        >
          {[
            { color: '#8b5cf6', label: 'Internship' },
            { color: '#c084fc', label: 'AI Project'  },
            { color: '#6d28d9', label: 'Web Project'  },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-dim)' }}>{label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'rgba(139,92,246,0.3)',
              border: '1px solid #c4b5fd',
              animation: 'orb-pulse 1.5s ease infinite',
            }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-dim)' }}>Connected node (pulsing)</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes orb-ping {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
        }
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>
    </section>
  )
}