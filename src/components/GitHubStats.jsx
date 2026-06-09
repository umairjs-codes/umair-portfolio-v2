import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import {
  GitFork, Star, Users, BookOpen, Flame,
  Code2, TrendingUp, Calendar, RefreshCw, ExternalLink
} from 'lucide-react'

const GITHUB_USER = 'umairjs-codes'

// ─── Fetch helpers ────────────────────────────────────────────────
async function fetchGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`)
  if (!res.ok) throw new Error('User fetch failed')
  return res.json()
}

async function fetchRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  )
  if (!res.ok) throw new Error('Repos fetch failed')
  return res.json()
}

// ─── Contribution graph via GitHub README stats service ──────────
// We'll build our own contribution-style bar chart from repo push dates
// using the events API (public, no auth needed)
async function fetchEvents(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`
  )
  if (!res.ok) return []
  return res.json()
}

// ─── Helpers ──
function buildLanguageMap(repos) {
  const map = {}
  repos.forEach(r => {
    if (r.language) map[r.language] = (map[r.language] || 0) + 1
  })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
}

function buildWeeklyActivity(events) {
  // Last 12 weeks, Mon–Sun
  const weeks = 12
  const now = new Date()
  const data = Array.from({ length: weeks }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (weeks - 1 - i) * 7)
    return { label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), count: 0 }
  })

  events.forEach(ev => {
    if (!['PushEvent', 'CreateEvent', 'PullRequestEvent'].includes(ev.type)) return
    const evDate = new Date(ev.created_at)
    const diffWeeks = Math.floor((now - evDate) / (7 * 24 * 3600 * 1000))
    const idx = weeks - 1 - diffWeeks
    if (idx >= 0 && idx < weeks) data[idx].count++
  })
  return data
}

function calcStreak(events) {
  if (!events.length) return { current: 0, longest: 0, total: events.length }
  const days = new Set(
    events
      .filter(e => ['PushEvent', 'CreateEvent'].includes(e.type))
      .map(e => e.created_at.slice(0, 10))
  )
  const sorted = [...days].sort().reverse()
  let current = 0, longest = 0, streak = 0
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 && sorted[0] !== today && sorted[0] !== yesterday) {
      streak = 0
    } else if (i === 0) {
      streak = 1
    } else {
      const prev = new Date(sorted[i - 1])
      const curr = new Date(sorted[i])
      const diff = (prev - curr) / 86400000
      streak = diff === 1 ? streak + 1 : 1
    }
    if (i === 0 || sorted[i] === today || sorted[i] === yesterday) current = streak
    if (streak > longest) longest = streak
  }
  return { current, longest, total: days.size }
}

// ─── Language colours ────────────────────────────────────────────
const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  HTML:       '#e34c26', CSS:        '#563d7c', Java:   '#b07219',
  'C++':      '#f34b7d', Ruby:       '#701516', Go:     '#00ADD8',
  Rust:       '#dea584', Shell:      '#89e051', Vue:    '#41b883',
  React:      '#61dafb', PHP:        '#4F5D95', Swift:  '#fa7343',
}
const langColor = l => LANG_COLORS[l] || '#8b5cf6'

// ─── Sub-components ──────────────────────────────────────────────

function StatPill({ icon: Icon, label, value, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.5)' }}
      style={{
        padding: '1.1rem 1.3rem',
        borderRadius: '14px',
        background: 'var(--clr-bg-card)',
        border: '1px solid var(--clr-border)',
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        transition: 'border-color 0.25s',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: '10px',
        background: 'rgba(109,40,217,0.2)',
        border: '1px solid rgba(139,92,246,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--clr-purple-400)', flexShrink: 0,
      }}>
        <Icon size={17} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--clr-text)', lineHeight: 1 }}>
          {value ?? '—'}
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--clr-text-dim)', marginTop: '0.2rem', letterSpacing: '0.04em' }}>
          {label}
        </div>
      </div>
    </motion.div>
  )
}

