import React from 'react'

export default function PageLoader() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--clr-bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1.5rem', zIndex: 9998
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 700,
        background: 'linear-gradient(135deg, var(--clr-purple-300), var(--clr-accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '0.05em'
      }}>
        Umair.dev
      </div>

      <div style={{
        display: 'flex', gap: '8px'
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--clr-purple-500)',
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
