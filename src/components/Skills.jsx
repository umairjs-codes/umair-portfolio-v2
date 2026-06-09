import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const skillGroups = [
  {
    category: 'Languages',
    icon: '⌨️',
    skills: [
      { name: 'JavaScript', level: 88 },
      { name: 'Python',     level: 80 },
      { name: 'SQL',        level: 70 },
    ],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js',   level: 90 },
      { name: 'Bootstrap',  level: 82 },
      { name: 'HTML / CSS', level: 92 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js',    level: 78 },
      { name: 'Express.js', level: 75 },
      { name: 'Flask',      level: 70 },
    ],
  },
  {
    category: 'AI / ML',
    icon: '🤖',
    skills: [
      { name: 'CNN / TensorFlow', level: 72 },
      { name: 'LangGraph',        level: 74 },
      { name: 'Google Gemini',    level: 70 },
    ],
  },
]

const tools = [
  'Git & GitHub', 'VS Code', 'Agile / Scrum',
  'REST APIs', 'LangSmith', 'Vercel',
  'Debugging', 'Performance Optimization',
]

function SkillBar({ name, level, inView, delay }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '0.4rem',
        fontSize: '0.85rem',
      }}>
        <span style={{ color: 'var(--clr-text)', fontWeight: 500 }}>{name}</span>
        <span style={{ color: 'var(--clr-purple-400)', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
          {level}%
        </span>
      </div>
      <div style={{
        width: '100%', height: 6,
        borderRadius: 99,
        background: 'rgba(139,92,246,0.1)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            borderRadius: 99,
            background: 'linear-gradient(90deg, var(--clr-purple-600), var(--clr-accent))',
            boxShadow: '0 0 10px rgba(139,92,246,0.5)',
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" style={{ position: 'relative', zIndex: 1 }}>
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
          }}>03 · Skills</span>
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
          My <span className="grad-text">tech stack</span>
        </motion.h2>

        {/* Skill groups grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'var(--clr-bg-card)',
                border: '1px solid var(--clr-border)',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '1.25rem',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{group.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700, fontSize: '0.92rem',
                  color: 'var(--clr-purple-300)',
                }}>
                  {group.category}
                </span>
              </div>

              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  inView={inView}
                  delay={gi * 0.1 + si * 0.12}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tools & soft skills chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.88rem',
            color: 'var(--clr-text-muted)',
            marginBottom: '1rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            Tools & Practices
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.05 }}
                whileHover={{ borderColor: 'var(--clr-purple-500)', color: 'var(--clr-purple-300)', y: -2 }}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '99px',
                  border: '1px solid var(--clr-border)',
                  fontSize: '0.82rem',
                  color: 'var(--clr-text-muted)',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  cursor: 'default',
                }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
