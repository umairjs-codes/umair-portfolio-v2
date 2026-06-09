import React, { Suspense, lazy } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import CursorSpotlight from './components/CursorSpotlight'

// Lazy-loaded sections
const Hero          = lazy(() => import('./components/Hero'))
const ScrollShowcase = lazy(() => import('./components/ScrollShowcase'))
const About         = lazy(() => import('./components/About'))
const Experience    = lazy(() => import('./components/Experience'))
const Skills        = lazy(() => import('./components/Skills'))
const Projects      = lazy(() => import('./components/Projects'))
const GitHubStats   = lazy(() => import('./components/GitHubStats'))
const Contact       = lazy(() => import('./components/Contact'))

export default function App() {
  return (
    <ThemeProvider>
      <CursorSpotlight />

      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />
      <div className="ambient ambient-3" />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Hero />
        </Suspense>

        {/* Cinematic scroll animation — between Hero and About */}
        <Suspense fallback={<SectionLoader />}>
          <ScrollShowcase />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <GitHubStats />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </ThemeProvider>
  )
}

function SectionLoader() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '5rem', opacity: 0.4,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '2px solid var(--clr-purple-500)',
        borderTopColor: 'transparent',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}