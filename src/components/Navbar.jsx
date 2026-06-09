import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'GitHub',     href: '#github' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('#home')
  const { theme, toggle }       = useTheme()
  const isDark                  = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 1.5rem',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled
            ? isDark
              ? 'rgba(10, 6, 18, 0.88)'
              : 'rgba(245, 243, 255, 0.88)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid var(--clr-border)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <nav style={{
          maxWidth: 'var(--max-w)', margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: '70px',
        }}>

          {/* ── Logo ── */}
          <motion.a
            href="#home"
            onClick={e => handleNav(e, '#home')}
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1.25rem', letterSpacing: '0.03em',
              background: 'linear-gradient(135deg, var(--clr-purple-300), var(--clr-accent))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Umair<span style={{ opacity: 0.6 }}>.</span>dev
          </motion.a>

          {/* ── Desktop links + toggle ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="nav-desktop">
            <ul style={{ display: 'flex', gap: '0.25rem' }}>
              {links.map(link => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={e => handleNav(e, link.href)}
                    whileHover={{ y: -2 }}
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-body)', fontWeight: 500,
                      fontSize: '0.88rem', letterSpacing: '0.02em',
                      color: active === link.href
                        ? 'var(--clr-purple-300)'
                        : 'var(--clr-text-muted)',
                      background: active === link.href
                        ? 'rgba(139, 92, 246, 0.12)'
                        : 'transparent',
                      border: active === link.href
                        ? '1px solid rgba(139, 92, 246, 0.25)'
                        : '1px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Theme toggle — desktop */}
            <ThemeToggle isDark={isDark} toggle={toggle} />
          </div>

          {/* ── Mobile: toggle + hamburger ── */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="nav-mobile-actions">
            <ThemeToggle isDark={isDark} toggle={toggle} />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{
                color: 'var(--clr-purple-300)',
                padding: '0.5rem', borderRadius: '8px',
                border: '1px solid var(--clr-border)',
              }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="mobile-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0,
              width: 'min(280px, 80vw)', height: '100vh',
              background: isDark ? 'rgba(13, 8, 26, 0.97)' : 'rgba(237, 233, 254, 0.97)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid var(--clr-border)',
              zIndex: 999,
              display: 'flex', flexDirection: 'column',
              padding: '90px 2rem 2rem', gap: '0.5rem',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={e => handleNav(e, link.href)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  padding: '0.9rem 1rem', borderRadius: '10px',
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: '1rem',
                  color: active === link.href
                    ? 'var(--clr-purple-300)'
                    : 'var(--clr-text-muted)',
                  background: active === link.href
                    ? 'rgba(139,92,246,0.12)'
                    : 'transparent',
                  borderLeft: active === link.href
                    ? '2px solid var(--clr-purple-500)'
                    : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-outside overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 998 }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop        { display: none !important; }
          .nav-mobile-actions { display: flex !important; }
        }
      `}</style>
    </>
  )
}

/* ── Theme Toggle Button ── */
function ThemeToggle({ isDark, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'relative',
        width: 52, height: 28,
        borderRadius: '99px',
        border: '1px solid var(--clr-border)',
        background: isDark
          ? 'rgba(109,40,217,0.25)'
          : 'rgba(109,40,217,0.12)',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Track icons */}
      <span style={{
        position: 'absolute', left: 6, top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 11, lineHeight: 1,
        opacity: isDark ? 0.5 : 0,
        transition: 'opacity 0.3s',
      }}>🌙</span>
      <span style={{
        position: 'absolute', right: 6, top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 11, lineHeight: 1,
        opacity: isDark ? 0 : 0.7,
        transition: 'opacity 0.3s',
      }}>☀️</span>

      {/* Sliding thumb */}
      <motion.div
        animate={{ x: isDark ? 2 : 26 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute',
          top: 3, width: 20, height: 20,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, #a78bfa, #7c3aed)'
            : 'linear-gradient(135deg, #f59e0b, #f97316)',
          boxShadow: isDark
            ? '0 0 8px rgba(139,92,246,0.6)'
            : '0 0 8px rgba(245,158,11,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.4 }}
        >
          {isDark
            ? <Moon size={11} color="#fff" strokeWidth={2.5} />
            : <Sun  size={11} color="#fff" strokeWidth={2.5} />
          }
        </motion.div>
      </motion.div>
    </motion.button>
  )
}