function StreakCard({ streak, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: '18px',
        background: 'var(--clr-bg-card)',
        border: '1px solid var(--clr-border)',
        padding: '1.75rem',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(234,88,12,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <Flame size={18} color="#f97316" />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--clr-text)' }}>
          Contribution Streak
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        {[
          { label: 'Current Streak', value: streak.current, unit: 'days', accent: '#f97316' },
          { label: 'Longest Streak', value: streak.longest, unit: 'days', accent: '#8b5cf6' },
          { label: 'Active Days',   value: streak.total,   unit: 'days', accent: '#c084fc' },
        ].map(({ label, value, unit, accent }) => (
          <div key={label} style={{
            textAlign: 'center', padding: '1rem 0.5rem',
            borderRadius: '12px',
            background: `${accent}12`,
            border: `1px solid ${accent}30`,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '2rem', color: accent, lineHeight: 1,
            }}>
              {value}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--clr-text-dim)', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {unit}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-muted)', marginTop: '0.2rem' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function LanguagesCard({ langs, totalRepos, inView }) {
  const total = langs.reduce((s, [, c]) => s + c, 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: '18px',
        background: 'var(--clr-bg-card)',
        border: '1px solid var(--clr-border)',
        padding: '1.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <Code2 size={17} color="var(--clr-purple-400)" />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--clr-text)' }}>
          Top Languages
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: '0.72rem',
          color: 'var(--clr-text-dim)', padding: '0.15rem 0.5rem',
          borderRadius: '99px', border: '1px solid var(--clr-border)',
        }}>
          {totalRepos} repos
        </span>
      </div>

      {/* Stacked bar */}
      <div style={{
        display: 'flex', height: 8, borderRadius: 99,
        overflow: 'hidden', marginBottom: '1.25rem', gap: 2,
      }}>
        {langs.map(([lang, count], i) => (
          <motion.div
            key={lang}
            initial={{ width: 0 }}
            animate={inView ? { width: `${(count / total) * 100}%` } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%', borderRadius: 99,
              background: langColor(lang),
              boxShadow: `0 0 8px ${langColor(lang)}60`,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {langs.map(([lang, count], i) => (
          <motion.div
            key={lang}
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.45 + i * 0.07 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <div style={{
              width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
              background: langColor(lang),
              boxShadow: `0 0 6px ${langColor(lang)}80`,
            }} />
            <span style={{ fontSize: '0.83rem', color: 'var(--clr-text)', fontWeight: 500, flex: 1 }}>{lang}</span>
            <div style={{ width: 80, height: 4, borderRadius: 99, background: 'rgba(139,92,246,0.1)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${(count / total) * 100}%` } : { width: 0 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.08 }}
                style={{ height: '100%', borderRadius: 99, background: langColor(lang) }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-dim)', minWidth: 32, textAlign: 'right', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {Math.round((count / total) * 100)}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ActivityGraph({ data, inView }) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.35 }}
      style={{
        borderRadius: '18px',
        background: 'var(--clr-bg-card)',
        border: '1px solid var(--clr-border)',
        padding: '1.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <TrendingUp size={17} color="var(--clr-purple-400)" />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--clr-text)' }}>
          Activity — Last 12 Weeks
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--clr-text-dim)' }}>
          commits &amp; events
        </span>
      </div>

      {/* Bars */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '0.45rem',
        height: 100,
      }}>
        {data.map((week, i) => {
          const pct = max > 0 ? (week.count / max) * 100 : 0
          const isHigh = week.count === max
          const isLow  = week.count === Math.min(...data.map(d => d.count))

          return (
            <motion.div
              key={i}
              title={`${week.label}: ${week.count} events`}
              initial={{ height: 0 }}
              animate={inView ? { height: `${Math.max(pct, 4)}%` } : { height: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.08 }}
              style={{
                flex: 1, borderRadius: '5px 5px 2px 2px',
                background: isHigh
                  ? 'linear-gradient(180deg, #f97316, #c084fc)'
                  : isLow && week.count === 0
                    ? 'rgba(139,92,246,0.1)'
                    : 'linear-gradient(180deg, var(--clr-purple-500), var(--clr-purple-700))',
                boxShadow: isHigh ? '0 0 14px rgba(249,115,22,0.5)' : 'none',
                cursor: 'default',
                minHeight: 4,
                position: 'relative',
              }}
            >
              {isHigh && (
                <div style={{
                  position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                  fontSize: '0.65rem', color: '#f97316', fontWeight: 700,
                  fontFamily: 'var(--font-display)', whiteSpace: 'nowrap',
                }}>
                  🔥 {week.count}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* X-axis labels — show every 3rd */}
      <div style={{
        display: 'flex', gap: '0.45rem', marginTop: '0.5rem',
      }}>
        {data.map((week, i) => (
          <div key={i} style={{
            flex: 1, fontSize: '0.6rem', color: 'var(--clr-text-dim)',
            textAlign: 'center', overflow: 'hidden',
            opacity: i % 3 === 0 ? 1 : 0,
          }}>
            {week.label}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: '1.25rem', marginTop: '1rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--clr-border)',
        flexWrap: 'wrap',
      }}>
        {[
          { color: 'linear-gradient(90deg, var(--clr-purple-500), var(--clr-purple-700))', label: 'Regular activity' },
          { color: 'linear-gradient(90deg, #f97316, #c084fc)', label: 'Peak week 🔥' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 24, height: 8, borderRadius: 4, background: color }} />
            <span style={{ fontSize: '0.73rem', color: 'var(--clr-text-dim)' }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────
export default function GitHubStats() {
  const [ref, inView] = useInView()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const fetched = useRef(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [user, repos, events] = await Promise.all([
        fetchGitHubUser(GITHUB_USER),
        fetchRepos(GITHUB_USER),
        fetchEvents(GITHUB_USER),
      ])
      setData({
        user,
        langs:   buildLanguageMap(repos),
        weekly:  buildWeeklyActivity(events),
        streak:  calcStreak(events),
        repos,
      })
    } catch (e) {
      setError('Could not load GitHub data. Rate limit or network issue.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (inView && !fetched.current) {
      fetched.current = true
      load()
    }
  }, [inView])

  return (
    <section id="github" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-wrap" ref={ref}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clr-purple-400)',
          }}>05 · GitHub</span>
          <div style={{ flex: 1, height: 1, background: 'var(--clr-border)', maxWidth: 80 }} />
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              lineHeight: 1.15, letterSpacing: '-0.02em',
            }}
          >
            GitHub <span className="grad-text">Activity</span>
          </motion.h2>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <motion.a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', borderRadius: '10px',
                border: '1px solid var(--clr-border)',
                fontSize: '0.8rem', color: 'var(--clr-text-muted)',
                fontWeight: 500, transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--clr-purple-300)'
                e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--clr-text-muted)'
                e.currentTarget.style.borderColor = 'var(--clr-border)'
              }}
            >
              <ExternalLink size={13} /> @{GITHUB_USER}
            </motion.a>

            <motion.button
              onClick={load}
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, borderRadius: '8px',
                border: '1px solid var(--clr-border)',
                color: 'var(--clr-text-dim)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--clr-purple-300)'
                e.currentTarget.style.borderColor = 'var(--clr-purple-500)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--clr-text-dim)'
                e.currentTarget.style.borderColor = 'var(--clr-border)'
              }}
              title="Refresh"
            >
              <RefreshCw size={14} />
            </motion.button>
          </div>
        </div>

        {/* ── Loading ── */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loader"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', justifyContent: 'center', padding: '4rem', gap: '8px' }}
            >
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--clr-purple-500)',
                  animation: `ghBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
              <style>{`@keyframes ghBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-10px);opacity:1} }`}</style>
            </motion.div>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <motion.div key="error"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                padding: '2rem', borderRadius: '16px', textAlign: 'center',
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#f87171', fontSize: '0.88rem',
              }}
            >
              {error}
              <button onClick={load} style={{
                display: 'block', margin: '1rem auto 0',
                padding: '0.5rem 1.2rem', borderRadius: '8px',
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid var(--clr-purple-500)',
                color: 'var(--clr-purple-300)', cursor: 'pointer', fontSize: '0.82rem',
              }}>Try again</button>
            </motion.div>
          )}

          {/* ── Data ── */}
          {!loading && data && (
            <motion.div key="content"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {/* Profile + stat pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}>
                <StatPill icon={BookOpen} label="Public Repos"  value={data.user.public_repos}  delay={0.1} inView={inView} />
                <StatPill icon={Users}    label="Followers"     value={data.user.followers}      delay={0.15} inView={inView} />
                <StatPill icon={GitFork}  label="Following"     value={data.user.following}      delay={0.2} inView={inView} />
                <StatPill icon={Star}     label="Total Stars"   value={data.repos.reduce((s, r) => s + r.stargazers_count, 0)} delay={0.25} inView={inView} />
                <StatPill icon={Calendar} label="Member Since"  value={new Date(data.user.created_at).getFullYear()} delay={0.3} inView={inView} />
              </div>

              {/* Streak + Languages row */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '1.25rem', marginBottom: '1.25rem',
              }} className="gh-two-col">
                <StreakCard streak={data.streak} inView={inView} />
                <LanguagesCard langs={data.langs} totalRepos={data.repos.length} inView={inView} />
              </div>

              {/* Activity graph full width */}
              <ActivityGraph data={data.weekly} inView={inView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .gh-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}