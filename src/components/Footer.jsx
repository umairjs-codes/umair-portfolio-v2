import React from 'react'
import { motion } from 'framer-motion'
import { GitFork, Link2, Globe, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--clr-border)',
      background: 'linear-gradient(0deg, rgba(13,8,26,0.9) 0%, transparent 100%)',
      padding: '2.5rem 1.5rem',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.2rem',
            background: 'linear-gradient(135deg, var(--clr-purple-300), var(--clr-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.3rem',
          }}>
            Syed Umair Ali
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: 'var(--clr-text-dim)',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
          }}>
            Built with <Heart size={12} color="#c084fc" fill="#c084fc" /> using React & Framer Motion
          </div>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {[
            { Icon: GitFork,   href: 'https://github.com/umairjs-codes',                     label: 'GitHub' },
            { Icon: Link2, href: 'https://www.linkedin.com/in/syed-umair-ali-a01b87262/', label: 'LinkedIn' },
            { Icon: Globe,    href: 'https://umair-portfolio-v2.vercel.app',             label: 'Portfolio' },
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
                width: 38, height: 38,
                borderRadius: '10px',
                border: '1px solid var(--clr-border)',
                color: 'var(--clr-text-dim)',
                transition: 'all 0.2s',
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
              <Icon size={16} />
            </motion.a>
          ))}

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 38, height: 38,
              borderRadius: '10px',
              border: '1px solid var(--clr-border)',
              color: 'var(--clr-text-dim)',
              transition: 'all 0.2s',
              marginLeft: '0.5rem',
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
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>

      {/* Copyright line */}
      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '1.5rem auto 0',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(139,92,246,0.08)',
        fontSize: '0.75rem',
        color: 'var(--clr-text-dim)',
        textAlign: 'center',
      }}>
        © {new Date().getFullYear()} Syed Umair Ali · All rights reserved
      </div>
    </footer>
  )
}
