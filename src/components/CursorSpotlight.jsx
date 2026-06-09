import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const spotRef = useRef(null)
  const pos     = useRef({ x: -999, y: -999 })
  const current = useRef({ x: -999, y: -999 })
  const raf     = useRef(null)

  useEffect(() => {
    // Track target position on mouse move
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth lerp loop — follows cursor with slight lag for a liquid feel
    const lerp = (a, b, t) => a + (b - a) * t

    const loop = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.1)
      current.current.y = lerp(current.current.y, pos.current.y, 0.1)

      if (spotRef.current) {
        spotRef.current.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)

    // Hide on touch devices — no cursor there
    const onTouch = () => {
      if (spotRef.current) spotRef.current.style.opacity = '0'
    }
    window.addEventListener('touchstart', onTouch, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouch)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         500,
        height:        500,
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        9997,
        background:    'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.06) 35%, transparent 70%)',
        willChange:    'transform',
        mixBlendMode:  'screen',
        transition:    'opacity 0.4s ease',
      }}
    />
  )
}